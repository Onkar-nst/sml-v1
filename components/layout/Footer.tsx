import { CONTACT, FOOTER_COLUMNS, SOCIALS } from '@/data/site'
import { Facebook, Instagram, LinkedIn, YouTube } from '@/components/ui/icons'
import CurrentYear from '@/components/ui/CurrentYear'
import styles from './Footer.module.css'

const SOCIAL_ICONS = {
  facebook: Facebook,
  linkedin: LinkedIn,
  youtube: YouTube,
  instagram: Instagram,
} as const

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src="/sml-logo.svg" alt="SML Limited" className={styles.logo} />
            <p>
              Formerly Sulphur Mills Limited. An organisation driven by research, creating advanced
              solutions for soil health, nutrition, biologicals and crop protection since 1971.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon]
                return (
                  <a key={label} href={href} aria-label={label}>
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4>{column.heading}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>Contact Us</h4>
            <address>
              {CONTACT.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <br />
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </address>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            Copyright © <CurrentYear /> SML Limited (Formerly Sulphur Mills Limited).
          </span>
          <span>Serving 80+ countries</span>
        </div>
      </div>
    </footer>
  )
}
