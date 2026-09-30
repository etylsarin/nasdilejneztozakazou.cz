import * as React from "react"
import { Link } from "gatsby"

import { Seo, siteNodeIds } from "../components/seo"
import { ResourceList } from "../components/resource-list"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import * as styles from "../styles/page.module.scss"

const TITLE = "O webu: jak vzniká přehled kauz Andreje Babiše"
const DESCRIPTION =
  "Podle jakých pravidel vzniká přehled kauz Andreje Babiše, odkud bereme informace, jak kauzy aktualizujeme a jak fungují partnerské odkazy na knihy."

const AboutPage = () => (
  <div className="container">
    <header className={styles.header}>
      <p className="kicker">O webu</p>
      <h1 className={styles.h1}>
        <span className="stamp">Jak tenhle web vzniká</span>
      </h1>
      <p className={styles.lead}>
        Chceme na jednom místě a v časovém pořadí ukázat všechny kauzy Andreje
        Babiše — od komunistické kariéry po současnost. Bez domněnek a bez
        vymýšlení: jen to, co se dá doložit.
      </p>
    </header>

    <div className={`prose ${styles.body}`}>
      <h2 id="pravidla">Pravidla, podle kterých píšeme</h2>
      <ol>
        <li>
          <strong>Každé faktické tvrzení má odkaz na zdroj.</strong> Co nejde
          doložit, na web nepatří.
        </li>
        <li>
          Vycházíme ze soudů, státních úřadů (ČSÚ, ministerstva, Poslanecká
          sněmovna, volby.gov.cz), Evropské komise, Transparency International a
          z redakcí, které nesou právní odpovědnost za to, co publikují —
          například ČT24, iROZHLAS, ČTK, Seznam Zprávy nebo Deník N.
        </li>
        <li>
          <strong>Platí presumpce neviny.</strong> Dokud soud pravomocně
          nerozhodne, píšeme o podezření nebo obvinění a uvádíme, kdo je vznesl.
          U každé kauzy najdete i to, jak se k ní staví sám Andrej Babiš.
        </li>
        <li>
          Když se stav kauzy změní, <strong>stránku aktualizujeme</strong> — i
          když nový vývoj vyznívá v Babišův prospěch. Datum poslední aktualizace
          je u každé kauzy nahoře.
        </li>
      </ol>

      <h2 id="jak-cist">Jak web číst</h2>
      <p>
        <Link to="/">Časová osa na úvodní stránce</Link> řadí kauzy podle toho,
        kdy začaly. Každá má vlastní stránku se shrnutím, odkazy na zdroje v
        textu a jejich úplným seznamem na konci. Štítek{" "}
        <span className="status status--open">Otevřená</span> znamená, že kauza
        dosud neskončila (běží řízení, čeká se na rozhodnutí),{" "}
        <span className="status status--closed">Uzavřená</span> že je u konce —
        což neznamená, že skončila odsouzením.
      </p>

      <h2 id="partnerske-odkazy">Partnerské odkazy na knihy</h2>
      <p>
        Odkazy na <Link to="/knihy/">knihy o Andreji Babišovi</Link> vedou do
        internetového knihkupectví Knihy Dobrovský a jsou{" "}
        <strong>partnerské (affiliate)</strong>. Když přes ně knihu koupíte,
        knihkupectví nám zaplatí malou provizi z ceny. Pro vás se cena nijak
        nemění.
      </p>
      <p>
        Provize pokrývají provoz webu. Na obsah nemají žádný vliv: knihy jsme
        vybrali proto, že se Babišovým kauzám věnují, a o kauzách píšeme stejně
        bez ohledu na to, jestli k nim nějaká kniha existuje. Partnerské odkazy
        jsou v kódu stránky označené atributem <code>rel="sponsored"</code>.
      </p>

      <h2 id="overovani">Důvěryhodné zdroje: ověřujte si všechno — i nás</h2>
      <p>
        Než něco nasdílíte, ověřte si to. Tyhle weby doporučujeme pro ověřování
        informací i pro další čtení o kauzách a korupci. Nejsou to zdroje, na
        které odkazujeme u jednotlivých kauz – tam citujeme přímo soudy, úřady a
        redakce. A platí to i pro tenhle web: klikejte na odkazy a čtěte původní
        zdroje.
      </p>
      <ResourceList />

      <h2 id="chyby">Našli jste chybu?</h2>
      <p>
        Zdroje občas zmizí nebo se kauza posune dál, než stihneme zapsat. Pokud
        narazíte na nefunkční odkaz, zastaralou informaci nebo chybu,{" "}
        <a href="https://github.com/etylsarin/nasdilejneztozakazou.cz/issues">
          napište nám na GitHub
        </a>
        . Opravíme to — s odkazem na zdroj.
      </p>
    </div>
  </div>
)

export default AboutPage

export const Head = ({ location }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const url = `${site.siteUrl}/o-webu/`

  return (
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      pathname={location.pathname}
      schema={[
        {
          "@type": "AboutPage",
          "@id": `${url}#webpage`,
          url,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: "cs-CZ",
          isPartOf: { "@id": ids.website },
        },
      ]}
    />
  )
}
