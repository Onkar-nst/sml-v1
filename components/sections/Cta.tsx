import { CONTACT } from '@/data/site'
import { Mail } from '@/components/ui/icons'

export default function Cta() {
  return (
    <section id="contact" className="py-14 md:py-20 lg:py-24">
      <div className="wrap">
        <div 
          className="relative rounded-2xl overflow-hidden px-[clamp(1.6rem,5vw,4rem)] py-[clamp(3.5rem,7vw,6rem)] text-center isolate after:content-[''] after:absolute after:inset-0 after:-z-10 after:bg-[#193174]/78" 
          data-reveal
        >
          <img
            src="https://sml-ltd.com/wp-content/uploads/2024/10/sml-banner4-1.jpg"
            alt="Farmers reviewing a crop in the field"
            className="absolute inset-0 -z-20 w-full h-full object-cover"
          />
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-white mb-4 px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">
            Get in touch
          </span>
          <h2 className="text-white max-w-[620px] mx-auto text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-2" data-reveal="blur">
            Let&apos;s grow more from less
          </h2>
          <p className="text-white/85 text-[1.02rem] max-w-[560px] mx-auto mt-0 mb-8 leading-[1.7]">
            Whether you are a farmer, a distributor or an international partner, our team is
            ready to help you find the right solution for your soil and your crop.
          </p>
          <div className="flex gap-[0.85rem] justify-center flex-wrap">
            <a 
              href={`mailto:${CONTACT.email}`} 
              className="inline-flex items-center justify-center gap-[0.55rem] px-[1.85rem] py-[0.95rem] rounded-full font-sans font-semibold text-[0.95rem] cursor-pointer transition-all duration-300 ease-out whitespace-nowrap bg-[#f4f0e5] text-[#1f3d2c] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
            >
              Email Our Team
              <Mail />
            </a>
            <a 
              href={CONTACT.phoneHref} 
              className="inline-flex items-center justify-center px-[1.85rem] py-[0.95rem] rounded-full font-sans font-semibold text-[0.95rem] border border-white/45 text-white cursor-pointer transition-all duration-300 ease-out whitespace-nowrap hover:bg-[#f4f0e5] hover:text-[#1f3d2c] hover:border-[#f4f0e5] hover:-translate-y-0.5"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
