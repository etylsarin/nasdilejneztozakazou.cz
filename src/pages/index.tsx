import * as React from "react"
import { graphql, Link } from "gatsby"
import {
  GatsbyImage,
  getImage,
  type IGatsbyImageData,
} from "gatsby-plugin-image"

import { Seo, babisPersonNode, siteNodeIds } from "../components/seo"
import { BookListItem } from "../components/book-card"
import { ResourceList } from "../components/resource-list"
import { BOOKS } from "../data/catalog"
import { ERAS, STATUS_LABELS } from "../data/eras"
import { MILESTONES } from "../data/milestones"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { formatDate, plural } from "../utils/format"
import * as styles from "../styles/home.module.scss"

type CaseNode = {
  fields: { slug: string }
  frontmatter: {
    title: string
    navTitle: string
    description: string
    period: string
    era: string
    status: string
    statusText: string
    date: string
    year: string
    updated: string
    image?: { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | null
  }
}

type TimelineItem =
  | { kind: "case"; date: string; node: CaseNode }
  | { kind: "milestone"; date: string; text: string; source: string }

const latestUpdate = (cases: CaseNode[]) =>
  cases
    .map(node => node.frontmatter.updated)
    .sort()
    .at(-1)

const IndexPage = ({ data }) => {
  const cases: CaseNode[] = data.allMdx.nodes
  const openCount = cases.filter(
    node => node.frontmatter.status === "open",
  ).length
  const updated = latestUpdate(cases)

  const timeline = ERAS.map(era => {
    const items: TimelineItem[] = [
      ...cases
        .filter(node => node.frontmatter.era === era.id)
        .map(node => ({
          kind: "case" as const,
          date: node.frontmatter.date,
          node,
        })),
      ...MILESTONES.filter(item => item.era === era.id).map(item => ({
        kind: "milestone" as const,
        ...item,
      })),
    ].sort((a, b) => a.date.localeCompare(b.date))
    return { era, items }
  }).filter(group => group.items.length > 0)

  return (
    <>
      <section className={`container ${styles.hero}`}>
        {updated && (
          <p className="kicker">
            Chronologický přehled · aktualizováno {formatDate(updated)}
          </p>
        )}
        <h1 className={styles.h1}>
          <span className="stamp">Kauzy Andreje Babiše</span>
        </h1>
        <p className={styles.lead}>
          <a
            href="https://www.e15.cz/volby/volby-do-snemovny/moje-era-byla-nejuspesnejsi-chlubi-se-babis-ve-volebni-publikaci-kandiduje-pry-naposled-1382162"
            target="_blank"
            rel="noopener"
            // Same text as the site-name link to the homepage; the label
            // tells screen readers this one goes to an article.
            aria-label="Sdílejte, než to zakážou! (článek E15 o Babišově volební publikaci)"
          >
            <cite>Sdílejte, než to zakážou!</cite>
          </a>
          , je titul knihy, se kterou Andrej Babiš a hnutí ANO v roce 2021 vyrazili do předvolební kampaně.
          Namísto marketingových lží z předvolební publikace však na tomto webu najdete chladnou realitu:
          všechny kauzy oligarchy Babiše od členství v KSČ a evidence u StB přes kontroverzní ovládnutí Petrimexu,
          vznik Agrofertu a Čapí hnízdo až po opětovný střet zájmů v nové vládě, v pořadí, v jakém se staly.
          <br /><strong>U každého tvrzení je odkaz na zdroj</strong>, ať si vše můžete
          ověřit sami.
        </p>
        <p className={styles.stats}>
          <span>
            <strong>{cases.length}</strong>{" "}
            {plural(cases.length, "kauza", "kauzy", "kauz")}
          </span>
          <span>
            <strong>{openCount}</strong>{" "}
            {plural(openCount, "otevřená", "otevřené", "otevřených")}
          </span>
          <span>
            <strong>{BOOKS.length}</strong>{" "}
            {plural(BOOKS.length, "kniha", "knihy", "knih")} k tématu
          </span>
        </p>
        <nav aria-label="Období" className={styles.eraNav}>
          <ol>
            {timeline.map(({ era }) => (
              <li key={era.id}>
                <a href={`#${era.id}`}>
                  <span>{era.period}</span> {era.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <div className="container">
        {timeline.map(({ era, items }) => (
          <section
            key={era.id}
            id={era.id}
            className={styles.era}
            aria-labelledby={`${era.id}-nadpis`}
          >
            <h2 id={`${era.id}-nadpis`} className={styles.eraTitle}>
              <span className={styles.eraPeriod}>{era.period}</span>
              {era.label}
            </h2>
            <ol className={styles.timeline}>
              {items.map(item =>
                item.kind === "case" ? (
                  <li key={item.node.fields.slug}>
                    <span className={styles.year}>
                      {item.node.frontmatter.year}
                    </span>
                    <div className={styles.card}>
                      <h3>
                        <Link to={item.node.fields.slug}>
                          {item.node.frontmatter.title}
                        </Link>
                      </h3>
                      <p>{item.node.frontmatter.description}</p>
                      <p className={styles.caseMeta}>
                        <span
                          className={`status status--${item.node.frontmatter.status}`}
                        >
                          {STATUS_LABELS[item.node.frontmatter.status]}
                        </span>{" "}
                        {item.node.frontmatter.statusText}
                        <span aria-hidden="true"> · </span>
                        {item.node.frontmatter.period}
                      </p>
                    </div>
                    {getImage(item.node.frontmatter.image) && (
                      // Decorative: the heading next to it is the real link.
                      <Link
                        to={item.node.fields.slug}
                        className={styles.thumb}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <GatsbyImage
                          image={getImage(item.node.frontmatter.image)}
                          alt=""
                        />
                      </Link>
                    )}
                  </li>
                ) : (
                  <li
                    key={`${item.date}-${item.text}`}
                    className={styles.milestone}
                  >
                    <time className={styles.year} dateTime={item.date}>
                      {item.date.slice(0, 4)}
                    </time>
                    <p>
                      {item.text}{" "}
                      <a href={item.source} target="_blank" rel="noopener">
                        zdroj
                      </a>
                    </p>
                  </li>
                ),
              )}
            </ol>
          </section>
        ))}
      </div>

      <section className="container" aria-labelledby="knihy">
        <div className={styles.books}>
          <h2 id="knihy">Chcete vědět víc? Přečtěte si knihy</h2>
          <p>
            Novináři a komentátoři popsali Babišovu cestu od komunistického
            zahraničního obchodu až do Strakovy akademie v několika knihách.
          </p>
          <ul className={styles.bookGrid}>
            {BOOKS.map(book => (
              <BookListItem key={book.id} book={book} />
            ))}
          </ul>
          <p className={styles.booksMore}>
            <Link to="/knihy/" className="button">
              Přehled knih o Babišovi
            </Link>
          </p>
        </div>
      </section>

      <section
        className={`container ${styles.verify}`}
        aria-labelledby="overujte"
      >
        <h2 id="overujte">Myslete kriticky. Ověřujte si všechno</h2>
        <div className="prose">
          <p>
            Internetem se denně šíří obrovské množství polopravd i vyslovených
            lží: řetězovými e-maily, příspěvky na sociálních sítích i takzvanými
            dezinformačními weby. Než něco nasdílíte,{" "}
            <strong>ověřte si to</strong>. Pomůžou vám tyhle důvěryhodné zdroje:
          </p>
        </div>
        <ResourceList />
        <div className="prose">
          <p>
            A to platí i pro tenhle web: klikejte na odkazy, čtěte původní
            zdroje a dělejte si vlastní názor.{" "}
            <Link to="/o-webu/">Jak web vzniká</Link>.
          </p>
        </div>
      </section>
    </>
  )
}

export default IndexPage

export const Head = ({ data, location }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const cases: CaseNode[] = data.allMdx.nodes

  const schema = [
    {
      "@type": "CollectionPage",
      "@id": `${site.siteUrl}/#webpage`,
      url: `${site.siteUrl}/`,
      name: "Kauzy Andreje Babiše",
      inLanguage: "cs-CZ",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.babis },
      dateModified: latestUpdate(cases),
      mainEntity: {
        "@type": "ItemList",
        name: "Kauzy Andreje Babiše chronologicky",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: cases.length,
        itemListElement: cases.map((node, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: node.frontmatter.title,
          url: `${site.siteUrl}${node.fields.slug}`,
        })),
      },
    },
    babisPersonNode(site.siteUrl),
  ]

  return <Seo pathname={location.pathname} schema={schema} />
}

export const query = graphql`
  query HomePage {
    allMdx(
      filter: { fields: { slug: { ne: null } } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          navTitle
          description
          period
          era
          status
          statusText
          date(formatString: "YYYY-MM-DD")
          year: date(formatString: "YYYY")
          updated(formatString: "YYYY-MM-DD")
          image {
            childImageSharp {
              gatsbyImageData(width: 104, height: 104, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
