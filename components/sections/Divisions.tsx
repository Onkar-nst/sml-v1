import { DIVISIONS } from '@/data/site'
import { vars } from '@/lib/css'
import styles from './Divisions.module.css'

export default function Divisions() {
  return (
    <section id="business">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className={styles.eyebrow}>Our Business</span>
          <h2 data-reveal="blur">
            Comprehensive agricultural solutions designed to <em>support</em> soil health, crop
            protection, and growers worldwide.
          </h2>
        </div>

        <div className={styles.grid}>
          {DIVISIONS.map((division, i) => (
            <div
              className={`${styles.card}${i === 0 ? ` ${styles.featured}` : ''}`}
              key={division.name}
              data-reveal
              style={vars({ '--d': `${i * 80}ms` })}
            >
              <div className={styles.num}>{String(i + 1).padStart(2, '0')}.</div>
              <h3>{division.name}</h3>
              <p>{division.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
