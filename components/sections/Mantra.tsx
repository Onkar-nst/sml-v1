import { MANTRA } from '@/data/site'
import { ICONS } from '@/components/ui/icons'
import { vars } from '@/lib/css'
import styles from './Mantra.module.css'

export default function Mantra() {
  return (
    <section className={styles.mantra} id="mantra">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.copy} data-reveal>
            <span className="eyebrow">Our Mantra</span>
            <h2 className={styles.heading} data-reveal="blur">
              Growing <em>more</em> from less
            </h2>
            <p>
              Our products offer better efficacy, efficiency and speed of nutrient uptake, and stay
              available over a greater period of the crop cycle. That improves productivity and
              quality, and helps farmers earn sustainable profits.
            </p>
            <p>
              We always aim to optimise dosage, reduce cost per acre, residues and toxicity, and
              restrict adverse environmental impacts. Our efficient formulations are largely
              free of solvents, making them environmentally friendly and sustainable.
            </p>
            <p>
              Sustainable business growth has been our aim, and we work toward it tirelessly. In
              doing so, SML is creating a long and significant impact on soil health, farmer
              incomes and food security, reversing climate change and improving quality of life
              worldwide.
            </p>
            <blockquote className={styles.pull}>
              &ldquo;More from less, for the farmer and the planet alike.&rdquo;
            </blockquote>
          </div>

          <div className={styles.card} data-reveal="right" style={vars({ '--d': '120ms' })}>
            <div className={styles.art}>
              <img src={MANTRA.art} alt="More from less" />
            </div>

            {/* the mantra is a two-word compound, so take it apart a word at a time */}
            <div className={styles.split}>
              {MANTRA.parts.map((part) => {
                const Icon = ICONS[part.icon]
                return (
                  <div
                    className={`${styles.part} ${
                      part.tone === 'green' ? styles.partGreen : styles.partNavy
                    }`}
                    key={part.word}
                  >
                    <div className={styles.partHead}>
                      <div className={styles.partIcon}>
                        <Icon size={19} strokeWidth={1.9} />
                      </div>
                      <div className={styles.word}>{part.word}</div>
                    </div>
                    <p>{part.body}</p>
                  </div>
                )
              })}
            </div>

            <div className={styles.interpretation}>
              <b>Interpretation</b>
              <p>{MANTRA.interpretation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
