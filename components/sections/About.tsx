import { ArrowRight, CheckCircle } from '@/components/ui/icons'

export default function About() {
  return (
    <section id="about" className="py-14">
      <div className="wrap">
        {/* from lg the two columns share a row height, so the photo runs the full
            length of the copy beside it instead of sitting centred and short */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-10 md:gap-[5vw] lg:gap-[4.5rem] items-center lg:items-stretch">
          <div className="flex flex-col items-start py-2 md:py-[1.5vw] lg:py-6" data-reveal>
            <span className="eyebrow">About SML</span>
            <h2 className="text-[1.75rem] md:text-[2.8vw] lg:text-[2.35rem] leading-[1.14] tracking-tight mb-[0.9em]" data-reveal="blur">
              Rooted in the soil, driven by research
            </h2>
            {/* same ink as the points below it — the intro used to sit lighter
                than the list and read as secondary to it */}
            <p className="text-[0.97rem] leading-[1.8] max-w-[32rem] text-[#193174]/78">
              SML Limited, formerly Sulphur Mills Limited, is a global leader in advanced
              agricultural solutions, bringing science and passion together across soil
              health, nutrition, biologicals and crop protection.
            </p>

            <ul className="list-none p-0 m-0 mt-6 flex flex-col gap-[0.85rem] max-w-[32rem]">
              <li className="flex items-start gap-[0.65rem] text-[0.92rem] leading-[1.6] text-[#193174]/78">
                <CheckCircle size={18} className="text-[#43791f] flex-shrink-0 mt-[0.2rem]" />
                <span>
                  <b className="text-[#193174] font-semibold">Global Reach:</b> Trusted by growers across 80+ countries with offices in India, Brazil, and beyond.
                </span>
              </li>
              <li className="flex items-start gap-[0.65rem] text-[0.92rem] leading-[1.6] text-[#193174]/78">
                <CheckCircle size={18} className="text-[#43791f] flex-shrink-0 mt-[0.2rem]" />
                <span>
                  <b className="text-[#193174] font-semibold">Research & Innovation:</b> Pioneering state-of-the-art formulations driven by 50+ years of dedicated research.
                </span>
              </li>
              <li className="flex items-start gap-[0.65rem] text-[0.92rem] leading-[1.6] text-[#193174]/78">
                <CheckCircle size={18} className="text-[#43791f] flex-shrink-0 mt-[0.2rem]" />
                <span>
                  <b className="text-[#193174] font-semibold">Soil Health & Protection:</b> Comprehensive portfolio spanning biologicals, crop nutrition, and crop protection.
                </span>
              </li>
            </ul>

            {/* centred on the copy it follows — it shares the 32rem measure of the
                intro and the list, so it reads as the end of that block rather
                than a button parked at an arbitrary indent */}
            <div className="mt-auto pt-8 md:pt-[3vw] lg:pt-10 w-full max-w-[32rem] flex justify-center">
              <a
                href="#brand"
                className="group inline-flex items-center gap-4 pl-7 pr-2 py-2 rounded-full font-sans font-semibold text-[0.95rem] text-white whitespace-nowrap cursor-pointer bg-[linear-gradient(100deg,#5c9a37_0%,#43791f_58%,#356316_100%)] shadow-[0_10px_24px_rgba(67,121,31,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(67,121,31,0.34)]"
              >
                Our Story
                <span className="grid place-items-center size-[42px] rounded-full bg-white/22 transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
                  <ArrowRight size={18} />
                </span>
              </a>
            </div>
          </div>

          <div className="w-full order-first lg:order-none lg:h-full">
            <img
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=70"
              alt="Hands planting a seedling in a nursery tray"
              className="w-full h-auto aspect-[4/3] lg:aspect-auto lg:h-full max-h-[25rem] md:max-h-[42vw] lg:max-h-none object-cover rounded-2xl block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
