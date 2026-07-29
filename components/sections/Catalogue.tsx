'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'

import { PRODUCTS, type ProductCategory } from '@/data/products'
import ProductCard from '@/components/ui/ProductCard'

type TabKey = 'all' | ProductCategory

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'insecticide', label: 'Insecticides' },
  { key: 'other-insecticide', label: 'Other Insecticides' },
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
      <div className="flex flex-wrap gap-[0.55rem] justify-center mb-[2.4rem]" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            className={`px-[1.25rem] py-[0.58rem] rounded-full border font-sans text-[0.88rem] font-semibold cursor-pointer transition-all duration-250 ease-out ${
              active === tab.key
                ? 'bg-[#43791f] border-[#43791f] text-white'
                : 'border-[#193174]/14 bg-white text-[#193174]/78 hover:border-[#43791f] hover:text-[#43791f]'
            }`}
            onClick={() => setPicked(tab.key)}
          >
            {tab.label}
            <span className={`inline-block ml-[0.4rem] text-[0.74rem] ${active === tab.key ? 'opacity-80' : 'opacity-55'}`}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(216px,1fr))] gap-3 sm:gap-[1.1rem]">
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
