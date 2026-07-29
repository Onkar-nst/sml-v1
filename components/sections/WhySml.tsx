import { WHY_CARDS } from '@/data/site'
import { ICONS } from '@/components/ui/icons'
import { vars } from '@/lib/css'
import styles from './WhySml.module.css'

export default function WhySml() {
  return (
    <div className={styles.zone}>
      <div className={styles.zoneBg}>
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=70"
          alt="Sunlit farm field"
        />
      </div>

      <section className={styles.why} id="why">
        <div className="wrap">
          <div className={styles.head} data-reveal="stagger">
            <div>
              <span className="eyebrow">Why SML</span>
              <h2 data-reveal="blur">
                A complete partner for the{' '}
                <span className={styles.accent}>modern farmer</span>.
              </h2>
            </div>
            <p className={styles.lede}>
              SML delivers everything a modern farmer needs under one roof, grown from five
              decades of research and trusted by growers across 80+ countries.
            </p>
          </div>
        </div>

        {/* the row scrolls inside the container, so cut-off cards clip on the
            gutter line and clear air stays between the row and the screen edges */}
        <div className="wrap">
          <div className={styles.rail} aria-label="What SML offers">
            {WHY_CARDS.map((item, i) => {
              const Icon = ICONS[item.icon]
              return (
                <article
                  key={item.title}
                  className={
                    item.tone === 'navy'
                      ? `${styles.card} ${styles.cardNavy}`
                      : styles.card
                  }
                  data-reveal
                  style={vars({ '--d': `${i * 90}ms` })}
                >
                  <span className={styles.cardIcon}>
                    <Icon size={26} strokeWidth={1.9} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
