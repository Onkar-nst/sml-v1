'use client'

import { useSyncExternalStore } from 'react'

/** The year never changes mid-session, so there is nothing to subscribe to. */
const subscribe = () => () => {}
const getYear = () => new Date().getFullYear()

/**
 * Build year during prerender, real year in the browser — so a page generated
 * in December doesn't still claim the old year in January. useSyncExternalStore
 * is the primitive for exactly this: a value that legitimately differs between
 * server and client, resolved without a hydration mismatch or a second render.
 */
export default function CurrentYear() {
  return <>{useSyncExternalStore(subscribe, getYear, getYear)}</>
}
