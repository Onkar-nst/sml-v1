import { Flask, Users, CheckCircle } from '@/components/ui/icons'


const STATS = [
  {
    icon: Flask,
    value: '50+',
    label: 'Years of research behind every SML formulation.',
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'Channel partners taking our solutions to growers.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-14">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-10 md:gap-[5vw] lg:gap-[4.5rem] items-center">
          <div className="flex flex-col items-start py-2 md:py-[1.5vw] lg:py-6" data-reveal>
            <span className="eyebrow">About SML</span>
            <h2 className="text-[1.75rem] md:text-[2.8vw] lg:text-[2.35rem] leading-[1.14] tracking-tight mb-[0.9em]" data-reveal="blur">
              Rooted in the soil, driven by research
            </h2>
            <p className="text-[0.97rem] leading-[1.8] max-w-[29rem] text-[#193174]/55">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 w-full mt-auto pt-8 sm:pt-10 md:pt-[5vw] lg:pt-16">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={value} className="flex flex-col">
                  <span className="grid place-items-center w-[54px] h-[54px] rounded-full bg-[#43791f]/8 text-[#43791f] mb-[1.1rem]">
                    <Icon size={22} />
                  </span>
                  <b className="block text-[1.7rem] md:text-[2.4vw] lg:text-[2.15rem] font-[750] leading-none tracking-tight text-[#193174] mb-2">{value}</b>
                  <p className="text-[0.88rem] leading-[1.6] max-w-[15rem] sm:max-w-none m-0 text-[#193174]/55">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full order-first lg:order-none">
            <img
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=70"
              alt="Hands planting a seedling in a nursery tray"
              className="w-full h-auto aspect-[4/3] lg:aspect-auto max-h-[25rem] md:max-h-[42vw] lg:max-h-[34rem] object-cover rounded-2xl block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
