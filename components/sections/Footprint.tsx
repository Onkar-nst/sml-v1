'use client'

import { useRef } from 'react'

import { MapPin } from '@/components/ui/icons'
import { useWorldMap } from '@/hooks/useWorldMap'
import { useMapPointer } from '@/hooks/useMapPointer'

/** The map, or the flat fallback image until (or unless) the SVG arrives. */
function MapHolder() {
  const stage = useRef<HTMLDivElement>(null)
  const holder = useRef<HTMLDivElement>(null)
  const markup = useWorldMap(holder)
  useMapPointer(stage, Boolean(markup))

  return (
    <div className="relative max-w-[1080px] mx-auto mb-10 group/stage" ref={stage}>
      {markup ? (
        <div
          className="w-full"
          ref={holder}
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ) : (
        <div className="w-full" ref={holder}>
          <noscript>
            <img
              src="https://sml-ltd.com/wp-content/uploads/2024/02/map-mobile.svg"
              alt="SML global customer reach across 80+ countries"
              className="w-full"
            />
          </noscript>
        </div>
      )}

      {/* both track the cursor through --mx/--my, set by useMapPointer */}
      <span 
        className="absolute top-0 left-0 w-[300px] h-[300px] -mt-[150px] -ml-[150px] rounded-full pointer-events-none opacity-0 bg-[radial-gradient(circle,rgba(67,121,31,0.22),rgba(67,121,31,0.07)_45%,transparent_70%)] [transform:translate3d(var(--mx,-999px),var(--my,-999px),0)] transition-opacity duration-350 ease-out group-hover/stage:opacity-100" 
        aria-hidden="true" 
      />
      <span 
        className="absolute top-0 left-0 pointer-events-none opacity-0 [transform:translate3d(var(--mx,-999px),var(--my,-999px),0)] transition-opacity duration-160 ease-out z-[3] group-data-[tip=on]/stage:opacity-100" 
        aria-hidden="true"
      >
        <b className="absolute left-4 bottom-[2px] display:block px-[0.62rem] py-[0.34rem] rounded-[7px] text-white text-[0.78rem] font-semibold leading-[1.35] whitespace-nowrap shadow-sm group-data-[reach=yes]/stage:bg-[#43791f] bg-[#193174]">
          <span data-map-name />
          <i className="block not-italic text-[0.6rem] font-semibold tracking-[0.07em] uppercase opacity-[0.82] empty:hidden" data-map-note />
        </b>
      </span>
    </div>
  )
}

export default function Footprint() {
  return (
    <section className="bg-white relative z-10 py-14 md:py-20 lg:py-24" id="footprint">
      <div className="wrap">
        <div className="max-w-[680px] mb-11 mx-auto text-center" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-4 before:content-[''] before:w-5 before:h-[2px] before:bg-current before:rounded-sm">
            Global Footprint
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#193174] leading-[1.15] tracking-tight mb-2" data-reveal="blur">
            A global agri solution company
          </h2>
          <p className="text-[clamp(1rem,1.6vw,1.15rem)] max-w-[780px] mx-auto text-[#193174]/55">
            We are a global agri solution company in the USA, Europe, Australia, the Middle East,
            South America, Asia, and New Zealand.
          </p>
        </div>

        {/* each country flies in from its own bearing to assemble the map */}
        <MapHolder />

        {/* compact single-line legend; the SVG's baked-in legend card is hidden */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 -mt-3 mx-auto mb-9" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-[550] text-[#193174]">
            <MapPin className="text-[#193174] flex-none" />
            Manufacturing Unit
          </span>
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-[550] text-[#193174]">
            <i className="w-[11.5px] h-[11.5px] flex-none inline-block bg-[#43791f] rounded-[2px]" aria-hidden="true" />
            SML global customer reach
          </span>
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-[550] text-[#193174]">
            <i className="w-0 h-0 flex-none inline-block border-l-[6.5px] border-l-transparent border-r-[6.5px] border-r-transparent border-b-[11.5px] border-b-[#193174]" aria-hidden="true" />
            National Headquarters
          </span>
        </div>

      </div>
    </section>
  )
}
