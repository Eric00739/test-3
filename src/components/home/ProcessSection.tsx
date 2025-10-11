"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Clock, ChevronRight, Users, Cpu, Shield, Factory } from "lucide-react"

interface ProcessSectionProps {
  onOpenRfq: (source: string) => void
}

const processSteps = [
  { 
    phase: 'Discovery', 
    duration: '1-2 weeks', 
    deliverables: 'Requirements analysis, Technical feasibility',
    icon: Users,
    color: 'from-blue-500 to-blue-600'
  },
  { 
    phase: 'Prototyping', 
    duration: '2-3 weeks', 
    deliverables: 'Functional prototype, Initial testing',
    icon: Cpu,
    color: 'from-green-500 to-green-600'
  },
  { 
    phase: 'Compliance', 
    duration: '3-4 weeks', 
    deliverables: 'Certification testing, Documentation',
    icon: Shield,
    color: 'from-purple-500 to-purple-600'
  },
  { 
    phase: 'Mass Production', 
    duration: '6-8 weeks', 
    deliverables: 'Full-scale production, Quality assurance',
    icon: Factory,
    color: 'from-orange-500 to-orange-600'
  }
]

export function ProcessSection({ onOpenRfq }: ProcessSectionProps) {
  return (
    <section id="process" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">OEM/ODM Process</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            From concept to market in 12 weeks with transparent project management
          </p>
        </motion.div>

        {/* Visual Process Timeline */}
        <div className="relative px-4">
          {/* Progress Line */}
          <div className="absolute top-16 sm:top-20 lg:top-24 left-0 right-0 h-1 bg-slate-200 rounded-full" />
          <div className="absolute top-16 sm:top-20 lg:top-24 left-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 rounded-full" 
               style={{ width: '100%' }} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Circle Node */}
                <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                  </div>
                </div>
                
                {/* Step Card */}
                <div className="text-center p-4 sm:p-6 lg:p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-slate-50 rounded-2xl">
                  <div className={`inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r ${step.color} text-white rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
                    {step.duration}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{step.phase}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{step.deliverables}</p>
                  
                  {/* Arrow Indicator */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-slate-300 -ml-4" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Total Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl">
            <Clock className="h-6 w-6 text-orange-600 mr-3" />
            <span className="text-lg font-semibold text-gray-900">Total Timeline: </span>
            <span className="text-xl font-bold text-orange-600 ml-2">12 Weeks</span>
          </div>
        </motion.div>

        {/* How to Engage */}
        <div className="mt-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900">How to engage FastFunRC</h3>
              <ol className="mt-4 space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">1</span>
                  <div>Share RFQ via form or WhatsApp. We acknowledge in under 12 hours.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">2</span>
                  <div>Engineering review with feasibility, certification plan, and sample ETA.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">3</span>
                  <div>Prototype shipment, DFM updates, and tooling launch after approval.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">4</span>
                  <div>Mass production with 100% outgoing QC plus compliance pack for customs.</div>
                </li>
              </ol>
              <Button
                type="button"
                className="mt-6 bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => onOpenRfq('process_quote')}
              >
                Request detailed proposal
              </Button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 sm:p-8 text-slate-100">
              <h3 className="text-lg font-semibold text-white">Plant equipment snapshot</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                {[["SMT lines", "3 Fuji NXT + Yamaha modular"],
                  ["AOI & ICT", "Omron AOI, Keysight ICT"],
                  ["RF lab", "Shielded chambers, VNA tuning"],
                  ["Aging stations", "96-ch burn-in racks"],
                  ["Plastic shop", "8 injection machines, silk print"],
                  ["Final assembly", "4 lean cells, ERP traceability"]].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
                    <div className="mt-2 text-sm font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs text-white/70">
                <ChevronRight className="h-4 w-4 text-lime-400" />
                Factory audited by EU/US brands with annual social compliance reports.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}