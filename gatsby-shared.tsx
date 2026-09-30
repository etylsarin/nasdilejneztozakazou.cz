import React from "react"
import { Layout } from "./src/components/layout"

// Shared by gatsby-browser and gatsby-ssr so the header, navigation and footer
// are part of the static HTML, not just added after hydration. Per-page <head>
// tags live in each page's `Head` export (Gatsby Head API).
export const wrapPageElement = ({ element, props }) => {
  return <Layout location={props.location}>{element}</Layout>
}
