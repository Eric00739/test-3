'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { HeaderBar } from '@/components/home/HeaderBar'
import { HeroSection } from '@/components/home/HeroSection'
import { StickyActions } from '@/components/home/StickyActions'
import { MobileActionBar } from '@/components/home/MobileActionBar'
import { ProductFinder } from '@/components/ProductFinder'
import { RfqModal } from '@/components/rfq/RfqModal'
import { TrustSection } from '@/components/home/TrustSection'
import { ProductsSection } from '@/components/home/ProductsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { CapabilitiesSection } from '@/components/home/CapabilitiesSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FAQSection } from '@/components/home/FAQSection'
import { ContactSection } from '@/components/home/ContactSection'
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection'
import { FactoryTourSection } from '@/components/home/FactoryTourSection'
import { ProcessTimelineSection } from '@/components/home/ProcessTimelineSection'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import { ComparisonBar } from '@/components/product/ComparisonBar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Phone, MessageCircle, Globe, Factory, Check, Clock, Star, Users, Cpu, Shield, Award, Radio, Wifi, Zap, Package, Settings, Download, Send, ChevronRight, Car } from 'lucide-react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)
  const [isRfqOpen, setIsRfqOpen] = useState(false)
  const [rfqSource, setRfqSource] = useState('default')

  const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
    console.log(eventName, payload ?? {})
  }

  // Data definitions
