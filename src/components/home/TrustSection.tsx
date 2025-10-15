"use client"

import { Shield, Award, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrustSectionProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

const partnerHighlights = [
  { name: "Nice", region: "EU gate automation" },
  { name: "LiftMaster", region: "North America" },
  { name: "Somfy", region: "Smart shading" },
  { name: "Tuya", region: "IoT ecosystem" },
  { name: "CAME", region: "Industrial access control" },
]

const trustSignals = [
  {
    icon: Award,
    headline: "47 NPI/year",
    description: "Specialist RF and IoT teams manage the journey from specification to shipment.",
  },
  {
    icon: Shield,
    headline: "Accredited compliance lab",
    description: "CE RED, FCC Part 15, and KC pre-testing with certification partners on standby.",
  },
  {
    icon: TrendingUp,
    headline: "98.7% FPY",
    description: "Traceable PCBA, AOI, RF tuning, and 100% outbound QC keep DPPM below 500.",
  },
  {
    icon: Globe,
    headline: "28 export markets",
    description: "Custom packaging, multilingual documentation, and direct-to-market logistics support.",
  },
]

export function TrustSection({ onOpenRfq, onWhatsApp }: TrustSectionProps) {
  return (
    <section className="bg-slate-900 py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Trusted OEM/ODM partner
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Gate automation leaders and IoT innovators build on the FastFunRC production base
            </h2>
            <p className="text-base text-white/70 sm:text-lg">
              From RF transmitters and receivers to Wi-Fi switches and bridges, we handle tooling, PCBA, RF tuning,
              and certification in one facility—freeing your launch teams to focus on product-market fit.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100"
              onClick={() => onOpenRfq("trust_cta")}
            >
              Talk to sales
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/70 bg-transparent text-white hover:bg-white/15 hover:!text-white hover:border-white"
              onClick={() => onWhatsApp("trust_whatsapp")}
            >
              Request a call back
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
