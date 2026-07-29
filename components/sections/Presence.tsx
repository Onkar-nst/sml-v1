'use client'

import { useMemo, useRef } from 'react'

import { PRESENCE_STATS } from '@/data/site'
import { formatCount, useCountUp } from '@/hooks/useCountUp'
import { ICONS } from '@/components/ui/icons'

export default function Presence() {
  const grid = useRef<HTMLDivElement>(null)

  const targets = useMemo(() => PRESENCE_STATS.map((s) => s.count), [])
  const values = useCountUp(targets, grid)

  return (
    <section id="presence" className="md:-my-16">
      <div className="wrap">
        <div data-reveal>
          <div className="max-w-[680px] mb-11">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-4 before:content-[''] before:w-5 before:h-[2px] before:bg-current before:rounded-sm">
              Our Presence
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#193174] leading-[1.15] tracking-tight mb-2" data-reveal="blur">
              Scale that backs the science
            </h2>
          </div>

          <div 
            className="grid grid-cols-1 min-[521px]:grid-cols-2 md:grid-cols-3 gap-[1px] bg-[#193174]/9 border border-[#193174]/14 rounded-2xl overflow-hidden" 
            ref={grid}
          >
            {PRESENCE_STATS.map((stat, i) => {
              const Icon = ICONS[stat.icon]
              return (
                <div 
                  className="bg-white px-6 py-7 min-[521px]:px-[clamp(1.5rem,2.8vw,2.4rem)] min-[521px]:py-[clamp(2rem,3.6vw,3rem)]" 
                  key={stat.label}
                >
                  <div className="flex items-center gap-[0.9rem]">
                    <span className="flex-shrink-0 grid place-items-center w-10 h-10 min-[521px]:w-[46px] min-[521px]:h-[46px] rounded-full bg-[#43791f]/8 text-[#43791f]">
                      <Icon size={22} />
                    </span>
                    <b className="block text-[2.1rem] md:text-[4vw] lg:text-[3.1rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#193174] tabular-nums">
                      {formatCount(values[i] ?? 0, stat.suffix)}
                    </b>
                  </div>
                  <span className="block text-[0.92rem] leading-[1.5] text-[#193174]/55 mt-[0.6rem] min-[521px]:mt-4 max-w-none min-[521px]:max-w-[16rem]">
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
