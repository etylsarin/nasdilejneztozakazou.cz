import * as React from "react"
import { graphql, Link } from "gatsby"

import { Seo, babisPersonNode, siteNodeIds } from "../components/seo"
import { BookCard } from "../components/book-card"
import { BOOKS } from "../data/catalog"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import * as styles from "../styles/page.module.scss"

const TITLE = "Knihy o Andreji Babišovi"
const DESCRIPTION =
  "Knihy investigativních novinářů o Andreji Babišovi: Boss Babiš, Babišovo Palermo, Žlutý baron, Babišistán a další. Co v nich najdete a ke kterým kauzám se vztahují."

type CaseLink = { slug: string; navTitle: string }

const BooksPage = ({ data }) => {
  const cases: CaseLink[] = data.allMdx.nodes.map(node => ({
    slug: node.fields.slug,
    navTitle: node.frontmatter.navTitle,
  }))
  // Topics are case file names; keep the timeline order of the cases.
  const casesFor = (topics: string[]) =>
    cases.filter(item => topics.some(topic => item.slug === `/kauzy/${topic}/`))

  return (
    <div className="container">
      <header className={styles.header}>
        <p className="kicker">Doporučená literatura</p>
        <h1 className={styles.h1}>
          <span className="stamp">{TITLE}</span>
        </h1>
        <p className={styles.lead}>
          Novináři o Andreji Babišovi napsali několik knih — o jeho kariéře v
          komunistickém zahraničním obchodě, o tom, jak z Petrimexu vyrostl
          Agrofert, i o jeho vládnutí. Tady je přehled seřazený podle roku
          vydání, u každé knihy s odkazem na <Link to="/">kauzy</Link>, kterým
          se věnuje.
        </p>
        <p className={styles.note}>
          Odkazy vedou do knihkupectví Knihy Dobrovský a jsou{" "}
          <Link to="/o-webu/#partnerske-odkazy">partnerské</Link>: když přes ně
          knihu koupíte, dostaneme malou provizi, ze které platíme provoz webu.
          Cena se pro vás nemění.
        </p>
      </header>

      {BOOKS.map(book => (
        <BookCard key={book.id} book={book} cases={casesFor(book.topics)} />
      ))}
    </div>
  )
}

export default BooksPage

export const Head = ({ location }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const url = `${site.siteUrl}/knihy/`

  const schema = [
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "cs-CZ",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.babis },
      mainEntity: {
        "@type": "ItemList",
        name: TITLE,
        numberOfItems: BOOKS.length,
        itemListElement: BOOKS.map((book, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Book",
            "@id": `${url}#${book.id}`,
            name: book.title,
            url: book.url,
            inLanguage: "cs",
            about: { "@id": ids.babis },
            author: book.authors.map(name => ({ "@type": "Person", name })),
            ...(book.year ? { datePublished: String(book.year) } : {}),
            ...(book.publisher
              ? { publisher: { "@type": "Organization", name: book.publisher } }
              : {}),
            ...(book.isbn ? { isbn: book.isbn } : {}),
            ...(book.pages ? { numberOfPages: book.pages } : {}),
            ...(book.format === "e-kniha"
              ? { bookFormat: "https://schema.org/EBook" }
              : {}),
          },
        })),
      },
    },
    babisPersonNode(site.siteUrl),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Kauzy Andreje Babiše",
          item: `${site.siteUrl}/`,
        },
        { "@type": "ListItem", position: 2, name: TITLE, item: url },
      ],
    },
  ]

  return (
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      pathname={location.pathname}
      schema={schema}
    />
  )
}

export const query = graphql`
  query BooksPage {
    allMdx(
      filter: { fields: { slug: { ne: null } } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          navTitle
        }
      }
    }
  }
`
