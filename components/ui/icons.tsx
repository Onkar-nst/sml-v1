/**
 * Every inline SVG the page uses, in one place.
 *
 * The static build repeated the same arrow and globe markup a dozen times at
 * slightly different sizes and stroke weights. Here each glyph is declared once
 * and the call site passes `size` / `strokeWidth`, so the defaults below are the
 * values the original markup used most often.
 */

export interface IconProps {
  size?: number
  strokeWidth?: number
  className?: string
}

/** Shared chrome for the outline icons — the fill icons declare their own. */
function Stroke({
  size = 24,
  strokeWidth = 2,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/* ------------------------------------------------------------------ chrome */

export const ArrowRight = (p: IconProps) => (
  <Stroke size={16} strokeWidth={2.4} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
)

export const Download = (p: IconProps) => (
  <Stroke size={16} strokeWidth={2.4} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </Stroke>
)

export const Mail = (p: IconProps) => (
  <Stroke size={16} strokeWidth={2.4} {...p}>
    <path d="M4 4h16v16H4z" />
    <path d="M22 6l-10 7L2 6" />
  </Stroke>
)

export const Check = (p: IconProps) => (
  <Stroke size={18} strokeWidth={2.4} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </Stroke>
)

export const Plus = (p: IconProps) => (
  <Stroke size={13} strokeWidth={3} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
)

export const ChevronDown = (p: IconProps) => (
  <Stroke size={16} strokeWidth={2.2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Stroke>
)

/* ------------------------------------------------------------ subject matter */

export const Flask = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
    <path d="M6.453 15h11.094" />
    <path d="M8.5 2h7" />
  </Stroke>
)

export const Shield = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
)

export const Bug = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4" />
  </Stroke>
)

export const Sprout = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" />
    <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
    <path d="M5 21h14" />
  </Stroke>
)

export const Leaf = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </Stroke>
)

export const Globe = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z" />
  </Stroke>
)

export const Plant = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
  </Stroke>
)

export const Package = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
    <path d="M3.3 7.3L12 12l8.7-4.7M12 12v9" />
  </Stroke>
)

export const Lightbulb = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
  </Stroke>
)

export const Users = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
  </Stroke>
)

export const ShieldCheck = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
  </Stroke>
)

export const Beaker = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2" />
    <path d="M8.5 2h7M7 15h10" />
  </Stroke>
)

export const Factory = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M2 20h20M4 20V8l5 3V8l5 3V4l6 4v12" />
  </Stroke>
)

export const Droplet = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M12 2s6 5.7 6 11a6 6 0 0 1-12 0c0-5.3 6-11 6-11z" />
    <path d="M12 19v-6" />
  </Stroke>
)

export const Academy = (p: IconProps) => (
  <Stroke size={22} strokeWidth={1.7} {...p}>
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
  </Stroke>
)

/* -------------------------------------------------------------- fill glyphs */

export const MapPin = ({ size = 13, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
)

export const Facebook = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.7 0 14.5 0 12 0 10.3 1.5 10.3 4.2V6H7.5v3h2.8v9H14V9z" />
  </svg>
)

export const LinkedIn = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.75-2.05C20.2 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3s-2.3 1.57-2.3 3.2V21H9z" />
  </svg>
)

export const YouTube = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23 12s0-3.5-.45-5.17a2.6 2.6 0 0 0-1.83-1.84C19.05 4.5 12 4.5 12 4.5s-7.05 0-8.72.49A2.6 2.6 0 0 0 1.45 6.83C1 8.5 1 12 1 12s0 3.5.45 5.17a2.6 2.6 0 0 0 1.83 1.84c1.67.49 8.72.49 8.72.49s7.05 0 8.72-.49a2.6 2.6 0 0 0 1.83-1.84C23 15.5 23 12 23 12zM9.75 15.5v-7l6 3.5z" />
  </svg>
)

export const Instagram = ({ size = 16, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const WhatsApp = ({ size = 26, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3 0-.45.13-.6s.3-.35.44-.52a2 2 0 0 0 .3-.5.55.55 0 0 0 0-.52c-.08-.15-.67-1.62-.92-2.21s-.49-.5-.67-.51h-.57a1.1 1.1 0 0 0-.79.37 3.34 3.34 0 0 0-1.04 2.48 5.8 5.8 0 0 0 1.21 3.07 13.26 13.26 0 0 0 5.08 4.49 17 17 0 0 0 1.7.63 4.08 4.08 0 0 0 1.87.12 3.06 3.06 0 0 0 2-1.42 2.5 2.5 0 0 0 .17-1.41c-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.7.97.99-3.62-.24-.37a9.8 9.8 0 1 1 8.32 4.6zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.44-1.69a11.8 11.8 0 0 0 5.4 1.38h.01A11.8 11.8 0 0 0 20.5 3.5z" />
  </svg>
)

/** Icon lookup for content declared in `data/site.ts`. */
export const ICONS = {
  flask: Flask,
  shield: Shield,
  bug: Bug,
  sprout: Sprout,
  leaf: Leaf,
  globe: Globe,
  plant: Plant,
  package: Package,
  lightbulb: Lightbulb,
  users: Users,
  shieldCheck: ShieldCheck,
  beaker: Beaker,
  factory: Factory,
  droplet: Droplet,
  academy: Academy,
} as const

export type IconName = keyof typeof ICONS
