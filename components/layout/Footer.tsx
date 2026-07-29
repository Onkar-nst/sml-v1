import { CONTACT, FOOTER_COLUMNS, SOCIALS } from '@/data/site'
import { Facebook, Instagram, LinkedIn, YouTube } from '@/components/ui/icons'
import CurrentYear from '@/components/ui/CurrentYear'

const SOCIAL_ICONS = {
  facebook: Facebook,
  linkedin: LinkedIn,
  youtube: YouTube,
  instagram: Instagram,
} as const

export default function Footer() {
  return (
    <footer className="bg-[#193174] text-white/70 pt-16 text-[0.9rem]">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-8 lg:gap-10 pb-11">
          <div>
            <img src="/sml-logo.svg" alt="SML Limited" className="h-10 w-auto brightness-0 invert mb-[1.2rem]" />
            <p className="text-[0.89rem] leading-[1.7] max-w-[300px]">
              Formerly Sulphur Mills Limited. An organisation driven by research, creating advanced
              solutions for soil health, nutrition, biologicals and crop protection since 1971.
            </p>
            <div className="flex gap-[0.6rem] mt-[1.3rem]">
              {SOCIALS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon]
                return (
                  <a 
                    key={label} 
                    href={href} 
                    aria-label={label}
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 text-white transition-all duration-250 hover:bg-[#43791f] hover:-translate-y-0.5"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="text-white text-[0.76rem] font-bold tracking-[0.16em] uppercase m-0 mb-4">{column.heading}</h4>
              <ul className="list-none p-0 m-0 grid gap-[0.55rem]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-white"
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-[0.76rem] font-bold tracking-[0.16em] uppercase m-0 mb-4">Contact Us</h4>
            <address className="not-italic leading-[1.75]">
              {CONTACT.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <br />
              <a href={CONTACT.phoneHref} className="inline-block transition-colors duration-200 hover:text-white">{CONTACT.phone}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="inline-block transition-colors duration-200 hover:text-white">{CONTACT.email}</a>
            </address>
          </div>
        </div>

        <div className="border-t border-white/12 py-[1.3rem] flex justify-between gap-4 flex-wrap text-[0.82rem] max-[560px]:justify-center max-[560px]:text-center">
          <span>
            Copyright © <CurrentYear /> SML Limited (Formerly Sulphur Mills Limited).
          </span>
          <span>Serving 80+ countries</span>
        </div>
      </div>
    </footer>
  )
}
