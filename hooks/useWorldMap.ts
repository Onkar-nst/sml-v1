'use client'

import { useEffect, useState, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/reducedMotion'

/** Where the legend card baked into the asset starts, in viewBox units. */
const LEGEND_Y = 400
/** The land itself measures y 7→400; crop to it once the legend is hidden. */
const CROPPED_VIEWBOX = '0 0 804 408'

/** How long the assembly runs — see the .is-in transitions in the stylesheet. */
const SETTLE_MS = 900

/* The asset carries the old site's inline colors. These two mark the shapes we
   want a ping ring on: the manufacturing pins and the HQ triangles. The
   stylesheet keys off the same values to recolor them. */
const PIN_FILL = '#283D77'
const HQ_FILL = '#FFFF00'
const SVG_NS = 'http://www.w3.org/2000/svg'

/**
 * Loads the world map and runs the assembly animation.
 *
 * The SVG is 300 KB of path data, so it stays a static file in /public and is
 * fetched on mount rather than shipped in the JS bundle or serialised through
 * the RSC payload. The markup is handed back for React to render, rather than
 * written straight into the DOM — that keeps the node reconcilable instead of
 * something a stray re-render could wipe.
 *
 * Once it lands, each country is pushed out along the bearing from the map's
 * centre through its own centre, so the set scatters across all 360° and
 * converges back into place when the section scrolls into view. A ping ring is
 * dropped on each plant and headquarters, and `is-done` marks the point where
 * the assembly is over and the hover effects can take the transitions over.
 */
export function useWorldMap(holderRef: RefObject<HTMLElement | null>): string | null {
  const [markup, setMarkup] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/world-map.svg')
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then((text) => {
        if (!cancelled) setMarkup(text)
      })
      .catch(() => {
        /* the fallback image stays in place */
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!markup) return
    const svg = holderRef.current?.querySelector<SVGSVGElement>('.map-svg')
    if (!svg) return

    const countries = Array.from(svg.querySelectorAll<SVGGraphicsElement>('.cty'))

    // The asset ships with its own legend card at the bottom of the viewBox.
    // We render a compact HTML legend instead, so hide those elements — the
    // on-map pins and HQ triangles all sit higher up and survive.
    svg.querySelectorAll<SVGGraphicsElement>('.xtra').forEach((el) => {
      try {
        if (el.getBBox().y > LEGEND_Y) el.style.display = 'none'
      } catch {
        /* detached or zero-size shapes — leave them be */
      }
    })

    // with that card gone the lower fifth is empty; crop to the land
    svg.setAttribute('viewBox', CROPPED_VIEWBOX)

    // A ring on every plant and headquarters, so the map keeps a pulse once it
    // has settled. Appended last, which paints them over the markers.
    const pings = document.createElementNS(SVG_NS, 'g')
    pings.setAttribute('class', 'pings')
    svg
      .querySelectorAll<SVGGraphicsElement>(
        `.xtra[fill="${PIN_FILL}"], .xtra[fill="${HQ_FILL}"]`,
      )
      .forEach((marker, i) => {
        if (marker.style.display === 'none') return
        let b
        try {
          b = marker.getBBox()
        } catch {
          return
        }
        const ring = document.createElementNS(SVG_NS, 'circle')
        ring.setAttribute('class', 'ping')
        ring.setAttribute('cx', (b.x + b.width / 2).toFixed(1))
        // a pin marks the spot with its point, an HQ triangle with its middle
        const isPin = marker.getAttribute('fill') === PIN_FILL
        ring.setAttribute('cy', (b.y + (isPin ? b.height : b.height / 2)).toFixed(1))
        ring.setAttribute('r', '3')
        ring.style.setProperty('--ping-d', `${i * 420}ms`)
        pings.append(ring)
      })
    if (pings.childElementCount) svg.append(pings)

    let plotted = false
    const plot = () => {
      if (plotted) return
      plotted = true

      const box = svg.viewBox.baseVal
      const cx = box.width / 2
      const cy = box.height / 2
      const reach = Math.hypot(box.width, box.height)

      countries.forEach((el, i) => {
        const b = el.getBBox()
        let dx = b.x + b.width / 2 - cx
        let dy = b.y + b.height / 2 - cy
        let len = Math.hypot(dx, dy)

        // a shape sitting dead centre has no bearing of its own — give it one
        if (len < 0.01) {
          const a = i * 2.399963 // golden angle, spreads them evenly
          dx = Math.cos(a)
          dy = Math.sin(a)
          len = 1
        }

        // far enough out to clear the frame, close enough that the travel reads
        const push = reach * 0.55 + (i % 6) * 45
        el.style.setProperty('--tx', `${((dx / len) * push).toFixed(1)}px`)
        el.style.setProperty('--ty', `${((dy / len) * push).toFixed(1)}px`)
        el.style.setProperty('--rot', `${(i % 2 ? 1 : -1) * (14 + (i % 5) * 9)}deg`)

        // outermost land arrives first, centre fills in last — reads as assembly
        const ratio = Math.min(1, len / (reach / 2))
        el.style.setProperty('--dly', `${Math.round((1 - ratio) * 150 + (i % 11) * 12)}ms`)
      })
    }

    if (prefersReducedMotion()) {
      svg.classList.add('is-in', 'is-done')
      return
    }

    plot()

    let observer: IntersectionObserver | null = null
    let settle = 0

    const inView = () => {
      const r = svg.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh * 0.85 && r.bottom > vh * 0.15
    }
    const onScroll = () => {
      if (inView()) launch()
    }
    const detach = () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(settle)
    }

    function launch() {
      if (svg!.classList.contains('is-in')) return
      plot()
      svg!.classList.add('is-in')
      // once the land has stopped moving, hand the transitions over to the
      // hover state and start the pings
      settle = window.setTimeout(() => svg!.classList.add('is-done'), SETTLE_MS)
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && launch()),
        { threshold: 0.2 },
      )
      observer.observe(svg)
    }

    // belt and braces — a plain scroll check, so the assembly can never be
    // stranded if the observer misses an update
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return detach
  }, [markup, holderRef])

  return markup
}
