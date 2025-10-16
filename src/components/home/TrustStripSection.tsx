"use client"

import { Shield, Award, TrendingUp, Globe, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export interface TrustStripSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

const trustIcons = [Award, Shield, TrendingUp, Globe]

export function TrustStripSection({ onOpenRfq, onWhatsApp }: TrustStripSectionProps) {
  const t = useTranslations("trustStrip")
  const trustSignals = t.raw("metrics") as Array<{ headline: string; description: string }>
  const partners = t.raw("partners") as Array<{ name: string; description: string }>

  return (
    <section id="trust-strip" className="overflow-hidden bg-slate-50/60 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustSignals.map((signal, index) => {
            const Icon = trustIcons[index % trustIcons.length]
            return (
              <motion.div
                key={signal.headline}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="rounded-full bg-orange-50 p-3">
                  <Icon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{signal.headline}</div>
                  <p className="mt-1 text-sm text-slate-600">{signal.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wide text-slate-500">{t("label")}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center rounded-xl bg-white/50 p-4 text-center"
              >
                <div className="text-lg font-semibold text-slate-400 transition-all duration-300 grayscale hover:grayscale-0 hover:text-slate-600">
                  {partner.name}
                </div>
                <div className="mt-1 text-xs text-slate-400">{partner.description}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-400">{t("disclaimer")}</div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
        >
          <Button
            variant="outline"
            className="rounded-full border-slate-300 px-8 py-3 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            onClick={() => onOpenRfq("trust_cta")}
          >
            {t("cta.primary")}
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-orange-600 focus-visible:underline"
            onClick={() => onWhatsApp("trust_whatsapp")}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t("cta.secondary")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
