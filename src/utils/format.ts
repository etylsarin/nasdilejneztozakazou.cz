const LONG_DATE = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

// "2026-09-30" → "30. září 2026". Noon UTC keeps the day stable in any
// timezone the build or the browser happens to run in.
export const formatDate = (isoDate: string) =>
  LONG_DATE.format(new Date(`${isoDate}T12:00:00Z`))

// Czech plural forms: 1 kauza, 2–4 kauzy, 5+ kauz.
export const plural = (
  count: number,
  one: string,
  few: string,
  many: string,
) => (count === 1 ? one : count >= 2 && count <= 4 ? few : many)
