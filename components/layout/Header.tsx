'use client'

import { BROCHURE_URL, NAV_LINKS } from '@/data/site'
import { Download, Globe } from '@/components/ui/icons'

export default function Header() {
  return (
    <>
      {/* ─── TOP HEADER ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50">

        {/* Announcement bar — always visible */}
        <div className="bg-[#193174] text-white/80 text-[11px] h-9 flex items-center">
          <div className="w-full max-w-[1240px] px-4 mx-auto flex items-center justify-between">
            <span className="flex items-center gap-3">
              <b className="text-white text-[11px] font-semibold">India</b>
              <span className="text-white/30">·</span>
              <a
                href="https://sml-ltd.com.br/"
                target="_blank"
                rel="noopener"
                className="text-white/70 hover:text-white transition-colors"
              >
                Brazil
              </a>
            </span>
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors font-medium"
            >
              <Download size={12} />
              <span className="hidden sm:inline text-[11px]">Download Catalogue</span>
              <span className="sm:hidden text-[11px]">Catalogue</span>
            </a>
          </div>
        </div>

        {/* Main navbar — transparent on mobile, solid white on desktop */}
        <div className="h-16 flex items-center md:bg-white/95 md:backdrop-blur-md md:border-b md:border-slate-100 md:shadow-[0_2px_16px_rgba(25,49,116,0.05)]">
          <div className="w-full max-w-[1240px] px-4 mx-auto flex items-center justify-between">

            {/* Logo */}
            <a href="#top" aria-label="SML Limited home" className="flex-none">
              <img src="/sml-logo.svg" alt="SML Limited" className="h-9 w-auto" />
            </a>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0 ml-auto">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.9rem] font-semibold text-[#193174]/85 relative py-1 transition-colors duration-200 hover:text-[#43791f] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#43791f] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <a
              href="#solutions"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#43791f] hover:bg-[#365f1a] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ml-6"
            >
              Explore Products
            </a>

            {/* Mobile — Enquiry pill, floats over the hero */}
            <a
              href="mailto:sml@sml-ltd.com?subject=Enquiry&body=Hello SML Team,%0D%0A%0D%0AI am writing to enquire about SML solutions.%0D%0A%0D%0AThank you."
              className="md:hidden inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-[#193174] text-[13px] font-bold shadow-lg active:scale-95 transition-transform"
            >
              Enquiry
            </a>

          </div>
        </div>
      </header>

      {/* ─── MOBILE BOTTOM TAB BAR ──────────────────────────────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-2px_16px_rgba(0,0,0,0.07)]"
        style={{ height: '60px' }}
      >
        <div className="grid grid-cols-5 h-full">

          {/* About */}
          <a
            href="#about"
            className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-[#193174] active:scale-90 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">About</span>
          </a>

          {/* Products */}
          <a
            href="#solutions"
            className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-[#193174] active:scale-90 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">Products</span>
          </a>

          {/* Centre — WhatsApp */}
          <div className="flex items-center justify-center">
            <a
              href="https://wa.me/918814999939?text=Hello%20SML%20Team%2C%20I%20am%20interested%20in%20your%20agricultural%20products.%20Please%20get%20in%20touch."
              target="_blank"
              rel="noopener"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(37,211,102,0.45)] active:scale-90 transition-transform -translate-y-3"
              style={{ width: '52px', height: '52px' }}
            >
              {/* WhatsApp SVG icon */}
              <svg width="26" height="26" viewBox="0 0 32 32" fill="white">
                <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.358.638 4.663 1.847 6.676L2.667 29.333l6.844-1.793A13.277 13.277 0 0 0 16.002 29.333C23.365 29.333 29.333 23.363 29.333 16S23.365 2.667 16.002 2.667zm0 2.4c5.93 0 10.933 4.932 10.933 10.933 0 6.002-4.933 10.933-10.933 10.933a10.9 10.9 0 0 1-5.573-1.525l-.39-.234-4.058 1.064 1.083-3.944-.254-.405A10.9 10.9 0 0 1 5.07 16c0-6.002 4.932-10.933 10.933-10.933zm-3.08 5.04c-.202 0-.53.076-.808.379-.277.303-1.06 1.036-1.06 2.526 0 1.49 1.085 2.932 1.236 3.135.152.202 2.122 3.24 5.16 4.416.721.278 1.283.444 1.721.57.723.205 1.382.176 1.902.107.58-.077 1.787-.73 2.04-1.435.253-.705.253-1.31.177-1.436-.076-.126-.278-.202-.58-.354-.303-.151-1.79-.883-2.068-.984-.278-.1-.48-.151-.682.152-.202.303-.783.984-.96 1.186-.176.202-.353.227-.655.076-.303-.152-1.278-.471-2.436-1.503-.9-.804-1.508-1.796-1.685-2.099-.177-.303-.019-.466.132-.617.136-.135.303-.354.455-.53.151-.177.202-.303.303-.505.1-.202.05-.379-.025-.53-.077-.152-.682-1.644-.934-2.251-.245-.59-.496-.51-.682-.52l-.58-.01z"/>
              </svg>
            </a>
          </div>

          {/* Presence */}
          <a
            href="#presence"
            className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-[#193174] active:scale-90 transition-all"
          >
            <Globe size={20} strokeWidth={2} />
            <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">Presence</span>
          </a>

          {/* Brochure */}
          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener"
            className="flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-[#193174] active:scale-90 transition-all"
          >
            <Download size={20} strokeWidth={2} />
            <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">Brochure</span>
          </a>

        </div>
      </nav>
    </>
  )
}
