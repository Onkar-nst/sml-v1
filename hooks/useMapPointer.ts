'use client'

import { useEffect, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/reducedMotion'

/**
 * The asset ids the country names camelCased — "SouthAfrica" reads as two
 * words, and the joining words in a name like "TrinidadAndTobago" drop back to
 * lower case rather than being shouted mid-title.
 */
const spaced = (id: string) =>
  id
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/ (And|Of|The) /g, (_, word: string) => ` ${word.toLowerCase()} `)
    .trim()

/**
 * Pointer effects over the assembled map: a soft green light that follows the
 * cursor, and a chip naming the country under it.
 *
 * Both are written straight to the DOM rather than through state — a pointer
 * move should never re-render 175 paths. Position lands on the stage as
 * `--mx`/`--my` and rides the compositor from there, and the stage's rect is
 * cached so a move costs no layout read.
 *
 * The hook drives `data-` attributes rather than CSS-module class names, so the
 * styling stays entirely in `Footprint.module.css`.
 */
export function useMapPointer(stageRef: RefObject<HTMLElement | null>, ready: boolean) {
  useEffect(() => {
    const stage = stageRef.current
    if (!ready || !stage || prefersReducedMotion()) return
    // on touch there is no cursor to follow, and the glow would stick where it
    // was last tapped
    if (!window.matchMedia('(hover: hover)').matches) return

    const name = stage.querySelector<HTMLElement>('[data-map-name]')
    const kind = stage.querySelector<HTMLElement>('[data-map-kind]')
    const note = stage.querySelector<HTMLElement>('[data-map-note]')
    if (!name || !kind || !note) return

    let box = stage.getBoundingClientRect()
    const remeasure = () => {
      box = stage.getBoundingClientRect()
    }

    let frame = 0
    let x = 0
    let y = 0

    const onMove = (e: PointerEvent) => {
      x = e.clientX - box.left
      y = e.clientY - box.top
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        stage.style.setProperty('--mx', `${x.toFixed(1)}px`)
        stage.style.setProperty('--my', `${y.toFixed(1)}px`)
      })
    }

    const show = (title: string, role: string, detail: string, tone: string) => {
      name.textContent = title
      kind.textContent = role
      note.textContent = detail
      stage.dataset.tone = tone
      stage.dataset.tip = 'on'
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element

      // a beacon wins over the country beneath it, so standing on a site tells
      // you about the site rather than repeating the landmass
      const mark = target.closest?.('.mark') as SVGElement | null
      if (mark) {
        const hq = mark.dataset.kind === 'hq'
        show(
          spaced(mark.dataset.country || ''),
          hq ? 'National Headquarters' : 'Manufacturing Unit',
          hq ? 'Country head office' : 'One of 6+ SML plants',
          hq ? 'hq' : 'plant',
        )
        return
      }

      const country = target.closest?.('.cty')
      // roughly half the paths are unnamed in the asset — those get the visual
      // hover but no chip
      if (!country?.id) {
        delete stage.dataset.tip
        return
      }
      const served = country.classList.contains('on')
      show(
        spaced(country.id),
        served ? 'SML customer reach' : 'Outside current reach',
        served ? 'One of 80+ countries served' : 'Not supplied by SML yet',
        served ? 'reach' : 'none',
      )
    }

    const onLeave = () => {
      delete stage.dataset.tip
    }

    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerover', onOver, { passive: true })
    stage.addEventListener('pointerleave', onLeave, { passive: true })
    window.addEventListener('scroll', remeasure, { passive: true })
    window.addEventListener('resize', remeasure, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerover', onOver)
      stage.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', remeasure)
      window.removeEventListener('resize', remeasure)
    }
  }, [stageRef, ready])
}
