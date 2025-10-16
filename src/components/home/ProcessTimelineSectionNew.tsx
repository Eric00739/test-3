"use client"

import { Users, Cpu, Shield, Package, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

const STEP_ICONS = [Users, Cpu, Shield, Package]

export interface ProcessTimelineSectionNewProps {
  onOpenRfq?: (source: string) => void
}

export function ProcessTimelineSectionNew({ onOpenRfq }: ProcessTimelineSectionNewProps) {
  const t = useTranslations("processTimeline")
  const steps = t.raw("steps") as Array<{ phase: string; duration: string; description: string }>

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">{t("title")}</h2>
          <p className="mt-4 text-lg text-slate-600 lg:mx-auto lg:max-w-3xl">{t("subtitle")}</p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length]
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.phase}</h3>
                  <p className="mt-1 text-sm font-medium text-orange-600">{step.duration}</p>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="pointer-events-none absolute top-1/2 -right-3 hidden -translate-y-1/2 lg:block">
                      <ArrowRight className="h-6 w-6 text-slate-300" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="relative lg:hidden">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden="true" />
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length]
            return (
              <div key={`timeline-${step.phase}`} className="relative mb-8 flex items-start last:mb-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-6 flex-1 rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{step.phase}</h3>
                  <p className="mt-1 text-sm font-medium text-orange-600">{step.duration}</p>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="rounded-full border-slate-300 px-8 py-3 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            onClick={() => onOpenRfq?.("process_cta")}
          >
            {t("cta.primary")}
          </Button>
        </div>
      </div>
    </section>
  )
}
