import Hero from '@/components/sections/Hero'
import WhySml from '@/components/sections/WhySml'
import About from '@/components/sections/About'
import Presence from '@/components/sections/Presence'
import Solutions from '@/components/sections/Solutions'
import Brand from '@/components/sections/Brand'
import Mantra from '@/components/sections/Mantra'
import Footprint from '@/components/sections/Footprint'
import Faq from '@/components/sections/Faq'
import Cta from '@/components/sections/Cta'
// import Divisions from '@/components/sections/Divisions'
// import Gallery from '@/components/sections/Gallery'
// import Recognition from '@/components/sections/Recognition'

/**
 * The homepage, in the order the sections appear.
 *
 * Everything here is a Server Component except Hero's neighbours that hold
 * state or measure the DOM — WhySml (drag rail), Presence (marquee and
 * counters), Footprint (map assembly) and Faq (accordion).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySml />
      <About />
      <Presence />
      <Solutions />
      <Brand />
      <Mantra />
      <Footprint />
      {/* Divisions is hidden for now — uncomment this and the import above,
          plus the #business entries in data/site.ts, to bring it back. */}
      {/* <Divisions /> */}
      {/* Recognition is hidden for now — uncomment this and the import above,
          plus the #trust entries in data/site.ts, to bring it back. */}
      {/* <Recognition /> */}
      {/* Gallery is hidden for now — uncomment this and the import above to
          bring it back; its content lives in GALLERY_SHOTS. */}
      {/* <Gallery /> */}
      <Faq />
      <Cta />
    </>
  )
}
