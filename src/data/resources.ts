// Outside resources the site recommends to readers (homepage, /o-webu/ and
// footer). These are recommendations, not citations: case pages still cite
// primary sources and newsrooms directly.
export type Resource = {
  name: string
  url: string
  description: string
}

export type ResourceGroup = {
  title: string
  items: Resource[]
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    title: "Korupce a kauzy",
    items: [
      {
        name: "Transparency International ČR",
        url: "https://www.transparency.cz/",
        description:
          "Protikorupční organizace, která mapuje korupci v Česku, připomínkuje zákony a poskytuje bezplatnou právní pomoc.",
      },
      {
        name: "Kauzy vlády (Štít demokracie)",
        url: "https://kauzyvlady.cz/",
        description:
          "Přehled kauz současné koalice Andreje Babiše rozdělený podle témat, u každé s odkazy na zdroje.",
      },
    ],
  },
  {
    title: "Ověřování a dezinformace",
    items: [
      {
        name: "Demagog.cz",
        url: "https://demagog.cz/",
        description: "Ověřuje pravdivost výroků politiků.",
      },
      {
        name: "Čeští elfové",
        url: "https://cesti-elfove.cz/",
        description:
          "Dobrovolníci, kteří sledují dezinformační kampaně na českém internetu a vydávají pravidelné přehledy.",
      },
      {
        name: "Manipulátoři.cz",
        url: "https://manipulatori.cz/",
        description: "Upozorňuje na manipulace, lži a propagandu.",
      },
      {
        name: "Hoax.cz",
        url: "https://hoax.cz/cze/",
        description: "Databáze řetězových e-mailů, hoaxů a poplašných zpráv.",
      },
    ],
  },
  {
    title: "Historie",
    items: [
      {
        name: "Paměť národa",
        url: "https://www.pametnaroda.cz/",
        description:
          "Archiv vzpomínek pamětníků 20. století včetně doby komunismu, který spravují Post Bellum, Český rozhlas a Ústav pro studium totalitních režimů.",
      },
    ],
  },
]

export const RESOURCES = RESOURCE_GROUPS.flatMap(group => group.items)
