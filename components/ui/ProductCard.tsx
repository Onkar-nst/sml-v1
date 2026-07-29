import { ArrowRight } from '@/components/ui/icons'
import styles from './ProductCard.module.css'

export interface ProductCardProps {
  name: string
  /** category label shown above the name */
  tag: string
  note?: string
  img?: string
  /** show the "View details" affordance — the catalogue does, the shelf doesn't */
  showLink?: boolean
  /** entrance stagger, in ms */
  delay?: number
}

export default function ProductCard({
  name,
  tag,
  note,
  img,
  showLink = false,
  delay = 0,
}: ProductCardProps) {
  return (
    <article
      className={styles.card}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className={styles.thumb}>
        {img ? <img src={img} alt={name} loading="lazy" /> : null}
      </div>
      <div className={styles.body}>
        <div className={styles.tag}>{tag}</div>
        <h3>{name}</h3>
        {note ? <p className={styles.note}>{note}</p> : null}
        {showLink ? (
          <span className={styles.link}>
            View details <ArrowRight size={13} strokeWidth={2.6} />
          </span>
        ) : null}
      </div>
    </article>
  )
}
