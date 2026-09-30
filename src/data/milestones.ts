import type { EraId } from "./eras"

// Context points on the homepage timeline between the cases. Same rule as
// everywhere else on the site: every milestone links to its source.
export type Milestone = {
  date: string // ISO, used for ordering within the era
  era: EraId
  text: string
  source: string
}

export const MILESTONES: Milestone[] = [
  {
    date: "1954-09-02",
    era: "komunismus",
    text: "Andrej Babiš se narodil v Bratislavě.",
    source:
      "https://ct24.ceskatelevize.cz/clanek/domaci/do-politiky-nechtel-stal-se-ministrem-prezil-capi-hnizdo-i-dluhopisy-a-zamiril-na-premiersky-post-87186",
  },
  {
    date: "1991-01-01",
    era: "podnikani",
    text: "Babiš se vrátil z Maroka do bratislavského Petrimexu jako ředitel obchodní skupiny.",
    source:
      "https://vlada.gov.cz/cz/clenove-vlady/historie-minulych-vlad/prehled-vlad-cr/1993-2016-cr/bohuslav_sobotka/andrej-babis-115388/",
  },
  {
    date: "1999-01-01",
    era: "podnikani",
    text: "Petrimex, z něhož Agrofert vzešel, zbankrotoval.",
    source:
      "https://www.respekt.cz/respekt-in-english/the-richest-czech-keeps-a-secret",
  },
  {
    date: "2003-01-01",
    era: "podnikani",
    text: "Babiš ovládá celý Agrofert: 90 % akcií drží sám, zbylých 10 % jeho firma Agroter.",
    source:
      "https://ct24.ceskatelevize.cz/clanek/domaci/v-kase-osm-milionu-babisova-koupe-45-procent-agrofertu-budi-pochyby-99395",
  },
  {
    date: "2011-01-01",
    era: "nastup",
    text: "Vzniklo hnutí ANO, jehož šéfem je Andrej Babiš.",
    source:
      "https://www.seznamzpravy.cz/clanek/babis-pouzil-kalouskuv-danovy-trik-aby-usetril-desitky-milionu-3932",
  },
  {
    date: "2013-10-26",
    era: "nastup",
    text: "ANO 2011 ve sněmovních volbách získalo 18,65 % a skončilo druhé za ČSSD.",
    source: "https://volby.gov.cz/pls/ps2013/ps2?xjazyk=CZ",
  },
  {
    date: "2014-01-29",
    era: "nastup",
    text: "Babiš se stal ministrem financí ve vládě Bohuslava Sobotky.",
    source:
      "https://mf.gov.cz/cs/ministerstvo/zakladni-informace/historie-ministerstva/ministri-v-historii",
  },
  {
    date: "2017-10-21",
    era: "nastup",
    text: "ANO vyhrálo sněmovní volby se ziskem 29,64 % hlasů.",
    source: "https://volby.gov.cz/pls/ps2017nss/ps2?xjazyk=CZ",
  },
  {
    date: "2017-12-06",
    era: "vlada-1",
    text: "Prezident Miloš Zeman jmenoval Andreje Babiše poprvé premiérem.",
    source:
      "https://zpravy.aktualne.cz/domaci/primy-prenos-babis-miri-na-hrad-zeman-ho-jmenuje-premierem/r~e821ac66da7911e7afac0cc47ab5f122/",
  },
  {
    date: "2018-01-16",
    era: "vlada-1",
    text: "První, menšinová vláda ANO nezískala důvěru Sněmovny (78 pro, 117 proti).",
    source: "https://www.psp.cz/sqw/hlasy.sqw?g=67263",
  },
  {
    date: "2018-07-12",
    era: "vlada-1",
    text: "Druhá vláda ANO a ČSSD získala důvěru 105 hlasy, pro hlasovali i poslanci KSČM.",
    source: "https://www.psp.cz/sqw/hlasy.sqw?g=68040",
  },
  {
    date: "2021-10-09",
    era: "vlada-1",
    text: "ANO prohrálo sněmovní volby: 27,12 % proti 27,79 % koalice Spolu.",
    source: "https://volby.gov.cz/pls/ps2021/ps2?xjazyk=CZ",
  },
  {
    date: "2021-11-11",
    era: "vlada-1",
    text: "Babišova vláda podala demisi, prezident Zeman ji týž den přijal.",
    source:
      "https://www.seznamzpravy.cz/clanek/babisova-vlada-podala-demisi-180194",
  },
  {
    date: "2025-10-04",
    era: "opozice",
    text: "ANO vyhrálo sněmovní volby se ziskem 34,51 % hlasů a 80 mandátů.",
    source: "https://volby.gov.cz/app/ps2025/cs/results",
  },
  {
    date: "2025-12-09",
    era: "vlada-2",
    text: "Prezident Petr Pavel jmenoval Andreje Babiše znovu premiérem.",
    source:
      "https://ct24.ceskatelevize.cz/clanek/domaci/prezident-jmenuje-babise-predsedou-vlady-368061",
  },
  {
    date: "2026-01-15",
    era: "vlada-2",
    text: "Vláda ANO, SPD a Motoristů získala důvěru Sněmovny poměrem 108:91.",
    source: "https://www.psp.cz/zprava/21547",
  },
]
