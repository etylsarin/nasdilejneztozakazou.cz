import * as React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

type SeoProps = {
  /** Page title without the site name; omitted on the homepage. */
  title?: string
  description?: string
  pathname: string
  /** Root-relative or absolute URL of the share image. */
  image?: string
  imageAlt?: string
  imageSize?: { width: number; height: number }
  type?: "website" | "article"
  noindex?: boolean
  /** Extra schema.org nodes, merged into one JSON-LD @graph. */
  schema?: object[]
  children?: React.ReactNode
}

export const HOME_TITLE =
  "Kauzy Andreje Babiše chronologicky: od StB po současnost"

// Gatsby emits every page as a directory, so canonical URLs end with a slash.
// A path that ends in a file extension (/404.html) must not.
const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname)
    ? pathname
    : `${pathname}/`

export const siteNodeIds = (siteUrl: string) => ({
  website: `${siteUrl}/#website`,
  organization: `${siteUrl}/#organization`,
  babis: `${siteUrl}/#andrej-babis`,
})

// The subject of every page, referenced from Article/CollectionPage nodes.
export const babisPersonNode = (siteUrl: string) => ({
  "@type": "Person",
  "@id": siteNodeIds(siteUrl).babis,
  name: "Andrej Babiš",
  sameAs: ["https://cs.wikipedia.org/wiki/Andrej_Babi%C5%A1"],
})

export const Seo = ({
  title,
  description,
  pathname,
  image,
  imageAlt,
  imageSize = { width: 400, height: 400 },
  type = "website",
  noindex = false,
  schema = [],
  children,
}: SeoProps) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)

  const fullTitle = title
    ? `${title} | ${site.title}`
    : `${HOME_TITLE} | ${site.title}`
  const desc = description || site.description
  const canonical = `${site.siteUrl}${withTrailingSlash(pathname)}`
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${site.siteUrl}${image}`
    : `${site.siteUrl}/og-image.jpg`

  const graph = [
    {
      "@type": "WebSite",
      "@id": ids.website,
      name: site.title,
      alternateName: ["Kauzy Andreje Babiše", "Sdílejte, než to zakážou"],
      url: `${site.siteUrl}/`,
      description: site.description,
      inLanguage: "cs-CZ",
      publisher: { "@id": ids.organization },
    },
    {
      "@type": "Organization",
      "@id": ids.organization,
      name: site.title,
      url: `${site.siteUrl}/`,
      logo: `${site.siteUrl}/icons/icon-512x512.png`,
    },
    ...schema,
  ]

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {/* Google ignores rel=canonical on a noindex page and warns about the
          combination, so the two are kept mutually exclusive. */}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <>
          <link rel="canonical" href={canonical} />
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1"
          />
        </>
      )}
      <meta property="og:site_name" content={site.title} />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || HOME_TITLE} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(imageSize.width)} />
      <meta property="og:image:height" content={String(imageSize.height)} />
      <meta property="og:image:alt" content={imageAlt || title || HOME_TITLE} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title || HOME_TITLE} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
      {!noindex && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
          })}
        </script>
      )}
      {children}
    </>
  )
}

export default Seo
