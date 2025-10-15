"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, MessageCircle } from "lucide-react"

interface FAQSectionProps {
  onOpenRfq: (source: string) => void
}

const faqItems = [
  {
    question: "Why does actual range differ from the specification?",
    answer:
      "Published distances reference open-field typical values. Indoor performance depends on antenna choice, mounting position, surrounding materials, and the interference profile of the site.",
  },
  {
    question: "Can you build a replacement without the original part number?",
    answer:
      "Sending 2–5 sample sets is the fastest path to validation. If samples are unavailable, detailed photos plus frequency and encoding details work—we will respond with A/B/C compatibility options and list any caveats.",
  },
  {
    question: "What is the difference between learning and cloning remotes?",
    answer:
      "Our learning remotes support cleartext fixed codes such as EV1527 or PT2262. We do not reproduce rolling-code or encrypted algorithms. For rolling-code systems, pair our transmitters with compatible receivers or bridge modules.",
  },
  {
    question: "Can rolling-code systems be made compatible?",
    answer:
      "Compatibility depends on the existing receiver. When it cannot enroll new rolling-code transmitters, we recommend replacing it or adding a bridge that learns both sides.",
  },
  {
    question: "Do you support white labelling and cosmetic tweaks?",
    answer:
      "Yes. Button count, color, logo, silk print, and similar light customizations are available with MOQs between 50 and 200 units depending on the configuration.",
  },
  {
    question: "What are the timelines for samples and small batches?",
    answer:
      "With complete documentation, samples ship in 2–5 days and small-lot production in 7–15 days. Requests outside the quick-configuration scope move into an engineering review with confirmed MOQ, NRE, and timeline.",
  },
  {
    question: "How do you handle compliance and certification?",
    answer:
      "We follow the regulations for your target market—CE, FCC, KC, RoHS, and regional directives as required. Testing and filing support is available on demand with fees and lead times quoted separately.",
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
            Quick answers to the most common RF compatibility and smart device manufacturing questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {faqItems.map((faq, index) => (
            <motion.div
              key={faq.question}
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
                        expandedFaq === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
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
            <p className="text-sm text-slate-600 mb-4">
              Our engineering team can review your files and recommend compatibility paths within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => onOpenRfq("faq_consult")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Consult engineers
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                type="button"
                onClick={() => onOpenRfq("faq_quote")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Get a quote
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
