import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ScrollReveal from '@/components/ui/ScrollReveal'

import './globals.css'

/* The one face the site is set in, matching the brand's own typography.
   Self-hosted at build time, so the page no longer waits on a request to
   fonts.googleapis.com before it can paint text. Italic comes along for the
   highlighted phrase in the hero headline. */
const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'SML Limited | Advanced Solutions for Agriculture',
  description:
    'SML Limited (formerly Sulphur Mills Limited) is a leader in soil health, crop nutrition, ' +
    'crop protection and biologicals, driven by research and serving farmers across 80+ countries since 1971.',
  icons: { icon: '/sml-logo.svg' },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Header />
        <main className="pb-[60px] md:pb-0">{children}</main>
        <Footer />
        <div className="hidden md:block"><WhatsAppButton /></div>
        <ScrollReveal />
      </body>
    </html>
  )
}
