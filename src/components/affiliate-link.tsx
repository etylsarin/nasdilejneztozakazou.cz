import * as React from "react"
import type { Book } from "../data/catalog"
import {
  AFFILIATE_REL,
  affiliateUrl,
  trackAffiliateClick,
} from "../data/affiliate"

// The page a book link sits on, sent to CJ as "sid" so the commission reports
// show which case pages sell books. Provided by the layout.
export const AffiliateSourceContext = React.createContext("web")

// "/kauzy/capi-hnizdo/" → "kauzy-capi-hnizdo", "/" → "uvod"
export const pathToSid = (pathname: string) =>
  pathname.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "uvod"

type AffiliateLinkProps = {
  book: Book
  className?: string
  children: React.ReactNode
}

export const AffiliateLink = ({
  book,
  className,
  children,
}: AffiliateLinkProps) => {
  const sid = React.useContext(AffiliateSourceContext)
  return (
    <a
      href={affiliateUrl(book.url, sid)}
      rel={AFFILIATE_REL}
      target="_blank"
      className={className}
      onClick={() => trackAffiliateClick(book.id)}
    >
      {children}
    </a>
  )
}
