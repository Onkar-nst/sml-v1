'use client'

import { useEnquiry, type EnquirySubject } from './EnquiryProvider'

/**
 * Opens the shared enquiry dialog.
 *
 * The trigger is split out from the provider so server components — the spec
 * sheet in particular — can drop an enquiry button in without becoming client
 * components themselves.
 */
export default function EnquiryButton({
  subject,
  className,
  ariaLabel,
  children,
}: {
  subject?: EnquirySubject
  className?: string
  ariaLabel?: string
  children: React.ReactNode
}) {
  const { open } = useEnquiry()

  return (
    <button type="button" aria-label={ariaLabel} className={className} onClick={() => open(subject)}>
      {children}
    </button>
  )
}
