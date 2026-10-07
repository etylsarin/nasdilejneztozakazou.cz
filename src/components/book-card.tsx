import * as React from "react"
import { Link } from "gatsby"
import type { Book } from "../data/catalog"
import { AffiliateLink } from "./affiliate-link"
import { plural } from "../utils/format"
import * as styles from "./book-card.module.scss"

// Anthologies (Babišistán has 21 authors) would swamp the layout.
const authorsOf = (book: Book) => {
  const { authors } = book
  if (authors.length <= 3) return authors.join(", ")
  const rest = authors.length - 2
  const others = plural(rest, "další autor", "další autoři", "dalších autorů")
  return `${authors.slice(0, 2).join(", ")} a ${rest} ${others}`
}

// Typographic stand-in for the cover; real cover images would need the
// publisher's permission (or the partner program's product feed).
const Cover = ({ book }: { book: Book }) => (
  <div className={styles.cover} aria-hidden="true">
    <span className={styles.coverAuthor}>{authorsOf(book)}</span>
    <span className={styles.coverTitle}>{book.title}</span>
  </div>
)

type CaseLink = { slug: string; navTitle: string }

export const BookCard = ({
  book,
  cases = [],
  headingLevel = "h2",
}: {
  book: Book
  /** Case pages this book covers, in timeline order. */
  cases?: CaseLink[]
  headingLevel?: "h2" | "h3"
}) => {
  const Heading = headingLevel
  const meta = [
    authorsOf(book),
    book.year,
    book.publisher,
    book.format,
    book.pages ? `${book.pages} stran` : null,
  ].filter(Boolean)

  return (
    <article className={styles.card} id={book.id}>
      <AffiliateLink
        book={book}
        className={styles.coverLink}
        aria-hidden="true"
        tabIndex={-1}
      >
        <Cover book={book} />
      </AffiliateLink>
      <div className={styles.body}>
        <Heading className={styles.title}>
          <AffiliateLink book={book}>{book.title}</AffiliateLink>
        </Heading>
        {book.subtitle && <p className={styles.subtitle}>{book.subtitle}</p>}
        <p className={styles.meta}>{meta.join(" · ")}</p>
        <p>{book.description}</p>
        {cases.length > 0 && (
          <p className={styles.cases}>
            <strong>Kauzy v knize:</strong>{" "}
            {cases.map((item, index) => (
              <React.Fragment key={item.slug}>
                {index > 0 && ", "}
                <Link to={item.slug}>{item.navTitle}</Link>
              </React.Fragment>
            ))}
          </p>
        )}
        <AffiliateLink book={book} className="button">
          Koupit na Knihy Dobrovský
        </AffiliateLink>
      </div>
    </article>
  )
}

// Short version for the sidebar of a case page.
export const BookListItem = ({ book }: { book: Book }) => (
  <li className={styles.item}>
    <AffiliateLink book={book} className={styles.itemLink}>
      <Cover book={book} />
      <span>
        <cite className={styles.itemTitle}>{book.title}</cite>
        <span className={styles.itemMeta}>
          {authorsOf(book)}
          {book.year ? `, ${book.year}` : ""}
        </span>
      </span>
    </AffiliateLink>
  </li>
)

export default BookCard
