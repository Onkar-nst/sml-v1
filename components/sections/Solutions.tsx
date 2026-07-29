'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/data/products'
import { ArrowRight } from '@/components/ui/icons'

const TABS = [
  { id: 'insecticide', label: 'Insecticides', system: 'IRAC', count: 24 },
  { id: 'fungicide', label: 'Fungicides', system: 'FRAC', count: 22 },
  { id: 'herbicide', label: 'Herbicides', system: 'HRAC', count: 15 },
  { id: 'fertiliser', label: 'Crop Nutrition', system: 'NPK', count: 7 },
  { id: 'biological', label: 'Biologicals', system: 'BIO', count: 4 },
  { id: 'pgr', label: 'PGR', system: 'PGR', count: 2 },
]

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('insecticide')
  const [visibleCount, setVisibleCount] = useState(6)

  const activeMeta = TABS.find((t) => t.id === activeTab)
  const filteredProducts = PRODUCTS.filter((p) => p.cat === activeTab)
  const displayProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = filteredProducts.length > visibleCount

  const selectTab = (tabId: string) => {
    setActiveTab(tabId)
    setVisibleCount(6)
  }

  return (
    <section id="solutions" className="">
      <div className="max-w-[1180px] w-[calc(100%-2.6rem)] mx-auto">

        {/* Header */}
        <div className="max-w-[680px] mb-11 mx-auto text-center" data-reveal>
          <span 
            className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:bg-current before:rounded-sm"
            
          >
            Our Solutions
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-2" 
          >
            Our complete product solution
          </h2>
          <p 
            className="text-[clamp(1rem,1.6vw,1.15rem)] max-w-[780px] mx-auto opacity-75"
          >
            Nutrition, protection, biologicals and growth regulation, developed and manufactured in our own facilities.
          </p>
        </div>

        {/* Category index */}
        <div className="flex overflow-x-auto md:justify-center gap-2.5 pb-4 mb-10 md:mb-14 scrollbar-none snap-x snap-mandatory">
          <nav className="inline-flex p-1.5 bg-slate-100/80 border border-slate-200/50 rounded-2xl md:rounded-full backdrop-blur-sm">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`snap-start flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl md:rounded-full text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#43791f] text-white shadow-md shadow-[#43791f]/20 scale-105'
                      : 'text-[#193174]/80 hover:text-[#43791f] hover:bg-slate-200/40'
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {tab.label}
                  </span>
                  <span className={`inline-flex items-center justify-center text-3xs px-2 py-0.5 ml-2 rounded-full font-bold transition-all ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#193174]/70'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayProducts.map((product) => {
            const productSlug = product.name.toLowerCase().replace(/\s+/g, '-')
            const monogram = product.catLabel ? product.catLabel.slice(0, 2).toUpperCase() : activeMeta?.label.slice(0, 2).toUpperCase()

            return (
              <article 
                key={product.name} 
                className="flex flex-col bg-white border border-slate-200/80 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(25,49,116,0.02)] hover:shadow-[0_16px_36px_rgba(25,49,116,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-out group"
              >
                {/* Mark / image area */}
                <div className="relative aspect-[4/3] bg-slate-50/50 flex flex-col items-center justify-center overflow-hidden border-b border-slate-100">
                  <span className="absolute top-3.5 left-3.5 w-2.5 h-2.5 border-t border-l border-slate-300 opacity-60" />
                  <span className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 border-b border-r border-slate-300 opacity-60" />
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      loading="lazy"
                      className="max-h-[75%] max-w-[75%] object-contain transition-transform duration-500 ease-out group-hover:scale-103"
                    />
                  ) : (
                    <>
                      <span className="text-[40px] font-bold text-[#193174] leading-none">
                        {monogram}
                      </span>
                      <span className="text-xs tracking-[0.12em] uppercase text-slate-400 mt-2 font-mono">
                        {activeMeta?.system} Group
                      </span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold text-[#43791f]/90 uppercase tracking-widest mb-2.5">
                    {product.catLabel}
                  </span>
                  <h3 className="text-xl font-bold text-[#193174] leading-snug mb-2 group-hover:text-[#43791f] transition-colors duration-200 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2 min-h-[3rem] h-auto">
                    {product.note || 'Pioneering agricultural solution formulated for optimal plant efficiency and crop health.'}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100 gap-3">
                    <a
                      href={`/product/${productSlug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 hover:border-[#193174]/30 text-slate-700 hover:text-[#193174] hover:bg-slate-50 text-sm font-bold transition-all"
                    >
                      View Spec
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={`mailto:sml@sml-ltd.com?subject=Enquiry about SML ${product.name}&body=Hello SML Team,%0D%0A%0D%0AI am writing to enquire about your product: ${product.name} (${product.catLabel}). Please share details regarding specifications, packaging availability, and pricing.%0D%0A%0D%0AThank you.`}
                      className="flex-1 inline-flex items-center justify-center text-sm font-bold text-white bg-[#43791f] hover:bg-[#365f1a] px-5 py-3 rounded-xl shadow-sm hover:shadow transition-colors"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-12 mb-16">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-white bg-[#193174] hover:bg-[#122559] rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-250 cursor-pointer"
            >
              Show more
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-bold ml-2">
                {filteredProducts.length - visibleCount} remaining
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}