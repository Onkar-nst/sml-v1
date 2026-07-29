/**
 * Page content.
 *
 * Everything the static build repeated by hand — nav items, stat cards, the six
 * divisions, the FAQ, footer columns — lives here as data so the section
 * components stay markup-only and copy changes never touch JSX.
 */

import type { IconName } from '@/components/ui/icons'

export const BROCHURE_URL =
  'https://sml-ltd.com/wp-content/uploads/2026/07/SML-Brochure-2026.pdf'

export const CONTACT = {
  phone: '+91 22 4345 2222',
  phoneHref: 'tel:+912243452222',
  email: 'sml@sml-ltd.com',
  whatsapp: 'https://wa.me/912243452222',
  address: [
    '404/405, 604/605, 349,',
    'Business Point, Western Express Highway,',
    'Andheri (E), Mumbai 400069',
  ],
} as const

/* ------------------------------------------------------------------ header */

export const NAV_LINKS = [
  { href: '#about', label: 'About Us' },
  // { href: '#business', label: 'Business' },  — section is hidden for now
  { href: '#solutions', label: 'Our Solutions' },
  // { href: '#trust', label: 'Accreditation' },  — section is hidden for now
  { href: '#contact', label: 'Contact' },
] as const

/* -------------------------------------------------------------------- hero */

export const HERO = {
  image:
    'https://sml-ltd.com/wp-content/uploads/2024/10/sml-banner2-1.jpg',
  imageAlt: 'Young seedlings rising from dark soil',
  eyebrow: 'Transforming Agriculture Since 1971',
  sub:
    'SML Limited is a leader in advanced agricultural solutions, grounded in research: ' +
    'soil health, crop nutrition, crop protection and biologicals, grown from ' +
    'five decades of science.',
} as const

/* ----------------------------------------------------------------- why sml */

export interface WhyCard {
  icon: IconName
  tone: 'green' | 'navy'
  title: string
  body: string
}

export const WHY_CARDS: WhyCard[] = [
  {
    icon: 'flask',
    tone: 'green',
    title: 'Crop Nutrition',
    body: 'Balanced nutrition for every crop stage, backed by science.',
  },
  {
    icon: 'shield',
    tone: 'navy',
    title: 'Crop Protection',
    body: 'Effective, responsible protection from seed to yield.',
  },
  {
    icon: 'bug',
    tone: 'green',
    title: 'Other Insecticides',
    body: 'Broad spectrum pest control across every major crop.',
  },
  {
    icon: 'sprout',
    tone: 'navy',
    title: 'PGR',
    body: 'Plant growth regulators that time and shape the yield.',
  },
  {
    icon: 'leaf',
    tone: 'green',
    title: 'Biologicals',
    body: 'Sustainable biological crop inputs, gentle on the environment.',
  },
]

/* ---------------------------------------------------------------- presence */

export interface PresenceStat {
  /** count-up target */
  count: number
  suffix: string
  /** the single caption line that sits under the figure */
  label: string
  icon: IconName
}

export const PRESENCE_STATS: PresenceStat[] = [
  { count: 6, suffix: '+', label: 'Manufacturing units across our plants', icon: 'factory' },
  { count: 80, suffix: '+', label: 'Countries reached on every continent', icon: 'globe' },
  { count: 250, suffix: '+', label: 'Products in the comprehensive portfolio', icon: 'package' },
  { count: 550, suffix: '+', label: 'Global patents from pioneering R&D', icon: 'lightbulb' },
  { count: 10000, suffix: '+', label: 'Channel partners in the network', icon: 'users' },
  { count: 10, suffix: 'M+', label: 'Growers connected to SML', icon: 'sprout' },
]

/* --------------------------------------------------------------- solutions */

export interface CategoryTile {
  href: string
  label: string
  count: number
  img: string
}

export const CATEGORY_TILES: CategoryTile[] = [
  {
    href: '/#solutions',
    label: 'Fertiliser',
    count: 7,
    img: 'https://sml-ltd.com/wp-content/uploads/2024/02/fertis-wg.png',
  },
  {
    href: '/#solutions',
    label: 'Fungicide',
    count: 22,
    img: 'https://sml-ltd.com/wp-content/uploads/2025/02/bulton.png',
  },
  {
    href: '/#solutions',
    label: 'Insecticide',
    count: 24,
    img: 'https://sml-ltd.com/wp-content/uploads/2025/02/imara.png',
  },
  {
    href: '/#solutions',
    label: 'Herbicide',
    count: 15,
    img: 'https://sml-ltd.com/wp-content/uploads/2025/02/pendisul.png',
  },
  {
    href: '/#solutions',
    label: 'PGR',
    count: 2,
    img: 'https://sml-ltd.com/wp-content/uploads/2026/02/mahawet.jpg',
  },
]

export interface FeaturedProduct {
  name: string
  tag: string
  note: string
  img: string
}

