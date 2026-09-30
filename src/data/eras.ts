// Order matters: the homepage timeline renders eras in this order. Every case
// file's `era` frontmatter field must be one of these ids.
export const ERAS = [
  { id: "komunismus", label: "Komunistická kariéra", period: "1954–1989" },
  { id: "podnikani", label: "Petrimex a Agrofert", period: "1989–2011" },
  { id: "nastup", label: "Nástup do politiky", period: "2011–2017" },
  { id: "vlada-1", label: "Premiérem poprvé", period: "2017–2021" },
  { id: "opozice", label: "V opozici", period: "2021–2025" },
  { id: "vlada-2", label: "Premiérem podruhé", period: "od 2025" },
] as const

export type EraId = (typeof ERAS)[number]["id"]

export const eraById = (id: string) => ERAS.find(era => era.id === id)

export const STATUS_LABELS: Record<string, string> = {
  open: "Otevřená",
  closed: "Uzavřená",
}
