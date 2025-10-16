"use client"

import { ArrowRight, Check, Shield, Award, TrendingUp, Globe, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export interface HeroTrustSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
  onWeChat: (source: string) => void
}

export function HeroTrustSection({ onOpenRfq, onWhatsApp, onWeChat }: HeroTrustSectionProps) {
  const t = useTranslations("hero")
  const keyPoints = [t("keyPoints.0"), t("keyPoints.1"), t("keyPoints.2")]
  const trustBadges = [
    { title: t("badges.0.title"), subtitle: t("badges.0.subtitle") },
    { title: t("badges.1.title"), subtitle: t("badges.1.subtitle") },
    { title: t("badges.2.title"), subtitle: t("badges.2.subtitle") },
  ]

  const partnerHighlights = [
    { name: "Nice", region: "EU gate automation • 6 years partnership" },
    { name: "LiftMaster", region: "North America • 42% faster time-to-market" },
    { name: "Somfy", region: "Smart shading • 99.8% field reliability" },
    { name: "Tuya", region: "IoT ecosystem • 47 NPI projects completed" },
    { name: "CAME", region: "Industrial access control • Zero warranty claims" },
  ]

  const trustSignals = [
    {
      icon: Award,
      headline: "47 NPI/year",
      description: "95% success rate from concept to mass production, averaging 12 weeks total development time.",
    },
    {
      icon: Shield,
      headline: "100% compliance certified",
      description: "CE RED, FCC Part 15, KC pre-check and accredited partners with 92% first-pass certification success rate.",
    },
    {
      icon: TrendingUp,
      headline: "98.7% FPY",
      description: "Industry-leading yield with DPPM under 500 and RMA rate of just 0.38% (Q4 2024).",
    },
    {
      icon: Globe,
      headline: "28 export markets",
      description: "Serving 100+ global brands with 95% on-time delivery and localized support in 8 languages.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
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
              <p className="text-xs text-slate-500 mb-4">
                Long-range (1–3 km) achievable only with low data rate, compliant TX power, and external/high-gain or directional antennas; not the default handheld configuration.
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
                      {t("primaryCtaOptions.0")}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                  <p className="text-xs text-slate-500 mt-2 text-center sm:text-left">
                    Business-hours reply; samples/feasibility in 2–5 days with complete docs.
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={() => onOpenRfq('hero_compatibility')}>
                  {t("compatibilityCta")}
                </Button>
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" onClick={() => onOpenRfq('hero_catalog')}>
                  {t("catalogCta")}
                </Button>
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
                {[
                  "≤24h feasibility review → DFM/compat PDF sample",
                  "Config-first (usually no NRE) → Config matrix (band/code/buttons/appearance/MOQ)",
                  "Samples in 2–5 days → 60-second pairing/wiring video",
                  "Compliance assist (as needed) → CE/FCC/KC/RoHS certificate samples"
                ].map((step, idx) => (
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
                    {idx < 3 && <ChevronRight className="h-4 w-4 text-orange-500 hidden sm:block ml-4" aria-hidden="true" />}
                  </motion.div>
                ))}
              </motion.div>

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

      {/* Trust Section - Immediately after Hero */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Trusted by 100+ global brands
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Industry leaders choose FastFunRC for 40% faster time-to-market and 98.7% reliability
              </h2>
              <p className="text-base text-white/70 sm:text-lg">
                End-to-end electronics manufacturing with proven results: 47 NPI projects annually, 95% on-time delivery,
                and 99.8% field reliability across 28 countries. From prototype to mass production in just 12 weeks.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => onOpenRfq("trust_cta")}
              >
                Start your project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/70 bg-transparent text-white hover:bg-white/15 hover:!text-white hover:border-white"
                onClick={() => onWhatsApp("trust_whatsapp")}
              >
                Get technical consultation
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {partnerHighlights.map((partner) => (
              <div
                key={partner.name}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center text-white shadow-[0_18px_30px_-20px_rgba(15,23,42,0.65)]"
              >
                <div className="text-sm font-semibold sm:text-base">{partner.name}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/60">{partner.region}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-white/50">
              Third-party brands are referenced for compatibility or project context only. Non-OEM / not affiliated. Trademarks belong to their owners.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trustSignals.map(({ icon: Icon, headline, description }) => (
              <div
                key={headline}
                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_25px_40px_-28px_rgba(14,165,233,0.55)]"
              >
                <div className="rounded-full bg-white/15 p-3">
                  <Icon className="h-5 w-5 text-orange-300" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{headline}</div>
                  <p className="mt-1 text-sm text-white/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}