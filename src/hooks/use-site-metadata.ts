import { graphql, useStaticQuery } from "gatsby"

type SiteMetadata = {
  title: string
  description: string
  siteUrl: string
}

export const useSiteMetadata = (): SiteMetadata => {
  const { site } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)
  return {
    ...site.siteMetadata,
    // No trailing slash, so paths can be appended as-is.
    siteUrl: site.siteMetadata.siteUrl.replace(/\/$/, ""),
  }
}
