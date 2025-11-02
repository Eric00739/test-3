"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { HeroSectionNew } from '@/components/home/HeroSectionNew'
import { TrustStripSection } from '@/components/home/TrustStripSection'
import { UnifiedCTA } from '@/components/home/UnifiedCTA'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import { RfqModal } from '@/components/rfq/RfqModal'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HeaderBar } from '@/components/home/HeaderBar'
import { MessageCircle } from 'lucide-react'

// Dynamic imports for non-critical sections with lazy loading
const TaskRoutingSection = dynamic(() => import('@/components/home/TaskRoutingSection').then(mod => ({ default: mod.TaskRoutingSection })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const CompatibilityCenterSection = dynamic(() => import('@/components/home/CompatibilityCenterSection').then(mod => ({ default: mod.CompatibilityCenterSection })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const ProcessTimelineSection = dynamic(() => import('@/components/home/ProcessTimelineSectionNew').then(mod => ({ default: mod.ProcessTimelineSectionNew })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const EvidenceSection = dynamic(() => import('@/components/home/CaseStudiesSection').then(mod => ({ default: mod.CaseStudiesSection })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const ResourcesHubSection = dynamic(() => import('@/components/home/BrandStorySection').then(mod => ({ default: mod.BrandStorySection })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const FAQSection = dynamic(() => import('@/components/home/FAQSection').then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const ContactSection = dynamic(() => import('@/components/home/ContactSection').then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
})

const StickyActions = dynamic(() => import('@/components/home/StickyActions').then(mod => ({ default: mod.StickyActions })), {
  loading: () => null
})

const SECTION_IDS = ['hero', 'trust-strip', 'task-routing', 'compatibility', 'process', 'evidence', 'resources', 'faq', 'contact'] as const

export function HomeClient() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)
  const [isRfqOpen, setIsRfqOpen] = useState(false)
  const [rfqSource, setRfqSource] = useState('default')
  const tNav = useTranslations('nav')

  const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
    console.log(eventName, payload ?? {})
  }

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 120

      for (const section of SECTION_IDS) {
        const element = document.getElementById(section)
        if (!element) continue
        const { top, height } = element.getBoundingClientRect()
        const offsetTop = top + window.scrollY
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          setActiveSection(section)
          break
        }
      }
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateActiveSection()
        ticking = false
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: tNav('home'), target: 'hero' },
    { label: tNav('about'), href: '/about' },
    { label: tNav('products'), href: '/products' },
    { label: tNav('blog'), href: '/blog' },
    { label: tNav('contact'), target: 'contact' },
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

  const handleRfqSubmit = (result: {
    status: 'success' | 'error' | 'whatsapp' | 'mailto';
    message?: string;
    data?: any;
  }) => {
    if (result.status === 'success') {
      trackEvent('rfq_submit', { source: rfqSource })
    } else if (result.status === 'mailto') {
      const mailtoUrl: string | undefined = result.data?.mailtoUrl
      if (mailtoUrl) {
        trackEvent('rfq_fallback_email', { source: rfqSource })
        window.location.href = mailtoUrl
      }
      return
    } else if (result.status === 'whatsapp') {
      if (result.data?.mailtoUrl) {
        trackEvent('rfq_fallback_email', { source: rfqSource })
        window.location.href = result.data.mailtoUrl
        return
      }
      trackEvent('whatsapp_click', { source: 'rfq_modal' })
      window.open('https://wa.me/8615899648898', '_blank', 'noopener')
      closeRfqModal()
    } else if (result.status === 'error') {
      console.error('RFQ submission error:', result.message)
    }
  }

  const closeRfqModal = () => {
    setIsRfqOpen(false)
    setRfqSource('default')
  }

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

        {/* Attention Block: Simplified Hero */}
        <HeroSectionNew onOpenRfq={openRfqModal} />

        {/* Trust Strip - Moved Below Hero */}
        <TrustStripSection
          onOpenRfq={openRfqModal}
          onWhatsApp={openWhatsApp}
        />

        {/* Interest Block: Task Routing - How can we help you today? */}
        <section id="task-routing" className="py-16 bg-white">
          <TaskRoutingSection />
        </section>

        {/* Interest Block: Compatibility Center - Find the right solution */}
        <section id="compatibility" className="py-16 bg-slate-50">
          <CompatibilityCenterSection />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <UnifiedCTA
              onOpenRfq={openRfqModal}
              onWhatsApp={openWhatsApp}
              source="compatibility_cta"
              title="Can't find what you're looking for?"
              subtitle="Our engineers can help identify the right solution for your requirements"
              variant="centered"
            />
          </div>
        </section>

        {/* Decision Block: Process Timeline - Our proven process */}
        <section id="process" className="py-16 bg-white">
          <ProcessTimelineSection />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <UnifiedCTA
              onOpenRfq={openRfqModal}
              onWhatsApp={openWhatsApp}
              source="process_cta"
              title="Ready to start your project?"
              subtitle="Get a free feasibility review and DFM analysis within 24 hours"
              variant="centered"
            />
          </div>
        </section>

        {/* Evidence Block: Case Studies - Social proof */}
        <section id="evidence" className="py-16 bg-slate-50">
          <EvidenceSection />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <UnifiedCTA
              onOpenRfq={openRfqModal}
              onWhatsApp={openWhatsApp}
              source="evidence_cta"
              title="Join our successful clients"
              subtitle="Let's discuss how we can help you achieve similar results"
              variant="centered"
            />
          </div>
        </section>

        {/* Resources Block: Brand Story - About us */}
        <section id="resources" className="py-16 bg-white">
          <ResourcesHubSection />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <UnifiedCTA
              onOpenRfq={openRfqModal}
              onWhatsApp={openWhatsApp}
              source="resources_cta"
              variant="centered"
            />
          </div>
        </section>

        {/* FAQ Block */}
        <section id="faq" className="py-16 bg-slate-50">
          <FAQSection onOpenRfq={openRfqModal} />
        </section>

        {/* Action Block: Contact Section */}
        <section id="contact" className="py-16 bg-white">
          <ContactSection onOpenRfq={openRfqModal} onWhatsApp={openWhatsApp} />
        </section>

        {/* Sticky Actions */}
        <StickyActions
          onOpenRfq={openRfqModal}
          onWhatsApp={openWhatsApp}
        />

        {/* Modals */}
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
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow hover:bg-slate-50 transition-colors"
                  onClick={() => setIsWhatsAppOpen(false)}
                >
                  Later
                </button>
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

        <SiteFooter />
      </div>
    </ComparisonProvider>
  )
}
