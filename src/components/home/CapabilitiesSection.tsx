"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const capabilities = [
  { category: 'RF Design', items: ['Antenna Design', 'RF Testing', 'EMC/EMI', 'Protocol Stack'] },
  { category: 'Laboratory', items: ['Signal Analysis', 'Environmental Testing', 'Reliability Testing', 'Compliance Testing'] },
  { category: 'Manufacturing', items: ['SMT Lines', 'AOI/AXI', 'Wave Soldering', 'Conformal Coating'] },
  { category: 'Quality', items: ['ISO 9001', 'IATF 16949', 'Medical ISO 13485', 'Statistical Process Control'] }
]

const customizationServices = [
  {
    title: 'Private Tooling',
    description: 'Custom housing design and manufacturing',
    moq: '3,000 units',
    cost: 'Competitive pricing',
    features: ['Custom 3D design', 'Injection molding', 'Brand colors', 'Logo printing']
  },
  {
    title: 'Key Layout & Membrane',
    description: 'Custom button arrangement and membrane design',
    moq: '1,000 units',
    cost: 'Competitive pricing',
    features: ['Custom button count', 'Membrane design', 'Backlight options', 'Tactile feedback']
  },
  {
    title: 'Protocol & Pairing',
    description: 'Custom RF protocol and pairing methods',
    moq: '500 units',
    cost: 'Competitive pricing',
    features: ['Rolling code', 'Learning code', 'Custom encryption', 'Multi-device pairing']
  },
  {
    title: 'RF Range & Performance',
    description: 'Extended range and anti-interference optimization',
    moq: '1,000 units',
    cost: 'Competitive pricing',
    features: ['150-300m range', 'Anti-interference', 'Power optimization', 'Multi-frequency']
  },
  {
    title: 'Receiver/Gateway Matching',
    description: 'Custom receiver modules and gateways',
    moq: '500 units',
    cost: 'Competitive pricing',
    features: ['Custom receivers', 'Gateway integration', 'Protocol matching', 'Network topology']
  },
  {
    title: 'Branding & Packaging',
    description: 'Custom packaging and brand integration',
    moq: '500 units',
    cost: 'Competitive pricing',
    features: ['Custom packaging', 'User manual', 'Brand colors', 'Multi-language']
  }
]

export function CapabilitiesSection() {
  return (
    <>
      {/* Factory Capabilities Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">R&D & Manufacturing Excellence</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              8 R&D engineers with 15% holding master's degrees, delivering cutting-edge IoT solutions
            </p>
          </motion.div>

          {/* Products Matrix */}
          <div id="capabilities" className="mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((capability, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{capability.category}</h3>
                  <ul className="space-y-2">
                    {capability.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}