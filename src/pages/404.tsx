import * as React from "react"
import { Link } from "gatsby"

import { Seo } from "../components/seo"
import * as styles from "../styles/page.module.scss"

const NotFoundPage = () => (
  <div className="container">
    <header className={styles.header}>
      <h1 className={styles.h1}>
        <span className="stamp">Stránka nenalezena</span>
      </h1>
      <p className={styles.lead}>
        Omlouváme se, ale požadovaná stránka neexistuje. Možná jste přišli přes
        starý odkaz — web jsme předělali a každá kauza má teď vlastní stránku.
      </p>
      <p>
        <Link to="/" className="button">
          Přehled všech kauz
        </Link>
      </p>
    </header>
  </div>
)

export default NotFoundPage

export const Head = ({ location }) => (
  <Seo title="Stránka nenalezena" pathname={location.pathname} noindex />
)
