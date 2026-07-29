import { PRODUCTS } from '@/data/products'
import { ArrowLeft, ArrowRight, Download } from '@/components/ui/icons'
import { BROCHURE_URL } from '@/data/site'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.name.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!product) {
    return (
      <div className="min-height-[60vh] flex flex-col items-center justify-center bg-slate-50 py-24">
        <h1 className="text-2xl font-bold text-[#193174] mb-4">Product Not Found</h1>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#43791f]">
          <ArrowLeft size={16} /> Back to Home
        </a>
      </div>
    )
  }

  // Get related products from same category
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.name !== product.name).slice(0, 4)

  const prefilledMailto = `mailto:sml@sml-ltd.com?subject=Enquiry regarding SML ${product.name}&body=Hello SML Team,%0D%0A%0D%0AI am interested in SML ${product.name} (${product.catLabel}) and would like to receive pricing details, packaging formats, and local availability information.%0D%0A%0D%0APlease get in touch.%0D%0A%0D%0AThank you!`

  return (
    <main className="bg-slate-50/30 pt-32 pb-20">
      <div className="max-w-[1240px] w-[calc(100%-2.6rem)] mx-auto">
        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-8">
          <nav className="text-xs text-slate-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#43791f]">Home</a>
            <span>/</span>
            <a href="/#solutions" className="hover:text-[#43791f]">Solutions</a>
            <span>/</span>
            <span className="text-slate-800 font-medium">{product.name}</span>
          </nav>
          
          <a
            href="/#solutions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#193174] hover:text-[#43791f] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Solutions
          </a>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 bg-white border border-slate-100/80 rounded-3xl p-6 md:p-10 shadow-sm mb-16">
          {/* Product Image Frame */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative bg-slate-50 w-full aspect-square flex items-center justify-center p-8 md:p-12 rounded-2xl border border-slate-100 overflow-hidden shadow-inner">
              {product.img ? (
                <img
                  src={product.img}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <span className="text-slate-300 text-sm">Image Coming Soon</span>
              )}
              <span className="absolute top-4 left-4 bg-[#43791f]/10 text-[#43791f] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.catLabel}
              </span>
            </div>
          </div>

          {/* Product Meta Column */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-bold text-[#43791f] uppercase tracking-widest mb-2">
              {product.catLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#193174] tracking-tight leading-none mb-4">
              {product.name}
            </h1>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              {product.note || 
                `High-performance ${product.catLabel.toLowerCase()} formulation engineered by SML. ` +
                `Designed using state-of-the-art agricultural technology to deliver unmatched efficacy, ` +
                `excellent crop safety, and environment-friendly application.`}
            </p>

            {/* Specifications Grid */}
            <div className="border-t border-b border-slate-100 py-6 mb-8">
              <h3 className="text-sm font-bold text-[#193174] uppercase tracking-wider mb-4">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="block text-2xs text-slate-400 font-bold uppercase tracking-wider">Category</span>
                  <span className="font-semibold text-[#193174] capitalize">{product.catLabel}</span>
                </div>
                <div>
                  <span className="block text-2xs text-slate-400 font-bold uppercase tracking-wider">Formulation</span>
                  <span className="font-semibold text-[#193174]">Water Dispersible Granules (WDG) / SC</span>
                </div>
                <div>
                  <span className="block text-2xs text-slate-400 font-bold uppercase tracking-wider">Application Mode</span>
                  <span className="font-semibold text-[#193174]">Foliar Spray & Soil Drenching</span>
                </div>
                <div>
                  <span className="block text-2xs text-slate-400 font-bold uppercase tracking-wider">Technology</span>
                  <span className="font-semibold text-[#193174]">FICCI-Recognized Eco-Friendly</span>
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-wrap gap-4">
              <a
                href={prefilledMailto}
                className="flex-1 min-w-[200px] text-center px-8 py-3.5 text-sm font-bold text-white bg-[#43791f] hover:bg-[#365f1a] rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Send Enquiry
              </a>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-[#193174] hover:text-[#43791f] bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <Download size={16} />
                Download Brochure
              </a>
            </div>
          </div>
        </div>

        {/* Related Products Shelf */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#193174] mb-6 tracking-tight">
              Other {product.catLabel} Formulations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <article
                  key={item.name}
                  className="flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <a
                    href={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="relative bg-slate-50/50 aspect-square flex items-center justify-center p-6"
                  >
                    {item.img ? (
                      <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-slate-300 text-xs">Image Coming Soon</span>
                    )}
                  </a>
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-3xs font-bold text-[#43791f] uppercase tracking-wider mb-1">
                      {item.catLabel}
                    </span>
                    <h3 className="text-base font-bold text-[#193174] mb-3 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="mt-auto">
                      <a
                        href={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#193174] hover:text-[#43791f] transition-colors"
                      >
                        View Details <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
