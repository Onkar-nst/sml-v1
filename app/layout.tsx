import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ScrollReveal from '@/components/ui/ScrollReveal'

import './globals.css'

/* Self-hosted at build time, so the page no longer waits on a request to
   fonts.googleapis.com before it can paint text. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/* The hero's display face. Loaded italic as well — the highlighted phrase in
   the headline is set in it. */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
