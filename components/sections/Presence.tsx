'use client'

import { useMemo, useRef } from 'react'

import { PRESENCE_STATS } from '@/data/site'
import { formatCount, useCountUp } from '@/hooks/useCountUp'
import { ICONS } from '@/components/ui/icons'

/** One leaf silhouette, centred on its own origin so each instance can just
 *  translate / rotate / scale without compensating maths. */
const LEAF = 'M0 -60 Q60 0 0 60 Q-60 0 0 -60 Z'

/** The leaves that crowd the panel's left and right shoulders. Purely
 *  decorative — mirrored on the right by flipping the element on its x axis. */
function LeafMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="currentColor">
        <path d={LEAF} transform="translate(18 62) rotate(-20) scale(1.25)" />
        <path d={LEAF} transform="translate(80 22) rotate(22) scale(0.95)" />
        <path d={LEAF} transform="translate(54 152) rotate(-58) scale(1.05)" />
        <path d={LEAF} transform="translate(132 98) rotate(8) scale(0.8)" />
        <path d={LEAF} transform="translate(8 196) rotate(38) scale(0.7)" />
      </g>
    </svg>
  )
}

/**
 * The count-up figure grid — the company at a glance, directly under About so
 * the scale claims in that copy land against the numbers that back them.
 *
 * The panel sits on a dark green ground with a leaf motif on either shoulder,
 * so the six figures read as one block against the white page. The cells stay
 * translucent to let that motif through, and the 1px grid gaps expose the
 * white-tinted hairline behind them.
 */
export default function Presence() {
  const grid = useRef<HTMLDivElement>(null)

  const targets = useMemo(() => PRESENCE_STATS.map((s) => s.count), [])
  const values = useCountUp(targets, grid)

  return (
    /* About already pads its own foot, so this section only pads below —
       otherwise the two paddings stack into a gap twice the size */
    <section id="presence" aria-label="SML at a glance" className="pt-0 pb-14 md:pb-18">
      <div className="wrap" data-reveal>
        {/* dark ground + leaf motif; the grid itself is unchanged and simply
            sits on top of it */}
        <div className="relative isolate overflow-hidden rounded-2xl border border-white/[0.14] shadow-[0_10px_34px_rgba(15,32,22,0.22)] bg-[linear-gradient(135deg,#22401f_0%,#26471f_55%,#1b3318_100%)]">
          <LeafMotif className="absolute -left-10 top-0 -z-10 h-full w-[220px] text-[#b5cf9a] opacity-[0.22]" />
          <LeafMotif className="absolute -right-10 top-0 -z-10 h-full w-[220px] scale-x-[-1] text-[#b5cf9a] opacity-[0.22]" />

          {/* two up on phones, so the six figures read as a 2 × 3 block rather
              than a column the reader has to scroll through; three up from md */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/[0.14] rounded-2xl overflow-hidden"
            ref={grid}
          >
            {PRESENCE_STATS.map((stat, i) => {
              const Icon = ICONS[stat.icon]
              return (
                <div
                  className="bg-[#1e3a1c]/65 px-4 py-5 min-[521px]:px-[clamp(1.5rem,2.8vw,2.4rem)] min-[521px]:py-[clamp(2rem,3.6vw,3rem)]"
                  key={stat.label}
                >
                  {/* the icon sits over the figure in the two-up layout — half a
                      phone width cannot hold the widest count beside it */}
                  <div className="flex flex-col items-start gap-2.5 min-[521px]:flex-row min-[521px]:items-center min-[521px]:gap-[0.9rem]">
                    <span className="flex-shrink-0 grid place-items-center w-9 h-9 min-[521px]:w-[46px] min-[521px]:h-[46px] rounded-full bg-[#b5cf9a]/15 text-[#b5cf9a]">
                      <Icon size={22} className="size-[19px] min-[521px]:size-[22px]" />
                    </span>
                    <b className="block text-[1.65rem] min-[521px]:text-[2.1rem] md:text-[4vw] lg:text-[3.1rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#f4f0e5] tabular-nums">
                      {formatCount(values[i] ?? 0, stat.suffix)}
                    </b>
                  </div>
                  <span className="block text-[0.8rem] min-[521px]:text-[0.92rem] leading-[1.45] min-[521px]:leading-[1.5] text-[#f4f0e5]/65 mt-2 min-[521px]:mt-4 max-w-none min-[521px]:max-w-[16rem]">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
