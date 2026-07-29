# SML Limited — Company & Product Reference

Working notes for the SML agro website project.
Source: [https://sml-ltd.com/sml-home/](https://sml-ltd.com/sml-home/) — captured 28 July 2026.

---

## 1. Company Snapshot

| | |
|---|---|
| **Name** | SML Limited (formerly Sulphur Mills Limited) |
| **Founded** | 1971, by Deepak Shah (Founder & Chairman) |
| **Sector** | Agri-inputs — soil health, crop nutrition, crop protection, biologicals |
| **Reach** | 80+ countries |
| **Tagline** | *"What we eat matters, then how we grow matters even more"* |
| **HQ** | 404/405, 604/605, 349 Business Point, Western Express Highway, Andheri (E), Mumbai 400069 |
| **Phone / Fax** | +91-22-43452222 / +91-22-43452245 |
| **Email** | sml@sml-ltd.com |
| **Brazil arm** | sml-ltd.com.br — office opened Dec 2023, Campinas (São Paulo) |

### Positioning
A research-driven organisation combining "science and passion together to create solutions the world needs."
Core narrative is **soil health and sustainability**: preventing soil deterioration, cutting greenhouse-gas
load, and improving nutrient-use efficiency rather than just selling chemicals.

- **Purpose** — serve and improve agriculture through technological innovation; enable balanced,
  nutritious food production while improving soil and human health.
- **Vision** — to be a globally recognised and customer-centric agri-solutions provider.
- **Mission** — to encourage innovation for sustainable growth.
- **Values** — collaborative, customer-centric, creative, credible.

### Differentiators (the numbers they lead with)
- World's **largest manufacturer of sulphur** for crop inputs
- World's **largest WDG manufacturing capacity — 100,000 MT**
- **550+ global patents**
- **50+ years** in sustainable agriculture
- 6+ million litres SC/EW capacity
- In-house **GLP** and **NABL**-accredited labs for country-specific regulatory data
- Claimed **18–84% reduction in GHG emissions** from their solutions
- Two Krishinnova farm-technology advisory centres (soil testing, farmer advisory)

---

## 2. Business Divisions

The company presents itself as five distinct entities. This is the key structure for the site's
information architecture.

### SML Limited (core)
Global leader in nutrients, soil health, crop protection and biologicals.
Formulation types: **WDG** (water dispersible granules), **SC** (suspension concentrate),
**EW** (emulsifiable solutions). Capacity: 100,000 MT WDG, 6M+ L SC/EW.

### Sumil Chemical Industries
30+ years manufacturing crop-protection formulations for major agrochemical actives.
Production, marketing and export. Serves regional + export markets.

### R3 Crop Care
Established **1996**, located in **Vapi, Gujarat**. Capacity **7,000 MT/year**.
Synthesises agrochemical **active ingredients** plus formulations — insecticides and fungicides.
(This is the backward-integration / manufacturing arm.)

### NourishAg
Balanced **crop nutrition** solutions. Positioning: increase yield, retain soil organic matter and
texture, reduce GHG emissions, improve produce quality.

### Krishinnova
Farmer-facing **advisory and technology** centre — not a product line.
Services: seed-to-harvest guidance, Good Agricultural Practices (GAP) training, **drone spraying**,
soil analysis, weather forecasting, farm advisory. Two centres currently.

> Note: the live site spells this inconsistently — "Krishinnova" in body copy, `#krihinovva` in an
> anchor link, "Krishinovva" elsewhere. Worth standardising in the rebuild.

### International Business
Exports began ~3 decades ago. Model is strategic alliances, contractual sales, and subsidiary
distribution networks. Sells IP-protected formulations across crop protection, crop nutrition and
**public health**, in both bulk and retail packs.

---

## 3. Product Portfolio

**74 products**, scraped directly from the live WooCommerce category pages — these counts and
groupings are the site's own, not my inference. Every product has a packshot image on their CDN.

| Category | Count |
|---|---|
| Insecticides | 24 |
| Fungicides | 22 |
| Herbicides | 15 |
| Crop Nutrition (fertilisers) | 7 |
| Biologicals | 4 |
| PGR | 2 |
| **Total** | **74** |

Flagship / hero SKUs called out on the site: **Cosavet-DF**, **Techno S**, **Techno Z**,
**Fertis-WG**, **Emerald-Z**, **Bulton**, **Imara**, **Pendisul**. **Reap** is used as a
quality/yield brand mark.

### 3.1 Insecticides (24)
Mazda · Vamos-S · Imara · Chlocaps · Judwaa G · Pronto · Karizma · Scorpio · Challenger ·
Emzet · Fima · Java Super · Spike · Spike-FS+ · Tricada · Vamos · Cypro · Judwaa · Mustang ·
Centrix · Prima · Hotshot · Sulban Plus · Samapt

### 3.2 Fungicides (22)
Captasul · Lirim-M45 · Propure · Nuprid · U-Save · Metabeet · Bulton · Buzz · Cosavet-DF ·
Hybritz · Topgun DF · Pearl · Liquiflo · Stealth · Tussle · Hydroman · Metalman · Control ·
Flo Max · 5 Roses · Carben · Wettasul-80

*Composition noted on site:* **Metabeet** = Metiram 44% + Dimethomorph 9% WG.
**Cosavet-DF** is the flagship sulphur fungicide (25 kg packs).

### 3.3 Herbicides (15)
Sureshot · Faraar · Vinash Power · Grip · Flecto · Tocco · Pendisul-X · Pause · Gun ·
Metrite++ · Vinash · Action · Sureshot+ · Hatao · Metrite

### 3.4 Crop Nutrition (7)
| Product | Composition / note |
|---|---|
| Fertis WG | flagship WDG fertiliser |
| Techno Z | Sulphur & Zinc Oxide, "Powered by ORT Technology" |
| Flo-Cal+ | calcium |
| Sulanex-Z | — |
| Probor | Boron 20% |
| Zink-Ox 707 | Zinc oxide |
| Emerald Z+ | — |

### 3.5 Biologicals (4)
| Product | Type |
|---|---|
| Rootiva | Mycorrhizal bio-fertiliser |
| Mahawet | — |
| Stellar-On | — |
| Gibbrasul | — |

### 3.6 Plant Growth Regulators (2)
| Product | Type |
|---|---|
| Gibbrasul | Gibberellic acid based |
| Mahawet | — |

> **Data-quality flags — confirm against the official catalogue before launch:**
> - **Several products look miscategorised on the live site.** *Nuprid* (an imidacloprid brand)
>   sits under Fungicides; *Sureshot*, *Flecto* and *Tocco* sit under Herbicides; *U-Save* sits
>   under Fungicides. Our build mirrors the site as-is, so any fix has to happen in the data.
> - **Mahawet and Gibbrasul are each listed twice**, under both Biologicals and PGR. That is why
>   74 unique names produce 74 rows but only 72 distinct products.
> - **Techno S and Monosul+** appear in marketing copy but have no product page — likely
>   discontinued or not yet published.
> - **Active ingredients are missing for almost every product.** Only Metabeet, Probor,
>   Zink-Ox 707, Techno Z, Rootiva and Gibbrasul carry any composition. The
>   **[SML Brochure 2026 PDF](https://sml-ltd.com/wp-content/uploads/2026/07/SML-Brochure-2026.pdf)**
>   is the source to fill the rest in.

---

## 4. Accreditation

- **GLP Compliance Certificate** (Good Laboratory Practice) — downloadable on site
- **Letter from NGCMA** supporting GLP status
- **NABL**-accredited labs (referenced under International Business)

Thin section on the current site — only one certificate is actually published.

---

## 5. Awards & Recognition

- CII Industrial Innovation Awards **2024** — Top 75 Innovative Companies
- FICCI Sustainable Agriculture Award **2023** — Agri-based Decarbonization
- Hurun India Stars of Mumbai **2023**
- Hurun India Most Respected Entrepreneur **2023**
- FICCI Sustainable Agriculture Award **2021**
- Ray Consulting ABSA Lifetime Achievement Award **2021**

## 6. CSR

- Nationwide notebook distribution to schools (2018–19)
- Mask distribution across Indian states (2020–21)
- Sports complex at GMK, inaugurated October 2021

## 7. Board of Directors

Deepak Shah (Chairman) · Bimal Shah (Managing Director) · Suketu Doshi · Binoy Shah ·
Komal Shah Bhukhanwala · Sanjay Buch · Raj Kaul · Shilpa Shah · Dr. Ajit Kumar ·
Rajiv Pandit · D K Chopra

---

## 8. Current Site Map

| Section | URL |
|---|---|
| Home | https://sml-ltd.com/sml-home/ |
| About Us | https://sml-ltd.com/about-us/ |
| Business | https://sml-ltd.com/business/ |
| Our Solutions | https://sml-ltd.com/our-solutions/ |
| — Crop Protection | https://sml-ltd.com/our-solutions/crop-protection/ |
| — Crop Nutrition | https://sml-ltd.com/our-solutions/crop-nutrition/fertilizer |
| — Biologicals | https://sml-ltd.com/our-solutions/biologicals/ |
| — PGR | https://sml-ltd.com/our-solutions/pgr/ |
| Accreditation | https://sml-ltd.com/accreditation/ |
| Career | https://sml-ltd.com/career/ |
| Contact | https://sml-ltd.com/contact/ |

**About Us sub-sections:** Purpose & Value · History · Board of Directors · Differentiators ·
Sustainability · CSR · Recognition
**Business sub-sections:** SML · Sumil · R3 Crop Care · NourishAg · Krishinnova · International Business

Social: Facebook, YouTube, LinkedIn, Instagram.
Product catalogue: [SML Brochure 2026 (PDF)](https://sml-ltd.com/wp-content/uploads/2026/07/SML-Brochure-2026.pdf)

---

## 9. Observations for the Rebuild

Points worth discussing before design work starts:

1. **`/our-solutions/crop-nutrition/` returns 404** — only the `/fertilizer` child resolves.
   Broken parent route on the live site.
2. **Product pages carry no technical data.** No active ingredients, dosage, target crops, target
   pests, or pack sizes. For an agri-input buyer this is the single most important missing content.
3. **Category assignments are inconsistent** (see flags in §3) — the product taxonomy needs a
   clean rebuild from the master catalogue.
4. **61 crop-protection products are paginated 32-per-page** with no filtering by crop, pest, or
   formulation type. Poor discovery for a catalogue this size.
5. **Five sub-brands compete for attention** (SML, Sumil, R3, NourishAg, Krishinnova) with no clear
   hierarchy — worth deciding whether these are divisions, brands, or separate audiences.
6. **Naming inconsistency**: Krishinnova / Krishinovva / krihinovva; Techno Z / Techno S;
   Emerald-Z / Emerald Z+; Fertis-WG / Fertis WG; Pendisul / Pendisul-X.
7. **Accreditation page is nearly empty** — one certificate, though the company claims GLP + NABL
   labs and 550+ patents. Underselling a genuine strength.
8. **Sustainability claims are strong but unsourced** (18–84% GHG reduction, 550+ patents) — these
   need supporting data if they carry over.

---

## 10. Open Questions

- Which products are the commercial priority for the new site?
- Is the site targeting **farmers**, **distributors/dealers**, **international buyers**, or all three?
  This drives the entire structure.
- Do we get access to the master product database (actives, crops, pests, dosages, pack sizes)?
- Should the five divisions stay separate, or consolidate under one SML brand?
- English only, or multilingual for the 80-country footprint?

---

## 11. The New Site (built)

A homepage rebuild that follows **the current SML homepage's section flow**, rendered in the
visual language of [ahamkrishicare.com](https://ahamkrishicare.com/), using SML's own content,
palette and logo.

### Section flow (mirrors sml-ltd.com/sml-home/)

| # | Section | Source on the current site |
|---|---|---|
| 1 | Topbar — India / Brazil / Download Product Catalogue | same |
| 2 | Hero slider — 6 rotating banners | same 6 banners, same headlines |
| 3 | SML Limited — Agricultural Solutions & Crop Solutions + *Know more* | same H1, same two paragraphs |
| 4 | Our Presence — 6 counters | same labels and numbers |
| 5 | Our Complete Product Solution — Fertiliser / Fungicide / Insecticide / Herbicide | same four categories, same hero SKUs |
| 6 | Our Brand — Reap | same copy |
| 7 | Our Mantra — More From Less | same copy and artwork |
| 8 | Global Footprint + *Know more* | same copy |
| 9 | Footer — About Us / Our Solutions / Contact Us | same column structure |

**Our Presence figures**, taken from their live counters: 6+ Plants · 80+ Countries ·
250+ Products · 550+ Patents · 10,000+ Channel Partners · 10,000,000+ Growers.

> Note: their homepage claims **250+ products** while the catalogue publishes only 74. Both
> numbers are in the build as-is — worth resolving before launch.

### Sections added beyond their flow
Three blocks sit between Global Footprint and the footer that the current homepage does not
have: **Divisions**, **Recognition & Accreditation**, and **FAQ**. They carry approved content
(the six awards, GLP/NABL, the five divisions) and can be deleted without touching anything
else. Say the word and they go.

### Run it
Next.js 16 (App Router) with React 19 and TypeScript.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # both routes prerender as static HTML
npm run lint
npm run typecheck
```

### Files
```
app/
  layout.tsx           html shell, self-hosted Inter + Fraunces, metadata
  page.tsx             the homepage — section components in order
  globals.css          tokens, reset, and the four shared primitives
  products/page.tsx    /products — the full 74-SKU catalogue

components/
  layout/              Header · Footer · WhatsAppButton
  sections/            Hero · WhySml · About · Presence · Solutions · Brand ·
                       Mantra · Footprint · Divisions · Recognition · Faq ·
                       Cta · Catalogue        (each with its own *.module.css)
  ui/                  icons · ProductCard · ScrollReveal · CurrentYear

hooks/
  useScrollReveal      one IntersectionObserver for every [data-reveal]
  useCountUp           a group of stats counting up on one shared clock
  useMarqueeCopies     how many duplicate sets the presence rail needs
  useDragScroll        click-and-drag on the Why SML rail
  useWorldMap          fetches the map, then flies the countries into place

data/
  site.ts              nav, stats, divisions, FAQ, footer — all page copy
  products.ts          74-product catalogue, typed

lib/                   css custom-property helper, reduced-motion check
public/                sml-logo.svg · world-map.svg
legacy/                the original static build, kept for reference
```

**Styling.** Design tokens and the four cross-cutting primitives (`.wrap`,
`.eyebrow`, `.section-head`, `.btn`) stay global in `app/globals.css`; everything
else is a CSS Module beside the component that owns it. Where a section needs to
restyle a global primitive — the hero's cream buttons, the CTA card's white
eyebrow — the module scopes it under its own root class, so the override wins on
specificity rather than on file order.

**Server vs client.** Every section is a Server Component except the four that
hold state or measure the DOM: `Header` (mobile menu), `WhySml` (drag rail),
`Presence` (marquee + counters), `Footprint` (map) and `Faq` (accordion).

### Global Footprint map
Uses **SML's own map asset** (`map-mobile.svg` from their CDN), not a generic world map — so
the green countries, the manufacturing-unit pins, the HQ triangles and the legend are exactly
theirs. Processing applied at build time:

- coordinates rounded to 2dp (399 KB → 308 KB)
- the empty Illustrator `<image>` placeholder removed
- the 175 country paths tagged `.cty` (88 of them `.on` for SML reach); pins, legend, markers
  and the 3 `<polyline>` HQ triangles tagged `.xtra`
- per-element `stroke` attributes moved into CSS

It lives at `public/world-map.svg` and is fetched on mount by `useWorldMap`, rather than
bundled — 300 KB of path data belongs in a cacheable static asset, not in the JS payload or
the RSC stream.

**The assembly animation:** on scroll into view, `useWorldMap` measures each country's bounding box,
derives its bearing from the map centre, and pushes it out along that bearing — so the set
scatters across all 360° and converges back into the map. Outermost land lands first. Total run
is ~1.6 s (1.15 s flight + up to 0.42 s stagger), with the pins and legend fading on at 1.55 s.
Triggered by `IntersectionObserver` **and** a plain scroll-position check, so the map can never
be left stranded if the observer misses an update. Disabled under `prefers-reduced-motion`.

### Design decisions
- **Palette is SML's, not the reference site's.** Pulled from the live stylesheet: navy
  `#1D3477` / `#15377A` primary, lime `#8DE512` accent, greens `#28B70E` `#68B746` `#98C13E`.
  Aham is green-dominant; keeping SML navy-dominant means the layout is borrowed but the
  identity stays theirs.
- **Section order follows SML, styling follows Aham.** The flow is theirs (table above); the
  cards, rounded geometry, lime accents and motion come from the reference site.
- **Motion ("sequence")**: a 6-slide hero carousel on a 6-second autoplay with progress-bar
  dots, arrows, hover-pause and tab-visibility pause; staggered text entrance per slide; a slow
  background drift; `IntersectionObserver` reveals with per-element delays; count-ups on the Our
  Presence figures; animated tab filtering; a grid-rows FAQ accordion. All disabled under
  `prefers-reduced-motion`.
- **Product data is real** — 74 packshots hotlinked from SML's CDN, categories taken from their
  own WooCommerce category pages.

### Substitutions from the reference site
Aham's structure includes blocks SML has no data for. Rather than invent content:

| Reference block | What we did instead |
|---|---|
| Seeds / Agri Services tabs | Replaced with SML's real categories (Insecticides, Fungicides, Herbicides, Crop Nutrition, Biologicals, PGR) |
| Testimonials + 4.8★ rating | Replaced with the six real awards — no fabricated farmer quotes or ratings |
| Partner-logo carousel | Replaced with the GLP / NABL / NGCMA / patents accreditation panel |
| Static hero | Replaced with SML's own 6-banner rotating sequence |
| 4-step "How It Works" | Dropped — the current SML homepage has no equivalent |

### Known gaps
- **Images are hotlinked from `sml-ltd.com`.** Fine for review, but they must be downloaded into
  `assets/` before this goes anywhere near production.
- **"View details" links are inert.** There are no product detail pages yet (see §10 — depends
  on getting the master product database).
- **Nav links point to on-page anchors**, since this is homepage-only. Careers still points to
  the live site.
- **The "More From Less" artwork is dark-on-transparent**, so it sits on a white panel to stay
  legible against the navy band. A light-on-dark version of the asset would be cleaner.
- Homepage only — About, Business, Solutions and Contact pages are not built.

---

*Next: review the homepage, then decide inner-page scope and product priorities.*
