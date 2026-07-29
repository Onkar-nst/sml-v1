import type { Metadata } from 'next'

import Catalogue from '@/components/sections/Catalogue'

export const metadata: Metadata = {
  title: 'Our Products | SML Limited',
  description:
    'Browse the complete SML catalogue — insecticides, fungicides, herbicides, ' +
    'crop nutrition, biologicals and PGR, from five decades of research.',
}

export default function ProductsPage() {
  return (
    <section className="pt-40 pb-20" id="products">
      <div className="wrap">
        <div className="max-w-[680px] mx-auto text-center mb-10" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-[0.9rem] px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">
            Our Products
          </span>
          <h1 className="text-[1.9rem] md:text-[3.2vw] lg:text-[2.7rem] leading-[1.18] m-0 text-[#193174] font-bold">
            The complete SML catalogue
          </h1>
          <p className="mt-4 text-[1.02rem] leading-[1.7] text-[#193174]/60 m-0">
            Every formulation we take to growers, across all six categories.
            Pick a category or browse the full range.
          </p>
        </div>

        <Catalogue />
      </div>
    </section>
  )
}
