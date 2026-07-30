'use client'

import { useEffect, useRef, useState } from 'react'

import { CONTACT } from '@/data/site'
import { CheckCircle, ChevronDown, Close, Mail, WhatsApp } from '@/components/ui/icons'
import type { EnquirySubject } from './EnquiryProvider'

/** Who is asking, so the enquiry reaches the right desk. */
const ROLES = [
  'Farmer / Grower',
  'Distributor / Dealer',
  'Agronomist / Consultant',
  'International partner',
  'Other',
] as const

interface Form {
  name: string
  email: string
  phone: string
  country: string
  role: string
  message: string
}

const EMPTY: Form = {
  name: '',
  email: '',
  phone: '',
  country: '',
  role: ROLES[0],
  message: '',
}

type Errors = Partial<Record<keyof Form, string>>

/** Name, email and a number are the reply path — the rest is context. */
function validate(form: Form): Errors {
  const errors: Errors = {}
  if (form.name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  // numbers arrive with country codes, spaces and dashes — count the digits
  if (form.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please enter a number we can reach you on.'
  }
  return errors
}

function subjectLine(subject: EnquirySubject): string {
  if (subject.product) return `Enquiry: SML ${subject.product}`
  if (subject.range) return `Enquiry: SML ${subject.range}`
  return 'Enquiry from the SML website'
}

/** The details, written out as the email body the team receives. */
function bodyLines(form: Form, subject: EnquirySubject): string {
  const asked = subject.product
    ? `I would like more information about ${subject.product}` +
      `${subject.category ? ` (${subject.category})` : ''} — specification, pack sizes, ` +
      'pricing and availability in my area.'
    : subject.range
      ? `I would like more information about your ${subject.range} range — the products in it, ` +
        'pack sizes and availability in my market.'
      : 'I would like to know more about SML products and how they suit my crop.'

  const lines = ['Hello SML Team,', '', asked, '', 'MY DETAILS', `Name: ${form.name.trim()}`]
  lines.push(`Email: ${form.email.trim()}`)
  lines.push(`Phone: ${form.phone.trim()}`)
  if (form.country.trim()) lines.push(`Country / region: ${form.country.trim()}`)
  lines.push(`I am a: ${form.role}`)
  if (subject.product) lines.push(`Product: ${subject.product}`)
  if (subject.range) lines.push(`Range: ${subject.range}`)
  if (form.message.trim()) lines.push('', 'MESSAGE', form.message.trim())
  lines.push('', 'Thank you.')

  return lines.join('\n')
}

const FIELD =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] text-[#193174] ' +
  'outline-none transition-colors placeholder:text-[#193174]/35 ' +
  'focus:border-[#43791f] focus:ring-2 focus:ring-[#43791f]/15'

const borderFor = (error?: string) =>
  error ? 'border-[#b3261e]/60' : 'border-[#193174]/14 hover:border-[#193174]/25'

function Field({
  label,
  hint,
  error,
  className,
  children,
}: {
  label: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#193174]/55">
        {label}
        {hint && <span className="ml-1.5 font-semibold normal-case tracking-normal text-[#193174]/35">{hint}</span>}
      </span>
      {children}
      {error && <span className="text-[0.72rem] font-semibold text-[#b3261e]">{error}</span>}
    </label>
  )
}

export default function EnquiryDialog({
  subject,
  onClose,
}: {
  subject: EnquirySubject
  onClose: () => void
}) {
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  /* the mailto is needed twice — on submit, and behind "open my email again"
     on the confirmation, for the case where the handoff was blocked */
  const mailto =
    `mailto:${CONTACT.email}` +
    `?subject=${encodeURIComponent(subjectLine(subject))}` +
    `&body=${encodeURIComponent(bodyLines(form, subject))}`

  useEffect(() => {
    /* the page behind must not scroll under the panel, Escape must close, Tab
       must stay inside, and whatever opened the dialog gets focus back */
    const opener = document.activeElement as HTMLElement | null
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const stops = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea',
      )
      if (!stops || stops.length === 0) return

      const first = stops[0]
      const last = stops[stops.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = bodyOverflow
      opener?.focus?.()
    }
  }, [onClose])

  // the form is replaced by the confirmation, so focus has to follow it across
  useEffect(() => {
    if (sent) doneRef.current?.focus()
  }, [sent])

  const set = (key: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    // drop the complaint as soon as the visitor starts fixing it
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstBad = (Object.keys(found) as (keyof Form)[])[0]
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }

    /* There is no enquiry endpoint yet, so the details are handed to the
       visitor's own mail client already written out — nothing is lost while the
       inbox is being set up. Swapping this one line for a POST is all a
       server-side handler would need. */
    window.location.href = mailto
    setSent(true)
  }

  const heading = sent ? 'Enquiry ready to send' : 'Send an enquiry'

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-[#0d1a3a]/55 p-0 backdrop-blur-[2px] animate-scrim-in sm:items-center sm:p-4"
      // a click that starts on the panel and drifts onto the scrim is not a dismissal
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        /* the panel is capped to the viewport and scrolls internally — a taller
           panel inside a bottom-aligned scrim would push its own head off the
           top of the screen, out of reach */
        className="relative flex max-h-[94dvh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-2xl bg-[#f7f5ef] shadow-[0_24px_60px_rgba(13,26,58,0.35)] animate-panel-in sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the enquiry form"
          className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Close size={15} />
        </button>

        {/* the green band names the enquiry and, when there is one, the SKU it
            came from — so the product is on the form before a word is typed */}
        <div className="flex-none bg-[#43791f] px-5 py-5 pr-14 sm:px-7">
          <span className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
            {subject.product ? 'Product enquiry' : subject.range ? 'Range enquiry' : 'Get in touch'}
          </span>
          <h2 className="m-0 mt-1 text-[1.3rem] font-bold leading-snug text-white sm:text-[1.45rem]">
            {heading}
          </h2>

          {(subject.product || subject.range) && (
            <span className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-lg bg-white/14 px-3 py-1.5">
              <span className="text-[0.92rem] font-bold text-white">
                {subject.product ?? subject.range}
              </span>
              {subject.category && (
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/65">
                  {subject.category}
                </span>
              )}
            </span>
          )}
        </div>

        {sent ? (
          <div
            ref={doneRef}
            tabIndex={-1}
            role="status"
            className="flex-1 overflow-y-auto px-5 py-8 text-center outline-none sm:px-7"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#43791f]/12 text-[#43791f]">
              <CheckCircle size={26} />
            </span>
            <h3 className="m-0 mt-4 text-[1.1rem] font-bold text-[#193174]">
              Thank you, {form.name.trim().split(' ')[0]}
            </h3>
            <p className="mx-auto mt-2 mb-0 max-w-[42ch] text-[0.88rem] leading-[1.7] text-[#193174]/60">
              Your details have been written into an email addressed to our team
              {subject.product ? ` about ${subject.product}` : ''}. Send it from your mail
              client and we will come back to you within one working day.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <a
                href={mailto}
                className="inline-flex items-center gap-2 rounded-lg bg-[#43791f] px-5 py-2.5 text-[0.85rem] font-bold text-white transition-colors hover:bg-[#365f1a]"
              >
                <Mail size={15} /> Open the email again
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-[#193174]/12 bg-white px-5 py-2.5 text-[0.85rem] font-bold text-[#193174] transition-colors hover:border-[#43791f]/40 hover:text-[#43791f]"
              >
                <WhatsApp size={15} /> WhatsApp instead
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 cursor-pointer text-[0.8rem] font-bold text-[#193174]/50 transition-colors hover:text-[#193174]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <p className="m-0 mb-5 text-[0.86rem] leading-[1.65] text-[#193174]/60">
              A few details and our agronomy desk will get back to you with specification,
              pack sizes and pricing for your area.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Your name" error={errors.name} className="sm:col-span-2">
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className={`${FIELD} ${borderFor(errors.name)}`}
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className={`${FIELD} ${borderFor(errors.email)}`}
                />
              </Field>

              <Field label="Phone" error={errors.phone}>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  className={`${FIELD} ${borderFor(errors.phone)}`}
                />
              </Field>

              <Field label="Country / region" hint="optional">
                <input
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  placeholder="India"
                  value={form.country}
                  onChange={(e) => set('country', e.target.value)}
                  className={`${FIELD} ${borderFor()}`}
                />
              </Field>

              <Field label="I am a">
                {/* the native arrow is dropped so the control matches the text
                    inputs beside it, and drawn back with the site's own chevron */}
                <span className="relative block">
                  <select
                    name="role"
                    value={form.role}
                    onChange={(e) => set('role', e.target.value)}
                    className={`${FIELD} ${borderFor()} cursor-pointer appearance-none pr-10`}
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#193174]/45"
                  />
                </span>
              </Field>

              <Field label="Your message" hint="optional" className="sm:col-span-2">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Crop, acreage, quantity needed, or anything else that helps us answer properly."
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className={`${FIELD} ${borderFor()} resize-y leading-relaxed`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#43791f] px-6 py-3.5 text-[0.9rem] font-bold text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#365f1a] hover:shadow-md"
            >
              <Mail size={15} /> Send enquiry
            </button>

            {/* the form is the primary path, but a distributor on a phone would
                rather just call — so both direct routes stay one tap away */}
            <p className="m-0 mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.76rem] text-[#193174]/45">
              <span>Or reach us at</span>
              <a href={CONTACT.phoneHref} className="font-bold text-[#193174]/70 hover:text-[#43791f]">
                {CONTACT.phone}
              </a>
              <span className="text-[#193174]/25">·</span>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener"
                className="font-bold text-[#193174]/70 hover:text-[#43791f]"
              >
                WhatsApp
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
