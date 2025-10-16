"use client"

import { Shield, Award, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrustSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

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

export function TrustSection({ onOpenRfq, onWhatsApp }: TrustSectionProps) {
  return (
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
  )
}
