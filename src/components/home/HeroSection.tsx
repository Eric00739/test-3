"use client";

import { ArrowRight, Check, ChevronRight, Download } from "lucide-react"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-4xl">
              {keyPoints.map((item, index) => (
                <motion.div
                  key={`key-point-${index}`}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-3 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto relative overflow-hidden group"
                  type="button"
                  onClick={() => onOpenRfq("hero_quote")}
                  aria-label={t("primaryCta")}
                >
                  <span className="relative z-10 flex items-center">
                    {t("primaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 hover:text-orange-800 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open('/assets/rfq-checklist.pdf', '_blank')}
                >
                  <Download className="h-4 w-4" />
                  {t("downloadCatalogCta")}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 hover:text-orange-800 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => onOpenRfq('factory_tour')}
                >
                  <ArrowRight className="h-4 w-4" />
                  {t("factoryTourCta")}
                </Button>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 mb-8">
              <p className="text-sm text-slate-700 text-center">
                <strong>{t("promise")}</strong>
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 px-4 py-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {processSteps.map((step, idx) => (
                <motion.div
                  key={`process-step-${idx}`}
                  className="flex items-center text-sm sm:text-base text-slate-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                    {idx + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                  {idx < processSteps.length - 1 && <ChevronRight className="h-4 w-4 text-orange-500 hidden sm:block ml-4" aria-hidden="true" />}
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={() => onOpenRfq('hero_compatibility')}>
                {t("compatibilityCta")}
              </Button>
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={() => onOpenRfq('hero_catalog')}>
                {t("catalogCta")}
              </Button>
            </div>

            {/* Bullet Disclaimers */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">{t("disclaimerTitle")}</h4>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>{t("disclaimer.0")}</li>
                <li>{t("disclaimer.1")}</li>
                <li>{t("disclaimer.2")}</li>
                <li>{t("disclaimer.3")}</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-video">
                <Image
                  src="/images/factory-montage.webp"
                  alt="FastFunRC SMT line snapshot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent backdrop-blur-[1px]" />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center text-white px-6">
                  <motion.span
                    className="rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t("video.tag")}
                  </motion.span>
                  <motion.p
                    className="text-lg font-semibold sm:text-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t("video.title")}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/80 bg-white/15 text-white hover:bg-white/30 hover:!text-white hover:border-white hover:shadow-lg transition-all duration-300"
                      onClick={() => window.open("https://youtu.be/ByoHrKslf54?si=fa2Di21q31sxnHJv", "_blank", "noopener")}
                      aria-label={t("video.cta")}
                    >
                      {t("video.cta")}
                    </Button>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                {t("video.caption")}
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={`badge-${index}`}
                  className="bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => onOpenRfq(`badge_${badge.title.toLowerCase()}`)}
                >
                  <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200 rounded mb-2 flex items-center justify-center transition-all duration-300">
                    <span className="font-bold text-orange-700 text-sm">{badge.title}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900 mb-1">{badge.subtitle}</p>
                  <p className="text-xs text-orange-600 font-semibold group-hover:text-orange-700 transition-colors duration-300 cursor-pointer">{t("badges.cta")}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
