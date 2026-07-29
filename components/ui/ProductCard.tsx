import { ArrowRight } from '@/components/ui/icons'

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
  const slug = name.toLowerCase().replace(/\s+/g, '-')

  return (
    <a 
      href={`/product/${slug}`} 
      className="block text-inherit no-underline group h-full"
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      <article
        className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#43791f]/15 hover:-translate-y-1.5 transition-all duration-300 h-full"
      >
        <div className="relative bg-slate-50/60 w-full aspect-square flex items-center justify-center p-6 overflow-hidden border-b border-slate-100">
          {img ? (
            <img 
              src={img} 
              alt={name} 
              loading="lazy" 
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-350 ease-out" 
            />
          ) : (
            <span className="text-slate-300 text-xs">No Image</span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="text-3xs font-bold text-[#43791f] uppercase tracking-widest mb-1.5">
            {tag}
          </div>
          <h3 className="text-base font-bold text-[#193174] mb-1 group-hover:text-[#43791f] transition-colors duration-200 line-clamp-1">
            {name}
          </h3>
          {note ? (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {note}
            </p>
          ) : (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
              Premium SML formulation
            </p>
          )}
          {showLink ? (
            <span className="mt-auto pt-2 text-xs font-bold text-[#43791f] inline-flex items-center gap-1">
              View details 
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          ) : null}
        </div>
      </article>
    </a>
  )
}
