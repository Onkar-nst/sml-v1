'use client'

import { useMemo, useRef } from 'react'

import { PRESENCE_STATS } from '@/data/site'
import { formatCount, useCountUp } from '@/hooks/useCountUp'
import { ICONS } from '@/components/ui/icons'
import styles from './Presence.module.css'

export default function Presence() {
  const grid = useRef<HTMLDivElement>(null)

  const targets = useMemo(() => PRESENCE_STATS.map((s) => s.count), [])
  const values = useCountUp(targets, grid)

  return (
    <section id="presence">
      <div className="wrap">
        <div data-reveal>
          <div className="section-head">
            <span className="eyebrow eyebrow--light">Our Presence</span>
            <h2 data-reveal="blur">Scale that backs the science</h2>
          </div>

          <div className={styles.grid} ref={grid}>
            {PRESENCE_STATS.map((stat, i) => {
              const Icon = ICONS[stat.icon]
              return (
                <div className={styles.cell} key={stat.label}>
                  <div className={styles.figure}>
                    <span className={styles.chip}>
                      <Icon size={22} />
                    </span>
                    <b>{formatCount(values[i] ?? 0, stat.suffix)}</b>
                  </div>
                  <span>{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
