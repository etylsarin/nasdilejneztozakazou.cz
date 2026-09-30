import * as React from "react"
import { Link } from "gatsby"

import "../styles/global.scss"
import { AffiliateSourceContext, pathToSid } from "./affiliate-link"
import { RESOURCES } from "../data/resources"
import * as styles from "./layout.module.scss"

const NAV = [
  {
    to: "/",
    label: "Kauzy",
    isActive: (path: string) => path === "/" || path.startsWith("/kauzy/"),
  },
  {
    to: "/knihy/",
    label: "Knihy",
    isActive: (path: string) => path.startsWith("/knihy"),
  },
  {
    to: "/o-webu/",
    label: "O webu",
    isActive: (path: string) => path.startsWith("/o-webu"),
  },
]

export const Layout = ({ children, location }) => {
  const pathname = location?.pathname ?? "/"

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#obsah">
        Přeskočit na obsah
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.bar}`}>
          <Link to="/" className={styles.brand}>
            Sdílejte, než to zakážou!
          </Link>
          <nav aria-label="Hlavní navigace">
            <ul className={styles.nav}>
              {NAV.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={item.isActive(pathname) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="obsah" className={styles.main}>
        <AffiliateSourceContext.Provider value={pathToSid(pathname)}>
          {children}
        </AffiliateSourceContext.Provider>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p>
            <strong>Nic si nevymýšlíme.</strong> Každé tvrzení na tomto webu má
            odkaz na zdroj — soud, státní úřad nebo redakci, která nese právní
            odpovědnost za to, co publikuje. Našli jste chybu nebo je něco
            zastaralé?{" "}
            <a href="https://github.com/etylsarin/nasdilejneztozakazou.cz/issues">
              Dejte nám vědět
            </a>
            .
          </p>
          <p>
            Odkazy na knihy vedou do knihkupectví Knihy Dobrovský a jsou{" "}
            <Link to="/o-webu/#partnerske-odkazy">partnerské</Link>: když přes
            ně knihu koupíte, dostaneme malou provizi. Cena se pro vás nemění.
          </p>
          <p className={styles.support}>
            Důvěryhodné zdroje:{" "}
            {RESOURCES.map((item, index) => (
              <React.Fragment key={item.url}>
                {index > 0 && " · "}
                <a href={item.url}>{item.name}</a>
              </React.Fragment>
            ))}{" "}
            (<Link to="/o-webu/#overovani">co je co</Link>)
          </p>
          <p>
            Podporujeme:{" "}
            <a href="https://www.volby-kscm.cz/">Komunisti z kola ven</a> a{" "}
            <a href="https://www.petletzpet.cz/">
              Největší přešlapy bývalého prezidenta
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
