'use client';


import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const keyPoints = [
  'Certificate IDs on request',
  'DFM/DFT reviews included',
  'Pilot runs before ramp',
]

export interface HeroSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
  onWeChat: (source: string) => void
}

export function HeroSection({ onOpenRfq, onWhatsApp, onWeChat }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-16 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
              OEM/ODM Manufacturing for RF Remotes, Receivers & Wi-Fi Switches
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-6 sm:mb-8 max-w-3xl leading-relaxed font-light">
              From design to certification to mass production—one partner, full accountability.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl">
              {keyPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs sm:text-sm font-medium"
                >
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 gap-3 sm:gap-4">
              <span>Certificate IDs on request</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span>DFM/DFT reviews included</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span>Pilot runs before ramp</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-6 bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                type="button"
                onClick={() => onOpenRfq('hero_quote')}
              >
                Get Engineering Quote
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-slate-300 text-slate-700 hover:bg-slate-50 w-full sm:w-auto"
                  type="button"
                  onClick={() => onOpenRfq('hero_sample')}
                >
                  Request Sample
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-green-500 text-green-600 hover:bg-green-50 w-full sm:w-auto"
                  type="button"
                  onClick={() => onWhatsApp('hero')}
                >
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 px-4 py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl">
              {["Requirements (24h)", "Functional Sample (7-10 days)", "Mass Production (20-30 days)"].map((step, idx) => (
                <div key={step} className="flex items-center text-sm sm:text-base text-slate-700">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {idx + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                  {idx < 2 && <ChevronRight className="h-4 w-4 text-orange-400 hidden sm:block ml-4" />}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Image src="/assets/logo-512.png" alt="Factory montage" width={96} height={96} className="mx-auto mb-4" />
                  <p className="text-slate-600 font-medium mb-4">15s Factory Montage</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://youtu.be/ByoHrKslf54?si=fa2Di21q31sxnHJv', '_blank', 'noopener')}
                  >
                    Watch video
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                SMT - AOI - RF Test - Burn-in - Packing
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['Business License', 'ISO Certifications', 'Client Audits'].map((item) => (
                <div key={item} className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow text-center">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded mb-2 flex items-center justify-center">
                    <span className="font-semibold text-slate-600 text-sm">{item.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">{item}</p>
                  <p className="text-xs text-blue-600">View PDF</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}