/** A short curated shelf — the full catalogue lives in `data/products.ts`. */
export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    name: 'Cosavet-DF',
    tag: 'Fungicide',
    note: 'Sulphur based · flagship',
    img: 'https://sml-ltd.com/wp-content/uploads/2024/02/cosavet-300x300.jpg',
  },
  {
    name: 'Emerald Z+',
    tag: 'Crop Nutrition',
    note: 'Balanced micronutrient blend',
    img: 'https://sml-ltd.com/wp-content/uploads/2024/02/emerald-z-sml.png',
  },
  {
    name: 'Rootiva',
    tag: 'Biological',
    note: 'Mycorrhizal biofertiliser',
    img: 'https://sml-ltd.com/wp-content/uploads/2025/10/rootiva-300x300.jpg',
  },
  {
    name: 'Gibbrasul',
    tag: 'PGR',
    note: 'Gibberellic acid based',
    img: 'https://sml-ltd.com/wp-content/uploads/2024/02/gibbrASUL-2-300x300.jpg',
  },
]

/* ------------------------------------------------------------------ mantra */

export interface MantraPart {
  icon: IconName
  tone: 'green' | 'navy'
  word: string
  body: string
}

/** The mantra is a two-word compound, so the card takes it apart a word at a time. */
export const MANTRA = {
  art: 'https://sml-ltd.com/wp-content/uploads/2024/10/MORE-FROM-LESS-1.png',
  parts: [
    {
      icon: 'sprout',
      tone: 'green',
      word: 'More',
      body:
        'Better efficacy, faster nutrient uptake, and availability across a greater share of ' +
        'the crop cycle: more yield, more quality, more income for the farmer.',
    },
    {
      icon: 'droplet',
      tone: 'navy',
      word: 'Less',
      body:
        'Lower dosage per acre, less residue and toxicity, and formulations largely ' +
        'free of solvents: less cost, and less load on the land around the crop.',
    },
  ] satisfies MantraPart[],
  interpretation:
    '“More From Less” means getting more out of every input a farmer applies, while ' +
    'leaving less behind in the soil, the water and the air.',
} as const

/* --------------------------------------------------------------- divisions */

export interface Division {
  icon: IconName
  meta: string
  name: string
  body: string
  facts: string[]
}

export const DIVISIONS: Division[] = [
  {
    icon: 'leaf',
    meta: 'Core',
    name: 'SML Limited',
    body: 'Advanced solutions across nutrients, soil health, crop protection and biologicals.',
    facts: ['WDG, SC and EW formulations', '100,000 MT WDG capacity', '6M+ litres SC / EW'],
  },
  {
    icon: 'beaker',
    meta: 'Formulations',
    name: 'Sumil Chemical Industries',
    body: 'Innovative crop protection formulations for major agrochemical actives.',
    facts: ['30+ years of production', 'Marketing and export', 'Regional and export markets'],
  },
  {
    icon: 'factory',
    meta: 'Manufacturing',
    name: 'R3 Crop Care',
    body: 'Synthesis of agrochemical active ingredients and finished formulations.',
    facts: ['Established 1996', 'Vapi, Gujarat', '7,000 MT annual capacity'],
  },
  {
    icon: 'droplet',
    meta: 'Nutrition',
    name: 'NourishAg',
    body: 'Balanced crop nutrition that improves both yield and soil structure.',
    facts: [
      'Retains soil organic matter',
      'Reduces greenhouse emissions',
      'Improves produce quality',
    ],
  },
  {
    icon: 'academy',
    meta: 'Advisory',
    name: 'Krishinnova',
    body: 'Farm technology centres offering education and advisory direct to growers.',
    facts: [
      'Two advisory centres',
      'Soil analysis and weather forecasting',
      'Drone spraying and GAP training',
    ],
  },
  {
    icon: 'globe',
    meta: 'Global',
    name: 'International Business',
    body: 'Three decades of exports through alliances and subsidiary distribution networks.',
    facts: [
      '80+ countries across all continents',
      'Brazil office in Campinas, since 2023',
      'Formulations protected by IP, bulk and retail',
    ],
  },
]

/* -------------------------------------------------------------- recognition */

export interface Award {
  year: string
  title: string
  detail: string
}

export const AWARDS: Award[] = [
  { year: '2024', title: 'CII Industrial Innovation Awards', detail: 'Top 75 Innovative Companies' },
  { year: '2023', title: 'FICCI Sustainable Agriculture Award', detail: 'Decarbonization in Agriculture' },
  { year: '2023', title: 'Hurun India Stars of Mumbai', detail: 'Business leadership recognition' },
  { year: '2023', title: 'Hurun India Most Respected Entrepreneur', detail: 'Entrepreneurial excellence' },
  { year: '2021', title: 'FICCI Sustainable Agriculture Award', detail: 'Sustainable agriculture practice' },
  { year: '2021', title: 'Ray Consulting ABSA Lifetime Achievement', detail: 'Lifetime contribution to the sector' },
]

export interface Certification {
  title: string
  body: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'GLP Compliance Certificate',
    body: 'for Good Laboratory Practice, covering data integrity in regulatory testing.',
  },
  {
    title: 'NABL accredited laboratories',
    body: 'supporting regulatory data generation for every market.',
  },
  {
    title: 'Letter from NGCMA',
    body: 'supporting our GLP certification status.',
  },
  {
    title: '550+ global patents',
    body: 'protecting formulations across our international markets.',
  },
]

