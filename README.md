# nasdilejneztozakazou.cz

Statický web shrnující **doložitelná fakta o působení Andreje Babiše v čele české vlády** — obě premiérská období (2017–2021 a od prosince 2025) a jeho největší kauzy.

Web běží na [Gatsby](https://www.gatsbyjs.com/) a je nasazený na GitHub Pages (viz [CNAME](./CNAME)).

## Pravidla pro obsah

1. **Každé faktické tvrzení musí mít odkaz na zdroj.** Nic si nevymýšlíme.
2. Preferované zdroje: soudy, státní úřady (ČSÚ, MF ČR, PSP ČR, volby.gov.cz), Evropská komise, Transparency International a redakce s právní odpovědností (ČT24, iROZHLAS, ČTK / České noviny, Seznam Zprávy, Deník N).
3. Pokud se právní stav kauzy změní, **kapitola se aktualizuje** — včetně případů, kdy nový vývoj vyznívá ve prospěch popisované osoby.
4. Odkazy je potřeba občas prověřit; některé zdroje mizí.

## Struktura

| Cesta                                              | Co obsahuje                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [src/sections/](./src/sections/)                   | Jednotlivé kapitoly jako MDX (`chapter-01.mdx` … `chapter-13.mdx`)                                                              |
| [src/sections/index.tsx](./src/sections/index.tsx) | Pořadí kapitol na stránce — **novou kapitolu je nutné přidat sem**                                                              |
| [src/components/](./src/components/)               | Layout stránky a sekcí + SCSS moduly                                                                                            |
| [src/pages/](./src/pages/)                         | Úvodní stránka a 404                                                                                                            |
| [src/images/](./src/images/)                       | Obrázky ke kapitolám (400×400, černobílé)                                                                                       |
| [static/](./static/)                               | Soubory servírované beze změny, např. `og-image.jpg`                                                                            |
| [gatsby-shared.tsx](./gatsby-shared.tsx)           | `wrapPageElement` — reexportovaný z `gatsby-browser` i `gatsby-ssr`, aby se layout a `<head>` tagy dostaly i do statického HTML |

Kapitoly se střídavě zarovnávají vlevo/vpravo podle pořadí, takže **je lepší nedávat stejný obrázek do dvou sousedních kapitol**.

## Vývoj

```shell
yarn install
yarn develop   # http://localhost:8000
yarn build     # produkční build do public/
yarn serve     # náhled produkčního buildu
yarn deploy    # build + publikace na gh-pages
yarn format    # prettier
```

## Licence

Viz [LICENSE](./LICENSE).
