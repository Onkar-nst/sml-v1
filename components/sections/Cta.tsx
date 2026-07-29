import { CONTACT } from '@/data/site'
import { Mail } from '@/components/ui/icons'
import styles from './Cta.module.css'

export default function Cta() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className={styles.card} data-reveal>
          <img
            src="https://sml-ltd.com/wp-content/uploads/2024/10/sml-banner4-1.jpg"
            alt="Farmers reviewing a crop in the field"
          />
          <span className="eyebrow eyebrow--light">Get in touch</span>
          <h2>Let&apos;s grow more from less</h2>
          <p>
            Whether you are a farmer, a distributor or an international partner, our team is
            ready to help you find the right solution for your soil and your crop.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-cream">
              Email Our Team
              <Mail />
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-ghost">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
