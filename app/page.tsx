import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Presence from '@/components/sections/Presence'
import Solutions from '@/components/sections/Solutions'
import Brand from '@/components/sections/Brand'
import Mantra from '@/components/sections/Mantra'
import Footprint from '@/components/sections/Footprint'
import Faq from '@/components/sections/Faq'
import Cta from '@/components/sections/Cta'
import Divisions from '@/components/sections/Divisions'
// import Gallery from '@/components/sections/Gallery'
// import Recognition from '@/components/sections/Recognition'

/**
 * The homepage, in the order the sections appear.
 *
 * Everything here is a Server Component except the pieces that hold state
 * or measure the DOM — the Presence counters, Footprint (map assembly) and
 * Faq (accordion).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      {/* the counters back up the scale claims About just made */}
      <Presence />
      <Solutions />
      <Brand />
      <Mantra />
      <Footprint />
      <Divisions />
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
