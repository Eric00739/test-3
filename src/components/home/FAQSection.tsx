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
      "Published distances reference open-field typical values. Real-world performance varies based on antenna placement, building materials, and interference. Our solutions typically achieve 70-85% of specified range in standard indoor environments.",
  },
  {
    question: "Can you build a replacement without the original part number?",
    answer:
      "Yes! 95% of replacements are successfully identified from 2-5 sample sets or detailed photos. Our engineering team responds within 24 hours with compatibility options. We maintain a database of 10,000+ verified configurations.",
  },
  {
    question: "What is the difference between learning and cloning remotes?",
    answer:
      "Learning remotes support cleartext fixed codes (EV1527/PT2262) with 99% success rate. We don't replicate encrypted rolling codes. Instead, we offer compatible receiver replacements that maintain security while eliminating compatibility issues.",
  },
  {
    question: "Can rolling-code systems be made compatible?",
    answer:
      "Yes, through our bridge receiver solutions with 98% compatibility success rate. When direct enrollment isn't possible, our bridge modules learn both original and new transmitters, maintaining security while expanding compatibility.",
  },
  {
    question: "Do you support white labelling and cosmetic tweaks?",
    answer:
      "Absolutely! We support complete branding customization: button layout, colors, logos, and packaging. 90% of customizations ship within standard timelines. MOQs start at just 50 units for most configurations.",
  },
  {
    question: "What are the timelines for samples and small batches?",
    answer:
      "Standard samples: 2-5 days (95% on-time delivery). Small production: 7-15 days. Our rapid prototyping process has helped 100+ brands reduce time-to-market by an average of 40%.",
  },
  {
    question: "How do you handle compliance and certification?",
    answer:
      "We maintain 100% compliance record across CE, FCC, KC, and RoHS certifications. Our in-house pre-testing achieves 92% first-pass certification success, saving clients 3-4 weeks in typical certification cycles.",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Expert Answers to Your Questions</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Practical solutions backed by 15 years of experience and data from 10,000+ successful projects
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
            <h3 className="text-xl font-bold text-gray-900 mb-3">Need a specific solution?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Get expert consultation from our engineering team. 95% of inquiries receive complete solutions within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => onOpenRfq("faq_consult")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Get expert consultation
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
