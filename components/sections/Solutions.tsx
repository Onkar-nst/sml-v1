'use client'

import { useState } from 'react'
import {
  PRODUCT_FAMILIES,
  familyCount,
  productSlug,
  productsIn,
  type ProductSub,
} from '@/data/products'
import { ArrowRight, ChevronDown, Mail } from '@/components/ui/icons'

const PAGE_SIZE = 6

export default function Solutions() {
  const [familyId, setFamilyId] = useState(PRODUCT_FAMILIES[0].id)
  const [subId, setSubId] = useState(PRODUCT_FAMILIES[0].subs[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const family = PRODUCT_FAMILIES.find((f) => f.id === familyId) ?? PRODUCT_FAMILIES[0]
  const sub = family.subs.find((s) => s.id === subId) ?? family.subs[0]

  const products = productsIn(sub.cat)
  const displayProducts = products.slice(0, visibleCount)
  const hasMore = products.length > visibleCount

  /* picking a family lands on its first sub-range */
  const selectFamily = (id: string) => {
    const next = PRODUCT_FAMILIES.find((f) => f.id === id)
    if (!next) return
    setFamilyId(id)
    setSubId(next.subs[0].id)
    setVisibleCount(PAGE_SIZE)
  }

  const selectSub = (next: ProductSub) => {
    setSubId(next.id)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    /* the catalogue sits on its own sand band, so the white cards read as
       shelves rather than as more of the page */
    <section id="solutions" className="bg-[#f7f5ef]">
      <div className="max-w-[1180px] w-[calc(100%-2.6rem)] mx-auto">

        {/* Header */}
        <div className="max-w-[680px] mb-11 mx-auto text-center" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4 px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-2">
            Our complete product solution
          </h2>
          <p className="text-[clamp(1rem,1.6vw,1.15rem)] max-w-[780px] mx-auto opacity-75">
            Nutrition, protection, biologicals and growth regulation, developed and manufactured in our own facilities.
          </p>
        </div>

        {/* Family index */}
        {/* free-standing chips rather than one capsule bar — the active range
            reads as a raised tab over the shelf below it */}
        <nav className="flex overflow-x-auto md:flex-wrap md:justify-center gap-2 pb-4 mb-9 md:mb-11 scrollbar-none snap-x snap-mandatory">
          {PRODUCT_FAMILIES.map((item) => {
            const isActive = family.id === item.id
            const count = familyCount(item)
            return (
              <button
                key={item.id}
                onClick={() => selectFamily(item.id)}
                className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-lg border text-xs md:text-[0.82rem] font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#43791f] border-[#43791f] text-white shadow-[0_6px_16px_rgba(67,121,31,0.22)]'
                    : 'bg-white/70 border-[#193174]/10 text-[#193174]/75 hover:border-[#43791f]/40 hover:text-[#43791f] hover:bg-white'
                }`}
              >
                <span className="whitespace-nowrap">{item.label}</span>
                {count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center text-[0.68rem] px-1.5 py-0.5 rounded font-bold tabular-nums transition-all ${
                      isActive ? 'bg-white/22 text-white' : 'bg-[#193174]/6 text-[#193174]/55'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Sub-range rail beside the shelf */}
        <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6 lg:gap-10 items-start">

          <aside className="lg:sticky lg:top-[calc(var(--nav-h)+var(--topbar-h)+1.5rem)]">
            {/* the rail carries the green header and a navy active row — the
                reverse of the shelf, so the two halves stay distinguishable */}
            <div className="rounded-2xl border border-[#193174]/8 bg-white overflow-hidden shadow-[0_4px_20px_rgba(25,49,116,0.03)]">
              <div className="bg-[#43791f] px-5 py-4">
                <span className="block text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white/60">
                  Sub-categories
                </span>
                <span className="block text-white font-bold text-[1.05rem] leading-snug mt-0.5">
                  {family.label}
                </span>
              </div>

              <div className="p-2">
                {family.subs.map((item) => {
                  const isActive = sub.id === item.id
                  const count = productsIn(item.cat).length
                  return (
                    <button
                      key={item.id}
                      onClick={() => selectSub(item)}
                      className={`w-full flex items-center justify-between gap-3 text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#193174] text-white shadow-sm'
                          : 'text-[#193174] hover:bg-[#f7f5ef]'
                      }`}
                    >
                      <span>
                        <span className="block text-[0.92rem] font-bold leading-snug">
                          {item.label}
                        </span>
                        <span
                          className={`block text-xs mt-0.5 ${
                            isActive ? 'text-white/65' : 'text-[#193174]/45'
                          }`}
                        >
                          {count > 0 ? `${count} products` : 'On request'}
                        </span>
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 flex-none transition-transform ${
                          isActive ? 'text-white translate-x-0.5' : 'text-[#193174]/25'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>

              <a
                href="/products"
                className="flex items-center justify-between gap-2 px-5 py-4 border-t border-[#193174]/8 text-sm font-bold text-[#193174] hover:text-[#43791f] transition-colors"
              >
                Browse full catalogue
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          <div>
            {/* the rail already names the range, so the shelf just carries
                the escape hatch into the full catalogue */}
            {products.length > 0 && (
              <div className="flex justify-end mb-5">
                <a
                  href={`/products#${sub.cat}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#43791f] hover:text-[#365f1a] transition-colors"
                >
                  View all
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {products.length === 0 ? (
              /* a range the catalogue does not carry yet */
              <div className="rounded-2xl border border-dashed border-[#193174]/18 bg-white/55 px-6 py-14 text-center">
                <h4 className="text-lg font-bold text-[#193174] mb-2">
                  Available on request
                </h4>
                <p className="text-sm text-[#193174]/55 leading-relaxed max-w-[42ch] mx-auto mb-6">
                  Our team can share the full specification and packaging options for this
                  range, along with registration details for your market.
                </p>
                <a
                  href={`mailto:sml@sml-ltd.com?subject=Enquiry about SML ${sub.label}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#43791f] hover:bg-[#365f1a] px-6 py-3 rounded-lg shadow-sm transition-colors"
                >
                  Enquire about this range
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <>
                {/* laid out lengthways: pack shot on the left, copy and the two
                    actions on the right, so more of the range fits on screen */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3.5">
                  {displayProducts.map((product) => {
                    const slug = productSlug(product.name)

                    return (
                      <article
                        key={product.name}
                        className="flex gap-3.5 p-3 bg-white border border-[#193174]/8 rounded-2xl shadow-[0_2px_10px_rgba(25,49,116,0.02)] hover:border-[#43791f]/35 hover:shadow-[0_12px_28px_rgba(25,49,116,0.07)] transition-all duration-300 ease-out group"
                      >
                        {/* most pack shots are photographed on white, so the well
                            stays white and takes a hairline instead of a tint */}
                        <div className="relative flex-none w-[112px] sm:w-[128px] self-stretch min-h-[124px] rounded-xl bg-white border border-[#193174]/8 grid place-items-center overflow-hidden">
                          {product.img ? (
                            <img
                              src={product.img}
                              alt={product.name}
                              loading="lazy"
                              className="max-h-[94%] max-w-[94%] object-contain transition-transform duration-500 ease-out group-hover:scale-106"
                            />
                          ) : (
                            <span className="text-[26px] font-bold text-[#193174]/70 leading-none">
                              {product.catLabel.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex flex-col flex-1">
                          <span className="text-[0.62rem] font-bold text-[#43791f] uppercase tracking-[0.16em]">
                            {product.catLabel}
                          </span>
                          <h3 className="text-[1.05rem] font-bold text-[#193174] leading-snug mt-1 mb-1 truncate group-hover:text-[#43791f] transition-colors duration-200">
                            {product.name}
                          </h3>
                          <p className="text-[0.83rem] text-[#193174]/50 leading-relaxed line-clamp-2">
                            {product.note || 'Pioneering agricultural solution formulated for optimal plant efficiency and crop health.'}
                          </p>

                          <div className="mt-auto pt-3.5 flex items-center gap-3">
                            <a
                              href={`/product/${slug}`}
                              className="inline-flex items-center gap-1 text-[0.8rem] font-bold text-[#193174]/75 hover:text-[#193174] transition-colors"
                            >
                              View spec
                              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </a>
                            <span className="w-px h-3.5 bg-[#193174]/12" />
                            <a
                              href={`mailto:sml@sml-ltd.com?subject=Enquiry about SML ${product.name}&body=Hello SML Team,%0D%0A%0D%0AI am writing to enquire about your product: ${product.name} (${product.catLabel}). Please share details regarding specifications, packaging availability, and pricing.%0D%0A%0D%0AThank you.`}
                              className="inline-flex items-center text-[0.78rem] font-bold text-white bg-[#43791f] hover:bg-[#365f1a] px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Enquire
                            </a>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>

                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#193174] bg-white border border-[#193174]/10 hover:border-[#43791f]/40 hover:text-[#43791f] rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 cursor-pointer"
                    >
                      Show more
                      <ChevronDown className="w-4 h-4" />
                      <span className="bg-[#193174]/6 text-[#193174]/60 text-xs px-2 py-0.5 rounded font-bold tabular-nums">
                        {products.length - visibleCount} left
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
