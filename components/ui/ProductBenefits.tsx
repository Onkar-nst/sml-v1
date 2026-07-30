'use client'

import { useState } from 'react'

import { ChevronDown } from '@/components/ui/icons'

/** claims shown before the list is collapsed behind the toggle */
const VISIBLE = 4

/**
 * Several published claims are written as "Lead-in: the detail". Where that
 * holds, the lead-in is pulled out and set in bold; anything longer than a
 * short phrase is left as one run of prose.
 */
function splitBenefit(text: string): { lead: string | null; rest: string } {
  const i = text.indexOf(':')
  if (i > 0 && i <= 46) {
    return { lead: text.slice(0, i), rest: text.slice(i + 1).trim() }
  }
  return { lead: null, rest: text }
}

/** one numbered claim — the tile carries its own hover state */
function BenefitTile({ benefit, index }: { benefit: string; index: number }) {
  const { lead, rest } = splitBenefit(benefit)
  return (
    <li className="group relative flex gap-3 rounded-xl border border-[#193174]/8 bg-[#f7f5ef]/70 p-4 hover:border-[#43791f]/40 hover:bg-white hover:shadow-[0_10px_24px_rgba(25,49,116,0.06)] hover:-translate-y-0.5 transition-all duration-300 ease-out">
      <span className="flex-none grid place-items-center w-8 h-8 rounded-lg bg-[#43791f] text-white text-[0.72rem] font-bold tabular-nums shadow-[0_4px_10px_rgba(67,121,31,0.25)] transition-transform duration-300 group-hover:scale-105">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="text-[0.86rem] leading-[1.6] text-[#193174]/65 m-0">
        {lead && <b className="block text-[#193174] font-bold mb-0.5">{lead}</b>}
        {rest}
      </p>
    </li>
  )
}

/**
 * The claim list, capped at four tiles. Anything beyond that sits behind a
 * toggle styled as the tile that would have come next, so the section keeps a
 * predictable height on products that publish a long list. The hidden tiles
 * stay in the markup — they are page copy, and should be there to be read
 * whether or not the toggle is ever pressed.
 */
export default function ProductBenefits({ benefits }: { benefits: string[] }) {
  const [expanded, setExpanded] = useState(false)

  const hasMore = benefits.length > VISIBLE
  const head = hasMore ? benefits.slice(0, VISIBLE) : benefits
  const tail = hasMore ? benefits.slice(VISIBLE) : []

  return (
    <>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {head.map((benefit, i) => (
          <BenefitTile key={benefit} benefit={benefit} index={i} />
        ))}
      </ul>

      {hasMore && (
        <>
          <div
            className={`grid transition-[grid-template-rows] duration-350 ease-out ${
              expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
            id="benefits-more"
            role="region"
            aria-label="Further benefits"
          >
            <div className="overflow-hidden">
              <ul className="list-none p-0 m-0 pt-3 flex flex-col gap-3">
                {tail.map((benefit, i) => (
                  <BenefitTile key={benefit} benefit={benefit} index={VISIBLE + i} />
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="benefits-more"
            className="group mt-3 w-full flex items-center gap-3 rounded-xl border border-dashed border-[#43791f]/35 bg-white p-4 cursor-pointer text-left hover:border-[#43791f]/70 hover:bg-[#43791f]/4 transition-all duration-300 ease-out"
          >
            <span
              className={`flex-none grid place-items-center w-8 h-8 rounded-lg bg-[#43791f]/10 text-[#43791f] transition-transform duration-300 ${
                expanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
              }`}
            >
              <ChevronDown />
            </span>
            <span className="text-[0.86rem] font-bold text-[#43791f]">
              {expanded ? 'View less' : `View ${tail.length} more`}
            </span>
          </button>
        </>
      )}
    </>
  )
}
