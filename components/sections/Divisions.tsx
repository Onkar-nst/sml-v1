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

        {/* Below sm the divisions ride a horizontal scroller — one and a half
            cards to a screen, so the row reads as swipeable at a glance.
            Because the trailing pr-4 matches the gap, 100% / 1.5 of the padded
            box lands the cut on the gutter at every phone width.

            Horizontal-only on touch: touch-pan-x locks a swipe that starts on a
            card to the horizontal axis, and overflow-y-hidden stops the box
            from picking up a vertical scroll of its own — declaring overflow on
            one axis makes the browser treat the other as `auto`. Mandatory
            snapping lands each swipe on a card, and overscroll-x-contain keeps a
            fling at either end from chaining out to the browser's back gesture.
            All of it is dropped at sm, where the row becomes a plain grid. */}
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden py-1 pr-4 snap-x snap-mandatory touch-pan-x overscroll-x-contain scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:overflow-y-visible sm:py-0 sm:pr-0 sm:touch-auto sm:snap-none">
          {DIVISIONS.map((division, i) => {
            const isFeatured = i === 0
            return (
              <div
                className={`flex flex-col flex-none w-[calc(100%/1.5)] snap-start sm:w-auto min-h-[260px] max-[620px]:min-h-0 rounded-2xl p-6 max-[620px]:px-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm group ${
                  isFeatured 
                    ? 'bg-[#43791f] hover:bg-[#365f1a]' 
                    : 'bg-[#193174]/4'
                }`}
                key={division.name}
                data-reveal
                style={vars({ '--d': `${i * 80}ms` })}
              >
                {/* The number stacks above the title at every width — beside it,
                    a name as long as Sumil Chemical Industries has barely half a
                    carousel card to wrap into. */}
                <div>
                  <div className={`shrink-0 w-[38px] h-[38px] grid place-items-center rounded-full text-[0.74rem] font-semibold mb-4 sm:mb-[1.3rem] transition-colors duration-300 ${
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
                {/* The copy follows straight on from the name, and the facts take
                    the room the old mt-auto push left empty between them — sized
                    so a three-fact card still lands inside the 260px minimum
                    rather than growing the row. */}
                <p className={`mt-1.5 text-[0.82rem] leading-[1.55] ${
                  isFeatured ? 'text-white/85' : 'text-[#193174]/55'
                }`}>
                  {division.body}
                </p>

                <ul className="list-none p-0 m-0 mt-[0.85rem] flex flex-col gap-[0.3rem]">
                  {division.facts.slice(0, 3).map((fact) => (
                    <li
                      key={fact}
                      className={`flex items-start gap-2 text-[0.76rem] leading-[1.45] ${
                        isFeatured ? 'text-white/80' : 'text-[#193174]/65'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex-none size-[5px] rounded-full mt-[0.4rem] ${
                          isFeatured ? 'bg-white/70' : 'bg-[#43791f]'
                        }`}
                      />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
