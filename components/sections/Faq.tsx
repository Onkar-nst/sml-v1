'use client'

import { useState } from 'react'

import { CONTACT, FAQS } from '@/data/site'
import { ArrowRight, ChevronDown } from '@/components/ui/icons'
import styles from './Faq.module.css'

export default function Faq() {
  // index of the open panel, or null — an accordion, one at a time
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={styles.faq} id="faq">
      <div className="wrap">
        <div className={styles.layout}>
          <div className={styles.aside} data-reveal>
            <span className="eyebrow eyebrow--chip">FAQ</span>
            {/* the break is dropped below 900px, so keep a space either side of it */}
            <h2>
              Frequently{' '}
              <br />
              Asked Questions
            </h2>

            <div className={styles.ask}>
              <h3>Still have a question?</h3>
              <p>
                Our team is here to help. Reach out any time for a free
                conversation about your soil, your crop or your market.
              </p>
              <a href="#contact" className={`btn btn-primary ${styles.askBtn}`}>
                Get started
                <ArrowRight />
              </a>
              <a href={`mailto:${CONTACT.email}`} className={styles.askMail}>
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className={styles.list} data-reveal="right">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  className={`${styles.item}${isOpen ? ` ${styles.open}` : ''}`}
                  key={faq.q}
                >
                  <button
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {faq.q}
                    <span className={styles.icon}>
                      <ChevronDown />
                    </span>
                  </button>
                  <div className={styles.answer} id={`faq-panel-${i}`} role="region">
                    <div>
                      {/* answers carry inline links, so they are authored as HTML */}
                      <p dangerouslySetInnerHTML={{ __html: faq.a }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
