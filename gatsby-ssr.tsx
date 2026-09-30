import React from "react"

export { wrapPageElement } from "./gatsby-shared"

// gatsby-plugin-offline emits this page as an empty copy of the page shell.
// It has no Head of its own, so it's marked noindex here; robots.txt also
// disallows it.
const NOINDEX_PATHS = ["/offline-plugin-app-shell-fallback/"]

export const onRenderBody = ({
  pathname,
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: "cs" })
  if (NOINDEX_PATHS.includes(pathname)) {
    setHeadComponents([
      <meta key="robots" name="robots" content="noindex, follow" />,
    ])
  }
}
