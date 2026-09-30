# nasdilejneztozakazou.cz

Statický web, který **chronologicky mapuje kauzy Andreje Babiše** — od členství v KSČ a evidence u StB přes Petrimex, vznik Agrofertu a Čapí hnízdo až po obě premiérská období (2017–2021 a od prosince 2025). Každá kauza má vlastní podstránku, k tématu jsou doporučené knihy s partnerskými odkazy do Knih Dobrovský.

Web běží na [Gatsby](https://www.gatsbyjs.com/) a je nasazený na GitHub Pages (doména v [static/CNAME](./static/CNAME), aby ji každé nasazení zachovalo).

## Pravidla pro obsah

1. **Každé faktické tvrzení musí mít odkaz na zdroj.** Nic si nevymýšlíme.
2. Preferované zdroje: soudy, státní úřady (ČSÚ, MF ČR, PSP ČR, volby.gov.cz), Evropská komise, Transparency International a redakce s právní odpovědností (ČT24, iROZHLAS, ČTK / České noviny, Seznam Zprávy, Deník N). Wikipedie není zdroj.
3. **Presumpce neviny.** Dokud soud pravomocně nerozhodne, píšeme o podezření/obvinění a uvádíme, kdo ho vznesl. U každé kauzy je i Babišovo stanovisko.
4. Pokud se právní stav kauzy změní, **stránka se aktualizuje** — včetně případů, kdy nový vývoj vyznívá ve prospěch popisované osoby. Při každé změně se posune pole `updated`.
5. Odkazy je potřeba občas prověřit; některé zdroje mizí.

## Struktura

| Cesta                                                | Co obsahuje                                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [src/kauzy/](./src/kauzy/)                           | **Jedna kauza = jeden soubor MDX.** Název souboru je zároveň URL: `capi-hnizdo.mdx` → `/kauzy/capi-hnizdo/` |
| [src/templates/kauza.tsx](./src/templates/kauza.tsx) | Šablona stránky kauzy (nadpis, stav, obrázek, knihy k tématu, předchozí/další kauza, strukturovaná data)    |
| [src/pages/](./src/pages/)                           | Úvodní stránka s časovou osou, `/knihy/`, `/o-webu/` a 404                                                  |
| [src/data/books.json](./src/data/books.json)         | Knihy o Babišovi (odkaz do Knih Dobrovský, popis, `topics` = kauzy, kterým se kniha věnuje)                 |
| [src/data/affiliate.ts](./src/data/affiliate.ts)     | **Nastavení partnerského programu** Knih Dobrovský — šablona partnerského odkazu                            |
| [src/data/eras.ts](./src/data/eras.ts)               | Období časové osy (`komunismus`, `podnikani`, `nastup`, `vlada-1`, `opozice`, `vlada-2`)                    |
| [src/data/milestones.ts](./src/data/milestones.ts)   | Milníky na časové ose mezi kauzami (volby, jmenování…), každý se zdrojem                                    |
| [src/components/](./src/components/)                 | Layout, SEO (`<head>`, JSON-LD), karty knih, komponenty dostupné v MDX                                      |
| [src/images/](./src/images/)                         | Obrázky ke kauzám (400×400, černobílé)                                                                      |
| [static/](./static/)                                 | Soubory servírované beze změny: `og-image.jpg`, `robots.txt`                                                |
| [gatsby-node.js](./gatsby-node.js)                   | Generuje stránky kauz seřazené podle `date` a typy frontmatteru                                             |

### Nová kauza

Vytvořte `src/kauzy/<slug>.mdx` (slug bez diakritiky, s pomlčkami):

```mdx
---
title: "Čapí hnízdo: dotační kauza Andreje Babiše" # H1 a <title>, max. ~60 znaků
navTitle: "Čapí hnízdo" # krátký název do časové osy a navigace
description: "…" # meta description, 120–160 znaků
date: "2007-12-01" # začátek kauzy, určuje pořadí na časové ose
period: "2007–dosud"
era: "podnikani" # viz src/data/eras.ts
status: "open" # open | closed
statusText: "Stíhání zastaveno imunitou"
image: "../images/centrala-holdingu-agrofert.jpg" # volitelné
imageAlt: "Centrála holdingu Agrofert"
imageCredit: "Richenza" # autor – u fotek z Wikimedia Commons povinné
imageLicense: "CC BY-SA 3.0"
imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0"
imageSource: "https://commons.wikimedia.org/wiki/File:…"
books: ["babisovo-palermo-i"] # id z src/data/books.json
related: ["syn-na-krymu", "benesova-a-letna"] # „Související kauzy“ v postranním panelu
updated: "2026-09-30"
---

Úvodní odstavec — ten se zobrazí nejvýrazněji a čte ho i Google.

## Nadpisy jen úrovně H2/H3

Text s [odkazem na zdroj](https://…) a odkazem na knihu <BookLink id="boss-babis" />.

## Zdroje

- [Titulek článku](https://…) — ČT24, 1. 1. 2026
```

- Odkaz na jinou kauzu: `[Čapí hnízdo](/kauzy/capi-hnizdo/)`.
- `<BookLink id="…" />` vypíše název knihy jako partnerský odkaz; `<BookLink id="…">vlastní text</BookLink>` použije vlastní text. Neznámé `id` shodí build.
- V MDX nepoužívejte HTML komentáře ani samotné znaky `{`, `}`, `<`.

### Obrázky

Každá kauza má vlastní ilustraci: čtverec **400×400 px, černobílý** (web ho zobrazuje s černým stínem, na úvodní stránce jako náhled v časové ose). Nové fotky bereme z [Wikimedia Commons](https://commons.wikimedia.org/) jen s licencí CC0, volné dílo, CC BY nebo CC BY-SA a vyplníme `imageCredit`, `imageLicense`, `imageLicenseUrl` a `imageSource` – pod obrázkem se z nich složí povinný popisek autora a licence. Výjimkou je produktová fotka z webu výrobce (`imageCredit` + `imageSource` bez licence), kterou používáme jako ilustraci výrobku, o kterém kauza je. Úprava na čtverec a do černobílé:

```shell
node -e 'require("sharp")("vstup.jpg").resize(400,400,{fit:"cover",position:"attention"}).grayscale().jpeg({quality:82,mozjpeg:true}).toFile("src/images/nazev.jpg")'
```

## Partnerský program Knih Dobrovský

Knihy Dobrovský provozují partnerský program výhradně přes síť **CJ (Commission Junction)**, kterou v Česku zastupuje VIVnetworks ([podmínky](https://www.knihydobrovsky.cz/spoluprace), [registrace](https://signup.cj.com/member/signup/publisher/?cid=4805198#/branded)). Podmínkou je IČO (OSVČ nebo firma); zakázaná je mj. PPC reklama včetně bidování na značku.

Všechny odkazy na knihy se skládají v [src/data/affiliate.ts](./src/data/affiliate.ts). Dokud jsou `CJ_PID` a `CJ_AID` prázdné, vedou odkazy přímo do obchodu. Po schválení v programu:

1. `CJ_PID` = ID webu v CJ (Account › Websites).
2. V CJ vygenerujte jeden odkaz v Links › Link tools › Deep Link Generator — má tvar `https://www.dpbolvw.net/click-<PID>-<AID>?url=…`. Hodnotu `<AID>` vložte do `CJ_AID` (a případně upravte `CJ_CLICK_HOST`, pokud generátor použije jinou doménu).
3. `yarn deploy`, pak proklikněte jeden odkaz a ověřte klik v reportech CJ.

Každý odkaz nese v parametru `sid` stránku, ze které klik přišel (`kauzy-capi-hnizdo`, `knihy`, `uvod`…), takže v reportech CJ je vidět, které kauzy knihy prodávají. Odkazy mají `rel="sponsored"`, kliky se v Google Analytics zaznamenávají jako událost `affiliate_click` a web na partnerské odkazy upozorňuje v patičce, u knih a na stránce [/o-webu/](./src/pages/o-webu.tsx).

## SEO

- Každá stránka má vlastní `<title>`, meta description, canonical, Open Graph a Twitter tagy ([src/components/seo.tsx](./src/components/seo.tsx), Gatsby Head API).
- Strukturovaná data JSON-LD: `WebSite` + `Organization` všude, `Article` + `BreadcrumbList` u kauz, `ItemList` kauz na úvodní stránce a `Book` na stránce knih.
- `sitemap-index.xml` s `lastmod` podle pole `updated`; 404 a stránka z `gatsby-plugin-offline` mají `noindex`.
- Jedno `<h1>` na stránku, drobečková navigace, odkazy na předchozí/další kauzu a mezi kauzami navzájem.

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
