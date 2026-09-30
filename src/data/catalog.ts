import booksJson from "./books.json"

export type Book = {
  id: string
  title: string
  subtitle: string | null
  authors: string[]
  year: number | null
  publisher: string | null
  format: "kniha" | "e-kniha"
  pages: number | null
  isbn: string | null
  url: string
  description: string
  topics: string[]
}

export const BOOKS = booksJson as Book[]

export const bookById = (id: string) => BOOKS.find(book => book.id === id)