/* ----------------------------------------------------------------- gallery */

export interface GalleryShot {
  img: string
  alt: string
  /** short label, revealed over the image on hover */
  caption: string
}

/** Eight frames, laid out four across — see `Gallery.module.css`. */
export const GALLERY_SHOTS: GalleryShot[] = [
  {
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=900&q=70',
    alt: 'A farmer preparing a paddy field with a tractor',
    caption: 'In the field with growers',
  },
  {
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=70',
    alt: 'Young maize seedlings emerging from dark soil',
    caption: 'Early crop vigour',
  },
  {
    img: 'https://sml-ltd.com/wp-content/uploads/2024/10/sml-banner1-1.jpg',
    alt: 'A researcher examining a plant sample under a microscope',
    caption: 'GLP & NABL laboratories',
  },
  {
    img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=70',
    alt: 'Seedlings growing in a tray of nursery pots',
    caption: 'Formulation trials',
  },
  {
    img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=70',
    alt: 'Rows of a healthy crop stretching to the horizon at sunset',
    caption: 'Nutrition at field scale',
  },
  {
    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=70',
    alt: 'Hands transplanting seedlings in a nursery tray',
    caption: 'Biologicals & soil health',
  },
  {
    img: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=900&q=70',
    alt: 'A tractor baling straw in a harvested field',
    caption: 'Season after season',
  },
  {
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=70',
    alt: 'Freshly harvested vegetables gathered in baskets',
    caption: 'More from less, harvested',
  },
]

/* --------------------------------------------------------------------- faq */

export interface FaqEntry {
  q: string
  /** rendered as HTML so the answers can carry inline links */
  a: string
}

export const FAQS: FaqEntry[] = [
  {
    q: 'What does SML manufacture?',
    a:
      'SML produces formulations across four families: crop protection (insecticides, fungicides ' +
      'and herbicides), crop nutrition, biologicals and plant growth regulators. Manufacturing ' +
      'covers water dispersible granules (WDG), suspension concentrates (SC) and emulsifiable ' +
      'solutions (EW), with 100,000 MT of WDG capacity, the largest in the world.',
  },
  {
    q: 'Which countries do you supply?',
    a:
      'More than 80 countries across every continent: the USA, Europe, Australia, the Middle East, ' +
      'South America, Asia and New Zealand. Exports began around three decades ago and now run ' +
      'through strategic alliances, contractual sales arrangements and subsidiary distribution ' +
      'networks. Our most recent expansion was a Brazil office in Campinas, S&atilde;o Paulo, ' +
      'opened in December 2023.',
  },
  {
    q: 'How do your products support sustainability?',
    a:
      'Our formulations are designed to raise nutrient use efficiency, which reduces dependence on ' +
      'synthetic fertiliser and helps retain soil organic matter and texture. They are also largely ' +
      'free of solvents. SML reports greenhouse gas emission reductions of 18 to 84% from these ' +
      'solutions, work recognised by the FICCI Sustainable Agriculture Award for decarbonization ' +
      'in agriculture.',
  },
  {
    q: 'Do you offer advisory services to farmers?',
    a:
      'Yes. Our Krishinnova farm technology centres provide guidance from seed to harvest, Good ' +
      'Agricultural Practices training, soil analysis, weather forecasting, drone spraying and ' +
      'general farm advisory, offered as standalone support alongside the product range.',
  },
  {
    q: 'How can I become a distributor or partner?',
    a:
      'We work with over 10,000 channel partners through strategic alliances, contractual sales ' +
      'arrangements and subsidiary distribution networks, supplying both bulk and retail packages. ' +
      'Write to <a href="mailto:sml@sml-ltd.com">sml@sml-ltd.com</a> or call +91 22 43452222 to ' +
      'discuss your market.',
  },
  {
    q: 'Where can I find technical and registration data?',
    a:
      'Our product catalogue carries composition and application details. For registration data ' +
      'in a particular market, our own GLP and NABL accredited laboratories generate ' +
      'dossiers for each country. Contact us with the market and product in question.',
  },
]

/* ------------------------------------------------------------------ footer */

export interface FooterColumn {
  heading: string
  links: { href: string; label: string; external?: boolean }[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'About Us',
    links: [
      { href: '#about', label: 'Our Purpose & Value' },
      // { href: '#business', label: 'Our Business' },  — section is hidden for now
      { href: 'https://sml-ltd.com/career/', label: 'Careers', external: true },
    ],
  },
  {
    heading: 'Our Solutions',
    links: [
      { href: '/#solutions', label: 'Crop Nutrition' },
      { href: '/#solutions', label: 'Insecticides' },
      { href: '/#solutions', label: 'Fungicides' },
      { href: '/#solutions', label: 'Herbicides' },
      { href: '/#solutions', label: 'Biologicals' },
      { href: '/#solutions', label: 'PGR' },
    ],
  },
]

export const SOCIALS = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
] as const
