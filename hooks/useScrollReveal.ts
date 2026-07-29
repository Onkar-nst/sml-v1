'use client'

import { useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/reducedMotion'

/**
 * One observer for every `[data-reveal]` on the page.
 *
 * The reveal styles are attribute-driven and live in globals.css, so a single
 * observer mounted once at the root covers every section regardless of which
 * module scoped its class names. Elements are unobserved as they land — the
 * reveal is a one-shot entrance, not a scroll-linked effect.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-in', '')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
