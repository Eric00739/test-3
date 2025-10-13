"use client";

import { ArrowRight, Check, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export interface HeroSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
  onWeChat: (source: string) => void
}

export function HeroSection({ onOpenRfq, onWhatsApp, onWeChat }: HeroSectionProps) {
  const t = useTranslations("hero")
  const keyPoints = [t("keyPoints.0"), t("keyPoints.1"), t("keyPoints.2")]
  const processSteps = [t("process.0"), t("process.1"), t("process.2")]
  const trustBadges = [
    { title: t("badges.0.title"), subtitle: t("badges.0.subtitle") },
    { title: t("badges.1.title"), subtitle: t("badges.1.subtitle") },
    { title: t("badges.2.title"), subtitle: t("badges.2.subtitle") },
  ]

  return (
    <section id="hero" className="relative pt-16 min-h-screen flex items-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
              {t("headline")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-3xl leading-relaxed font-light">
              {t("subheadline")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl">
              {keyPoints.map((item, index) => (
                <div
                  key={`key-point-${index}`}
                  className="flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 px-3 py-1 text-xs sm:text-sm font-medium"
                >
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 gap-3 sm:gap-4">
              {keyPoints.map((item, index) => (
                <span key={`key-point-inline-${index}`} className="flex items-center gap-3">
                  {index !== 0 && <span className="hidden sm:inline text-slate-400">|</span>}
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-6 bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                type="button"
                onClick={() => onOpenRfq("hero_quote")}
                aria-label={t("primaryCta")}
              >
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-green-500 text-green-600 hover:bg-green-50 w-full sm:w-auto"
                type="button"
                onClick={() => onWhatsApp("hero")}
                aria-label={t("secondaryCta")}
              >
                {t("secondaryCta")}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 px-4 py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl">
              {processSteps.map((step, idx) => (
                <div key={`process-step-${idx}`} className="flex items-center text-sm sm:text-base text-slate-700">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {idx + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                  {idx < processSteps.length - 1 && <ChevronRight className="h-4 w-4 text-orange-400 hidden sm:block ml-4" aria-hidden="true" />}
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
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="relative aspect-video">
                <Image
                  src="/images/factory-montage.webp"
                  alt={t("video.alt")}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center text-white px-6">
                  <span className="rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
                    {t("video.tag")}
                  </span>
                  <p className="text-lg font-semibold sm:text-xl">{t("video.title")}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/80 bg-white/15 text-white hover:bg-white/30 hover:!text-white"
                    onClick={() => window.open("https://youtu.be/ByoHrKslf54?si=fa2Di21q31sxnHJv", "_blank", "noopener")}
                    aria-label={t("video.cta")}
                  >
                    {t("video.cta")}
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                {t("video.caption")}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {trustBadges.map((badge, index) => (
                <div key={`badge-${index}`} className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow text-center">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded mb-2 flex items-center justify-center">
                    <span className="font-semibold text-slate-600 text-sm">{badge.title}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">{badge.subtitle}</p>
                  <p className="text-xs text-blue-600">{t("badges.cta")}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
