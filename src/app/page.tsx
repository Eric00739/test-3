'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Play, Phone, MessageCircle, Download, Factory, Shield, Award, TrendingUp, Clock, Package, Zap, Wifi, Cpu, Radio, Settings, ChevronRight, ArrowRight, Star, Users, Globe, BarChart3, Upload, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)
  const [isRfqOpen, setIsRfqOpen] = useState(false)

  // Auto-switch testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Structured Data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "FastFun Remote",
      "description": "Leading OEM/ODM manufacturer of custom remote controls, WiFi switches, and IoT modules. ISO 9001 certified with 15 years experience.",
      "url": "https://fastfunremote.com",
      "logo": "https://fastfunremote.com/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-0123",
        "contactType": "sales",
        "availableLanguage": ["English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Shenzhen",
        "addressCountry": "CN"
      },
      "sameAs": [
        "https://linkedin.com/company/techmanufacturing"
      ],
      "certification": [
        "ISO 9001",
        "ISO 14001", 
        "IATF 16949",
        "ISO 13485"
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'products', 'blog', 'process', 'capabilities', 'testimonials', 'contact']
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

      const kpis = [
    { label: 'Factory Size', value: '4,000 m²', icon: Factory },
    { label: 'Monthly Capacity (Pcs)', value: '500,000', icon: Package },
    { label: 'R&D Engineers', value: '8', icon: Users },
    { label: 'On-Time Delivery', value: '97%', icon: Clock },
  ];

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const withBasePath = (path: string) => `${basePath}${path}`

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About us', target: 'about' },
    { label: 'Products', target: 'products' },
    { label: 'Blog', target: 'blog' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleNavClick = (target: string) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  const openRfqModal = () => {
    setIsRfqOpen(true)
    setIsWhatsAppOpen(false)
  }

  const closeRfqModal = () => {
    setIsRfqOpen(false)
  }

  const clientLogos = [
    { name: 'EU Gate Control Brand', category: 'Garage Doors', tenure: '6 years', volume: '120k/yr' },
    { name: 'APAC Lighting Brand', category: 'Smart Lighting', tenure: '4 years', volume: '80k/yr' },
    { name: 'US Home Automation', category: 'Smart Home', tenure: '3 years', volume: '95k/yr' },
    { name: 'Aftermarket Auto Brand', category: 'Automotive', tenure: '5 years', volume: '65k/yr' }
  ]

  const products = [
    {
      category: 'Smart Home & Appliance Controls',
      description: 'For brands in the home electronics sector',
      items: [
        {
          title: 'WiFi Smart Switch Manufacturer',
          icon: Wifi,
          specs: 'Protocol: 2.4GHz 802.11b/g/n • Power: 10A/16A/20A • Voltage: 100-240V AC • Size: 45&times;45&times;22mm • Cert: CE/FCC/UL',
          features: ['App Control', 'Voice Control', 'Timer Function', 'Energy Monitoring'],
          useCase: 'Smart Home',
          certification: 'CE/FCC/UL',
          color: 'from-indigo-500 to-indigo-600',
          details: '2.4GHz 802.11b/g/n, 10A/16A/20A options, Tuya/Smart Life compatible'
        },
        {
          title: 'WiFi Smart Socket',
          icon: Zap,
          specs: 'Protocol: 2.4GHz 802.11b/g/n • Power: 16A max • Voltage: 100-240V AC • Size: 60&times;60&times;78mm • Cert: CE/FCC/UL',
          features: ['Power Metering', 'Schedule', 'Overload Protection', 'Voice Control'],
          useCase: 'Home Automation',
          certification: 'CE/FCC/UL',
          color: 'from-cyan-500 to-cyan-600',
          details: '2.4GHz, 16A max load, ±1% energy metering accuracy'
        },
        {
          title: '868/915MHz Universal Remote',
          icon: Radio,
          specs: 'Band: 868/915MHz • Modulation: ASK/FSK • Code: learning • TX: 12dBm • RX: -98dBm • Power: AAA • Size: 70&times;40&times;18mm • Cert: CE RED/FCC',
          features: ['Learning Code', 'Multi-button', 'Low Power', 'EU/US compliant'],
          useCase: 'Smart Home',
          certification: 'CE RED/FCC',
          color: 'from-green-500 to-green-600',
          details: '868.3MHz (EU) / 915MHz (US), -98dBm sensitivity, 100m range'
        }
      ]
    },
    {
      category: 'Industrial & Automotive Remote Systems',
      description: 'For industrial and automotive clients',
      items: [
        {
          title: '433MHz Rolling Code Remote',
          icon: Radio,
          specs: 'Band: 433.92MHz • Modulation: ASK/FSK • Code: rolling • TX: 10dBm • RX: -100dBm • Power: CR2032 • Size: 58&times;35&times;12mm • Cert: CE/FCC',
          features: ['Rolling Code', '4-Button', '12V Battery', 'IP65'],
          useCase: 'Garage Doors',
          certification: 'CE/FCC/RoHS',
          color: 'from-blue-500 to-blue-600',
          details: 'EV1527/PT2262 compatible, 433.92MHz ±100kHz, -100dBm sensitivity'
        },
        {
          title: '315MHz Car Remote',
          icon: Settings,
          specs: 'Band: 315MHz • Modulation: ASK • Code: fixed/rolling • TX: 8dBm • RX: -95dBm • Power: AAA • Size: 65&times;35&times;15mm • Cert: ISO 11452',
          features: ['Keyless Entry', 'Remote Start', 'Alarm System', '433MHz'],
          useCase: 'Automotive',
          certification: 'ISO 11452',
          color: 'from-red-500 to-red-600',
          details: 'Immobilizer compatible, 315MHz ±150kHz, -95dBm sensitivity'
        },
        {
          title: 'Superheterodyne Receiver',
          icon: Wifi,
          specs: 'Band: 433/315MHz • Modulation: ASK/FSK • Channels: 4 • RX: -110dBm • Power: 12V DC • Size: 45&times;25&times;8mm • Cert: CE/FCC',
          features: ['Multi-channel', 'Learning Code', 'Relay Output', 'LED indicator'],
          useCase: 'Security Systems',
          certification: 'CE/FCC',
          color: 'from-purple-500 to-purple-600',
          details: '433.92MHz ±100kHz, -110dBm sensitivity, 4-channel output'
        }
      ]
    },
    {
      category: 'Custom WiFi & Bluetooth Modules',
      description: 'For developers needing wireless integration',
      items: [
        {
          title: 'RF Kit (Transmitter + Receiver)',
          icon: Package,
          specs: 'Band: 433MHz • Modulation: ASK • Code: pre-paired • TX: 10dBm • RX: -105dBm • Power: CR2032/12V • Cert: RoHS',
          features: ['Pre-paired', 'Ready to Use', 'Custom Frequencies', 'Technical Support'],
          useCase: 'DIY Projects',
          certification: 'RoHS Compliant',
          color: 'from-orange-500 to-orange-600',
          details: '433MHz paired set, 100m range, includes transmitter and receiver'
        }
      ]
    }
  ]

  const processSteps = [
    { 
      phase: 'Discovery', 
      duration: '1-2 weeks', 
      deliverables: 'Requirements analysis, Technical feasibility',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      phase: 'Prototyping', 
      duration: '2-3 weeks', 
      deliverables: 'Functional prototype, Initial testing',
      icon: Cpu,
      color: 'from-green-500 to-green-600'
    },
    { 
      phase: 'Compliance', 
      duration: '3-4 weeks', 
      deliverables: 'Certification testing, Documentation',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      phase: 'Mass Production', 
      duration: '6-8 weeks', 
      deliverables: 'Full-scale production, Quality assurance',
      icon: Factory,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const capabilities = [
    { category: 'RF Design', items: ['Antenna Design', 'RF Testing', 'EMC/EMI', 'Protocol Stack'] },
    { category: 'Laboratory', items: ['Signal Analysis', 'Environmental Testing', 'Reliability Testing', 'Compliance Testing'] },
    { category: 'Manufacturing', items: ['SMT Lines', 'AOI/AXI', 'Wave Soldering', 'Conformal Coating'] },
    { category: 'Quality', items: ['ISO 9001', 'IATF 16949', 'Medical ISO 13485', 'Statistical Process Control'] }
  ]

  const testimonials = [
    {
      company: 'SmartHome Inc.',
      result: '42% faster time-to-market',
      quote: 'Their engineering team helped us reduce our development cycle from 6 to 3.5 months. The quality is exceptional.',
      savings: '$1.2M saved in development costs'
    },
    {
      company: 'Industrial Controls Ltd.',
      result: '99.8% field reliability',
      quote: 'We\'ve shipped over 500,000 units with DPPM under 200. Their quality control is second to none.',
      savings: 'Zero warranty claims in 24 months'
    }
  ]

  const certificates = [
    { name: 'ISO 9001', category: 'Quality Management' },
    { name: 'ISO 14001', category: 'Environmental' },
    { name: 'IATF 16949', category: 'Automotive' },
    { name: 'ISO 13485', category: 'Medical' },
    { name: 'FCC Part 15', category: 'US Compliance' },
    { name: 'CE RED', category: 'EU Compliance' },
    { name: 'RoHS', category: 'Environmental' },
    { name: 'REACH', category: 'Chemical Safety' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-8">
              <div className="flex items-center">
                <Image
                  src={withBasePath('/logo-fastfun-remote.png')}
                  alt="FastFun Remote logo"
                  width={160}
                  height={48}
                  priority
                  className="h-10 w-auto"
                />
              </div>
              <div className="hidden md:flex space-x-4 lg:space-x-6">
                {navLinks.map((link) => (
                  <button
                    key={link.target}
                    type="button"
                    onClick={() => handleNavClick(link.target)}
                    className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer hover:text-orange-500 ${activeSection === link.target ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex text-xs sm:text-sm" type="button" onClick={openRfqModal}>
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Catalog</span>
                <span className="sm:hidden">Cat</span>
              </Button>
              <Button size="sm" type="button" className="text-xs sm:text-sm px-2 sm:px-4 bg-orange-500 hover:bg-orange-600 text-white" onClick={openRfqModal}>
                <span className="hidden sm:inline">Get a Custom Quote</span>
                <span className="sm:hidden">Quote</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </Button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="py-4 border-t border-gray-100">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  className={`block w-full text-left py-2 px-4 text-sm font-medium transition-colors hover:bg-gray-50 cursor-pointer ${activeSection === link.target ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-500'}`}
                  onClick={() => handleNavClick(link.target)}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button variant="outline" size="sm" className="w-full mb-2 text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Catalog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section id="hero" className="relative pt-16 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                In-house Factory · OEM/ODM for RF Remotes & Wi-Fi Switches
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-6 sm:mb-8 max-w-3xl leading-relaxed font-light">
                433/315/868/915 MHz | Tooling + PCBA + RF Tuning | CE/FCC/RoHS | 7-Day Prototyping
              </p>
              
              {/* Key Points */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl">
                {["Custom housings & protocols", ">99% mass-production yield", "On-time delivery", "One-to-one engineer support"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs sm:text-sm font-medium">
                    <Check className="h-4 w-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 gap-3 sm:gap-4">
                <span>Chosen by brands in 40+ countries</span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span>ISO9001 / CE / FCC / RoHS</span>
              </div>
              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-6 bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto" type="button" onClick={openRfqModal}>
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-slate-300 text-slate-700 hover:bg-slate-50 w-full sm:w-auto" type="button" onClick={openRfqModal}>
                    Request Sample
                  </Button>
                  <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-green-500 text-green-600 hover:bg-green-50 w-full sm:w-auto" type="button" onClick={() => setIsWhatsAppOpen(true)}>
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-slate-500 text-slate-700 hover:bg-slate-50 w-full sm:w-auto" type="button" onClick={() => window.open('https://weixin.qq.com/', '_blank', 'noopener')}>
                    WeChat
                  </Button>
                </div>
              </div>
              
              {/* Process Promise */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 px-4 py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl">
                <div className="flex items-center text-sm sm:text-base text-slate-700">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                  <span className="font-medium">Requirements (24h)</span>
                </div>
                <ChevronRight className="h-4 w-4 text-orange-400 hidden sm:block" />
                <div className="flex items-center text-sm sm:text-base text-slate-700">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                  <span className="font-medium">Functional Sample (7-10 days)</span>
                </div>
                <ChevronRight className="h-4 w-4 text-orange-400 hidden sm:block" />
                <div className="flex items-center text-sm sm:text-base text-slate-700">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                  <span className="font-medium">Mass Production (20-30 days)</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content - Factory Video & Certificates */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Factory Video Placeholder */}
              <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Factory className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium mb-4">15s Factory Montage</p>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Play Video
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                  SMT → AOI → RF Test → Burn-in → Packing
                </div>
              </div>
              
              {/* Certificate Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded mb-2 flex items-center justify-center">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 text-center">Business License</p>
                  <p className="text-xs text-blue-600 text-center">View PDF</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded mb-2 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 text-center">ISO 9001</p>
                  <p className="text-xs text-blue-600 text-center">View PDF</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded mb-2 flex items-center justify-center">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 text-center">CE RED</p>
                  <p className="text-xs text-blue-600 text-center">View PDF</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities at a Glance */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Manufacturing Capabilities at a Glance</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              State-of-the-art facility with comprehensive in-house capabilities from design to delivery
            </p>
          </motion.div>


          <div className="text-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              <Play className="h-5 w-5 mr-2" />
              Watch Our Factory Tour Video
            </Button>
          </div>
        </div>
      </section>

      {/* KPI & Trust Section - Second Screen */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* KPI Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20 lg:mb-24"
          >
            {kpis.map((kpi, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-3 sm:mb-4 group-hover:shadow-lg transition-all duration-300">
                  <kpi.icon className="h-6 w-6 sm:h-8 sm:w-10 lg:h-10 lg:w-10 mx-auto mb-2 sm:mb-4 text-orange-600" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{kpi.value}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{kpi.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Client Logos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-8 sm:mb-12">Trusted by Industry Leaders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {clientLogos.map((client, index) => (
                <div key={index} className="group text-center">
                  <div className="bg-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 mb-3 sm:mb-4 group-hover:bg-slate-100 transition-colors duration-300">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mx-auto bg-gradient-to-br from-slate-300 to-slate-400 rounded-lg sm:rounded-xl" />
                  </div>
                  <div className="text-sm sm:text-base font-bold text-gray-900 mb-1">{client.name}</div>
                  <div className="text-xs sm:text-sm text-slate-600 mb-1">{client.category}</div>
                  <div className="text-xs text-orange-600 font-semibold">{client.tenure} • {client.volume}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customization Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">What We Customize</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Full customization capabilities with transparent MOQ and pricing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Private Tooling',
                description: 'Custom housing design and manufacturing',
                moq: '3,000 units',
                cost: 'From $2,800',
                icon: Settings,
                color: 'from-blue-500 to-blue-600',
                features: ['Custom 3D design', 'Injection molding', 'Brand colors', 'Logo printing']
              },
              {
                title: 'Key Layout & Membrane',
                description: 'Custom button arrangement and membrane design',
                moq: '1,000 units',
                cost: 'From $800',
                icon: Radio,
                color: 'from-green-500 to-green-600',
                features: ['Custom button count', 'Membrane design', 'Backlight options', 'Tactile feedback']
              },
              {
                title: 'Protocol & Pairing',
                description: 'Custom RF protocol and pairing methods',
                moq: '500 units',
                cost: 'From $1,200',
                icon: Wifi,
                color: 'from-purple-500 to-purple-600',
                features: ['Rolling code', 'Learning code', 'Custom encryption', 'Multi-device pairing']
              },
              {
                title: 'RF Range & Performance',
                description: 'Extended range and anti-interference optimization',
                moq: '1,000 units',
                cost: 'From $600',
                icon: Zap,
                color: 'from-orange-500 to-orange-600',
                features: ['150-300m range', 'Anti-interference', 'Power optimization', 'Multi-frequency']
              },
              {
                title: 'Receiver/Gateway Matching',
                description: 'Custom receiver modules and gateways',
                moq: '500 units',
                cost: 'From $1,500',
                icon: Package,
                color: 'from-red-500 to-red-600',
                features: ['Custom receivers', 'Gateway integration', 'Protocol matching', 'Network topology']
              },
              {
                title: 'Branding & Packaging',
                description: 'Custom packaging and brand integration',
                moq: '500 units',
                cost: 'From $400',
                icon: Award,
                color: 'from-indigo-500 to-indigo-600',
                features: ['Custom packaging', 'User manual', 'Brand colors', 'Multi-language']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">MOQ:</span>
                      <span className="font-semibold text-orange-600">{service.moq}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Cost:</span>
                      <span className="font-semibold text-gray-900">{service.cost}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-600">
                        <Check className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">R&D & Manufacturing Excellence</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              8 R&D engineers with 15% holding master's degrees, delivering cutting-edge IoT solutions
            </p>
          </motion.div>

          {/* R&D Team Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                  <div className="text-sm text-slate-600">R&D Engineers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">15%</div>
                  <div className="text-sm text-slate-600">Master's Degrees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">47</div>
                  <div className="text-sm text-slate-600">NPI Projects/Year</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'SMT Equipment',
                items: ['Panasonic NPM-W2 (50,000 CPH)', 'DEK Horizon', 'Reflow Oven 10-zone', 'AOI &times; 2'],
                icon: Factory,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Testing Equipment',
                items: ['Anritsu MS2690A (26.5GHz)', 'EN 300 220 Test', 'FCC Part 15', 'Shielded Room'],
                icon: Shield,
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Quality Control',
                items: ['100% RF Power Test', 'Frequency Deviation Check', 'AQL 0.65/1.0', 'DPPM < 500'],
                icon: Award,
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Monthly Output',
                items: ['2.5M units capacity', 'Flexible MOQ 50pcs', 'Private Tooling', 'Fast Delivery'],
                icon: TrendingUp,
                color: 'from-orange-500 to-orange-600'
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${capability.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <capability.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{capability.title}</h3>
                  <ul className="space-y-2">
                    {capability.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Custom OEM/ODM Solutions</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Industry-specific wireless control solutions tailored to your application requirements
            </p>
          </motion.div>

          {products.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center px-4">
                <div className="h-px bg-slate-300 flex-1 mr-4 sm:mr-6" />
                <span className="px-2 sm:px-4">{category.category}</span>
                <div className="h-px bg-slate-300 flex-1 ml-4 sm:ml-6" />
              </h3>
              <p className="text-center text-slate-600 mb-6 sm:mb-8 px-4">{category.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {category.items.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                      <div className={`h-2 sm:h-3 bg-gradient-to-r ${product.color}`} />
                      <div className="p-4 sm:p-6 lg:p-8">
                        {/* Product Image Display */}
                        <div className="relative mb-4 sm:mb-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5`}></div>
                          <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center`}>
                            <product.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                          </div>
                          {/* Certification Badges */}
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1">
                            {product.certification && (
                              <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                                {product.certification.includes('CE') ? 'CE' : product.certification.includes('FCC') ? 'FCC' : 'ISO'}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${product.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <product.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{product.title}</h3>
                        
                        {/* Engineering Specs */}
                        <div className="bg-slate-50 rounded-lg p-3 mb-4">
                          <p className="text-xs text-slate-600 font-mono leading-relaxed">{product.specs}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                          {product.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs sm:text-sm">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 sm:pt-4 border-t border-slate-100 gap-2 mb-4">
                          <div>
                            <div className="text-xs sm:text-sm text-slate-500 mb-1">Use Case</div>
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{product.useCase}</div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-xs sm:text-sm text-slate-500 mb-1">Certification</div>
                            <div className="font-semibold text-green-600 text-sm sm:text-base">{product.certification}</div>
                          </div>
                        </div>
                        
                        {/* Standardized Action Buttons */}
                        <div className="grid grid-cols-3 gap-2">
                          <Button size="sm" className="text-xs bg-blue-500 hover:bg-blue-600">
                            <Download className="h-3 w-3 mr-1" />
                            Datasheet
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs border-green-500 text-green-600 hover:bg-green-50">
                            <Package className="h-3 w-3 mr-1" />
                            Sample
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50" type="button" onClick={openRfqModal}>
                            <Send className="h-3 w-3 mr-1" />
                            Quote
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Applications & Case Studies */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Industry Applications & Success Stories</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Discover how we've helped leading companies solve their wireless control challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Case Study 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <Radio className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Garage Door Remote Control</h3>
                    <p className="text-sm text-slate-600">Leading EU Gate Control Brand</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Challenge:</h4>
                  <p className="text-sm text-blue-800">Needed a custom 433MHz rolling code remote with extended range and weather resistance for European market.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                  <p className="text-sm text-green-800">Developed custom RF module with -100dBm sensitivity, IP65 housing, and EV1527 compatibility. 3-day prototyping, 15-day tooling.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">Result:</span>
                    <span className="text-green-600 ml-2">42% faster time-to-market</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">6 Year Partnership</Badge>
                </div>
              </Card>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                    <Wifi className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Smart Light Switch</h3>
                    <p className="text-sm text-slate-600">US Home Automation Company</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Challenge:</h4>
                  <p className="text-sm text-blue-800">Required WiFi smart switch with energy monitoring, voice control compatibility, and UL certification for US market.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                  <p className="text-sm text-green-800">Created 2.4GHz 802.11b/g/n module with ±1% energy metering, Tuya/Smart Life compatibility, and UL/CE/FCC certification.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">Result:</span>
                    <span className="text-green-600 ml-2">99.8% field reliability</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">3 Year Partnership</Badge>
                </div>
              </Card>
            </motion.div>

            {/* Case Study 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Automotive Keyless Entry</h3>
                    <p className="text-sm text-slate-600">Aftermarket Auto Brand</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Challenge:</h4>
                  <p className="text-sm text-blue-800">Needed 315MHz remote with immobilizer compatibility, extended battery life, and ISO 11452 certification.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                  <p className="text-sm text-green-800">Engineered custom RF module with 30% longer battery life, immobilizer compatibility, and -95dBm sensitivity.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">Result:</span>
                    <span className="text-green-600 ml-2">Zero warranty claims</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">5 Year Partnership</Badge>
                </div>
              </Card>
            </motion.div>

            {/* Case Study 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Smart Lighting Control</h3>
                    <p className="text-sm text-slate-600">APAC Lighting Brand</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Challenge:</h4>
                  <p className="text-sm text-blue-800">Required multi-channel RF receiver with learning code functionality for smart lighting systems in Asian market.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                  <p className="text-sm text-green-800">Developed 4-channel superheterodyne receiver with -110dBm sensitivity, learning code, and relay output for easy integration.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">Result:</span>
                    <span className="text-green-600 ml-2">DPPM under 200</span>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">4 Year Partnership</Badge>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="h-5 w-5 mr-2" />
              Download Full Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Testing Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Testing & Certification Capabilities</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Full compliance testing with EN 300 220 and FCC Part 15 certification capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">EU Compliance Testing</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">EN 300 220 Standard</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">CE RED Certification</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">RF Power Testing</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">Frequency Deviation</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-green-900 mb-4">US Compliance Testing</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-slate-700">FCC Part 15 Certification</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-slate-700">Anritsu MS2690A (26.5GHz)</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-slate-700">Shielded Room Testing</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-slate-700">Spurious Emissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Certifications & Compliance</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Full compliance with international standards and regulations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'CE (RED EN 300 220)',
                description: 'For 433 MHz remotes',
                certNo: 'XXXXXX',
                issuer: 'TÜV SÜD',
                validTo: '2026-12-31',
                download: true,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'FCC Part 15',
                description: 'For 315/433 MHz devices',
                certNo: 'FCC ID: XXXXXX',
                issuer: 'FCC',
                validTo: '2025-12-31',
                download: true,
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'ISO 9001:2015',
                description: 'Quality Management System',
                certNo: 'ISO 9001:2015',
                issuer: 'SGS',
                validTo: '2025-08-31',
                download: true,
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'RoHS Compliance',
                description: 'Environmental Protection',
                certNo: 'RoHS 2011/65/EU',
                issuer: 'Intertek',
                validTo: '2025-12-31',
                download: true,
                color: 'from-orange-500 to-orange-600'
              },
              {
                title: 'REACH Compliance',
                description: 'Chemical Safety',
                certNo: 'REACH 1907/2006',
                issuer: 'Bureau Veritas',
                validTo: '2025-12-31',
                download: true,
                color: 'from-red-500 to-red-600'
              },
              {
                title: 'IATF 16949:2016',
                description: 'Automotive Quality Management',
                certNo: 'IATF 16949:2016',
                issuer: 'TÜV Rheinland',
                validTo: '2025-10-31',
                download: true,
                color: 'from-indigo-500 to-indigo-600'
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{cert.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Certificate No:</span>
                      <span className="font-mono text-gray-900">{cert.certNo}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Issuer:</span>
                      <span className="text-gray-900">{cert.issuer}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Valid Until:</span>
                      <span className="text-gray-900">{cert.validTo}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="h-3 w-3 mr-2" />
                    Download PDF
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM/ODM Process */}
      <section id="process" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">OEM/ODM Process</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              From concept to market in 12 weeks with transparent project management
            </p>
          </motion.div>

          {/* Visual Process Timeline */}
          <div className="relative px-4">
            {/* Progress Line */}
            <div className="absolute top-16 sm:top-20 lg:top-24 left-0 right-0 h-1 bg-slate-200 rounded-full" />
            <div className="absolute top-16 sm:top-20 lg:top-24 left-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 rounded-full" 
                 style={{ width: '100%' }} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Circle Node */}
                  <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Step Card */}
                  <Card className="text-center p-4 sm:p-6 lg:p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className={`inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r ${step.color} text-white rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
                      {step.duration}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{step.phase}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{step.deliverables}</p>
                    
                    {/* Arrow Indicator */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-slate-300 -ml-4" />
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Total Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl">
              <Clock className="h-6 w-6 text-orange-600 mr-3" />
              <span className="text-lg font-semibold text-gray-900">Total Timeline: </span>
              <span className="text-xl font-bold text-orange-600 ml-2">12 Weeks</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Matrix */}
      <section id="capabilities" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Products</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              End-to-end manufacturing with in-house engineering and testing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Certificates Wall */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Certifications & Compliance</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Full compliance with international standards for quality and safety
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h4>
                  <p className="text-sm text-slate-600 font-medium">{cert.category}</p>
                  <div className="mt-4 flex justify-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </motion.div>
            ))}
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

      {/* Factory Tour Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Factory Tour</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art facilities with advanced manufacturing capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'SMT Production Line',
                machine: 'Panasonic NPM-W2',
                capacity: '50,000 CPH',
                yield: '99.8%',
                description: 'High-speed surface mount technology with automated optical inspection'
              },
              {
                title: 'Testing Laboratory',
                machine: 'Keysight N9030B',
                capacity: '26.5 GHz Analysis',
                yield: '100% QC Pass',
                description: 'Comprehensive RF testing and signal analysis capabilities'
              },
              {
                title: 'Assembly Line',
                machine: 'Selective Soldering',
                capacity: '1,000 units/day',
                yield: '99.5%',
                description: 'Automated assembly with conformal coating and final testing'
              },
              {
                title: 'Environmental Testing',
                machine: 'Climatic Chambers',
                capacity: '-40°C to +85°C',
                yield: 'Validated Reliability',
                description: 'Temperature, humidity, and vibration testing for harsh environments'
              },
              {
                title: 'Quality Control',
                machine: '3D AOI Systems',
                capacity: '100% Inspection',
                yield: 'Zero Defects',
                description: 'Automated optical inspection with machine learning defect detection'
              },
              {
                title: 'Packaging & Logistics',
                machine: 'Automated Packing',
                capacity: '5,000 units/day',
                yield: '99.9% Accuracy',
                description: 'Custom packaging solutions with global shipping capabilities'
              }
            ].map((facility, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gray-100 h-48 flex items-center justify-center relative overflow-hidden">
                  <Factory className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div><span className="font-medium">Equipment:</span> {facility.machine}</div>
                    <div><span className="font-medium">Capacity:</span> {facility.capacity}</div>
                    <div><span className="font-medium">Yield:</span> <span className="text-green-600 font-semibold">{facility.yield}</span></div>
                  </div>
                  <p className="text-sm text-gray-600">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* R&D & Testing Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">R&D & Testing Timeline</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete 6-stage development process from concept to mass production in just 12 weeks
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 rounded-full -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 rounded-full -translate-y-1/2" 
                 style={{ width: '100%' }} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
              {[
                {
                  phase: 'Feasibility',
                  duration: '1-2 weeks',
                  deliverables: 'Technical analysis, Cost estimation, Risk assessment',
                  icon: Users,
                  color: 'from-blue-500 to-blue-600',
                  metrics: 'Success rate: 95%'
                },
                {
                  phase: 'EVT',
                  duration: '2-3 weeks',
                  deliverables: 'Functional prototype, Initial testing, Design validation',
                  icon: Cpu,
                  color: 'from-green-500 to-green-600',
                  metrics: 'Prototype success: 88%'
                },
                {
                  phase: 'EMC/RF Testing',
                  duration: '3-4 weeks',
                  deliverables: 'EN 300 220 / FCC Part 15, Certification preparation',
                  icon: Shield,
                  color: 'from-purple-500 to-purple-600',
                  metrics: 'First-pass yield: 92%'
                },
                {
                  phase: 'PVT',
                  duration: '2-3 weeks',
                  deliverables: 'Pilot production, Process validation, Quality setup',
                  icon: Factory,
                  color: 'from-orange-500 to-orange-600',
                  metrics: 'Process yield: 96%'
                },
                {
                  phase: 'Reliability',
                  duration: '2-3 weeks',
                  deliverables: 'Drop test, HT/LT test, Salt-spray, Vibration',
                  icon: Award,
                  color: 'from-red-500 to-red-600',
                  metrics: 'Reliability pass: 99%'
                },
                {
                  phase: 'Mass Production',
                  duration: 'Ongoing',
                  deliverables: 'Full-scale production, Quality assurance, Shipping',
                  icon: Package,
                  color: 'from-indigo-500 to-indigo-600',
                  metrics: 'FPY 98.7% | RMA 0.38% (Q4 2024)'
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline Node */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg relative z-10 mb-4`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.phase}</h3>
                      <div className={`inline-block px-3 py-1 bg-gradient-to-r ${step.color} text-white rounded-full text-xs font-semibold mb-2`}>
                        {step.duration}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">{step.deliverables}</p>
                      <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {step.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
              <div className="text-sm text-gray-600 mb-1">Final Production Yield (FPY)</div>
              <div className="text-xs text-slate-500">Industry average: 95-96%</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0.38%</div>
              <div className="text-sm text-gray-600 mb-1">RMA Rate (Q4 2024)</div>
              <div className="text-xs text-slate-500">Industry average: 1-2%</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">12 weeks</div>
              <div className="text-sm text-gray-600 mb-1">Total Development Time</div>
              <div className="text-xs text-slate-500">From concept to MP</div>
            </Card>
          </div>
        </div>
      </section>

        {/* FAQ Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Common questions about our RF & IoT control solutions and manufacturing process
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What is your MOQ and pricing structure?",
                answer: "MOQ starts from 50 units for standard products. Pricing: 50-100 units: $2.50-3.00/unit, 500-1000 units: $1.80-2.20/unit, 5000+ units: $0.90-1.20/unit. Volume discounts available for larger orders."
              },
              {
                question: "What are your lead times for samples and mass production?",
                answer: "Sample lead time: 7-10 days for standard products, 10-15 days for custom samples. Mass production: 20-30 days after sample approval. Rush orders available with 15% surcharge."
              },
              {
                question: "Which frequency bands and protocols do you support?",
                answer: "We support 315MHz, 433.92MHz, 868MHz, and 915MHz bands. Protocols: Fixed code, Rolling code (EV1527, PT2262), Learning code, ASK/FSK modulation. Custom frequency development available."
              },
              {
                question: "What certifications can you provide for our target market?",
                answer: "We provide CE (RED EN 300 220), FCC Part 15, RoHS, REACH, ISO 9001:2015, and IATF 16949:2016 certifications. Additional certifications (UL, ETL, etc.) can be obtained based on requirements."
              },
              {
                question: "What customization options are available for ODM projects?",
                answer: "Full ODM support: Private tooling, custom PCB design, firmware development, custom housing (injection molding), logo printing, custom packaging, custom frequency/protocol development. MOQ for private tooling: 1000-5000 units depending on complexity."
              },
              {
                question: "What is your warranty and RMA process?",
                answer: "Standard warranty: 12 months for all products. Extended warranty (24 months) available for bulk orders. RMA process: Report issue within warranty period → Return analysis → Replacement/refund within 7 days. DPPM rate: <500."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-orange-100 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">Q{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
                      </div>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                          expandedFaq === index ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-12">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
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
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Meet Our Core R&D and Engineering Team</h3>
              <p className="text-slate-600 mb-6">Our expert engineers with 15+ years experience are ready to develop your custom wireless solutions</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Lead RF Engineer</h4>
                  <p className="text-sm text-slate-600">15+ years RF design experience</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wifi className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">IoT Specialist</h4>
                  <p className="text-sm text-slate-600">WiFi/BLE protocol expert</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Project Manager</h4>
                  <p className="text-sm text-slate-600">Dedicated support for every client</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Phone className="h-5 w-5 mr-2" />
                  Consult Our Engineers
                </Button>
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50" type="button" onClick={openRfqModal}>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Technical Discussion
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* OEM/ODM Process Flowchart */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our OEM/ODM Partnership Process</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Clear, transparent process from initial consultation to global delivery
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
              {[
                {
                  step: '1',
                  title: 'Initial Consultation',
                  description: 'Requirements analysis, Technical feasibility, Cost estimation',
                  icon: Users,
                  color: 'from-blue-500 to-blue-600',
                  duration: '1-2 days'
                },
                {
                  step: '2',
                  title: 'Solution Design & Engineering',
                  description: 'Custom design, Prototyping, Technical specifications',
                  icon: Cpu,
                  color: 'from-green-500 to-green-600',
                  duration: '1-2 weeks'
                },
                {
                  step: '3',
                  title: 'Prototyping & Testing',
                  description: 'Functional samples, Performance testing, Validation',
                  icon: Shield,
                  color: 'from-purple-500 to-purple-600',
                  duration: '2-3 weeks'
                },
                {
                  step: '4',
                  title: 'Tooling & Pilot Run',
                  description: 'Mold development, Small batch production, Quality validation',
                  icon: Factory,
                  color: 'from-orange-500 to-orange-600',
                  duration: '3-4 weeks'
                },
                {
                  step: '5',
                  title: 'Mass Production & QA',
                  description: 'Full-scale production, Quality control, Testing',
                  icon: Package,
                  color: 'from-red-500 to-red-600',
                  duration: '4-6 weeks'
                },
                {
                  step: '6',
                  title: 'Global Logistics',
                  description: 'Packaging, Shipping, Customs clearance, After-sales support',
                  icon: Globe,
                  color: 'from-indigo-500 to-indigo-600',
                  duration: '1-2 weeks'
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                      <span className="text-white font-bold">{phase.step}</span>
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-br ${phase.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                      <phase.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{phase.title}</h3>
                    <p className="text-sm text-slate-600 mb-3 text-center">{phase.description}</p>
                    <div className={`text-center text-xs font-semibold px-3 py-1 bg-gradient-to-r ${phase.color} text-white rounded-full`}>
                      {phase.duration}
                    </div>
                  </div>
                  
                  {/* Arrow Connector */}
                  {index < 5 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ChevronRight className="h-6 w-6 text-orange-500" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Project Timeline: 12-16 Weeks</h3>
              <p className="text-slate-600 mb-6">From concept to delivery with dedicated project management</p>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Send className="h-5 w-5 mr-2" />
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Form Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Request Your Quote</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Get pricing and samples within 24 hours
            </p>
            
            {/* Form Promise */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600 mr-2" />
                <span className="text-lg font-semibold text-orange-800">Engineer replies within 24 hours • NDA available • Support EU/FCC certification</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 sm:p-12 bg-white shadow-2xl border-0">
              <form className="space-y-6">
                {/* Step 1: Required Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                    Required Information (20 seconds)
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Country/Region *
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300" required>
                        <option>Select Country</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Italy</option>
                        <option>Spain</option>
                        <option>Netherlands</option>
                        <option>Poland</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Japan</option>
                        <option>South Korea</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Product Type *
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300" required>
                        <option>Select Product</option>
                        <option>RF Remote Controls</option>
                        <option>RF Receivers</option>
                        <option>RF Kits</option>
                        <option>Car Remotes</option>
                        <option>Wi-Fi Switches</option>
                        <option>Wi-Fi Sockets</option>
                        <option>Custom ODM Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Target Quantity *
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300" required>
                        <option>Select Quantity</option>
                        <option>50-100 units</option>
                        <option>100-500 units</option>
                        <option>500-1000 units</option>
                        <option>1000-5000 units</option>
                        <option>5000+ units</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Attachment (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Drop files here or click to upload</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOC, DWG, STEP files (Max 10MB)</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2: Optional Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                    Additional Information (Optional)
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Application Scenario
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                        rows={3}
                        placeholder="Describe your application (e.g., garage door control, smart lighting, etc.)"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Certification Requirements
                        </label>
                        <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                          <option>None</option>
                          <option>CE Only</option>
                          <option>FCC Only</option>
                          <option>CE + FCC</option>
                          <option>UL Required</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Expected Lead Time
                        </label>
                        <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                          <option>Standard (20-30 days)</option>
                          <option>Expedited (15-20 days)</option>
                          <option>Rush (7-10 days)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg">
                    <Send className="h-5 w-5 mr-2" />
                    Submit Request
                  </Button>
                  <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download NDA Template
                  </Button>
                </div>
                
                {/* Privacy Notice */}
                <div className="text-center text-xs text-slate-500 mt-6">
                  <p>By submitting this form, you agree to our Privacy Policy. We protect your data and never share it with third parties.</p>
                  <p className="mt-1">Protected by reCAPTCHA • Google Privacy Policy • Terms of Service</p>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sticky Floating CTAs */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button 
          size="lg" 
          className="bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 flex items-center justify-center group"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="bg-white hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 flex items-center justify-center border-2"
          onClick={() => setIsWhatsAppOpen(true)}
        >
          <MessageCircle className="h-6 w-6 text-green-600" />
        </Button>
      </div>

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
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => setIsWhatsAppOpen(false)}
              >
                Later
              </Button>
            </div>
          </div>
        </div>
      )}
      {isRfqOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/70"
            aria-hidden="true"
            onClick={closeRfqModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="RFQ form"
            className="relative z-10 max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Send Your RFQ to FastFun Remote</h3>
                <p className="text-sm text-slate-500 mt-1">Tailored OEM/ODM solutions for remote controls, RF receivers, and smart IoT modules.</p>
              </div>
              <button
                type="button"
                onClick={closeRfqModal}
                aria-label="Close RFQ panel"
                className="text-slate-400 hover:text-slate-600 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: 'ODM Remotes', detail: '433/868/915MHz rolling-code, <200 DPPM' },
                { title: 'Smart WiFi Switches', detail: 'Tuya/ESP solutions, UL/CE ready' },
                { title: 'OEM RF Modules', detail: 'Custom protocol, PCBA + tooling in-house' },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3">
                  <h4 className="text-sm font-semibold text-orange-700">{item.title}</h4>
                  <p className="text-xs text-orange-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)
                const subject = encodeURIComponent('FastFun Remote RFQ Request')
                const body = encodeURIComponent(
                  `Name: ${formData.get('name') ?? ''}
Company: ${formData.get('company') ?? ''}
Email: ${formData.get('email') ?? ''}
Product Focus: ${formData.get('product') ?? ''}
Annual Volume: ${formData.get('volume') ?? ''}
Project Details:
${formData.get('details') ?? ''}`
                )
                window.open(`mailto:eric@fastfunrc.com?subject=${subject}&body=${body}`)
                closeRfqModal()
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
                  <input
                    required
                    name="name"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                    placeholder="Your full name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                  <input
                    required
                    name="email"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                    placeholder="business@email.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Company</label>
                  <input
                    name="company"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                    placeholder="Brand / Project name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Product focus *</label>
                  <select
                    required
                    name="product"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select product family
                    </option>
                    <option>Custom RF Remote</option>
                    <option>RF Receiver / PCBA</option>
                    <option>Smart WiFi Switch / Socket</option>
                    <option>Gateway / Controller</option>
                    <option>Other OEM / ODM</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Annual volume target</label>
                  <select
                    name="volume"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                    defaultValue="1-5k"
                  >
                    <option>1-5k units</option>
                    <option>5-20k units</option>
                    <option>20-50k units</option>
                    <option>50k+ units</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Certification needs</label>
                  <div className="flex flex-wrap gap-2">
                    {['CE', 'FCC', 'UL', 'ETL', 'KC'].map((cert) => (
                      <label key={cert} className="inline-flex items-center gap-1 text-sm text-slate-600">
                        <input type="checkbox" name="certifications" value={cert} className="rounded border-slate-300 text-orange-500 focus:ring-orange-400" />
                        {cert}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Project details *</label>
                <textarea
                  required
                  name="details"
                  rows={4}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
                  placeholder="Tell us about functionality, communication protocol, housing requirements, timeline..."
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600 transition"
                >
                  Submit & Email RFQ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeRfqModal()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Go to full RFQ form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 md:hidden z-40 shadow-lg">
        <div className="flex justify-around">
          <Button variant="outline" size="sm" className="flex items-center border-slate-300 text-slate-700 hover:bg-slate-50" onClick={() => setIsWhatsAppOpen(true)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button size="sm" className="flex items-center bg-orange-500 hover:bg-orange-600">
            <Package className="h-4 w-4 mr-2" />
            Samples
          </Button>
          <Button variant="outline" size="sm" className="flex items-center border-slate-300 text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4 mr-2" />
            Catalog
          </Button>
        </div>
      </div>

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

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src={withBasePath('/logo-fastfun-remote.png')}
                  alt="FastFun Remote logo"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                FastFun Remote - Your Trusted IoT Partner Since 2010. ISO-certified electronics manufacturing delivering precision smart devices with 98.7% FPY. 15 years experience, 47 NPI projects annually.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-slate-400">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Shipping
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <Shield className="h-4 w-4 mr-2" />
                  ISO 9001 Certified
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Products</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">RF Remote Controls</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">RF Receivers</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">RF Kits</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Car Remotes</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Wi-Fi Switches</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Wi-Fi Sockets</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Custom OEM/ODM</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Technical Documentation</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Compliance Certificates</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Quality Assurance</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Factory Tour</a></li>
                <li><a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-5 w-5 text-orange-500 mr-3" />
                <div>
                  <div className="text-sm text-slate-400">Direct Phone</div>
                  <div className="font-semibold text-white">+86 15899648898</div>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Send className="h-5 w-5 text-orange-500 mr-3" />
                <div>
                  <div className="text-sm text-slate-400">Sales Email</div>
                  <div className="font-semibold text-white">eric@fastfunrc.com</div>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Factory className="h-5 w-5 text-orange-500 mr-3" />
                <div>
                  <div className="text-sm text-slate-400">Factory Address</div>
                  <div className="font-semibold text-white">8F, Building 1, Huawei Ke Valley, Dalingshan Town, Dongguan, Guangdong, China</div>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Globe className="h-5 w-5 text-orange-500 mr-3" />
                <div>
                  <div className="text-sm text-slate-400">Trade Terms</div>
                  <div className="font-semibold text-white">FOB Shenzhen or Guangzhou • CIF Available • DAP Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                ©2025 FastFun Remote. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Compliance</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

