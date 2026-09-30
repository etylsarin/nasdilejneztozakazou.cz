// Knihy Dobrovský runs its partner program only through CJ (Commission
// Junction), managed for Czechia by VIVnetworks:
// https://www.knihydobrovsky.cz/spoluprace
// Sign-up: https://signup.cj.com/member/signup/publisher/?cid=4805198#/branded
//
// Until the site is approved in the program, book links point straight to the
// shop. After approval, fill in both IDs and redeploy:
//   CJ_PID – ID of this website in CJ (Account › Websites)
//   CJ_AID – Knihy Dobrovský's deep-link ID. Generate one link in
//            Links › Link tools › Deep Link Generator; it looks like
//            https://www.dpbolvw.net/click-<PID>-<AID>?url=…
export const CJ_PID: string = ""
export const CJ_AID: string = ""

// CJ has several interchangeable click domains; use the one from the
// generated link.
export const CJ_CLICK_HOST = "https://www.dpbolvw.net"

/**
 * @param url product page on knihydobrovsky.cz
 * @param sid where the click came from (shows up in CJ reports), max. 64 chars
 */
export const affiliateUrl = (url: string, sid?: string) => {
  if (!CJ_PID || !CJ_AID) return url
  const params = new URLSearchParams()
  if (sid) params.set("sid", sid.slice(0, 64))
  params.set("url", url)
  return `${CJ_CLICK_HOST}/click-${CJ_PID}-${CJ_AID}?${params}`
}

// Google asks for rel="sponsored" on paid links. No "noreferrer": affiliate
// networks use the referrer to check where a click came from.
export const AFFILIATE_REL = "sponsored noopener"

// Shows up in Google Analytics as an "affiliate_click" event with the book id,
// so clicks can be compared with the commission reports.
export const trackAffiliateClick = (bookId: string) => {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag
  gtag?.("event", "affiliate_click", { book_id: bookId })
}
