import { AWARDS, CERTIFICATIONS } from '@/data/site'
import { Check } from '@/components/ui/icons'
import { vars } from '@/lib/css'

/**
 * Not currently rendered — see the commented-out `<Recognition />` in
 * app/page.tsx. The content is approved and ready; uncomment the one line to
 * bring it back, along with the #trust links in NAV_LINKS and FOOTER_COLUMNS.
 */
export default function Recognition() {
  return (
    <section id="trust" className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="wrap">
        <div className="max-w-[680px] mb-11 mx-auto text-center" data-reveal>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-4 px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">
            Recognition &amp; Accreditation
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#193174] leading-[1.15] tracking-tight mb-2" data-reveal="blur">
            Independently recognised
          </h2>
          <p className="text-[clamp(1rem,1.6vw,1.15rem)] max-w-[780px] mx-auto text-[#193174]/55">
            Our work is validated by industry bodies and backed by accredited laboratories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-[5vw] lg:gap-16 items-start">
          <div data-reveal>
            <ul className="list-none p-0 m-0">
              {AWARDS.map((award) => (
                <li 
                  className="flex items-baseline gap-[1.3rem] px-[0.3rem] py-[1.05rem] border-b border-[#193174]/9 first:border-t first:border-t-[#193174]/9 transition-transform duration-250 ease-out hover:translate-x-[5px]" 
                  key={`${award.year}-${award.title}`}
                >
                  <span className="flex-none w-[3.2rem] font-[750] text-[1.05rem] text-[#43791f]">{award.year}</span>
                  <div>
                    <b className="block text-[0.96rem] text-[#193174] font-[650]">{award.title}</b>
                    <span className="text-[0.82rem] text-[#193174]/55">{award.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div 
            className="bg-[#193174] text-white/85 rounded-2xl px-8 py-[2.2rem]" 
            data-reveal 
            style={vars({ '--d': '120ms' })}
          >
            <h3 className="text-white text-[1.3rem] font-bold mb-2">Accreditation &amp; compliance</h3>
            <p className="text-white/70 text-[0.93rem] mb-4">Regulatory data generated in our own laboratories, to the standards each market demands.</p>
            <ul className="list-none p-0 m-0 mt-[1.4rem] grid gap-[0.85rem]">
              {CERTIFICATIONS.map((cert) => (
                <li 
                  key={cert.title}
                  className="flex gap-[0.75rem] items-start text-[0.9rem] pb-[0.85rem] border-b border-white/14 last:border-b-0 last:pb-0"
                >
                  <Check className="flex-none mt-[3px] text-white bg-[#43791f] rounded-full p-[3px]" />
                  <span>
                    <b className="text-white">{cert.title}</b> {cert.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
