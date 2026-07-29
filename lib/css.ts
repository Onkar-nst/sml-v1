import type { CSSProperties } from 'react'

/**
 * Custom properties in an inline `style` object.
 *
 * React passes `--foo` through untouched at runtime, but CSSProperties has no
 * index signature for them, so every stagger delay would otherwise need its own
 * cast. Several sections drive their reveal offsets this way.
 */
export const vars = (values: Record<string, string | number>): CSSProperties =>
  values as CSSProperties
