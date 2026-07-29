'use client'

import { useRef } from 'react'

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
        <span className="absolute left-4 bottom-1 flex items-stretch min-w-[164px] overflow-hidden rounded-[11px] bg-white ring-1 ring-[#193174]/10 shadow-[0_14px_34px_rgba(25,49,116,0.18),0_2px_6px_rgba(25,49,116,0.08)]">
          {/* the accent takes the colour of whatever the cursor is standing on */}
          <i className="w-[3px] flex-none bg-[#193174] group-data-[tone=reach]/stage:bg-[#43791f] group-data-[tone=none]/stage:bg-[#193174]/20" />
          <span className="block px-3 py-2 whitespace-nowrap">
            <b className="block text-[0.86rem] font-bold leading-tight text-[#193174]" data-map-name />
            <i className="block not-italic text-[0.61rem] font-bold tracking-[0.09em] uppercase mt-1 text-[#193174]/65 group-data-[tone=reach]/stage:text-[#43791f] group-data-[tone=none]/stage:text-[#193174]/40" data-map-kind />
            <i className="block not-italic text-[0.7rem] leading-snug mt-0.5 text-[#193174]/45 empty:hidden" data-map-note />
          </span>
        </span>
      </span>
    </div>
  )
}

export default function Footprint() {
  return (
    /* Divisions follows on the same white, so the bottom padding is trimmed —
       the two sections share one gap instead of stacking two */
    <section className="bg-white relative z-10 pt-14 md:pt-20 lg:pt-24 pb-10 md:pb-12" id="footprint">
      <div className="wrap">
        <div className="max-w-[680px] mb-11 mx-auto text-center" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-4 px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">
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
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 -mt-3 mx-auto" data-reveal>
          {/* the two site swatches mirror the beacons drawn on the map */}
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-[550] text-[#193174]">
            <i className="relative size-[13px] flex-none inline-block rounded-full bg-white ring-1 ring-[#193174]/20 before:content-[''] before:absolute before:inset-[3.5px] before:rounded-full before:bg-[#193174]" aria-hidden="true" />
            Manufacturing Unit
          </span>
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-[550] text-[#193174]">
            <i className="w-[11.5px] h-[11.5px] flex-none inline-block bg-[#43791f] rounded-[2px]" aria-hidden="true" />
            SML global customer reach
          </span>
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-[550] text-[#193174]">
            <i className="relative size-[12px] flex-none inline-block rotate-45 rounded-[2px] bg-white ring-1 ring-[#193174]/20 before:content-[''] before:absolute before:inset-[3px] before:rounded-[1px] before:bg-[#193174]" aria-hidden="true" />
            National Headquarters
          </span>
        </div>

      </div>
    </section>
  )
}
