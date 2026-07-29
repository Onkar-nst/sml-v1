/**
 * Whether the visitor has asked for reduced motion.
 *
 * Deliberately a plain function rather than a hook: every caller needs the
 * answer inside an effect, at the moment an animation is about to start, not
 * as a reactive value that re-renders the tree when it changes.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
