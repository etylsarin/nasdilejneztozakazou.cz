import * as React from "react"
import { Link } from "gatsby"
import { bookById } from "../data/catalog"
import { AffiliateLink } from "./affiliate-link"

type BookLinkProps = {
  id: string
  children?: React.ReactNode
  className?: string
}

// Affiliate link to a book on Knihy Dobrovský. Usable directly in case MDX:
// <BookLink id="boss-babis" /> renders the book title as the link text.
export const BookLink = ({ id, children, className }: BookLinkProps) => {
  const book = bookById(id)
  if (!book) {
    // Fail the build on a typo instead of shipping a dead link.
    throw new Error(`BookLink: neznámá kniha "${id}" (viz src/data/books.json)`)
  }
  return (
    <AffiliateLink book={book} className={className}>
      {children ?? <cite>{book.title}</cite>}
    </AffiliateLink>
  )
}

// Internal links become Gatsby <Link>s (prefetching, no full reload); sources
// open in a new tab so readers don't lose their place.
const SmartLink = ({
  href = "",
  children,
  ...rest
}: React.ComponentProps<"a">) => {
  if (href.startsWith("/")) {
    return (
      <Link to={href} {...(rest as object)}>
        {children}
      </Link>
    )
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  )
}

export const mdxComponents = {
  a: SmartLink,
  BookLink,
}
