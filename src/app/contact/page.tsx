import type { Metadata } from 'next'
import { ContactPage } from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact FastFunRC - Get in Touch with RF/IoT Experts',
  description: 'Reach out to FastFunRC for RF remotes, IoT solutions, and OEM/ODM manufacturing inquiries. Multiple contact methods available worldwide.',
}

export default function Contact() {
  return <ContactPage />
}