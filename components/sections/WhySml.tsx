'use client'

import { useEffect, useState } from 'react'

import { WHY_CARDS } from '@/data/site'
import { ArrowRight, ICONS } from '@/components/ui/icons'
import { prefersReducedMotion } from '@/lib/reducedMotion'
import { vars } from '@/lib/css'
import styles from './WhySml.module.css'

/** How long each capability holds the stage before the rail advances. */
const CYCLE_MS = 5000

const pad = (n: number) => String(n + 1).padStart(2, '0')

export default function WhySml() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // one timer per slide rather than a repeating interval, so a click restarts
  // the clock instead of landing mid-cycle
  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % WHY_CARDS.length),
      CYCLE_MS,
    )
    return () => clearTimeout(timer)
  }, [active, paused])

  const card = WHY_CARDS[active]

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
              <h2>
                A complete partner for the{' '}
                <span className={styles.accent}>modern farmer</span>.
              </h2>
            </div>
            <p className={styles.lede}>
              SML delivers everything a modern farmer needs under one roof, grown from five
              decades of research and trusted by growers across 80+ countries.
            </p>
          </div>

          <div className={styles.panel}>
            <div
              className={styles.rail}
              role="tablist"
              aria-label="What SML offers"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {WHY_CARDS.map((item, i) => {
                const Icon = ICONS[item.icon]
                const on = i === active
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="why-stage"
                    key={item.title}
                    className={[
                      styles.row,
                      item.tone === 'navy' ? styles.rowNavy : '',
                      on ? styles.on : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    data-reveal
                    style={vars({ '--d': `${i * 80}ms`, '--cycle': `${CYCLE_MS}ms` })}
                  >
                    <span className={styles.rowIndex}>{pad(i)}</span>
                    <span className={styles.rowIcon}>
                      <Icon size={20} strokeWidth={1.9} />
                    </span>
                    <span className={styles.rowTitle}>{item.title}</span>
                    <ArrowRight size={15} strokeWidth={2.4} className={styles.rowArrow} />
                    <span className={styles.progress} aria-hidden="true" />
                  </button>
                )
              })}
            </div>

            <div className={styles.stage} id="why-stage" data-reveal="right">
              {/* keyed on the active index so the crossfade replays each change */}
              <div className={styles.stageMedia} key={`media-${active}`} aria-hidden="true">
                <img src={card.image} alt="" />
              </div>

              <span className={styles.stageCount} aria-hidden="true">
                {pad(active)} / {pad(WHY_CARDS.length - 1)}
              </span>

              {/* keyed on the active index so the entrance replays each change */}
              <div className={styles.stageBody} key={active}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <a href="#solutions" className={styles.stageLink}>
                  Explore {card.title}
                  <ArrowRight size={15} strokeWidth={2.4} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
