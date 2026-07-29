import type { Metadata } from 'next'
import Link from 'next/link'

import { PRODUCTS, productSlug, type Product } from '@/data/products'
import { PRODUCT_DETAILS } from '@/data/product-details'
import { ArrowLeft, ArrowRight, Download, Droplet, Mail } from '@/components/ui/icons'
import { BROCHURE_URL, CONTACT } from '@/data/site'

type Props = {
  params: Promise<{ slug: string }>
}

const findProduct = (slug: string) => PRODUCTS.find((p) => productSlug(p.name) === slug)

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: productSlug(product.name) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = findProduct(slug)
  if (!product) return { title: 'Product not found | SML Limited' }

  const detail = PRODUCT_DETAILS[product.name]
  return {
    title: `${product.name} — ${product.catLabel} | SML Limited`,
    description: detail?.composition
      ? `${product.name}: ${detail.composition}. ${product.catLabel} from SML Limited.`
      : `${product.name}, a ${product.catLabel.toLowerCase()} from SML Limited.`,
  }
}

/**
 * The overview line is assembled from the published facts rather than written
 * as copy — every clause below is either the composition, the formulation or
 * the pack list from the product page.
 */
function overview(product: Product, detail?: { composition?: string; formulation?: string; packs?: string }) {
  const cat = product.catLabel.toLowerCase()
  const sentences: string[] = []

  sentences.push(
    detail?.composition
      ? `${product.name} is SML's ${cat}, supplied as ${detail.composition}.`
      : `${product.name} is a ${cat} from the SML range.`,
  )
  if (detail?.formulation) {
    // only the first letter drops case — the code in brackets stays as published
    sentences.push(`It is a ${detail.formulation.replace(/^./, (c) => c.toLowerCase())} formulation.`)
  }
  if (product.note && product.note !== detail?.composition) {
    sentences.push(product.note.endsWith('.') ? product.note : `${product.note}.`)
  }
  if (detail?.packs) {
    sentences.push(`Available packs: ${detail.packs}.`)
  }
  return sentences.join(' ')
}

/**
 * Several published claims are written as "Lead-in: the detail". Where that
 * holds, the lead-in is pulled out and set in bold; anything longer than a
 * short phrase is left as one run of prose.
 */
function splitBenefit(text: string): { lead: string | null; rest: string } {
  const i = text.indexOf(':')
  if (i > 0 && i <= 46) {
    return { lead: text.slice(0, i), rest: text.slice(i + 1).trim() }
  }
  return { lead: null, rest: text }
}

