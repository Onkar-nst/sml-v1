'use client'

import { useEffect, useState, type RefObject } from 'react'

interface Marquee {
  /** how many times to render the item set — always at least 2 */
  sets: number
  /** distance the track travels before it lands on an identical frame */
  shift: string
}

/**
 * Works out how many copies of a marquee's item set are needed to fill the
 * viewport, so the loop never shows a gap.
 *
 * The track animates to `--shift`, which is exactly one set's width expressed
 * as a percentage of the whole track. Landing there puts an identical item in
 * every position, so the reset is invisible.
 *
 * Two sets is the SSR default and the common case; wide screens measure up on
 * mount and re-render with more. The static build cloned DOM nodes to do this,
 * which meant the clones' counters had to be re-queried afterwards.
 */
export function useMarqueeCopies(
  ref: RefObject<HTMLElement | null>,
  itemsPerSet: number,
): Marquee {
  const [sets, setSets] = useState(2)

  useEffect(() => {
    const track = ref.current
    if (!track) return

    const measure = () => {
      const items = Array.from(track.children) as HTMLElement[]
      const setWidth = items
        .slice(0, itemsPerSet)
        .reduce((w, el) => w + el.offsetWidth, 0)

      if (!setWidth) return
      // one set to fill the viewport, one more to scroll in behind it
      setSets(Math.max(1, Math.ceil(window.innerWidth / setWidth)) + 1)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [ref, itemsPerSet])

  return { sets, shift: `-${100 / sets}%` }
}
