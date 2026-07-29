import { DIVISIONS } from '@/data/site'
import { vars } from '@/lib/css'

export default function Divisions() {
  return (
    <section id="business" className="pt-10 md:pt-12 pb-14 md:pb-20 lg:pb-24">
      <div className="wrap">
        <div className="max-w-[780px] mx-auto mb-9 md:mb-[4vw] lg:mb-13 text-center" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-[0.9rem] px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">Our Business</span>
          <h2 className="text-[1.7rem] md:text-[3.2vw] lg:text-[2.6rem] leading-[1.25] m-0 text-[#193174] font-bold" data-reveal="blur">
            Comprehensive agricultural solutions designed to <em className="not-italic text-[#43791f]">support</em> soil health, crop
            protection, and growers worldwide.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIVISIONS.map((division, i) => {
            const isFeatured = i === 0
            return (
              <div
                className={`flex flex-col min-h-[260px] max-[620px]:min-h-0 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm group ${
                  isFeatured 
                    ? 'bg-[#43791f] hover:bg-[#365f1a]' 
                    : 'bg-[#193174]/4'
                }`}
                key={division.name}
                data-reveal
                style={vars({ '--d': `${i * 80}ms` })}
              >
                {/* Below sm the number sits beside the title; above it, stacked. */}
                <div className="flex items-center gap-[0.9rem] sm:block">
                  <div className={`shrink-0 w-[38px] h-[38px] grid place-items-center rounded-full text-[0.74rem] font-semibold sm:mb-[1.3rem] transition-colors duration-300 ${
                    isFeatured ? 'bg-white/22 text-white' : 'bg-white text-[#193174]/55'
                  }`}>
                    {String(i + 1).padStart(2, '0')}.
                  </div>
                  <h3 className={`text-[1.08rem] font-[650] leading-[1.3] m-0 ${
                    isFeatured ? 'text-white' : 'text-[#193174]'
                  }`}>
                    {division.name}
                  </h3>
                </div>
                <p className={`mt-auto pt-7 max-[620px]:pt-[1.1rem] text-[0.82rem] leading-[1.6] ${
                  isFeatured ? 'text-white/85' : 'text-[#193174]/55'
                }`}>
                  {division.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
