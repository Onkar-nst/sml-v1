'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { BROCHURE_URL, NAV_LINKS } from '@/data/site'
import { Download, Globe } from '@/components/ui/icons'
import { useEnquiry } from '@/components/enquiry/EnquiryProvider'

export default function Header() {
  const { open: openEnquiry } = useEnquiry()

  // Mobile navbar rides transparent over the dark hero, then turns solid once scrolled.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll() // page may already be scrolled (hash link, restored position)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The dark hero only exists on the homepage — everywhere else the navbar sits
  // on a light page, so it starts in its solid state and never changes on scroll.
  const pathname = usePathname()
  const solid = scrolled || pathname !== '/'

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

        {/* Main navbar — transparent on mobile until scrolled, always solid white on desktop */}
        <div
          className={`h-16 flex items-center transition-colors duration-300 md:bg-white/95 md:backdrop-blur-md md:border-b md:border-slate-100 md:shadow-[0_2px_16px_rgba(25,49,116,0.05)] ${
            solid
              ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_16px_rgba(25,49,116,0.05)]'
              : 'bg-transparent'
          }`}
        >
          <div className="w-full max-w-[1240px] px-4 mx-auto flex items-center justify-between">

            {/* Logo — whitened over the hero on mobile, natural brand colours once scrolled */}
            <Link href="/#top" aria-label="SML Limited home" className="flex-none">
              <img
                src="/sml-logo.svg"
                alt="SML Limited"
                className={`h-9 w-auto transition-[filter] duration-300 md:brightness-100 md:invert-0 ${
                  solid ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

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

            {/* Mobile — Enquiry pill: white over the hero, brand green on the white navbar */}
            <button
              type="button"
              onClick={() => openEnquiry()}
              className={`md:hidden inline-flex items-center justify-center px-5 py-2 rounded-full text-[13px] font-bold active:scale-95 transition-all duration-300 cursor-pointer ${
                solid
                  ? 'bg-[#43791f] text-white shadow-[0_4px_14px_rgba(67,121,31,0.3)]'
                  : 'bg-white text-[#193174] shadow-lg'
              }`}
            >
              Enquiry
            </button>

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

          {/* Centre — logo mark, jumps to the world footprint map */}
          <div className="flex items-center justify-center">
            <a
              href="#footprint"
              aria-label="Global footprint"
              className="flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-[0_4px_14px_rgba(25,49,116,0.18)] active:scale-90 transition-transform -translate-y-3"
              style={{ width: '52px', height: '52px' }}
            >
              <img src="/mobile-logo.png" alt="SML Limited" className="w-[30px] h-[30px] object-contain" />
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
