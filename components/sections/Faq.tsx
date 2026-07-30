'use client'

import { useState } from 'react'

import { FAQS } from '@/data/site'
import { ArrowRight, ChevronDown } from '@/components/ui/icons'

export default function Faq() {
  // index of the open panel, or null — an accordion, one at a time
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-white py-12 md:py-6 " id="faq">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-[5vw] lg:gap-18 items-start">
          <div data-reveal>
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[#43791f] mb-4 px-[0.9rem] py-[0.35rem] rounded-full border border-current/25 bg-current/8 before:content-[''] before:size-[7px] before:rounded-full before:bg-current">
              FAQ
            </span>
            {/* the break is dropped below 900px, so keep a space either side of it */}
            <h2 className="text-[1.9rem] md:text-[3.2vw] lg:text-[2.7rem] leading-[1.18] m-0 text-[#193174] font-bold" data-reveal="blur">
              Frequently <br className="max-md:hidden" /> Asked Questions
            </h2>

            <div className="mt-9 md:mt-[5vw] lg:mt-14">
              <h3 className="text-[1.02rem] font-[650] text-[#193174] m-0 mb-2">Still have a question?</h3>
              <p className="text-[0.9rem] leading-[1.7] text-[#193174]/55 m-0 mb-[1.3rem] max-w-[34ch] md:max-w-[52ch]">
                Our team is here to help. Reach out any time for a free
                conversation about your soil, your crop or your market.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-[0.55rem] px-6 py-3.5 rounded-full font-sans font-semibold text-[0.9rem] cursor-pointer transition-all duration-300 ease-out bg-[#193174] text-white hover:bg-[#122559] hover:-translate-y-0.5 hover:shadow-lg group"
              >
                Get started
                <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5" data-reveal="right">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  className={`bg-white border rounded-2xl transition-all duration-250 ease-out hover:border-[#193174]/14 ${
                    isOpen ? 'border-[#43791f]/32 shadow-sm' : 'border-[#193174]/9'
                  }`}
                  key={faq.q}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-[1.3rem] py-[1.15rem] bg-transparent border-0 cursor-pointer text-left font-sans text-[0.96rem] font-semibold leading-[1.45] text-[#193174] group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {faq.q}
                    <span className={`flex-none w-[26px] h-[26px] grid place-items-center rounded-full text-[#193174]/55 transition-all duration-300 ease-out group-hover:bg-[#43791f]/8 group-hover:text-[#43791f] ${
                      isOpen ? 'rotate-180 bg-[#43791f] text-white group-hover:bg-[#43791f] group-hover:text-white' : ''
                    }`}>
                      <ChevronDown />
                    </span>
                  </button>
                  <div 
                    className={`grid transition-[grid-template-rows] duration-350 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                    id={`faq-panel-${i}`} 
                    role="region"
                  >
                    <div className="overflow-hidden">
                      {/* answers carry inline links, so they are authored as HTML */}
                      <p 
                        className="px-[1.3rem] pb-[1.3rem] m-0 text-[0.9rem] leading-[1.75] text-[#193174]/78 [&_a]:text-[#43791f] [&_a]:font-semibold" 
                        dangerouslySetInnerHTML={{ __html: faq.a }} 
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
