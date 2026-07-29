'use client'

import { useRef } from 'react'

import { MapPin } from '@/components/ui/icons'
import { useWorldMap } from '@/hooks/useWorldMap'
import { useMapPointer } from '@/hooks/useMapPointer'
import styles from './Footprint.module.css'

/** The map, or the flat fallback image until (or unless) the SVG arrives. */
function MapHolder() {
  const stage = useRef<HTMLDivElement>(null)
  const holder = useRef<HTMLDivElement>(null)
  const markup = useWorldMap(holder)
  useMapPointer(stage, Boolean(markup))

  return (
    <div className={styles.stage} ref={stage}>
      {markup ? (
        <div
          className={styles.holder}
          ref={holder}
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ) : (
        <div className={styles.holder} ref={holder}>
          <noscript>
            <img
              src="https://sml-ltd.com/wp-content/uploads/2024/02/map-mobile.svg"
              alt="SML global customer reach across 80+ countries"
            />
          </noscript>
        </div>
      )}

      {/* both track the cursor through --mx/--my, set by useMapPointer */}
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.tip} aria-hidden="true">
        <b>
          <span data-map-name />
          <i data-map-note />
        </b>
      </span>
    </div>
  )
}

export default function Footprint() {
  return (
    <section className={styles.footprint} id="footprint">
      <div className="wrap">
        <div className="section-head center" data-reveal>
          <span className="eyebrow">Global Footprint</span>
          <h2>A global agri solution company</h2>
          <p className={styles.lede}>
            We are a global agri solution company in the USA, Europe, Australia, the Middle East,
            South America, Asia, and New Zealand.
          </p>
        </div>

        {/* each country flies in from its own bearing to assemble the map */}
        <MapHolder />

        {/* compact single-line legend; the SVG's baked-in legend card is hidden */}
        <div className={styles.legend} data-reveal>
          <span className={styles.key}>
            <MapPin />
            Manufacturing Unit
          </span>
          <span className={styles.key}>
            <i className={`${styles.swatch} ${styles.swatchReach}`} aria-hidden="true" />
            SML global customer reach
          </span>
          <span className={styles.key}>
            <i className={`${styles.swatch} ${styles.swatchHq}`} aria-hidden="true" />
            National Headquarters
          </span>
        </div>

      </div>
    </section>
  )
}
