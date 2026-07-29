'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

/**
 * Renders nothing — it exists so the page-wide reveal observer has a client
 * boundary to live in without turning any section into a client component.
 */
export default function ScrollReveal() {
  useScrollReveal()
  return null
}
