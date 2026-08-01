import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import * as styles from "./page-layout.module.scss"

// Pages that only exist as build artifacts. Both are served with a 200 and
// render the same shell as the homepage, so to a crawler they look like thin
// duplicates of it — that is what Search Console reported as
// "Procházeno – momentálně neindexováno".
const NOINDEX_PATHS = [
  "/404",
  "/404.html",
  "/offline-plugin-app-shell-fallback",
]

// "/foo/" and "/foo" are the same page; compare and build URLs from one form.
const stripTrailingSlash = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/"

export const PageLayout = ({ children, ...props }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)
  const SITE_TITLE = siteMetadata.title
  const SITE_URL = siteMetadata.siteUrl.replace(/\/$/, "")

  const frontmatter = props.pageContext?.frontmatter ?? {}
  const pathname = stripTrailingSlash(
    props.location?.pathname ?? props.path ?? props.uri ?? "/"
  )
  const noindex = NOINDEX_PATHS.includes(pathname)

  const TITLE = frontmatter.title
    ? `${frontmatter.title} | ${SITE_TITLE}`
    : `${SITE_TITLE} | Neubližujte svým dětem a budoucím generacím!`
  const DESC = frontmatter.description || siteMetadata.description
  // Directories get a trailing slash to match how Gatsby emits them; a path
  // that ends in a file extension (/404.html) must not.
  const isDirectory = pathname !== "/" && !/\.[a-z0-9]+$/i.test(pathname)
  const CANONICAL = `${SITE_URL}${isDirectory ? `${pathname}/` : pathname}`
  const OG_IMAGE = `${SITE_URL}/og-image.jpg`

  const meta = [
    { name: `description`, content: DESC },
    { property: `og:site_name`, content: SITE_TITLE },
    { property: `og:title`, content: TITLE },
    { property: `og:image`, content: OG_IMAGE },
    { property: `og:image:width`, content: `400` },
    { property: `og:image:height`, content: `400` },
    { property: `og:image:alt`, content: SITE_TITLE },
    { property: `og:url`, content: CANONICAL },
    { property: `og:locale`, content: `cs_CZ` },
    { property: `og:description`, content: DESC },
    { property: `og:type`, content: `website` },
    { name: `twitter:card`, content: `summary` },
    { name: `twitter:image`, content: OG_IMAGE },
    { name: `twitter:title`, content: TITLE },
    { name: `twitter:description`, content: DESC },
  ]

  // Google ignores rel=canonical on a noindex page and warns about the
  // combination, so the two are kept mutually exclusive.
  if (noindex) {
    meta.push({ name: `robots`, content: `noindex, follow` })
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_TITLE,
    alternateName: "Sdílejte, než to zakážou",
    url: `${SITE_URL}/`,
    description: siteMetadata.description,
    inLanguage: "cs-CZ",
  }

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: "cs" }}
        title={TITLE}
        link={noindex ? [] : [{ rel: "canonical", href: CANONICAL }]}
        meta={meta}
      >
        {!noindex && (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        )}
      </Helmet>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Sdílejte, než to zakážou! Aneb pravda občas bolí.</h1>
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
          <small>
            Podporujeme:{" "}
            <a href="https://www.volby-kscm.cz/">Komunisti z kola ven</a> a{" "}
            <a href="https://www.petletzpet.cz/">
              Největší přešlapy současného prezidenta
            </a>
          </small>
        </footer>
      </div>
    </>
  )
}

export default PageLayout
