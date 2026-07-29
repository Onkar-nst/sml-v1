import { BROCHURE_URL, HERO } from '@/data/site'
import { ArrowRight } from '@/components/ui/icons'
import WhySml from './WhySml'

export default function Hero() {
  return (
    <div className="relative overflow-hidden isolate bg-[#162c20]" id="top">
      <div className="absolute inset-0 -z-20 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,rgba(22,44,32,0.3)_0%,rgba(22,44,32,0.62)_30%,rgba(15,32,22,0.96)_100%),linear-gradient(100deg,rgba(15,32,22,0.55),transparent_65%)]">
        <img src={HERO.image} alt={HERO.imageAlt} className="w-full h-full object-cover animate-hero-drift" />
      </div>

      <section className="min-h-[100svh] flex items-end pt-[calc(114px+3rem)] pb-0">
        <div className="wrap">
          <div className="max-w-[880px] pb-12 md:pb-[6vw] lg:pb-20">
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#b5cf9a] mb-[1.2rem] px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current animate-rise-in-eyebrow">
              {HERO.eyebrow}
            </span>
            <h1 className="text-[2.2rem] md:text-[4.6vw] lg:text-[3.6rem] font-bold leading-[1.15] tracking-tight text-[#f4f0e5] mb-[1.1rem] animate-rise-in-title">
              What we eat matters, then <em className="text-[#b5cf9a]">how we grow</em> matters even more
            </h1>
            <p className="text-[1rem] md:text-[1.5vw] lg:text-[1.05rem] text-[#f4f0e5]/80 max-w-[560px] mb-8 leading-[1.7] animate-rise-in-sub">
              {HERO.sub}
            </p>
            <div className="flex flex-wrap gap-[0.85rem] animate-rise-in-actions">
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-[0.55rem] px-[1.85rem] py-[0.95rem] rounded-full font-sans font-semibold text-[0.95rem] cursor-pointer transition-all duration-300 ease-out whitespace-nowrap bg-[#f4f0e5] text-[#1f3d2c] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] max-[560px]:flex-[1_1_100%] max-[560px]:text-center group"
              >
                Explore Products
                <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]" />
              </a>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center px-[1.85rem] py-[0.95rem] rounded-full font-sans font-semibold text-[0.95rem] border border-[#f4f0e5]/45 text-[#f4f0e5] cursor-pointer transition-all duration-300 ease-out whitespace-nowrap hover:bg-[#f4f0e5] hover:text-[#1f3d2c] hover:border-[#f4f0e5] hover:-translate-y-0.5 max-[560px]:flex-[1_1_100%] max-[560px]:text-center"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhySml />
    </div>
  )
}
