import { BROCHURE_URL, HERO } from '@/data/site'
import { ArrowRight } from '@/components/ui/icons'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg}>
        <img src={HERO.image} alt={HERO.imageAlt} />
      </div>

      <div className="wrap">
        <div className={styles.inner}>
          <span className="eyebrow eyebrow--light">{HERO.eyebrow}</span>
          <h1>
            What we eat matters, then <em>how we grow</em> matters even more
          </h1>
          <p className={styles.sub}>{HERO.sub}</p>
          <div className={styles.actions}>
            <a href="#solutions" className="btn btn-cream">
              Explore Products
              <ArrowRight />
            </a>
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
