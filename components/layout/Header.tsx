'use client'

import { useState } from 'react'
import { BROCHURE_URL, NAV_LINKS } from '@/data/site'
import { Download } from '@/components/ui/icons'

/**
 * The header is the only piece of chrome that holds state — the mobile menu.
 * Everything else about it is static, which is why it is the sole client
 * component in the layout shell.
 */
export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(25,49,116,0.03)]">
      {/* Region and Download bar */}
      <div className="h-[38px] bg-[#193174] text-white/75 text-[0.78rem] flex items-center">
        <div className="w-full max-w-[1240px] px-6 mx-auto flex items-center justify-between">
          <span className="flex gap-4 items-center">
            <b className="text-white font-semibold">India</b>
            <a 
              href="https://sml-ltd.com.br/" 
              target="_blank" 
              rel="noopener"
              className="hover:text-white transition-colors duration-200"
            >
              Brazil
            </a>
          </span>
          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Download Product Catalogue</span>
            <span className="sm:hidden">Catalogue</span>
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="h-[76px] flex items-center">
        <div className="w-full max-w-[1240px] px-6 mx-auto flex items-center justify-between gap-8 relative">
          <a href="#top" className="flex-none block transition-transform duration-300 hover:scale-102" aria-label="SML Limited home">
            <img src="/sml-logo.svg" alt="SML Limited" className="h-10 w-auto" />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 ml-auto list-none p-0 m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className="text-[0.93rem] font-semibold text-[#193174]/90 relative py-1 transition-colors duration-300 hover:text-[#43791f] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#43791f] after:scale-x-0 after:transform-origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:transform-origin-left"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Call to Action */}
          <a 
            href="#solutions" 
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#43791f] hover:bg-[#365f1a] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Products
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.25 bg-slate-50 hover:bg-slate-100 active:scale-95 rounded-full border border-slate-200/50 cursor-pointer transition-all duration-200"
            aria-expanded={open}
            aria-controls="navLinks"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`w-5 h-[1.8px] bg-[#193174] rounded-sm transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`w-5 h-[1.8px] bg-[#193174] rounded-sm transition-all duration-300 ${open ? 'opacity-0 scale-0' : ''}`} />
            <span className={`w-5 h-[1.8px] bg-[#193174] rounded-sm transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>

          {/* Mobile navigation panel */}
          <div 
            className={`md:hidden absolute top-[76px] left-0 right-0 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${
              open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
            }`}
          >
            <ul 
              id="navLinks" 
              className="flex flex-col px-6 py-5 gap-3 list-none m-0 border-t border-slate-50"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-[0.98rem] font-semibold text-[#193174]/95 hover:text-[#43791f] border-b border-slate-50 last:border-b-0 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <a 
                  href="#solutions" 
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#43791f] text-white text-[0.93rem] font-semibold shadow hover:bg-[#365f1a] transition-all"
                >
                  Explore Products
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
