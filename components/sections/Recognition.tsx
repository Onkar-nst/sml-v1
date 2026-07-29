import { AWARDS, CERTIFICATIONS } from '@/data/site'
import { Check } from '@/components/ui/icons'
import { vars } from '@/lib/css'
import styles from './Recognition.module.css'

/**
 * Not currently rendered — see the commented-out `<Recognition />` in
 * app/page.tsx. The content is approved and ready; uncomment the one line to
 * bring it back, along with the #trust links in NAV_LINKS and FOOTER_COLUMNS.
 */
export default function Recognition() {
  return (
    <section id="trust">
      <div className="wrap">
        <div className="section-head center" data-reveal>
          <span className="eyebrow">Recognition &amp; Accreditation</span>
          <h2 data-reveal="blur">Independently recognised</h2>
          <p>Our work is validated by industry bodies and backed by accredited laboratories.</p>
        </div>

        <div className={styles.grid}>
          <div data-reveal>
            <ul className={styles.awards}>
              {AWARDS.map((award) => (
                <li className={styles.award} key={`${award.year}-${award.title}`}>
                  <span className={styles.year}>{award.year}</span>
                  <div>
                    <b>{award.title}</b>
                    <span>{award.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.certCard} data-reveal style={vars({ '--d': '120ms' })}>
            <h3>Accreditation &amp; compliance</h3>
            <p>Regulatory data generated in our own laboratories, to the standards each market demands.</p>
            <ul className={styles.certList}>
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.title}>
                  <Check />
                  <span>
                    <b>{cert.title}</b> {cert.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
