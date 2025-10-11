"use client"

import { useState } from 'react'
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, MessageCircle, Cpu, Wifi, Settings } from "lucide-react"

interface FAQSectionProps {
  onOpenRfq: (source: string) => void
}

const faqItems = [
  {
    question: 'What is your MOQ and pricing structure?',
    answer:
      'MOQ starts from 50 units for standard products. Pricing: 50-100 units: $2.50-3.00/unit, 500-1000 units: $1.80-2.20/unit, 5000+ units: $0.90-1.20/unit. Volume discounts available for larger orders.',
  },
  {
    question: 'What are your lead times for samples and mass production?',
    answer:
      'Sample lead time: 7-10 days for standard products, 10-15 days for custom samples. Mass production: 20-30 days after sample approval. Rush orders available with 15% surcharge.',
  },
  {
    question: 'Which frequency bands and protocols do you support?',
    answer:
      'We support 315MHz, 433.92MHz, 868MHz, and 915MHz bands. Protocols: Fixed code, Rolling code (EV1527, PT2262), Learning code, ASK/FSK modulation. Custom frequency development available.',
  },
  {
    question: 'What certifications can you provide for our target market?',
    answer:
      'We provide CE (RED EN 300 220), FCC Part 15, RoHS, REACH, ISO 9001:2015, and IATF 16949:2016 certifications. Additional certifications (UL, ETL, etc.) can be obtained based on requirements.',
  },
  {
    question: 'What customization options are available for ODM projects?',
    answer:
      'Full ODM support: Private tooling, custom PCB design, firmware development, custom housing (injection molding), logo printing, custom packaging, custom frequency/protocol development. MOQ for private tooling: 1000-5000 units depending on complexity.',
  },
  {
    question: 'What is your warranty and RMA process?',
    answer:
      'Standard warranty: 12 months for all products. Extended warranty (24 months) available for bulk orders. RMA process: Report issue within warranty period → Return analysis → Replacement/refund within 7 days. DPPM rate: <500.',
  },
]

export function FAQSection({ onOpenRfq }: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Common questions about our RF & IoT control solutions and manufacturing process
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-orange-100 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">Q{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
                    </div>
                    <ChevronRight 
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-12">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Meet Our Core R&D and Engineering Team</h3>
            <p className="text-slate-600 mb-6">Our expert engineers with 15+ years experience are ready to develop your custom wireless solutions</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Lead RF Engineer</h4>
                <p className="text-sm text-slate-600">15+ years RF design experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">IoT Specialist</h4>
                <p className="text-sm text-slate-600">WiFi/BLE protocol expert</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Project Manager</h4>
                <p className="text-sm text-slate-600">Dedicated support for every client</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Phone className="h-5 w-5 mr-2" />
                Consult Our Engineers
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" type="button" onClick={() => onOpenRfq('footer_quote')}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Technical Discussion
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}