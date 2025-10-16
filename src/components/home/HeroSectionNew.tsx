"use client"

import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export interface HeroSectionNewProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

export function HeroSectionNew({ onOpenRfq, onWhatsApp }: HeroSectionNewProps) {
  const t = useTranslations("hero")
  const keyPoints = [t("keyPoints.0"), t("keyPoints.1")]

  return (
    <section id="hero" className="relative bg-white py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-gray-900">
              {t("headline")}
            </h1>

            <p className="mt-6 text-lg font-light leading-relaxed text-slate-600 lg:max-w-3xl">
              {t("subheadline")}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {keyPoints.map((item, index) => (
                <motion.div
                  key={`hero-key-point-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-2 rounded-full bg-orange-50/80 px-4 py-2 text-sm font-medium text-orange-700"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-white shadow-md transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
                  onClick={() => onOpenRfq("hero_quote")}
                >
                  {t("primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </motion.div>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-300 px-8 py-3 text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                onClick={() => onOpenRfq("hero_compatibility")}
              >
                {t("compatibilityCta")}
              </Button>
            </div>

            <div className="mt-4 text-sm text-slate-500 lg:max-w-2xl">{t("longRangeFootnote")}</div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 lg:justify-start">
              <button
                type="button"
                className="underline-offset-4 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:underline"
                onClick={() => onOpenRfq("hero_catalog")}
              >
                {t("catalogCta")}
              </button>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 lg:inline-flex" aria-hidden="true" />
              <button
                type="button"
                className="underline-offset-4 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:underline"
                onClick={() => onWhatsApp("hero_whatsapp")}
              >
                {t("compatibilityCtaSecondary")}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/factory-montage.webp"
                    alt={t("video.alt")}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-4 -right-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-md"
              >
                {t("certificationBadge")}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
