import type { Metadata } from 'next'
import { AboutPage } from './AboutPage'

export const metadata: Metadata = {
  title: 'About FastFunRC - Leading RF/IoT OEM Manufacturer Since 2010',
  description: 'Learn about FastFunRC\'s journey as a trusted OEM/ODM partner for RF remotes, IoT devices, and smart home solutions. ISO 9001 certified with 15+ years of manufacturing excellence.',
}

export default function About() {
  return <AboutPage />
}