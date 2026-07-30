'use client'

import { useEffect, useState, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/reducedMotion'

/** Where the legend card baked into the asset starts, in viewBox units. */
const LEGEND_Y = 400
/** The land itself measures y 7→400; crop to it once the legend is hidden. */
const CROPPED_VIEWBOX = '0 0 804 408'

/** How long the assembly runs — see the .is-in transitions in the stylesheet. */
const SETTLE_MS = 900

/* The asset carries the old site's inline colors. These two identify the shapes
   that mark a site: the manufacturing pins and the HQ triangles. */
const PIN_FILL = '#283D77'
const HQ_FILL = '#FFFF00'
/* A pin is five stacked shapes and a headquarters one triangle. We read their
   positions, then hide the lot — the beacons below are drawn in their place. */
const MARKER_ART = ['#283D77', '#1A2C57', '#3D5991', '#FFFFFF', '#E3E3E3', '#FFFF00']
const SVG_NS = 'http://www.w3.org/2000/svg'

interface Spot {
  kind: 'plant' | 'hq'
  x: number
  y: number
}

/** Where each site sits, read off the artwork before it is hidden. */
function readSpots(svg: SVGSVGElement): Spot[] {
  const spots: Spot[] = []
  svg
    .querySelectorAll<SVGGraphicsElement>(`.xtra[fill="${PIN_FILL}"], .xtra[fill="${HQ_FILL}"]`)
    .forEach((art) => {
      if (art.style.display === 'none') return
      let b
      try {
        b = art.getBBox()
      } catch {
        return
      }
      // a pin marks its spot with the point at its base, a triangle with its middle
      const isPin = art.getAttribute('fill') === PIN_FILL
      spots.push({
        kind: isPin ? 'plant' : 'hq',
        x: b.x + b.width / 2,
        y: b.y + (isPin ? b.height : b.height / 2),
      })
    })
  return spots
}

/**
 * Which landmass a site stands on. Hit-testing the country paths keeps the
 * marker labels tied to the asset's own geometry rather than to coordinates
 * copied out of it, so they survive the map being redrawn.
 */
function countryAt(svg: SVGSVGElement, x: number, y: number): string {
  const lands = Array.from(svg.querySelectorAll<SVGPathElement>('.cty'))
  const point = svg.createSVGPoint()
  point.x = x
  point.y = y

  for (const land of lands) {
    try {
      if (land.id && land.isPointInFill(point)) return land.id
    } catch {
      /* a path the browser cannot hit-test — try the next */
    }
  }

  // a marker sitting just off the coast falls back to the nearest named country
  let nearest = ''
  let best = Infinity
  for (const land of lands) {
    if (!land.id) continue
    try {
      const b = land.getBBox()
      const d = Math.hypot(b.x + b.width / 2 - x, b.y + b.height / 2 - y)
      if (d < best) {
        best = d
        nearest = land.id
      }
    } catch {
      /* skip */
    }
  }
  return nearest
}

/**
 * Draws a beacon over every site: a pulsing ring, a soft halo, and a white
 * shell around a solid core — a circle for a plant, a diamond for a
 * headquarters, so the two read apart at a glance and at map scale.
 *
 * Each beacon carries the site's kind and country, which the pointer hook
 * reads back out to fill the tooltip, and a transparent hit circle wide enough
 * to catch a cursor aimed at something only a few pixels across.
 */
function buildMarkers(svg: SVGSVGElement, spots: Spot[]) {
  const layer = document.createElementNS(SVG_NS, 'g')
  layer.setAttribute('class', 'marks')

  spots.forEach((spot, i) => {
    const hq = spot.kind === 'hq'
    const mark = document.createElementNS(SVG_NS, 'g')
    mark.setAttribute('class', 'mark')
    mark.dataset.kind = spot.kind
    mark.dataset.country = countryAt(svg, spot.x, spot.y)

    const circle = (cls: string, r: number) => {
      const el = document.createElementNS(SVG_NS, 'circle')
      el.setAttribute('class', cls)
      el.setAttribute('cx', spot.x.toFixed(1))
      el.setAttribute('cy', spot.y.toFixed(1))
      el.setAttribute('r', String(r))
      return el
    }
    const diamond = (cls: string, r: number) => {
      const el = document.createElementNS(SVG_NS, 'path')
      el.setAttribute('class', cls)
      const { x, y } = spot
      el.setAttribute('d', `M${x} ${y - r}L${x + r} ${y}L${x} ${y + r}L${x - r} ${y}Z`)
      return el
    }
    const body = hq ? diamond : circle

    // the offset lives on the group so the ring and the halo pulse together
    mark.style.setProperty('--ping-d', `${i * 420}ms`)

    mark.append(
      circle('ping', hq ? 3.6 : 3),
      circle('halo', hq ? 5.4 : 4.6),
      body('shell', hq ? 3.9 : 2.9),
      body('core', hq ? 2.5 : 1.75),
      circle('hit', 6),
    )
    layer.append(mark)
  })

  if (layer.childElementCount) svg.append(layer)
}

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

    // Read where the sites are, retire the asset's own pin and triangle
    // artwork, then draw our beacons over the top — appended last, so they
    // paint above the land and take the hover before it does.
    const spots = readSpots(svg)
    svg
      .querySelectorAll<SVGGraphicsElement>(
        MARKER_ART.map((fill) => `.xtra[fill="${fill}"]`).join(','),
      )
      .forEach((art) => {
        art.style.display = 'none'
      })
    buildMarkers(svg, spots)

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
