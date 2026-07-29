import { DIVISIONS } from '@/data/site'
import { vars } from '@/lib/css'

export default function Divisions() {
  return (
    <section id="business" className="py-14 md:py-20 lg:py-24">
      <div className="wrap">
        <div className="max-w-[780px] mx-auto mb-9 md:mb-[4vw] lg:mb-13 text-center" data-reveal>
          <span className="block text-[0.78rem] font-semibold text-[#43791f] mb-[0.9rem] uppercase tracking-wider">Our Business</span>
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
                <div className={`w-[38px] h-[38px] grid place-items-center rounded-full text-[0.74rem] font-semibold mb-[1.3rem] transition-colors duration-300 ${
                  isFeatured ? 'bg-white/22 text-white' : 'bg-white text-[#193174]/55'
                }`}>
                  {String(i + 1).padStart(2, '0')}.
                </div>
                <h3 className={`text-[1.08rem] font-[650] leading-[1.3] m-0 ${
                  isFeatured ? 'text-white' : 'text-[#193174]'
                }`}>
                  {division.name}
                </h3>
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
