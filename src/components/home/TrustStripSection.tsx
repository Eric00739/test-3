"use client"

import { Shield, Award, TrendingUp, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export interface TrustStripSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

export function TrustStripSection({ onOpenRfq, onWhatsApp }: TrustStripSectionProps) {
  const trustSignals = [
    {
      icon: Award,
      headline: "47 NPI/year",
      description: "95% success rate from concept to mass production",
    },
    {
      icon: Shield,
      headline: "100% compliance",
      description: "CE RED, FCC Part 15, KC certified",
    },
    {
      icon: TrendingUp,
      headline: "98.7% FPY",
      description: "Industry-leading yield with DPPM under 500",
    },
    {
      icon: Globe,
      headline: "28 markets",
      description: "Serving 100+ global brands worldwide",
    },
  ]

  const partnerHighlights = [
    { name: "Nice", region: "EU gate automation" },
    { name: "LiftMaster", region: "North America" },
    { name: "Somfy", region: "Smart shading" },
    { name: "Tuya", region: "IoT ecosystem" },
    { name: "CAME", region: "Industrial access" },
  ]

  return (
    <section className="bg-slate-50/60 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {trustSignals.map(({ icon: Icon, headline, description }, index) => (
            <motion.div
              key={headline}
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
                <div className="text-lg font-semibold text-gray-900">{headline}</div>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos - Monochrome */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wide">Trusted by industry leaders</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {partnerHighlights.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/50"
              >
                <div className="text-lg font-semibold text-slate-400 grayscale transition-all duration-300 hover:grayscale-0 hover:text-slate-600">
                  {partner.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 text-center">{partner.region}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xs text-slate-400">
              Third-party brands referenced for compatibility only. Non-OEM / not affiliated.
            </p>
          </div>
        </div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3"
            onClick={() => onOpenRfq("trust_cta")}
          >
            Start your project
          </Button>
        </motion.div>
      </div>
    </section>
  )
}