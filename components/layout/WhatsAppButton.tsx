import { CONTACT } from '@/data/site'
import { WhatsApp } from '@/components/ui/icons'
import styles from './WhatsAppButton.module.css'

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      className={styles.wa}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
    >
      <WhatsApp />
    </a>
  )
}
