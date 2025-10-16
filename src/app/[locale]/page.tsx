'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { HeaderBar } from '@/components/home/HeaderBar'
import { HeroSection } from '@/components/home/HeroSection'
import { StickyActions } from '@/components/home/StickyActions'
import { MobileActionBar } from '@/components/home/MobileActionBar'
import { TaskRoutingSection } from '@/components/home/TaskRoutingSection'
import { CompatibilityCenterSection } from '@/components/home/CompatibilityCenterSection'
import { ProcessTimelineSection } from '@/components/home/ProcessTimelineSection'
import { DeliveryThresholdsSection } from '@/components/home/DeliveryThresholdsSection'
import { ExtendedProductsSection } from '@/components/home/ExtendedProductsSection'
import { DownloadsSection } from '@/components/home/DownloadsSection'
import { ProductFinder } from '@/components/ProductFinder'
import { RfqModal } from '@/components/rfq/RfqModal'
import { TrustSection } from '@/components/home/TrustSection'
import { FAQSection } from '@/components/home/FAQSection'
import { ContactSection } from '@/components/home/ContactSection'
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection'
import { FactoryTourSection } from '@/components/home/FactoryTourSection'
import { SocialProofSection } from '@/components/home/SocialProofSection'
import { BrandStorySection } from '@/components/home/BrandStorySection'
import { StepFormSection } from '@/components/home/StepFormSection'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import { ComparisonBar } from '@/components/product/ComparisonBar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Phone, MessageCircle, Globe, Factory, Check, Clock, Star, Users, Cpu, Shield, Award, Radio, Wifi, Zap, Package, Settings, Download, Send, ChevronRight, Car } from 'lucide-react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)
  const [isRfqOpen, setIsRfqOpen] = useState(false)
  const [rfqSource, setRfqSource] = useState('default')
  const tNav = useTranslations('nav')

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

  const testimonialHighlights = [
    { value: '99.8%', label: 'Field reliability across deployments' },
    { value: '42%', label: 'Faster time-to-market vs. OEM average' },
    { value: '24h', label: 'Response SLA for engineering support' }
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'task-routing', 'compatibility', 'process-new', 'delivery', 'extended-products', 'downloads', 'about', 'products', 'process', 'capabilities', 'testimonials', 'contact']
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
      question: 'Why does actual range differ from the specs?',
      answer:
        'Range data on this page reflects open-field typical values. Indoor distance depends on antenna selection, mounting position, interference sources, and the surrounding environment.',
    },
    {
      question: 'Can you build a replacement if I do not have the original part number?',
      answer:
        'Providing 2–5 sample sets delivers the fastest validation. If samples are unavailable, detailed photos plus frequency and encoding information work—we will respond with A/B/C compatibility options and call out any caveats.',
    },
    {
      question: 'What is the difference between learning and cloning remotes?',
      answer:
        'Our learning remotes support cleartext fixed codes such as EV1527 or PT2262. We do not replicate rolling-code or encrypted algorithms; for those applications, pair our remotes with matched receivers or a bridge.',
    },
    {
      question: 'Can rolling-code systems be made compatible?',
      answer:
        'It depends on the receiver. When the existing receiver does not accept new rolling-code transmitters, we recommend replacing it or adding a bridge module that learns both sides.',
    },
    {
      question: 'Do you support white labeling and light cosmetic changes?',
      answer:
        'Yes. Button count, color, logo, silk print, and similar light customizations are available with MOQs between 50 and 200 units depending on the configuration.',
    },
    {
      question: 'What are the turn times for samples and small batches?',
      answer:
        'With complete documentation we ship samples in 2–5 days and small lots in 7–15 days. Requests outside the quick configuration scope enter engineering review with confirmed MOQ, NRE, and timeline.',
    },
    {
      question: 'How do you handle compliance and certification?',
      answer:
        'We follow the regulations of your target market—CE, FCC, KC, RoHS, and other regional directives as required. Testing and filing support is available on demand, with fees and lead times quoted separately.',
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
    { label: tNav('home'), target: 'hero' },
    { label: tNav('about'), href: '/about' },
    { label: tNav('products'), href: '/products' },
    { label: tNav('blog'), href: '/blog' },
    { label: tNav('contact'), href: '/contact' },
  ];

  const factoryGallery = [
    {
      id: 'factory-image-01',
      src: '/images/smt-production-line.webp',
      title: 'SMT Production Line',
      description: 'Dongguan 8,000m² facility | 5 SMT lines | 200K units/month capacity'
    },
    {
      id: 'factory-image-02',
      src: '/images/rf-shielded-test-lab.webp',
      title: 'RF Shielded Test Lab',
      description: '2 certified shielded rooms | FCC/CE pre-certification | Anritsu MS2690A analyzer'
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

      {/* Interest Section - Task Routing */}
      <section id="task-routing">
        <TaskRoutingSection />
      </section>

      {/* Compatibility/Replacement Center */}
      <section id="compatibility">
        <CompatibilityCenterSection />
      </section>

      {/* Desire Section - Process Timeline */}
      <section id="process-new">
        <ProcessTimelineSection />
      </section>

      {/* Delivery & Thresholds */}
      <section id="delivery">
        <DeliveryThresholdsSection />
      </section>

      {/* Extended Product Line */}
      <section id="extended-products">
        <ExtendedProductsSection />
      </section>

      {/* Downloads Section */}
      <section id="downloads">
        <DownloadsSection />
      </section>

      {/* Key Metrics Section - High Value Density */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                value: '15+ yrs',
                label: 'Manufacturing track record',
                description: 'ISO 9001:2015 facility delivering 47 new product introductions every year.'
              },
              {
                icon: Shield,
                value: '99.8%',
                label: 'Field reliability',
                description: 'Industry-leading quality with DPPM consistently under 500 units.'
              },
              {
                icon: MessageCircle,
                value: '24h',
                label: 'Engineer response SLA',
                description: 'Specialist feedback on every project within one business day.'
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4">
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.label}</h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">{metric.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3" onClick={() => openRfqModal('hero_metrics')}>
              <Send className="h-5 w-5 mr-2" />
              Start your project
            </Button>
            <p className="mt-3 text-sm text-slate-500">
              Average response time: <span className="font-semibold text-orange-600">under 10 minutes</span>
            </p>
          </div>
        </div>
      </section>

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
            <Badge className="mb-4 bg-orange-500/10 text-orange-600 border border-orange-500/30">Manufacturing Excellence</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Production Facilities</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              8,000m² state-of-the-art facility in Dongguan, supporting 47 new product introductions annually
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
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
                    loading="lazy"
                    quality={85}
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

      {/* Product Lines Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-orange-500/10 text-orange-600 border border-orange-500/30">Solution Catalog</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Product Families at a Glance</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Compatible replacements and high-value finished devices consolidated under one manufacturing roof.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: '315 / 433MHz Transmitters',
                description: 'Fixed code, rolling code, and learning models (learning supports fixed code only).',
                features: ['30–100 m open-field range', 'CE / FCC ready', 'Custom branding and key layouts', 'MOQ 50–200 units'],
                image: '/images/rf-remote.webp'
              },
              {
                title: 'Receiver Boards & Enclosures',
                description: 'Superheterodyne and regenerative designs with multi-channel outputs.',
                features: ['-110 dBm sensitivity', 'Learning-code pairing', 'Relay / dry-contact outputs', 'DIN rail or box mounting'],
                image: '/images/rf-receiver.webp'
              },
              {
                title: 'Pre-Paired RF Kits',
                description: 'Transmitter + receiver combinations for rapid deployment.',
                features: ['Factory paired and labeled', 'Complete documentation pack', 'Multi-language manuals', 'OEM or white-box packaging'],
                image: '/images/rf-kit.webp'
              },
              {
                title: 'Wi-Fi Switches & Sockets',
                description: '2.4 GHz app-connected lighting and power control.',
                features: ['Voice assistant ready', 'Energy monitoring options', 'OTA firmware support', 'Cloud or local control modes'],
                image: '/images/wifi-switch.webp'
              },
              {
                title: 'Automotive Remotes',
                description: '315 / 433 MHz housings that accept immobilizer programming.',
                features: ['ID46 / ID47 chip support', 'Flip and slab key styles', 'Panic / trunk button options', 'Anti-theft pairing workflow'],
                image: '/images/car-remote.webp'
              },
              {
                title: 'Custom Development',
                description: 'Private tooling, bespoke PCBA, firmware, app, and certification services.',
                features: ['Shared or amortized NRE plans', 'Dedicated engineering pod', 'Rapid prototyping videos', 'Program tracking and reporting'],
                image: '/images/custom-development.webp'
              }
            ].map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-slate-600 mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => openRfqModal(`product_${index}`)}
                  >
                    Request a quote
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Center Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-orange-500/10 text-orange-600 border border-orange-500/30">Download Center</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Product Documentation Library</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Spec sheets, certification packs, user manuals, 3D models, and app resources in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'Spec Sheets',
                description: 'Electrical specifications, mechanical drawings, and interface pinouts.',
                icon: Download,
                color: 'from-blue-500 to-blue-600',
                files: 12
              },
              {
                title: 'Compliance Certificates',
                description: 'CE, FCC, RoHS, REACH, KC, and ISO documentation for verification.',
                icon: Shield,
                color: 'from-green-500 to-green-600',
                files: 8
              },
              {
                title: 'User Manuals',
                description: 'Multilingual guides, installation steps, pairing, and troubleshooting.',
                icon: Package,
                color: 'from-purple-500 to-purple-600',
                files: 15
              },
              {
                title: '3D Assets',
                description: 'STEP, IGES, and DWG files for enclosure tooling and fixture design.',
                icon: Settings,
                color: 'from-orange-500 to-orange-600',
                files: 6
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-600">{category.files} files</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Need documents for a specific project?</h3>
            <p className="text-center text-slate-600 mb-6">Tell us the target product or retrofit scenario and we will curate the right files.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => openRfqModal('download_request')}>
                <Send className="h-5 w-5 mr-2" />
                Request document pack
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={() => openWhatsApp('download_whatsapp')}>
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp consult
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SocialProofSection />
      <BrandStorySection />
      <StepFormSection onOpenRfq={openRfqModal} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Testing Equipment Cards */}
            {[
              {
                title: 'Anritsu MS2690A',
                spec: '26.5GHz Spectrum Analyzer',
                usage: 'RF Power & Emission Testing',
                icon: Zap,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Shielded Rooms',
                spec: '2 x 3×3×3m Chambers',
                usage: 'FCC/CE Pre-certification',
                icon: Shield,
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'EN 300 220',
                spec: 'EU Compliance Standard',
                usage: '433MHz Device Certification',
                icon: Award,
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'FCC Part 15',
                spec: 'US Compliance Standard',
                usage: '315/433MHz Device Certification',
                icon: Globe,
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, index) => (
              <Card key={index} className="p-5 border-0 shadow hover:shadow-lg transition-all duration-300 h-full">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm font-semibold text-slate-700 mb-2">{item.spec}</p>
                <p className="text-xs text-slate-600">{item.usage}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
              View All Certifications
            </Button>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section id="capabilities" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-orange-500/10 text-orange-600 border border-orange-500/30">Industry Solutions</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tailored Solutions By Industry</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              End-to-end manufacturing with in-house engineering and testing for your specific market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'Smart Home & IoT',
                icon: Wifi,
                color: 'from-blue-500 to-blue-600',
                solutions: [
                  'WiFi Switches & Smart Sockets',
                  'RF Remote Control Systems',
                  'Mobile App Integration',
                  'Voice Control Compatibility'
                ],
                description: 'Complete home automation solutions with mobile app control'
              },
              {
                title: 'Automotive Security',
                icon: Car,
                color: 'from-green-500 to-green-600',
                solutions: [
                  'Keyless Entry Systems',
                  'Alarm & Immobilizer Modules',
                  'Remote Start Solutions',
                  'Fob Programming Services'
                ],
                description: 'OEM-grade automotive security with rolling code encryption'
              },
              {
                title: 'Industrial Access',
                icon: Factory,
                color: 'from-purple-500 to-purple-600',
                solutions: [
                  'Gate & Barrier Controls',
                  'Garage Door Operators',
                  'Industrial Remotes',
                  'RFID Integration Systems'
                ],
                description: 'Heavy-duty solutions for industrial environments'
              },
              {
                title: 'Lighting Control',
                icon: Zap,
                color: 'from-orange-500 to-orange-600',
                solutions: [
                  'Wireless Lighting Switches',
                  'Dimmer Control Modules',
                  'Scene Controllers',
                  'Commercial Lighting Solutions'
                ],
                description: 'Energy-efficient wireless control for commercial spaces'
              }
            ].map((industry, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center mb-4`}>
                  <industry.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{industry.description}</p>
                <ul className="space-y-2 mb-4">
                  {industry.solutions.map((solution, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={() => openRfqModal(`industry_${index}`)}>
                  Get Quote
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
              View Complete Product Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-orange-500/10 text-orange-600 border border-orange-500/30">Customer Proof</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Customer Success Stories</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Quantified results from long-term partnerships across smart home, automotive, and industrial sectors.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {testimonialHighlights.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white shadow-sm border border-slate-200/60 px-6 py-5 text-left"
              >
                <div className="text-3xl font-bold text-orange-600 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.company}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/95 shadow-lg hover:shadow-xl transition-shadow border border-slate-200/60">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1">
                        {testimonial.result}
                      </span>
                      <div className="hidden sm:flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-base text-slate-700 italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-auto">
                      <div className="text-sm uppercase tracking-wide text-slate-500">{testimonial.company}</div>
                      <div className="text-sm font-semibold text-orange-600 mt-1">{testimonial.savings}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" asChild>
              <a href="/blog">
                View Complete Success Stories
              </a>
            </Button>
          </div>

          {/* Competitor Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-white shadow-xl border-0">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Why Choose FastFun Remote</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-4 text-sm font-semibold text-gray-900">Feature</th>
                      <th className="text-center py-2 px-4 text-sm font-bold text-green-600">FastFun Remote</th>
                      <th className="text-center py-2 px-4 text-sm text-slate-500">Competitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Rapid Prototyping', us: '3-Day Samples', them: '7-10 Days' },
                      { feature: 'Quality Control', us: 'Defect Rate < 0.1%', them: '0.5-1%' },
                      { feature: 'Lead Time', us: '12 weeks', them: '16-20 weeks' },
                      { feature: '24h Response', us: 'Guaranteed', them: '48-72h' }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-4 font-medium text-gray-900 text-sm">{row.feature}</td>
                        <td className="text-center py-2 px-4">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            {row.us}
                            <Check className="h-3 w-3 ml-1" />
                          </span>
                        </td>
                        <td className="text-center py-2 px-4 text-slate-600 text-sm">{row.them}</td>
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


      <FAQSection onOpenRfq={openRfqModal} />


      <ContactSection onOpenRfq={openRfqModal} />

      <StickyActions
        onOpenRfq={openRfqModal}
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










