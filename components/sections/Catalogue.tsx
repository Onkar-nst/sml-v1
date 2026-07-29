'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'

import { PRODUCTS, type ProductCategory } from '@/data/products'
import ProductCard from '@/components/ui/ProductCard'
import styles from './Catalogue.module.css'

type TabKey = 'all' | ProductCategory

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'insecticide', label: 'Insecticides' },
  { key: 'fungicide', label: 'Fungicides' },
  { key: 'herbicide', label: 'Herbicides' },
  { key: 'fertiliser', label: 'Crop Nutrition' },
  { key: 'biological', label: 'Biologicals' },
  { key: 'pgr', label: 'PGR' },
]

const isTabKey = (value: string): value is TabKey =>
  TABS.some((t) => t.key === value)

/* The homepage tiles and the footer deep-link in as /products#insecticide.
   The hash is browser state, not React state, so it is read through
   useSyncExternalStore — that keeps the server render neutral and makes
   back/forward between categories work for free. */
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}
const getHash = () => window.location.hash.slice(1)
const getServerHash = () => ''

export default function Catalogue() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash)

  // an explicit tab click outranks the hash for the rest of the visit
  const [picked, setPicked] = useState<TabKey | null>(null)
  const active: TabKey = picked ?? (isTabKey(hash) ? hash : 'all')

  const counts = useMemo(() => {
    const totals = { all: PRODUCTS.length } as Record<TabKey, number>
    for (const tab of TABS) {
      if (tab.key === 'all') continue
      totals[tab.key] = PRODUCTS.filter((p) => p.cat === tab.key).length
    }
    return totals
  }, [])

  const visible = useMemo(
    () => (active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active)),
    [active],
  )

  return (
    <>
      <div className={styles.tabs} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            className={`${styles.tab}${active === tab.key ? ` ${styles.active}` : ''}`}
            onClick={() => setPicked(tab.key)}
          >
            {tab.label}
            <span>{counts[tab.key]}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((product, i) => (
          <ProductCard
            key={product.name}
            name={product.name}
            tag={product.catLabel}
            note={product.note}
            img={product.img}
            showLink
            /* stagger the first couple of rows only — beyond that it drags */
            delay={Math.min(i, 11) * 45}
          />
        ))}
      </div>
    </>
  )
}
