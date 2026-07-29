import { Flask, Users } from '@/components/ui/icons'
import { vars } from '@/lib/css'
import styles from './About.module.css'

/** The two figures under the copy: icon chip, big number, caption. */
const STATS = [
  {
    icon: Flask,
    value: '50+',
    label: 'Years of research behind every SML formulation.',
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'Channel partners taking our solutions to growers.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy} data-reveal>
            <span className="eyebrow">About SML</span>
            <h2 className={styles.title}>Rooted in the soil, driven by research</h2>
            <p className={styles.lede}>
              SML Limited, formerly Sulphur Mills Limited, is a global leader in advanced
              agricultural solutions, bringing science and passion together across soil
              health, nutrition, biologicals and crop protection.
            </p>

            <div className={styles.stats}>
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={value} className={styles.stat}>
                  <span className={styles.chip}>
                    <Icon size={22} />
                  </span>
                  <b>{value}</b>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.media} data-reveal style={vars({ '--d': '120ms' })}>
            <img
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=70"
              alt="Hands planting a seedling in a nursery tray"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
