import { CATEGORY_TILES, FEATURED_PRODUCTS } from '@/data/site'
import { PRODUCTS } from '@/data/products'
import { ArrowRight } from '@/components/ui/icons'
import ProductCard from '@/components/ui/ProductCard'
import styles from './Solutions.module.css'

export default function Solutions() {
  return (
    <section id="solutions">
      <div className="wrap">
        <div className="section-head center" data-reveal>
          <span className="eyebrow">Our Solutions</span>
          <h2 data-reveal="blur">Our complete product solution</h2>
          <p>
            Nutrition, protection, biologicals and growth regulation, developed and
            manufactured in our own facilities.
          </p>
        </div>

        {/* five families as quiet text pills; the full range lives on the product page */}
        <div className={styles.catRow} data-reveal>
          {CATEGORY_TILES.map((tile) => (
            <a href={tile.href} className={styles.chip} key={tile.label}>
              {tile.label}
              <span className={styles.count}>{tile.count}</span>
            </a>
          ))}
        </div>

        {/* a short, curated shelf instead of the full catalogue */}
        <div>
          <div className={styles.featuredHead} data-reveal>
            <h3>Flagship formulations</h3>
            <a href="/products" className={styles.linkMore}>
              View all {PRODUCTS.length} products
              <ArrowRight size={13} strokeWidth={2.6} />
            </a>
          </div>
          <div className={styles.featuredGrid}>
            {FEATURED_PRODUCTS.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
