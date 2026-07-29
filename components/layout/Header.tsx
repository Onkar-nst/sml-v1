'use client'

import { useState } from 'react'

import { BROCHURE_URL, NAV_LINKS } from '@/data/site'
import { Download } from '@/components/ui/icons'
import styles from './Header.module.css'

/**
 * The header is the only piece of chrome that holds state — the mobile menu.
 * Everything else about it is static, which is why it is the sole client
 * component in the layout shell.
 */
export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.nav}>
      <div className={styles.topbar}>
        <div className="wrap">
          <span className={styles.region}>
            <b>India</b>
            <a href="https://sml-ltd.com.br/" target="_blank" rel="noopener">
              Brazil
            </a>
          </span>
          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener"
            className={styles.topbarCta}
          >
            <Download size={13} />
            Download Product Catalogue
          </a>
        </div>
      </div>

      <div className={styles.navbar}>
        <div className="wrap">
          <a href="#top" className={styles.logo} aria-label="SML Limited home">
            <img src="/sml-logo.svg" alt="SML Limited" />
          </a>

          <button
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="navLinks"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul
            id="navLinks"
            className={`${styles.links}${open ? ` ${styles.open}` : ''}`}
            onClick={() => setOpen(false)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <a href="#solutions" className={`btn ${styles.navCta}`}>
            Explore Products
          </a>
        </div>
      </div>
    </header>
  )
}
