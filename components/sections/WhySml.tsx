import { WHY_CARDS } from '@/data/site'
import { ICONS } from '@/components/ui/icons'
import { vars } from '@/lib/css'

export default function WhySml() {
  return (
    <section className="relative z-10 pt-12 md:pt-[6vw] lg:pt-[4.5rem] pb-18 md:pb-[9vw] lg:pb-28" id="why">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-[1.2rem] mb-6 md:mb-[3vw] lg:mb-9.5" data-reveal="stagger">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#b5cf9a] mb-4 before:content-[''] before:w-5 before:h-[2px] before:bg-current before:rounded-sm">
              Why SML
            </span>
            <h2 className="m-0 text-[#f4f0e5] text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight" data-reveal="blur">
              A complete partner for the{' '}
              <span className="text-[#b5cf9a]">modern farmer</span>.
            </h2>
          </div>
          <p className="max-w-[420px] m-0 text-[0.96rem] leading-[1.7] text-[#f4f0e5]/80">
            SML delivers everything a modern farmer needs under one roof, grown from five
            decades of research and trusted by growers across 80+ countries.
          </p>
        </div>
      </div>

      {/* the row scrolls inside the container, so cut-off cards clip on the
          gutter line and clear air stays between the row and the screen edges */}
      <div className="wrap">
        <div 
          className="flex gap-4 md:gap-[1.7vw] lg:gap-6 overflow-x-auto py-2 pb-5 pr-4 md:pr-[1.7vw] lg:pr-6 [scroll-snap-type:x_proximity] scrollbar-none" 
          aria-label="What SML offers"
        >
          {WHY_CARDS.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <article
                key={item.title}
                className="flex-none w-[clamp(240px,78vw,250px)] sm:w-[clamp(240px,calc((100%-3*clamp(1rem,1.7vw,1.5rem))/4.4),330px)] snap-start px-6 py-[1.75rem] border border-[#193174]/9 rounded-2xl bg-white/92 backdrop-blur-md shadow-sm transition-all duration-350 ease-out hover:-translate-y-1.5 hover:shadow-xl group"
                data-reveal
                style={vars({ '--d': `${i * 90}ms` })}
              >
                <span 
                  className={`grid place-items-center w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full text-white mb-[1.7rem] sm:mb-[2.2rem] transition-transform duration-400 ease-out group-hover:rotate-[-6deg] group-hover:scale-107 ${
                    item.tone === 'navy'
                      ? 'bg-[#193174] shadow-[0_10px_20px_rgba(25,49,116,0.25)]'
                      : 'bg-[#43791f] shadow-[0_10px_20px_rgba(67,121,31,0.28)]'
                  }`}
                >
                  <Icon size={26} strokeWidth={1.9} />
                </span>
                <h3 className="text-[1.15rem] font-bold text-[#193174] m-0 mb-2">{item.title}</h3>
                <p className="m-0 text-[0.93rem] leading-[1.6] text-[#193174]/55">{item.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
