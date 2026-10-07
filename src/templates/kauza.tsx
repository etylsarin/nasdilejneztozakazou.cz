import * as React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Seo, babisPersonNode, siteNodeIds } from "../components/seo"
import { mdxComponents } from "../components/mdx-components"
import { BookListItem } from "../components/book-card"
import { bookById } from "../data/catalog"
import { eraById, STATUS_LABELS } from "../data/eras"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { formatDate } from "../utils/format"
import * as styles from "./kauza.module.scss"

// "https://www.penam.cz/…" → "penam.cz"; Commons gets its proper name.
const sourceLabel = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, "")
  return host.endsWith("wikimedia.org") ? "Wikimedia Commons" : host
}

// Commons licences (CC BY, CC BY-SA) require the author, a link to the
// source and to the licence, and a note that the picture was modified.
const ImageCredit = ({ frontmatter }) => {
  const { imageCredit, imageLicense, imageLicenseUrl, imageSource } =
    frontmatter
  return (
    <figcaption className={styles.credit}>
      Foto: {imageCredit}
      {imageSource && (
        <>
          {" / "}
          <a href={imageSource} target="_blank" rel="noopener">
            {sourceLabel(imageSource)}
          </a>
        </>
      )}
      {imageLicense && (
        <>
          {", "}
          {imageLicenseUrl ? (
            <a href={imageLicenseUrl} target="_blank" rel="noopener license">
              {imageLicense}
            </a>
          ) : (
            imageLicense
          )}
        </>
      )}
      {imageSource && ", upraveno"}
    </figcaption>
  )
}

const CaseTemplate = ({ data, pageContext, children }) => {
  const { frontmatter } = data.mdx
  const era = eraById(frontmatter.era)
  const image = getImage(frontmatter.image?.childImageSharp?.gatsbyImageData)
  const books = (frontmatter.books ?? []).map(bookById).filter(Boolean)
  const { prev, next, related = [] } = pageContext

  return (
    <article className="container">
      <header className={styles.header}>
        <nav aria-label="Drobečková navigace" className={styles.breadcrumb}>
          <ol>
            <li>
              <Link to="/">Kauzy Andreje Babiše</Link>
            </li>
            {era && (
              <li>
                <Link to={`/#${era.id}`}>
                  {era.label} ({era.period})
                </Link>
              </li>
            )}
          </ol>
        </nav>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <p className={styles.meta}>
          <span className={`status status--${frontmatter.status}`}>
            {STATUS_LABELS[frontmatter.status] ?? frontmatter.status}
          </span>{" "}
          <span className={styles.statusText}>{frontmatter.statusText}</span>
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          <span>{frontmatter.period}</span>
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          <span>
            Aktualizováno{" "}
            <time dateTime={frontmatter.updated}>
              {formatDate(frontmatter.updated)}
            </time>
          </span>
        </p>
      </header>

      <div className={styles.grid}>
        <div className="prose">
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>

        {(image || books.length > 0 || related.length > 0) && (
          <aside className={styles.aside}>
            {image && (
              <figure className={styles.figure}>
                <GatsbyImage
                  image={image}
                  alt={frontmatter.imageAlt ?? ""}
                  className={styles.image}
                  // The aside is a 300px column above the 900px breakpoint
                  // and the image caps at 400px below it.
                  sizes="(min-width: 901px) 300px, (min-width: 400px) 400px, 100vw"
                />
                {frontmatter.imageCredit && (
                  <ImageCredit frontmatter={frontmatter} />
                )}
              </figure>
            )}
            {books.length > 0 && (
              <section
                className={styles.books}
                aria-labelledby="knihy-k-tematu"
              >
                <h2 id="knihy-k-tematu">Knihy k tématu</h2>
                <ul>
                  {books.map(book => (
                    <BookListItem key={book.id} book={book} />
                  ))}
                </ul>
                <p className={styles.disclosure}>
                  <Link to="/o-webu/#partnerske-odkazy">Partnerské odkazy</Link>
                  : při nákupu dostaneme provizi, cena se vám nemění.{" "}
                  <Link to="/knihy/">Všechny knihy o Babišovi</Link>
                </p>
              </section>
            )}
            {related.length > 0 && (
              <section
                className={styles.related}
                aria-labelledby="souvisejici-kauzy"
              >
                <h2 id="souvisejici-kauzy">Související kauzy</h2>
                <ul>
                  {related.map(item => (
                    <li key={item.slug}>
                      <Link to={item.slug}>{item.navTitle}</Link>
                      <span className={styles.relatedMeta}>
                        {item.period} ·{" "}
                        {STATUS_LABELS[item.status]?.toLowerCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        )}
      </div>

      <nav className={styles.prevNext} aria-label="Další kauzy v časové ose">
        {prev ? (
          <Link to={prev.slug} rel="prev">
            <span className={styles.dir}>← Předchozí kauza</span>
            <strong>{prev.navTitle}</strong>
            <span className={styles.period}>{prev.period}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.slug} rel="next" className={styles.next}>
            <span className={styles.dir}>Další kauza →</span>
            <strong>{next.navTitle}</strong>
            <span className={styles.period}>{next.period}</span>
          </Link>
        ) : (
          <Link to="/" className={styles.next}>
            <span className={styles.dir}>Časová osa →</span>
            <strong>Všechny kauzy</strong>
          </Link>
        )}
      </nav>
    </article>
  )
}

export default CaseTemplate

export const Head = ({ data, location }) => {
  const { frontmatter, fields } = data.mdx
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const url = `${site.siteUrl}${fields.slug}`
  const original = frontmatter.image?.childImageSharp?.original
  const imageUrl = original
    ? `${site.siteUrl}${original.src}`
    : `${site.siteUrl}/og-image.jpg`
  const era = eraById(frontmatter.era)

  const schema = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: frontmatter.title,
      description: frontmatter.description,
      image: imageUrl,
      datePublished: frontmatter.published ?? frontmatter.updated,
      dateModified: frontmatter.updated,
      inLanguage: "cs-CZ",
      mainEntityOfPage: url,
      isPartOf: { "@id": ids.website },
      author: { "@id": ids.organization },
      publisher: { "@id": ids.organization },
      about: { "@id": ids.babis },
      ...(era ? { articleSection: era.label } : {}),
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
        {
          "@type": "ListItem",
          position: 2,
          name: frontmatter.navTitle,
          item: url,
        },
      ],
    },
  ]

  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      pathname={location.pathname}
      image={imageUrl}
      imageAlt={frontmatter.imageAlt}
      imageSize={
        original
          ? { width: original.width, height: original.height }
          : undefined
      }
      type="article"
      schema={schema}
    >
      <meta property="article:modified_time" content={frontmatter.updated} />
      {era && <meta property="article:section" content={era.label} />}
    </Seo>
  )
}

export const query = graphql`
  query CaseById($id: String!) {
    mdx(id: { eq: $id }) {
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
        imageAlt
        imageCredit
        imageLicense
        imageLicenseUrl
        imageSource
        books
        published(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY-MM-DD")
        image {
          childImageSharp {
            gatsbyImageData(
              width: 400
              height: 400
              placeholder: BLURRED
              formats: [AUTO, AVIF, WEBP]
              outputPixelDensities: [0.75, 1, 1.5, 2]
            )
            original {
              src
              width
              height
            }
          }
        }
      }
    }
  }
`
