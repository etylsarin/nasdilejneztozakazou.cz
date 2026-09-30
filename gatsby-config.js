const pkg = require("./package.json")
const DESC =
  "Všechny kauzy Andreje Babiše chronologicky: od členství v KSČ a evidence u StB přes Petrimex, Agrofert a Čapí hnízdo až po střet zájmů. U každého tvrzení je zdroj."

module.exports = {
  siteMetadata: {
    title: pkg.description,
    description: DESC,
    author: pkg.author,
    siteUrl: pkg.homepage,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Kauzy Andreje Babiše | ${pkg.description}`,
        short_name: "Kauzy Babiše",
        description: DESC,
        lang: "cs",
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
        display: `standalone`,
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: false,
        ref: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `./src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `./src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "kauzy",
        path: `./src/kauzy/`,
      },
      __key: "kauzy",
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Build artifacts that must not be advertised to crawlers.
        excludes: ["/404/", "/404.html", "/offline-plugin-app-shell-fallback/"],
        query: `
          {
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => pkg.homepage.replace(/\/$/, ""),
        // Case pages carry their `updated` date in the page context (see
        // gatsby-node.js), which gives Google a real lastmod to work with.
        serialize: ({ path, pageContext }) => ({
          url: path,
          ...(pageContext?.updated ? { lastmod: pageContext.updated } : {}),
        }),
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 550,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-X7HDM7FXRF"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
}
