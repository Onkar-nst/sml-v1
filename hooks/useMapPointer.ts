'use client'

import { useEffect, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/reducedMotion'

/** The asset ids the country names camelCased — "SouthAfrica" reads as two words. */
const spaced = (id: string) => id.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')

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
    const note = stage.querySelector<HTMLElement>('[data-map-note]')

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

    const onOver = (e: PointerEvent) => {
      const country = (e.target as Element).closest?.('.cty')
      // roughly half the paths are unnamed in the asset — those get the visual
      // hover but no chip
      if (!country?.id || !name || !note) {
        delete stage.dataset.tip
        return
      }
      name.textContent = spaced(country.id)
      note.textContent =
        country.id === 'India'
          ? 'National Headquarters'
          : country.classList.contains('on')
            ? 'SML customer reach'
            : ''
      stage.dataset.reach = country.classList.contains('on') ? 'yes' : 'no'
      stage.dataset.tip = 'on'
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
