const fs = require("fs")
const path = require("path")

const CASE_TEMPLATE = path.resolve("./src/templates/kauza.tsx")

// Explicit types so a missing optional field in one case file (e.g. `image`)
// doesn't change the inferred schema for all of them.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }
    type MdxFields {
      slug: String
    }
    type MdxFrontmatter {
      title: String
      navTitle: String
      description: String
      date: Date @dateformat
      period: String
      era: String
      status: String
      statusText: String
      image: File @fileByRelativePath
      imageAlt: String
      imageCredit: String
      imageLicense: String
      imageLicenseUrl: String
      imageSource: String
      books: [String]
      related: [String]
      published: Date @dateformat
      updated: Date @dateformat
    }
  `)
}

// Only case files get a slug; that is also how queries tell them apart from
// other MDX in the project.
exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== "Mdx") return
  const file = getNode(node.parent)
  if (file?.sourceInstanceName !== "kauzy") return
  actions.createNodeField({
    node,
    name: "slug",
    value: `/kauzy/${file.name}/`,
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      allMdx(
        filter: { fields: { slug: { ne: null } } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            navTitle
            period
            status
            related
            updated(formatString: "YYYY-MM-DD")
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Nepodařilo se načíst kauzy", result.errors)
    return
  }

  const cases = result.data.allMdx.nodes
  const link = node =>
    node
      ? {
          slug: node.fields.slug,
          navTitle: node.frontmatter.navTitle,
          period: node.frontmatter.period,
          status: node.frontmatter.status,
        }
      : null
  const bySlug = new Map(cases.map(node => [node.fields.slug, node]))
  const related = node =>
    (node.frontmatter.related ?? [])
      .map(name => {
        const target = bySlug.get(`/kauzy/${name}/`)
        if (!target) {
          reporter.panicOnBuild(
            `${node.fields.slug}: neznámá související kauza "${name}"`,
          )
        }
        return link(target)
      })
      .filter(Boolean)

  cases.forEach((node, index) => {
    actions.createPage({
      path: node.fields.slug,
      component: `${CASE_TEMPLATE}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        prev: link(cases[index - 1]),
        next: link(cases[index + 1]),
        related: related(node),
        // Read by gatsby-plugin-sitemap for <lastmod>.
        updated: node.frontmatter.updated,
      },
    })
  })
}

/**
 * React's SSR stream occasionally emits a stray NUL byte at a chunk boundary
 * that lands inside a multi-byte UTF-8 character. It corrupts the rendered
 * text (e.g. "místopředseda" -> "místop\0ředseda") and makes the file serve as
 * binary data rather than HTML. Strip those bytes from the generated pages.
 */
exports.onPostBuild = ({ reporter }) => {
  const publicDir = path.join(__dirname, "public")
  const cleaned = []

  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith(".html")) {
        const buf = fs.readFileSync(full)
        if (buf.includes(0)) {
          fs.writeFileSync(full, Buffer.from(buf.filter(byte => byte !== 0)))
          cleaned.push(path.relative(publicDir, full))
        }
      }
    }
  }

  walk(publicDir)

  if (cleaned.length) {
    reporter.warn(
      `Stripped stray NUL bytes from ${cleaned.length} HTML file(s): ${cleaned.join(", ")}`
    )
  }
}
