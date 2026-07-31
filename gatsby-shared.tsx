import React from "react"
import { PageLayout } from "./src/components/page-layout"

// Shared by gatsby-browser and gatsby-ssr so the layout (and the <head> tags it
// renders via react-helmet) ends up in the static HTML, not just after hydration.
export const wrapPageElement = ({ element, props }) => {
  return <PageLayout {...props}>{element}</PageLayout>
}
