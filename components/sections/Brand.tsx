import { vars } from '@/lib/css'

/** The three things the Reap name stands for, from the brand copy. */
const PILLARS = [
  { title: 'Nourish', body: 'Balanced nutrition for every stage of the crop.' },
  { title: 'Shield', body: 'Responsible protection from seed to yield.' },
  { title: 'Grow', body: 'More yield, more quality, more income for the farmer.' },
]

export default function Brand() {
  return (
    <section 
      id="brand" 
      className="relative isolate overflow-hidden py-18 md:py-24 lg:py-26 bg-[linear-gradient(135deg,#193174_0%,#122559_52%,#365f1a_145%)] text-white/78"
    >
      {/* the brand mantra — "more from less" — as a quiet Devanagari watermark */}
      <span 
        className="absolute -z-10 -right-2 top-[-0.16em] font-serif text-[6.5rem] md:text-[13vw] lg:text-[11.5rem] font-semibold leading-none whitespace-nowrap text-white/[0.045] pointer-events-none select-none" 
        aria-hidden="true"
      >
        कम से अधिक
      </span>

      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-[6vw] lg:gap-24 items-start">
          <div className="flex flex-col items-start" data-reveal="stagger">
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
              <span className="inline-block flex-none">
                <img src="https://sml-ltd.com/wp-content/uploads/2024/10/Reap.jpg" alt="Reap brand mark" className="w-[118px]" />
              </span>
              <div>
                <span className="inline-flex items-center gap-2 text-[0.76rem] font-bold tracking-[0.22em] uppercase text-[#a9cf87] mb-2.5 before:content-[''] before:w-5 before:h-[2px] before:bg-current before:rounded-sm">
                  Our Brand
                </span>
                <h2 className="text-white text-[1.9rem] md:text-[3.2vw] lg:text-[2.5rem] leading-[1.18] tracking-tight m-0">
                  One name. One leaf. 
                </h2>
                <h4 className='text-white '>
                   From our science to your soil,{" "}
                  <em className="not-italic text-[#a9cf87]">a harvest worth reaping.</em>
                  </h4>
              </div>
            </div>
            <p className="text-[0.98rem] leading-[1.75] max-w-[46ch] mb-8 text-white/72">
              The <strong className="text-white font-[650]">Reap</strong> brand is recognised for quality that helps nourish,
              shield and increase growth and yield — the word sits intertwined within a leaf,
              a visual ode to our agricultural mission.
            </p>
          </div>

          <div className="grid" data-reveal="stagger" style={vars({ '--d': '150ms' })}>
            {PILLARS.map((pillar, i) => (
              <div className="flex gap-[1.2rem] items-baseline py-[1.35rem] border-t border-white/16 last:border-b last:border-white/16" key={pillar.title}>
                <span className="flex-none text-[1.2rem] font-[750] tracking-wider text-[#a9cf87] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-white text-[0.98rem] font-bold tracking-wider uppercase mb-1.5">{pillar.title}</h3>
                  <p className="text-[0.9rem] leading-[1.6] m-0 text-white/60">{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
