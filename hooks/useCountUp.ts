'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/reducedMotion'

const DURATION = 1500

/**
 * Counts a group of stats up together.
 *
 * Every value shares one clock and a linear ramp, so 6 and 10,000 land on their
 * final number in the same frame instead of the small one finishing early. The
 * static build had to hunt for sibling `[data-count]` nodes to achieve that;
 * here the group is just the array you pass in.
 *
 * Returns numbers rather than formatted strings so the marquee can render the
 * same values in several duplicated tracks without recomputing anything.
 *
 * `targets` must be referentially stable — memoise it at the call site.
 */
export function useCountUp(
  targets: number[],
  ref: RefObject<HTMLElement | null>,
): number[] {
  const [values, setValues] = useState<number[]>(() => targets.map(() => 0))
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started.current) return

    const run = () => {
      if (started.current) return
      started.current = true

      if (prefersReducedMotion()) {
        setValues(targets)
        return
      }

      let start: number | null = null
      const tick = (now: number) => {
        if (start === null) start = now
        const progress = Math.min((now - start) / DURATION, 1)
        setValues(
          targets.map((t) => (progress === 1 ? t : Math.round(t * progress))),
        )
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          run()
          observer.disconnect()
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, targets])

  return values
}

export const formatCount = (value: number, suffix = ''): string =>
  value.toLocaleString('en-US') + suffix
