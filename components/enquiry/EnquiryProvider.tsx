'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import EnquiryDialog from './EnquiryDialog'

/**
 * What the enquiry is about, as known by whatever was clicked.
 *
 * Every field is optional: the header pill knows nothing, a shelf card knows
 * the SKU, and the spec sheet knows the SKU and its category. The dialog shows
 * back whatever it was handed and carries it into the enquiry itself.
 */
export interface EnquirySubject {
  /** the product the visitor was looking at */
  product?: string
  /** its category label, shown beside the name */
  category?: string
  /** a range, for enquiries the catalogue has no SKU for yet */
  range?: string
}

interface EnquiryApi {
  open: (subject?: EnquirySubject) => void
  close: () => void
}

const EnquiryContext = createContext<EnquiryApi | null>(null)

export function useEnquiry(): EnquiryApi {
  const api = useContext(EnquiryContext)
  if (!api) throw new Error('useEnquiry must be called inside <EnquiryProvider>')
  return api
}

/**
 * Holds the one dialog the whole site shares.
 *
 * Mounting a form per enquiry button would put dozens of them on the catalogue
 * page, so the dialog lives at the root and the buttons only say what the
 * enquiry is about. `subject` doubles as the open flag — non-null means open.
 */
export default function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [subject, setSubject] = useState<EnquirySubject | null>(null)

  const open = useCallback((next?: EnquirySubject) => setSubject(next ?? {}), [])
  const close = useCallback(() => setSubject(null), [])

  const api = useMemo(() => ({ open, close }), [open, close])

  return (
    <EnquiryContext.Provider value={api}>
      {children}
      {subject && <EnquiryDialog subject={subject} onClose={close} />}
    </EnquiryContext.Provider>
  )
}