/** A small green-ruled section label, as used down the whole spec sheet. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#43791f] mb-3">
      <span className="w-5 h-0.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = findProduct(slug)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f7f5ef] py-24">
        <h1 className="text-2xl font-bold text-[#193174] mb-4">Product not found</h1>
        <a href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#43791f]">
          <ArrowLeft size={16} /> Back to the catalogue
        </a>
      </div>
    )
  }

  const detail = PRODUCT_DETAILS[product.name]
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.name !== product.name).slice(0, 4)

  const specs: { label: string; value: string }[] = [
    { label: 'Product name', value: product.name },
    { label: 'Category', value: product.catLabel },
    ...(detail?.composition ? [{ label: 'Composition', value: detail.composition }] : []),
    ...(detail?.formulation ? [{ label: 'Formulation', value: detail.formulation }] : []),
    ...(detail?.packs ? [{ label: 'Available packs', value: detail.packs }] : []),
    { label: 'Manufactured by', value: 'SML Limited (formerly Sulphur Mills Limited)' },
  ]

  const enquiry = `mailto:${CONTACT.email}?subject=Enquiry regarding SML ${product.name}&body=Hello SML Team,%0D%0A%0D%0AI am interested in SML ${product.name} (${product.catLabel}) and would like to receive pricing details, packaging formats, and local availability information.%0D%0A%0D%0APlease get in touch.%0D%0A%0D%0AThank you!`

  return (
    <main className="bg-[#f7f5ef] pt-32 pb-20">
      <div className="max-w-[1180px] w-[calc(100%-2.6rem)] mx-auto">
        <a
          href="/products"
          className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-[#193174]/70 hover:text-[#43791f] transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to catalogue
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,400px)_1fr] gap-6 lg:gap-9 items-start">

          {/* Pack shot, its actions, and the composition beneath them. The column
              is held in view while the spec sheet scrolls past; because it is a
              grid item, it releases on its own at the end of the row — which is
              exactly where the related-products shelf begins. */}
          <div className="flex flex-col gap-3.5 lg:sticky lg:top-[calc(var(--nav-h)+var(--topbar-h)+1.5rem)] lg:max-h-[calc(100dvh-var(--nav-h)-var(--topbar-h)-3rem)] lg:overflow-y-auto scrollbar-none">
            <div className="relative bg-white border border-[#193174]/8 rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(25,49,116,0.03)]">
              <span className="absolute top-4 left-4 bg-[#43791f]/10 text-[#43791f] text-[0.62rem] font-bold px-2.5 py-1 rounded uppercase tracking-[0.14em]">
                {product.catLabel}
              </span>
              <div className="aspect-square grid place-items-center">
                {product.img ? (
                  <img
                    src={product.img}
                    alt={`${product.name} pack shot`}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-[#193174]/30 text-sm">Pack shot coming soon</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={enquiry}
                className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.85rem] font-bold text-white bg-[#43791f] hover:bg-[#365f1a] rounded-lg shadow-sm transition-colors"
              >
                <Mail size={15} /> Send enquiry
              </a>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener"
                className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.85rem] font-bold text-[#193174] bg-white border border-[#193174]/10 hover:border-[#43791f]/40 hover:text-[#43791f] rounded-lg transition-colors"
              >
                <Download size={15} /> Brochure
              </a>
            </div>

            <div className="rounded-2xl bg-[#43791f] text-white px-6 py-5 shadow-[0_10px_26px_rgba(67,121,31,0.18)]">
              <span className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/65">
                {detail?.composition ? 'Composition' : 'Product'}
              </span>
              <h1 className="text-[1.55rem] md:text-[1.9rem] font-bold leading-tight mt-1 mb-0 text-white">
                {product.name}
              </h1>
              {detail?.composition && (
                <p className="text-[0.95rem] text-white/85 leading-relaxed m-0 mt-1.5">
                  {detail.composition}
                </p>
              )}
              {detail?.formulation && (
                <p className="text-[0.82rem] text-white/70 m-0 mt-1">{detail.formulation}</p>
              )}
            </div>
          </div>

          {/* the spec sheet */}
          <div className="flex flex-col gap-5">

            <section className="bg-white border border-[#193174]/8 rounded-2xl px-6 py-5">
              <SectionLabel>Product overview</SectionLabel>
              <p className="text-[0.92rem] leading-[1.75] text-[#193174]/70 m-0">
                {overview(product, detail)}
              </p>
            </section>

            {detail?.benefits && detail.benefits.length > 0 && (
              <section className="bg-white border border-[#193174]/8 rounded-2xl px-6 py-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <SectionLabel>Key benefits</SectionLabel>
                  <span className="text-[0.68rem] font-bold text-[#43791f] bg-[#43791f]/8 px-2.5 py-1 rounded-full tabular-nums -mt-3">
                    {detail.benefits.length} reasons
                  </span>
                </div>

                {/* numbered tiles rather than a tick list — each claim reads as
                    its own point, and a lead-in before a colon is pulled out */}
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {detail.benefits.map((benefit, i) => {
                    const { lead, rest } = splitBenefit(benefit)
                    return (
                      <li
                        key={benefit}
                        className="group relative flex gap-3 rounded-xl border border-[#193174]/8 bg-[#f7f5ef]/70 p-4 hover:border-[#43791f]/40 hover:bg-white hover:shadow-[0_10px_24px_rgba(25,49,116,0.06)] hover:-translate-y-0.5 transition-all duration-300 ease-out"
                      >
                        <span className="flex-none grid place-items-center w-8 h-8 rounded-lg bg-[#43791f] text-white text-[0.72rem] font-bold tabular-nums shadow-[0_4px_10px_rgba(67,121,31,0.25)] transition-transform duration-300 group-hover:scale-105">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[0.86rem] leading-[1.6] text-[#193174]/65 m-0">
                          {lead && (
                            <b className="block text-[#193174] font-bold mb-0.5">{lead}</b>
                          )}
                          {rest}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}

            <section className="bg-white border border-[#193174]/8 rounded-2xl px-6 py-5">
              <SectionLabel>Specifications</SectionLabel>
              <dl className="m-0 rounded-xl border border-[#193174]/8 overflow-hidden">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-x-4 px-4 py-3 ${
                      i % 2 ? 'bg-[#f7f5ef]/70' : 'bg-white'
                    }`}
                  >
                    <dt className="text-[0.8rem] font-bold text-[#193174]">{spec.label}</dt>
                    <dd className="text-[0.86rem] text-[#193174]/62 m-0 leading-relaxed">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="flex gap-3.5 bg-white border border-[#193174]/8 rounded-2xl px-6 py-5">
              <span className="flex-none grid place-items-center w-10 h-10 rounded-full bg-[#43791f]/10 text-[#43791f]">
                <Droplet size={19} />
              </span>
              <div>
                <h2 className="text-[1rem] font-bold text-[#193174] m-0 mb-1">Usage guidance</h2>
                <p className="text-[0.86rem] leading-[1.7] text-[#193174]/60 m-0">
                  Apply as per the recommended agronomic practice for your crop. Dosage and
                  timing vary by crop stage, and by local soil and weather conditions — our
                  agronomy team can confirm the right programme for your field before you spray.
                </p>
              </div>
            </section>

            <section className="rounded-2xl bg-[#193174] px-6 py-6 text-white">
              <h2 className="text-[1.2rem] font-bold m-0 mb-1.5 text-white">
                Not sure this is the right fit?
              </h2>
              <p className="text-[0.88rem] leading-[1.65] text-white/70 m-0 mb-4 max-w-[52ch]">
                Tell us your crop, acreage and the problem you are seeing. Our agronomists will
                point you to the product and dose that suits your field.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#43791f] hover:bg-[#365f1a] text-[0.85rem] font-bold text-white transition-colors"
                >
                  Speak with an expert <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/18 text-[0.85rem] font-bold text-white transition-colors"
                >
                  WhatsApp us
                </a>
              </div>
            </section>

            {detail?.source && (
              <p className="text-[0.72rem] text-[#193174]/40 m-0">
                Product data published by SML Limited.{' '}
                <a
                  href={detail.source}
                  target="_blank"
                  rel="noopener"
                  className="underline hover:text-[#43791f]"
                >
                  View the source listing
                </a>
              </p>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
              <h2 className="text-[1.3rem] font-bold text-[#193174] m-0">
                More from {product.catLabel}
              </h2>
              <a
                href={`/products#${product.cat}`}
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-[#43791f] hover:text-[#365f1a] transition-colors"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {related.map((item) => (
                <a
                  key={item.name}
                  href={`/product/${productSlug(item.name)}`}
                  className="flex gap-3.5 p-3 bg-white border border-[#193174]/8 rounded-2xl hover:border-[#43791f]/35 hover:shadow-[0_12px_28px_rgba(25,49,116,0.07)] transition-all duration-300 group"
                >
                  <span className="flex-none w-[62px] h-[62px] rounded-xl bg-white border border-[#193174]/8 grid place-items-center overflow-hidden">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="max-h-[78%] max-w-[78%] object-contain"
                      />
                    ) : (
                      <span className="text-[#193174]/30 text-[0.6rem]">No image</span>
                    )}
                  </span>
                  <span className="min-w-0 flex flex-col justify-center">
                    <span className="block text-[0.6rem] font-bold text-[#43791f] uppercase tracking-[0.14em]">
                      {item.catLabel}
                    </span>
                    <span className="block text-[0.92rem] font-bold text-[#193174] truncate group-hover:text-[#43791f] transition-colors">
                      {item.name}
                    </span>
                    <span className="block text-[0.75rem] text-[#193174]/45 truncate">
                      {PRODUCT_DETAILS[item.name]?.composition || 'View spec'}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
