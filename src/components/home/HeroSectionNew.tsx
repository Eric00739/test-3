"use client"

import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export interface HeroSectionNewProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
  onWeChat: (source: string) => void
}

export function HeroSectionNew({ onOpenRfq, onWhatsApp, onWeChat }: HeroSectionNewProps) {
  const t = useTranslations("hero")
  const keyPoints = [t("keyPoints.0"), t("keyPoints.1"), t("keyPoints.2")]

  return (
    <section id="hero" className="relative bg-white py-24 lg:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - 60% on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Main Title - Larger, Lighter Weight */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
              {t("headline")}
            </h1>
            
            {/* Subtitle - Lighter, Spaced Out */}
            <p className="text-lg text-slate-600 mb-8 max-w-3xl leading-relaxed font-light">
              {t("subheadline")}
            </p>
            
            {/* Simplified Key Points - 2-3 items only */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
              {keyPoints.slice(0, 3).map((item, index) => (
                <motion.div
                  key={`key-point-${index}`}
                  className="flex items-center gap-2 rounded-full bg-orange-50/80 text-orange-700 px-4 py-2 text-sm font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Simplified CTA - Same Row, Rounded Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => onOpenRfq("hero_quote")}
                >
                  {t("primaryCtaOptions.0")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-8 py-3"
                onClick={() => onOpenRfq('hero_compatibility')}
              >
                {t("compatibilityCta")}
              </Button>
            </div>

            {/* Minimal Disclaimer - Lighter Text */}
            <p className="text-sm text-slate-500 max-w-2xl">
              Long-range (1–3 km) achievable only with low data rate, compliant TX power, and external/high-gain or directional antennas.
            </p>
          </motion.div>

          {/* Right Visual - 40-45% on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Main Image in Floating Card */}
              <div className="relative rounded-2xl shadow-[0_20px_45px_rgba(15,23,42,0.08)] overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/factory-montage.webp"
                    alt="FastFunRC Manufacturing Facility"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Optional overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Floating Badge - Minimal Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-md px-4 py-2 border border-slate-200"
              >
                <span className="text-xs font-medium text-slate-600">ISO 9001:2015 Certified</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}