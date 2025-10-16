"use client"

import { Users, Cpu, Shield, Package, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export interface ProcessTimelineSectionNewProps {
  onOpenRfq?: (source: string) => void
}

export function ProcessTimelineSectionNew({ onOpenRfq }: ProcessTimelineSectionNewProps) {
  const processSteps = [
    {
      icon: Users,
      phase: "Requirements",
      duration: "1-2 days",
      description: "Technical analysis & feasibility study",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cpu,
      phase: "Engineering",
      duration: "1-2 weeks",
      description: "Custom design & prototyping",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      phase: "Validation",
      duration: "2-3 weeks",
      description: "Testing & compliance verification",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Package,
      phase: "Production",
      duration: "4-6 weeks",
      description: "Mass production & global shipping",
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            From concept to delivery in just 12 weeks
          </p>
        </motion.div>

        {/* Compact Process Steps - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Step Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Phase Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.phase}</h3>
                
                {/* Duration */}
                <p className="text-sm font-medium text-orange-600 mb-2">{step.duration}</p>
                
                {/* Description */}
                <p className="text-sm text-slate-600">{step.description}</p>
                
                {/* Connector (except last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-slate-300" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline (Mobile Only) */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          {processSteps.map((step, index) => (
            <div key={step.phase} className="relative flex items-start mb-8">
              <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center z-10`}>
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-6 bg-white rounded-xl border border-slate-200 p-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{step.phase}</h3>
                <p className="text-sm font-medium text-orange-600 mb-1">{step.duration}</p>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3"
            onClick={() => onOpenRfq && onOpenRfq("process_cta")}
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  )
}