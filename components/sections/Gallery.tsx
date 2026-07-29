import { GALLERY_SHOTS } from '@/data/site'
import { vars } from '@/lib/css'

/**
 * A four-across photo wall. The head is held inside `.wrap` with the rest of
 * the page, while the grid breaks out to a wider container so the images read
 * as one continuous band.
 */
export default function Gallery() {
  return (
    <section className="pb-12 md:pb-[6vw] lg:pb-18 pt-14 md:pt-20 lg:pt-24" id="gallery">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-[1.2rem] mb-7 md:mb-[3.5vw] lg:mb-10" data-reveal="stagger">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-4 bg-green-50/60 px-3 py-1 rounded-full border border-green-100/50">
              Our Gallery
            </span>
            <h2 className="m-0 text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#193174] leading-[1.2] tracking-tight" data-reveal="blur">
              Showcasing five decades
              <br />
              of <span className="text-[#43791f]">agricultural innovation</span>
            </h2>
          </div>
          <p className="max-w-[380px] m-0 text-[0.93rem] leading-[1.7] text-[#193174]/55">
            From our laboratories to the farms we serve: research, formulation and the
            growers across 80+ countries who put it all to work in the field.
          </p>
        </div>
      </div>

      <div className="w-[calc(100%-1.6rem)] max-w-[1560px] mx-auto grid grid-cols-2 min-[621px]:grid-cols-3 min-[901px]:grid-cols-4 gap-[0.45rem] min-[621px]:gap-[0.55rem] [&>figure:nth-child(n+7)]:max-[900px]:hidden [&>figure:nth-child(n+7)]:max-[621px]:block">
        {GALLERY_SHOTS.map((shot, i) => (
          <figure
            className="relative m-0 overflow-hidden rounded-[10px] bg-[#193174]/5 aspect-[4/3.4] group"
            key={shot.img}
            data-reveal
            /* the delay resets each row, so both rows cascade left to right */
            style={vars({ '--d': `${(i % 4) * 90}ms` })}
          >
            <img src={shot.img} alt={shot.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-106" />
            <figcaption className="absolute inset-x-0 bottom-0 px-[0.9rem] pb-[0.85rem] pt-[2.4rem] text-[0.82rem] font-semibold text-white bg-[linear-gradient(180deg,rgba(25, 49, 116, 0),rgba(25, 49, 116, 0.82))] opacity-0 translate-y-2 transition-all duration-350 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 max-[620px]:text-[0.76rem] max-[620px]:px-[0.7rem] max-[620px]:pb-[0.7rem] max-[620px]:pt-8 [media(hover:none)]:opacity-100 [media(hover:none)]:translate-y-0">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
