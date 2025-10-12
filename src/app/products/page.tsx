'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeaderBar } from '@/components/home/HeaderBar'
import { StickyActions } from '@/components/home/StickyActions'
import { MobileActionBar } from '@/components/home/MobileActionBar'
import { RfqModal } from '@/components/rfq/RfqModal'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import { ComparisonBar } from '@/components/product/ComparisonBar'
import Script from 'next/script'
import { productCategoriesJsonLd } from './metadata'
import {
  Radio,
  Wifi,
  Package,
  Car,
  Zap,
  Shield,
  Phone,
  MessageCircle,
  Send,
  ChevronRight,
  Check,
  Star,
  Users,
  Factory,
  Globe,
  Award,
  Download,
  ArrowRight,
  Clock,
  TrendingUp
} from 'lucide-react'

export default function ProductsPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isRfqOpen, setIsRfqOpen] = useState(false)
  const [rfqSource, setRfqSource] = useState('default')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // 产品类目数据
  const productCategories = [
    {
      id: 'rf-remote',
      title: 'RF Remote',
      subtitle: 'Wireless Control Solutions',
      description: 'High-performance RF remote controls with advanced encryption and extended range capabilities',
      icon: Radio,
      color: 'from-blue-500 to-blue-600',
      features: [
        { title: 'Multi-Frequency Support', desc: '315MHz, 433MHz, 868MHz, 915MHz bands' },
        { title: 'Advanced Security', desc: 'Rolling code, encryption, anti-cloning technology' },
        { title: 'Custom Design', desc: 'OEM/ODM with private tooling and branding' }
      ],
      applications: ['Garage Doors', 'Gate Controls', 'Industrial Equipment', 'Smart Home'],
      ctaText: 'Explore RF Remotes',
      stats: { range: '100-500m', battery: '2-5 years', certification: 'CE/FCC/ISO' }
    },
    {
      id: 'rf-receiver',
      title: 'RF Receiver',
      subtitle: 'High-Sensitivity Modules',
      description: 'Professional grade RF receivers with superior sensitivity and multi-channel capabilities',
      icon: Wifi,
      color: 'from-green-500 to-green-600',
      features: [
        { title: 'Superheterodyne Design', desc: '-110dBm sensitivity for reliable reception' },
        { title: 'Multi-Channel Support', desc: '1-16 channels with programmable outputs' },
        { title: 'Easy Integration', desc: 'Standard protocols and simple wiring' }
      ],
      applications: ['Security Systems', 'Lighting Control', 'Access Control', 'Automation'],
      ctaText: 'View Receivers',
      stats: { range: '50-200m', power: '5-12V DC', certification: 'CE/FCC/RoHS' }
    },
    {
      id: 'rf-kit',
      title: 'RF Kit',
      subtitle: 'Complete Solutions',
      description: 'All-in-one RF control kits with paired transmitters and receivers for quick deployment',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      features: [
        { title: 'Pre-Paired Sets', desc: 'Ready-to-use transmitter and receiver combinations' },
        { title: 'Multiple Configurations', desc: '1-4 button remotes with matching receivers' },
        { title: 'Technical Support', desc: 'Complete documentation and engineering assistance' }
      ],
      applications: ['DIY Projects', 'Small Business', 'Retrofit Solutions', 'Quick Deployments'],
      ctaText: 'Browse Kits',
      stats: { range: '100m', setup: 'Plug & Play', certification: 'CE/FCC' }
    },
    {
      id: 'car-remote',
      title: 'Car Remote',
      subtitle: 'Automotive Security',
      description: 'Professional automotive remote controls with immobilizer compatibility and advanced features',
      icon: Car,
      color: 'from-red-500 to-red-600',
      features: [
        { title: 'Immobilizer Compatible', desc: 'Works with factory security systems' },
        { title: 'Advanced Functions', desc: 'Remote start, panic button, trunk release' },
        { title: 'Durable Design', desc: 'Water-resistant with long battery life' }
      ],
      applications: ['Car Security', 'Fleet Management', 'Automotive Aftermarket', 'Vehicle Integration'],
      ctaText: 'See Car Remotes',
      stats: { range: '50-100m', battery: '2-3 years', certification: 'ISO/CE/FCC' }
    },
    {
      id: 'wifi-switch',
      title: 'Wifi Switch',
      subtitle: 'Smart Home Control',
      description: 'WiFi-enabled smart switches with app control, voice commands, and energy monitoring',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      features: [
        { title: 'App Control', desc: 'iOS/Android apps with intuitive interface' },
        { title: 'Voice Integration', desc: 'Alexa, Google Assistant, Siri compatibility' },
        { title: 'Energy Monitoring', desc: 'Real-time power consumption tracking' }
      ],
      applications: ['Smart Homes', 'Office Buildings', 'Hotels', 'Energy Management'],
      ctaText: 'Explore WiFi Switches',
      stats: { voltage: '100-240V AC', power: '10-20A', certification: 'CE/FCC/UL' }
    },
    {
      id: 'wifi-socket',
      title: 'Wifi Socket',
      subtitle: 'Intelligent Power Control',
      description: 'Smart WiFi sockets with remote control, scheduling, and energy monitoring capabilities',
      icon: Wifi,
      color: 'from-cyan-500 to-cyan-600',
      features: [
        { title: 'Remote Control', desc: 'Control appliances from anywhere via app' },
        { title: 'Smart Scheduling', desc: 'Automated on/off with timer functions' },
        { title: 'Safety Features', desc: 'Overload protection and auto-shutoff' }
      ],
      applications: ['Home Appliances', 'Office Equipment', 'Energy Management', 'Security Systems'],
      ctaText: 'View WiFi Sockets',
      stats: { voltage: '100-240V AC', maxLoad: '16A', certification: 'CE/FCC/UL' }
    },
    {
      id: 'infrared-beam',
      title: '红外对射',
      subtitle: 'Infrared Security Beam',
      description: 'Professional grade infrared beam sensors for perimeter security and detection systems',
      icon: Shield,
      color: 'from-indigo-500 to-indigo-600',
      features: [
        { title: 'Long Range Detection', desc: '20-100m outdoor detection range' },
        { title: 'Weather Resistant', desc: 'IP65 rating for outdoor installation' },
        { title: 'Tamper Proof', desc: 'Anti-interference and false alarm prevention' }
      ],
      applications: ['Perimeter Security', 'Industrial Sites', 'Residential Gates', 'Property Protection'],
      ctaText: 'Explore Infrared Beams',
      stats: { range: '20-100m', protection: 'IP65', certification: 'CE/FCC/ISO' }
    }
  ]

  // FAQ数据
  const faqItems = [
    {
      question: 'What frequency bands do your RF products support?',
      answer: 'We support multiple frequency bands including 315MHz, 433.92MHz, 868MHz, and 915MHz to ensure compatibility with global markets. Custom frequency development is available for specific requirements.'
    },
    {
      question: 'What is your minimum order quantity (MOQ) for custom products?',
      answer: 'MOQ varies by product type and customization level. Standard products start from 50 units, while custom OEM/ODM projects typically require 1000-5000 units depending on complexity and tooling requirements.'
    },
    {
      question: 'What certifications can you provide for different markets?',
      answer: 'We provide comprehensive certifications including CE (RED EN 300 220), FCC Part 15, RoHS, REACH, ISO 9001:2015, and IATF 16949:2016. Additional certifications (UL, ETL, etc.) can be obtained based on your target market requirements.'
    },
    {
      question: 'What is your typical production lead time?',
      answer: 'Sample lead time: 7-10 days for standard products, 10-15 days for custom samples. Mass production: 20-30 days after sample approval. Rush orders are available with 15% surcharge for faster delivery.'
    },
    {
      question: 'Do you provide technical support and documentation?',
      answer: 'Yes, we provide comprehensive technical support including detailed documentation, integration guides, and direct engineering assistance. Our dedicated support team helps with product selection, integration, and troubleshooting.'
    }
  ]

  // 客户案例数据
  const caseStudies = [
    {
      company: 'Leading EU Gate Automation Brand',
      challenge: 'Needed reliable RF remotes with extended range and custom branding',
      solution: 'Custom 433MHz remotes with rolling code and private tooling',
      result: '42% faster time-to-market with 99.8% field reliability'
    },
    {
      company: 'US Smart Home Manufacturer',
      challenge: 'Required WiFi switches with energy monitoring and voice control',
      solution: 'Custom WiFi switch with Tuya integration and OEM branding',
      result: '30% cost reduction vs local manufacturing with full certification support'
    },
    {
      company: 'APAC Security Systems Provider',
      challenge: 'Needed long-range infrared beams for perimeter security',
      solution: 'Custom infrared beam sensors with 100m range and weather resistance',
      result: 'Zero warranty claims with successful deployment in 200+ locations'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'categories', 'cases', 'faq', 'contact']
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

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', target: 'hero' },
    { label: 'Categories', target: 'categories' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', target: 'contact' }
  ]

  const handleNavClick = (target: string) => {
    const element = document.getElementById(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openRfqModal = (source: string = 'default') => {
    setRfqSource(source)
    setIsRfqOpen(true)
  }

  const closeRfqModal = () => {
    setIsRfqOpen(false)
    setRfqSource('default')
  }

  const handleCategoryClick = (categoryId: string) => {
    openRfqModal(`category_${categoryId}`)
  }

  const handleRfqSubmit = (result: {
    status: 'success' | 'error' | 'whatsapp';
    message?: string;
    data?: any;
  }) => {
    if (result.status === 'success') {
      closeRfqModal()
    } else if (result.status === 'whatsapp') {
      if (result.data?.mailtoUrl) {
        // Handle fallback to email client
        window.location.href = result.data.mailtoUrl
      } else {
        // Handle WhatsApp click
        window.open('https://wa.me/8615899648898', '_blank', 'noopener')
      }
      closeRfqModal()
    } else if (result.status === 'error') {
      // Error is already displayed in the modal, no additional action needed
      console.error('RFQ submission error:', result.message)
    }
  }

  return (
    <ComparisonProvider>
      <div className="min-h-screen bg-white">
        <HeaderBar
          activeSection={activeSection}
          onNavClick={handleNavClick}
          onToggleMenu={() => {}}
          onOpenRfq={openRfqModal}
          isMobileMenuOpen={false}
          navLinks={navLinks}
        />

      {/* Hero Banner */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full" />
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-white/20 rounded-full" />
          <div className="absolute bottom-40 right-1/3 w-20 h-20 border-2 border-white/20 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-sm font-semibold">
              Industry-Leading Wireless Solutions
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Complete Product Portfolio for
              <span className="block text-orange-400">Wireless Control Systems</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
              From RF remotes to smart WiFi solutions - 15+ years of expertise delivering 
              <span className="text-orange-300 font-semibold"> reliable, certified, and customizable</span> 
              wireless control products to global brands
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg shadow-lg"
                onClick={() => openRfqModal('hero_consultation')}
                style={{ color: 'white' }}
              >
                <Phone className="h-5 w-5 mr-2" />
                Consult Our Engineers
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg shadow-lg"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ color: 'white' }}
              >
                Explore Categories
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '98.7%', label: 'Field Reliability' },
                { number: '47', label: 'NPI Projects/Year' },
                { number: '50+', label: 'Global Markets' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-white/50 rotate-90" />
        </div>
      </section>

      {/* Product Categories */}
      <section id="categories" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Product Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Complete coverage for all wireless control needs - from basic RF solutions to advanced IoT integration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                  
                  <div className="p-6 lg:p-8">
                    {/* Icon and Title */}
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-slate-600">{category.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed">{category.description}</p>

                    {/* Key Features */}
                    <div className="space-y-3 mb-6">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{feature.title}</div>
                            <div className="text-slate-600 text-xs">{feature.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Applications */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Applications:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.applications.map((app, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-6">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(category.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-xs text-slate-500 capitalize">{key}</div>
                            <div className="text-sm font-semibold text-gray-900">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white shadow-lg`}
                      onClick={() => handleCategoryClick(category.id)}
                      style={{ color: 'white' }}
                    >
                      {category.ctaText}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Customer Success Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Real results from long-term partnerships with global brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-white">
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-orange-600 font-bold text-sm">Featured Case</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{study.company}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-700 mb-1">Challenge</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-slate-700 mb-1">Solution</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-sm font-semibold text-green-800 mb-1">Result</div>
                        <p className="text-green-700 text-sm font-medium">{study.result}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Why Global Brands Trust FastFun Remote
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Factory,
                  title: '15+ Years Manufacturing',
                  description: 'ISO 9001:2015 certified with 47 NPI projects annually'
                },
                {
                  icon: Shield,
                  title: '98.7% FPY Rate',
                  description: 'Industry-leading quality with DPPM under 500'
                },
                {
                  icon: Globe,
                  title: 'Global Compliance',
                  description: 'CE, FCC, RoHS, REACH certified for worldwide markets'
                },
                {
                  icon: Users,
                  title: 'Dedicated Engineering',
                  description: '8 R&D engineers with 15% holding master\'s degrees'
                }
              ].map((item, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Common questions about our wireless control solutions and manufacturing process
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-sm font-semibold">
              Ready to Get Started?
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Find the Perfect Wireless Solution
            </h2>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Our engineering team is ready to help you select the right products for your specific requirements
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Download Catalog</h3>
                <p className="text-sm text-blue-100 mb-4">Complete product specifications and pricing</p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900 w-full"
                  style={{ color: 'white' }}
                >
                  Download PDF
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Consultation</h3>
                <p className="text-sm text-blue-100 mb-4">15-minute call with our product experts</p>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white w-full shadow-lg"
                  onClick={() => openRfqModal('quick_consult')}
                  style={{ color: 'white' }}
                >
                  Schedule Call
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Quote</h3>
                <p className="text-sm text-blue-100 mb-4">Custom pricing for your project requirements</p>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full shadow-lg"
                  onClick={() => openRfqModal('product_quote')}
                  style={{ color: 'white' }}
                >
                  Request Quote
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg shadow-lg"
                onClick={() => openRfqModal('main_cta')}
                style={{ color: 'white' }}
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact Sales Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg shadow-lg"
                style={{ color: 'white' }}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <StickyActions
        onContactScroll={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        onWhatsApp={() => window.open('https://wa.me/8615899648898', '_blank', 'noopener')}
      />

      <RfqModal
        open={isRfqOpen}
        onClose={closeRfqModal}
        onSubmit={handleRfqSubmit}
        onDownloadTemplate={() => window.open('/assets/rfq-checklist.pdf', '_blank', 'noopener')}
        source={rfqSource}
      />

      <MobileActionBar onOpenRfq={openRfqModal} onWhatsApp={() => window.open('https://wa.me/8615899648898', '_blank', 'noopener')} />

      {/* Structured Data */}
      <Script
        id="product-categories-structured-data"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCategoriesJsonLd) }}
      />
      
      <ComparisonBar />
      </div>
    </ComparisonProvider>
  )
}