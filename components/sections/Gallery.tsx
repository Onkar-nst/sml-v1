import { GALLERY_SHOTS } from '@/data/site'
import { vars } from '@/lib/css'
import styles from './Gallery.module.css'

/**
 * A four-across photo wall. The head is held inside `.wrap` with the rest of
 * the page, while the grid breaks out to a wider container so the images read
 * as one continuous band.
 */
export default function Gallery() {
  return (
    <section className={styles.gallery} id="gallery">
      <div className="wrap">
        <div className={styles.head} data-reveal="stagger">
          <div>
            <span className="eyebrow eyebrow--chip">Our Gallery</span>
            <h2>
              Showcasing five decades
              <br />
              of <span className={styles.accent}>agricultural innovation</span>
            </h2>
          </div>
          <p className={styles.lede}>
            From our laboratories to the farms we serve: research, formulation and the
            growers across 80+ countries who put it all to work in the field.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {GALLERY_SHOTS.map((shot, i) => (
          <figure
            className={styles.tile}
            key={shot.img}
            data-reveal
            /* the delay resets each row, so both rows cascade left to right */
            style={vars({ '--d': `${(i % 4) * 90}ms` })}
          >
            <img src={shot.img} alt={shot.alt} loading="lazy" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
