import { vars } from '@/lib/css'
import styles from './Brand.module.css'

/** The three things the Reap name stands for, from the brand copy. */
const PILLARS = [
  { title: 'Nourish', body: 'Balanced nutrition for every stage of the crop.' },
  { title: 'Shield', body: 'Responsible protection from seed to yield.' },
  { title: 'Grow', body: 'More yield, more quality, more income for the farmer.' },
]

export default function Brand() {
  return (
    <section id="brand" className={styles.band}>
      {/* the brand mantra — "more from less" — as a quiet Devanagari watermark */}
      <span className={styles.watermark} aria-hidden="true">
        कम से अधिक
      </span>

      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy} data-reveal="stagger">
            <span className={styles.eyebrow}>Our Brand</span>
            <h2 className={styles.title} data-reveal="blur">
              One name. One leaf. From our science to your soil,{' '}
              <em>a harvest worth reaping.</em>
            </h2>
            <p className={styles.lede}>
              The <strong>Reap</strong> brand is recognised for quality that helps nourish,
              shield and increase growth and yield — the word sits intertwined within a leaf,
              a visual ode to our agricultural mission.
            </p>
            <span className={styles.mark}>
              <img src="https://sml-ltd.com/wp-content/uploads/2024/10/Reap.jpg" alt="Reap brand mark" />
            </span>
          </div>

          <div className={styles.list} data-reveal="stagger" style={vars({ '--d': '150ms' })}>
            {PILLARS.map((pillar, i) => (
              <div className={styles.item} key={pillar.title}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
