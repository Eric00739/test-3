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
      'MOQ starts from 50 units for standard products with flexible volume discounts. Our direct manufacturing model offers significant cost advantages compared to local sourcing, with pricing structures tailored to your specific requirements and order volume.',
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
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about our RF & IoT control solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 border-0 h-full">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left focus:outline-none focus:ring-4 focus:ring-orange-100 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-xs">{index + 1}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 pr-3">{faq.question}</h3>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 pt-1">
                    <div className="pl-10">
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
            <p className="text-sm text-slate-600 mb-4">Our expert engineers are ready to help with your project requirements</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => onOpenRfq('faq_consult')}>
                <Phone className="h-4 w-4 mr-2" />
                Consult Engineers
              </Button>
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900" type="button" onClick={() => onOpenRfq('faq_quote')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Get Quote
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}