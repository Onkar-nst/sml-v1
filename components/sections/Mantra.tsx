import { MANTRA } from '@/data/site'
import { ICONS } from '@/components/ui/icons'
import { vars } from '@/lib/css'

export default function Mantra() {
  return (
    <section 
      className="relative overflow-hidden bg-white before:content-[''] before:absolute before:top-[-22%] before:right-[-6%] before:w-[min(46vw,620px)] before:aspect-square before:bg-[#43791f]/7 before:rounded-bl-[62%] before:pointer-events-none py-14 md:py-20 lg:py-24"
      id="mantra"
    >
      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[5vw] lg:gap-16 items-center">
          <div className="flex flex-col" data-reveal>
            <span className="eyebrow">Our Mantra</span>
            <h2 className="text-[1.6rem] md:text-[3vw] lg:text-[2.35rem] leading-snug m-0 mb-[1.2rem]" data-reveal="blur">
              Growing <em>more</em> from less
            </h2>
            <p className="text-[0.99rem] mb-4">
              Our products offer better efficacy, efficiency and speed of nutrient uptake, and stay
              available over a greater period of the crop cycle. That improves productivity and
              quality, and helps farmers earn sustainable profits.
            </p>
            <p className="text-[0.99rem] mb-4">
              We always aim to optimise dosage, reduce cost per acre, residues and toxicity, and
              restrict adverse environmental impacts. Our efficient formulations are largely
              free of solvents, making them environmentally friendly and sustainable.
            </p>
            <p className="text-[0.99rem] mb-0">
              Sustainable business growth has been our aim, and we work toward it tirelessly. In
              doing so, SML is creating a long and significant impact on soil health, farmer
              incomes and food security, reversing climate change and improving quality of life
              worldwide.
            </p>
            <blockquote className="mt-[1.7rem] px-6 py-[1.15rem] border-l-4 border-l-[#43791f] rounded-r-2xl bg-[#43791f]/7 text-[1.04rem] font-[650] italic leading-[1.5] text-[#193174]">
              &ldquo;More from less, for the farmer and the planet alike.&rdquo;
            </blockquote>
          </div>

          {/* #f6f7f9 is the navy-at-4% tint the section itself used to carry —
              set opaque so the green corner blob does not wash through it */}
          <div
            className="bg-[#f6f7f9] border border-[#193174]/9 rounded-[28px] p-5 md:p-[2.6vw] lg:p-7.5 shadow-[0_30px_70px_rgba(25,49,116,0.1)] grid gap-4 w-full max-w-[560px] lg:max-w-none"
            data-reveal="right" 
            style={vars({ '--d': '120ms' })}
          >
            <div className="grid place-items-center py-4 pb-6">
              <img src={MANTRA.art} alt="More from less" className="w-full max-w-[290px]" />
            </div>

            {/* the mantra is a two-word compound, so take it apart a word at a time */}
            <div className="grid grid-cols-1 min-[481px]:grid-cols-2 gap-4">
              {MANTRA.parts.map((part) => {
                const Icon = ICONS[part.icon]
                const isGreen = part.tone === 'green'
                return (
                  <div
                    className={`border rounded-2xl px-[1.15rem] pt-[1.2rem] pb-[1.35rem] ${
                      isGreen 
                        ? 'bg-[#43791f]/6 border-[#43791f]/16' 
                        : 'bg-[#193174]/5 border-[#193174]/13'
                    }`}
                    key={part.word}
                  >
                    <div className="flex items-center gap-[0.75rem] mb-[0.9rem]">
                      <div className={`flex-none w-[38px] h-[38px] grid place-items-center rounded-[11px] bg-white ${
                        isGreen ? 'text-[#43791f]' : 'text-[#193174]'
                      }`}>
                        <Icon size={19} strokeWidth={1.9} />
                      </div>
                      <div className={`text-[0.74rem] font-[750] tracking-[0.14em] uppercase ${
                        isGreen ? 'text-[#43791f]' : 'text-[#193174]'
                      }`}>
                        {part.word}
                      </div>
                    </div>
                    <p className="text-[0.85rem] leading-[1.6] m-0 text-[#193174]/78">{part.body}</p>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl px-[1.4rem] pt-[1.35rem] pb-[1.5rem] bg-[linear-gradient(100deg,#43791f,#193174)] text-white text-center">
              <b className="block text-[1.05rem] font-bold tracking-tight mb-[0.45rem]">Interpretation</b>
              <p className="m-0 text-[0.87rem] leading-[1.6] text-white/88">{MANTRA.interpretation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
