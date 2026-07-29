import type { Metadata } from 'next'

import { BROCHURE_URL } from '@/data/site'
import { PRODUCTS } from '@/data/products'
import Catalogue from '@/components/sections/Catalogue'
import { Download } from '@/components/ui/icons'

export const metadata: Metadata = {
  title: 'Products | SML Limited',
  description:
    `The full SML formulation range: ${PRODUCTS.length} products across insecticides, ` +
    'fungicides, herbicides, crop nutrition, biologicals and plant growth regulators.',
}

export default function ProductsPage() {
  return (
    <section id="catalogue">
      <div className="wrap">
        <div className="section-head center" data-reveal>
          <span className="eyebrow">Our Solutions</span>
          <h2 data-reveal="blur">The full range</h2>
          <p>
            {PRODUCTS.length} formulations across crop protection, crop nutrition, biologicals
            and plant growth regulators. Filter by family, or download the full catalogue.
          </p>
        </div>

        <Catalogue />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.6rem' }}>
          <a href={BROCHURE_URL} className="btn btn-outline" target="_blank" rel="noopener">
            Download Catalogue
            <Download />
          </a>
        </div>
      </div>
    </section>
  )
}