const testimonials = [
    {
      quote: 'FastFun Remote delivered exceptional quality with 42% faster time-to-market. Their engineering team solved our RF challenges that other vendors couldn\'t.',
      company: 'Leading EU Gate Control Brand',
      result: '42% Faster Time-to-Market',
      savings: '€2.3M Savings Over 3 Years'
    },
    {
      quote: 'The reliability is outstanding - 99.8% field reliability with zero warranty claims. Their responsive engineering support made all the difference.',
      company: 'US Home Automation Company',
      result: '99.8% Field Reliability',
      savings: '$1.8M Reduction in Support Costs'
    }
  ]

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`[Performance] LCP: ${(entry as any).startTime.toFixed(2)}ms`)
          } else if (entry.entryType === 'first-input') {
            console.log(`[Performance] FID: ${((entry as any).processingStart - entry.startTime).toFixed(2)}ms`)
          } else if (entry.entryType === 'layout-shift') {
            if (!(entry as any).hadRecentInput) {
              console.log(`[Performance] CLS: ${(entry as any).value.toFixed(4)}`)
            }
          }
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      
      // Log page load time
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart
        console.log(`[Performance] Page load time: ${loadTime.toFixed(2)}ms`)
      })
      
      return () => observer.disconnect()
    }
  }, [])

  // Auto-switch testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'products', 'process', 'capabilities', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const faqItems = [
    {
      question: 'What is your MOQ and pricing structure?',
      answer:
        'MOQ starts from 50 units for standard products with flexible volume discounts. Our direct manufacturing model offers significant cost advantages compared to local sourcing, with pricing structures tailored to your specific requirements and order volume.',
    },
    {
      question: 'What are your lead times for samples and mass production?',
      answer:
        'Sample lead time: 7-10 days for standard products, 10-15 days for custom samples. Mass production: 20-30 days after sample approval. Rush orders available with 15% surcharge.',
    },
    {
      question: 'Which frequency bands and protocols do you support?',
      answer:
        'We support 315MHz, 433.92MHz, 868MHz, and 915MHz bands. Protocols: Fixed code, Rolling code (EV1527, PT2262), Learning code, ASK/FSK modulation. Custom frequency development available.',
    },
    {
      question: 'What certifications can you provide for our target market?',
      answer:
        'We provide CE (RED EN 300 220), FCC Part 15, RoHS, REACH, ISO 9001:2015, and IATF 16949:2016 certifications. Additional certifications (UL, ETL, etc.) can be obtained based on requirements.',
    },
    {
      question: 'What customization options are available for ODM projects?',
      answer:
        'Full ODM support: Private tooling, custom PCB design, firmware development, custom housing (injection molding), logo printing, custom packaging, custom frequency/protocol development. MOQ for private tooling: 1000-5000 units depending on complexity.',
    },
    {
      question: 'What is your warranty and RMA process?',
      answer:
        'Standard warranty: 12 months for all products. Extended warranty (24 months) available for bulk orders. RMA process: Report issue within warranty period 鈫?Return analysis 鈫?Replacement/refund within 7 days. DPPM rate: <500.',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const manufacturingServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'OEM/ODM RF Remote & Wi-Fi Switch Manufacturing',
    serviceType: 'Electronics Manufacturing Services',
    provider: {
      '@type': 'Organization',
      name: 'FastFunRC',
      url: 'https://www.fastfunrc.com/',
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'China' },
  ],
  hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RF Remote & IoT Manufacturing',
      itemListElement: [
        { '@type': 'Service', name: 'Custom RF Remote Controls' },
        { '@type': 'Service', name: 'RF Receiver Boards & Modules' },
        { '@type': 'Service', name: 'Wi-Fi Switches & Smart Sockets' },
      ],
    },
    termsOfService: 'https://www.fastfunrc.com/#contact',
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: '+86 158 9964 8898',
        contactType: 'sales',
        areaServed: 'Global',
      },
    },
  }

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const factoryGallery = [
    {
      id: 'factory-image-01',
      // TODO: replace `src` with production factory hero image #1 (recommended 1600x1000 WebP)
      src: 'https://images.unsplash.com/photo-1582719478181-2cf4e1b95b05?auto=format&fit=crop&w=1600&h=1000&q=80&fm=webp',
      title: 'SMT Production Floor',
      description: 'Inline SMT assembly with automated optical inspection (AOI) for RF remotes.'
    },
    {
      id: 'factory-image-02',
      // TODO: replace `src` with production factory hero image #2 (recommended 1600x1000 WebP)
      src: 'https://images.unsplash.com/photo-1580894897200-8eafc15323c7?auto=format&fit=crop&w=1600&h=1000&q=80&fm=webp',
      title: 'Quality & RF Calibration Lab',
      description: 'Shielded rooms with spectrum analysis and functional burn-in racks.'
    }
  ]

  const handleNavClick = (target: string) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  const openRfqModal = (source: string = 'default') => {
    if (source === 'hero_quote' || source === 'hero_sample') {
      trackEvent('hero_cta_click', { source })
    } else {
      trackEvent('rfq_open', { source })
    }
    setRfqSource(source)
    setIsRfqOpen(true)
    setIsWhatsAppOpen(false)
  }

  const openWhatsApp = (source: string) => {
    trackEvent('whatsapp_click', { source })
    setIsWhatsAppOpen(true)
  }

  const openWeChat = (source: string) => {
    trackEvent('wechat_click', { source })
    window.open('https://weixin.qq.com/', '_blank', 'noopener')
  }

  const handleFinderQuote = (productName: string) => {
    trackEvent('finder_use', { action: 'quote_start', product: productName })
    openRfqModal('finder_quote')
  }

  const handleRfqSubmit = (result: {
    status: 'success' | 'error' | 'whatsapp' | 'mailto';
    message?: string;
    data?: any;
  }) => {
    if (result.status === 'success') {
      trackEvent('rfq_submit', { source: rfqSource })
      closeRfqModal()
    } else if (result.status === 'mailto') {
      const mailtoUrl: string | undefined = result.data?.mailtoUrl
      if (mailtoUrl) {
        trackEvent('rfq_fallback_email', { source: rfqSource })
        window.location.href = mailtoUrl
      }
      return
    } else if (result.status === 'whatsapp') {
      if (result.data?.mailtoUrl) {
        // Handle fallback to email client
        trackEvent('rfq_fallback_email', { source: rfqSource })
        window.location.href = result.data.mailtoUrl
        return
      }

      // Handle WhatsApp click from modal CTA
      trackEvent('whatsapp_click', { source: 'rfq_modal' })
      window.open('https://wa.me/8615899648898', '_blank', 'noopener')
      closeRfqModal()
    } else if (result.status === 'error') {
      // Error is already displayed in the modal, no additional action needed
      console.error('RFQ submission error:', result.message)
    }
  }

  const closeRfqModal = () => {
    setIsRfqOpen(false)
    setRfqSource('default')
  }

  // Data definitions
  const partnerHighlights = [
    { name: 'Somfy', region: 'France' },
    { name: 'Chamberlain', region: 'USA' },
    { name: 'NICE', region: 'Italy' },
    { name: 'Hörmann', region: 'Germany' },
    { name: 'Marantec', region: 'Germany' }
  ]

  const trustSignals = [
    {
      icon: Factory,
      headline: '15+ Years Manufacturing',
      description: 'ISO 9001:2015 certified with 47 NPI projects annually'
    },
    {
      icon: Shield,
      headline: '98.7% FPY Rate',
      description: 'Industry-leading quality with DPPM under 500'
    },
    {
      icon: Globe,
      headline: 'Global Compliance',
      description: 'CE, FCC, RoHS, REACH certified for worldwide markets'
    },
    {
      icon: Users,
      headline: 'Dedicated Engineering',
      description: '8 R&D engineers with 15% holding master\'s degrees'
    }
  ]

  const processSteps = [
    {
      icon: Users,
      phase: 'Requirements',
      duration: '1-2 days',
      deliverables: 'Technical analysis, feasibility study, cost estimation',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Cpu,
      phase: 'Engineering',
      duration: '1-2 weeks',
      deliverables: 'Custom design, prototyping, technical specifications',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      phase: 'Validation',
      duration: '2-3 weeks',
      deliverables: 'Sample testing, compliance verification, design freeze',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Package,
      phase: 'Production',
      duration: '4-6 weeks',
      deliverables: 'Mass production, quality control, global shipping',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const capabilities = [
    {
      category: 'RF Solutions',
      items: ['315/433MHz Remotes', 'Rolling Code', 'Learning Code', 'Multi-channel Receivers']
    },
    {
      category: 'Smart Home',
      items: ['WiFi Switches', 'Smart Sockets', 'Gateways', 'Mobile Apps']
    },
    {
      category: 'Automotive',
      items: ['Keyless Entry', 'Alarm Systems', 'Remote Start', 'Immobilizers']
    },
    {
      category: 'Industrial',
      items: ['Garage Doors', 'Gate Controls', 'Access Control', 'RFID Systems']
    }
  ]

  const products = [
    {
      category: 'RF Remote Controls',
      description: 'High-performance wireless remotes with extended range and reliability',
      items: [
        {
          title: '433MHz 4-Button Remote',
          icon: Radio,
          color: 'from-blue-500 to-blue-600',
          specs: 'Frequency: 433.92MHz | Range: 100m | Battery: 27A 12V',
          features: ['Rolling Code', 'IP65', 'CE/FCC', 'Custom Logo'],
          useCase: 'Garage Doors',
          certification: 'CE RED',
        },
        {
          title: '315MHz Car Remote',
          icon: Car,
          color: 'from-green-500 to-green-600',
          specs: 'Frequency: 315MHz | Range: 50m | Battery: CR2032 3V',
          features: ['Immobilizer', 'Flip Design', 'Panic Button', 'VALET'],
          useCase: 'Automotive',
          certification: 'FCC Part 15',
        },
        {
          title: '8-Channel Universal',
          icon: Settings,
          color: 'from-purple-500 to-purple-600',
          specs: 'Frequency: 433/868MHz | Range: 150m | Battery: AAA 1.5V×2',
          features: ['Learning Code', 'Backlit', 'Multi-device', 'LCD Display'],
          useCase: 'Smart Home',
          certification: 'CE RED',
        }
      ]
    },
    {
      category: 'RF Receivers & Kits',
      description: 'High-sensitivity receivers with easy integration options',
      items: [
        {
          title: 'Superheterodyne Receiver',
          icon: Wifi,
          color: 'from-orange-500 to-orange-600',
          specs: 'Frequency: 433.92MHz | Sensitivity: -110dBm | Voltage: 5-12V DC',
          features: ['4 Channels', 'Relay Output', 'Learning Code', 'Easy Wiring'],
          useCase: 'Gate Control',
          certification: 'CE RED',
        },
        {
          title: 'RF Control Kit',
          icon: Package,
          color: 'from-red-500 to-red-600',
          specs: '1x Remote + 1x Receiver | Range: 100m | Battery Included',
          features: ['Plug & Play', 'Pairing Guide', 'Mounting Hardware', 'User Manual'],
          useCase: 'Lighting Control',
          certification: 'CE/FCC',
        },
        {
          title: 'Multi-frequency Receiver',
          icon: Zap,
          color: 'from-indigo-500 to-indigo-600',
          specs: 'Frequency: 315/433/868MHz | Sensitivity: -108dBm | Output: 4 Relays',
          features: ['Auto Scan', 'Wide Range', 'DIN Rail', 'LED Status'],
          useCase: 'Industrial',
          certification: 'CE RED',
        }
      ]
    },
    {
      category: 'WiFi Smart Solutions',
      description: 'IoT-enabled devices with app control and automation',
      items: [
        {
          title: 'WiFi Light Switch',
          icon: Wifi,
          color: 'from-teal-500 to-teal-600',
          specs: 'Voltage: 90-250V AC | Power: 1200W | WiFi: 2.4GHz',
          features: ['App Control', 'Voice Control', 'Timer', 'Energy Monitor'],
          useCase: 'Smart Home',
          certification: 'CE/FCC/UL',
        },
        {
          title: 'WiFi Smart Socket',
          icon: Zap,
          color: 'from-cyan-500 to-cyan-600',
          specs: 'Voltage: 90-250V AC | Power: 16A | WiFi: 2.4GHz',
          features: ['Energy Monitor', 'Schedule', 'Voice Control', 'Overload Protection'],
          useCase: 'Home Automation',
          certification: 'CE/FCC/UL',
        },
        {
          title: 'WiFi Gateway Hub',
          icon: Globe,
          color: 'from-emerald-500 to-emerald-600',
          specs: 'Protocol: Zigbee/Z-Wave/WiFi | Range: 50m | Power: 5V DC',
          features: ['Multi-protocol', 'Local Control', 'Cloud Backup', 'Scene Control'],
          useCase: 'Smart Home',
          certification: 'CE/FCC',
        }
      ]
    }
  ]


  return (
    <ComparisonProvider>
      <div className="min-h-screen bg-white">
        <HeaderBar
          activeSection={activeSection}
          onNavClick={handleNavClick}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenRfq={openRfqModal}
          isMobileMenuOpen={isMobileMenuOpen}
          navLinks={navLinks}
        />

      <HeroSection onOpenRfq={openRfqModal} onWhatsApp={openWhatsApp} onWeChat={openWeChat} />

      {/* Factory Gallery */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-orange-500/10 text-orange-600 border border-orange-500/30">Inside FastFunRC</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Factory Capability Snapshot</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              A quick look at our SMT lines, RF calibration labs, and outbound packaging areas supporting 47 new product
              introductions every year.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {factoryGallery.map((item, index) => (
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{item.description}</p>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <TrustSection onOpenRfq={openRfqModal} onWhatsApp={openWhatsApp} />

      <ProductFinder onQuote={handleFinderQuote} onTrack={trackEvent} />

      <ProcessSection onOpenRfq={openRfqModal} />

      <CapabilitiesSection />

      <ProductsSection onOpenRfq={openRfqModal} />

      <CaseStudiesSection />

      {/* Quality & Compliance Section - Combined */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Quality & Compliance</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Full compliance testing with EN 300 220 and FCC Part 15 certification capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Testing Capabilities */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Testing Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">EU Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-slate-700">EN 300 220 Standard</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-slate-700">CE RED Certification</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-slate-700">RF Power Testing</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-slate-700">Frequency Deviation</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">US Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-slate-700">FCC Part 15 Certification</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-slate-700">Anritsu MS2690A (26.5GHz)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-slate-700">Shielded Room Testing</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-slate-700">Spurious Emissions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Certifications */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Key Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'CE (RED EN 300 220)',
                    description: 'For 433 MHz remotes',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    title: 'FCC Part 15',
                    description: 'For 315/433 MHz devices',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    title: 'ISO 9001:2015',
                    description: 'Quality Management System',
                    color: 'from-purple-500 to-purple-600'
                  },
                  {
                    title: 'RoHS Compliance',
                    description: 'Environmental Protection',
                    color: 'from-orange-500 to-orange-600'
                  }
                ].map((cert, index) => (
                  <Card key={index} className="p-4 border-0 shadow hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">{cert.title}</h4>
                        <p className="text-xs text-slate-600">{cert.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                  View All Certifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Matrix - Simplified and integrated with Capabilities */}
      <section id="capabilities" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Capabilities & Products</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              End-to-end manufacturing with in-house engineering and testing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {capabilities.map((capability, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{capability.category}</h3>
                <ul className="space-y-2">
                  {capability.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          
          {/* Representative Products */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-slate-600 mb-8">Examples of our most popular solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((category, catIndex) => (
              <Card key={catIndex} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <div className={`h-2 bg-gradient-to-r ${category.items[0].color}`} />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.category}</h3>
                  <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                  <div className="space-y-3">
                    {category.items.slice(0, 2).map((product, prodIndex) => (
                      <div key={prodIndex} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${product.color} rounded-lg flex items-center justify-center`}>
                          <product.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{product.title}</h4>
                          <p className="text-xs text-slate-500">{product.useCase}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
              View Complete Product Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Customer Success Stories</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Quantified results from long-term partnerships
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="overflow-hidden">
              <motion.div 
                className="flex"
                animate={{ x: -currentTestimonial * 100 + '%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="p-12 bg-white shadow-xl border-0">
                      <div className="text-center mb-8">
                        <div className="text-4xl font-bold text-green-600 mb-4">{testimonial.result}</div>
                        <p className="text-2xl text-slate-700 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                        <div className="text-lg text-slate-600">
                          <div className="font-bold text-gray-900 text-xl mb-2">{testimonial.company}</div>
                          <div className="text-orange-600 font-semibold">{testimonial.savings}</div>
                        </div>
                      </div>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Competitor Comparison */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 bg-white shadow-xl border-0">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose FastFun Remote as Your Manufacturing Supplier</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 px-6 text-lg font-semibold text-gray-900">Feature</th>
                      <th className="text-center py-4 px-6 text-lg font-bold text-green-600">FastFun Remote</th>
                      <th className="text-center py-4 px-6 text-lg text-slate-500">Typical Competitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Rapid Prototyping', us: '3-Day Samples, 15-Day Tooling', them: '7-10 Days Samples' },
                      { feature: 'Proprietary RF Tech', us: '30% Longer Battery Life', them: 'Standard Battery Life' },
                      { feature: 'Quality Control', us: 'Defect Rate < 0.1%', them: 'Defect Rate 0.5-1%' },
                      { feature: 'Service Level', us: 'Dedicated Project Manager', them: 'Account Manager' },
                      { feature: 'FPY Rate', us: '98.7%', them: '95-97%' },
                      { feature: 'Lead Time', us: '12 weeks', them: '16-20 weeks' },
                      { feature: '24h Response', us: 'Guaranteed', them: '48-72h' }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                        <td className="text-center py-4 px-6">
                          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                            {row.us}
                            <Check className="h-4 w-4 ml-2" />
                          </span>
                        </td>
                        <td className="text-center py-4 px-6 text-slate-600">{row.them}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <FactoryTourSection />

      <ProcessTimelineSection />

        {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Common questions about our RF & IoT control solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 border-0 h-full">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 text-left focus:outline-none focus:ring-4 focus:ring-orange-100 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-xs">{index + 1}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 pr-3">{faq.question}</h3>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                          expandedFaq === index ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 pb-4 pt-1">
                      <div className="pl-10">
                        <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
              <p className="text-sm text-slate-600 mb-4">Our expert engineers are ready to help with your project requirements</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => openRfqModal('faq_consult')}>
                  <Phone className="h-4 w-4 mr-2" />
                  Consult Engineers
                </Button>
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" type="button" onClick={() => openRfqModal('faq_quote')}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Quote
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>


      <ContactSection onOpenRfq={openRfqModal} />

      <StickyActions
        onContactScroll={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        onWhatsApp={openWhatsApp}
      />

      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/70"
            onClick={() => setIsWhatsAppOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="WhatsApp contact"
            className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Chat with our engineer on WhatsApp</h3>
                  <p className="text-sm text-slate-500">Average response time under 10 minutes during business hours</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-2xl leading-none"
                aria-label="Close WhatsApp panel"
              >
                &times;
              </button>
            </div>
            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>Send us your project requirements (quantity, protocol, certification needs). Engineer <strong>Eric</strong> replies via WhatsApp within 10 minutes.</p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
                <div className="font-semibold text-slate-700">WhatsApp</div>
                <a
                  href="https://wa.me/8615899648898"
                  target="_blank"
                  rel="noopener"
                  className="text-orange-600 font-semibold hover:underline"
                  onClick={() => setIsWhatsAppOpen(false)}
                >
                  +86 158 9964 8898
                </a>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <a
                href="https://wa.me/8615899648898"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-600 transition-colors"
                onClick={() => setIsWhatsAppOpen(false)}
              >
                Open WhatsApp
              </a>
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setIsWhatsAppOpen(false)}
              >
                Later
              </Button>
            </div>
          </div>
        </div>
      )}
      <RfqModal
        open={isRfqOpen}
        onClose={closeRfqModal}
        onSubmit={handleRfqSubmit}
        source={rfqSource}
      />
      <MobileActionBar onOpenRfq={openRfqModal} onWhatsApp={openWhatsApp} />


      {/* Floating Elements for Tech Feel */}
      <div className="fixed top-32 right-8 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <Wifi className="h-8 w-8 text-white" />
        </motion.div>
      </div>

      <div className="fixed bottom-32 left-8 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
        >
          <Radio className="h-6 w-6 text-white" />
        </motion.div>
      </div>

      <SiteFooter />

      <Script id="faq-structured-data" strategy="afterInteractive" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="service-structured-data" strategy="afterInteractive" type="application/ld+json">
        {JSON.stringify(manufacturingServiceJsonLd)}
      </Script>
      
      <ComparisonBar />
      </div>
    </ComparisonProvider>
  )
}


