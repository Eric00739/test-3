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
    question: '距离为什么不一致？',
    answer:
      '与环境、天线、安装位置有关；页面数据为空旷典型值。',
  },
  {
    question: '没有原型号也能做替代吗？',
    answer:
      '最好能提供 2–5 套样品用于比对与测试；也可以只提供照片与频段/编码信息，我们会给出 A/B/C 方案并说明差异与注意事项。',
  },
  {
    question: '学习型与拷贝型有什么区别？',
    answer:
      '我们提供的"学习型"仅适用于明文固定码（如 EV1527/PT2262）；不涉及滚动码/加密算法的复制或破解。滚动码场景请采用匹配接收器或桥接方案。',
  },
  {
    question: '滚动码能兼容吗？',
    answer:
      '需确认接收器是否支持；不支持时建议更换接收器或使用桥接器。',
  },
  {
    question: '是否支持贴牌与小改外观？',
    answer:
      '支持按键/颜色/丝印等轻定制；MOQ 50–200 件。',
  },
  {
    question: '样品与小批交期？',
    answer:
      '资料齐全时 2–5 天给出样品/可行性。小批优先走选配化；超出范围将进入评审并告知 MOQ / NRE / 时间表。',
  },
  {
    question: '合规如何处理？',
    answer:
      '按销售地区提供对应认证版本（CE/FCC/KC等）；可提供全套认证资料用于清关与上市。',
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
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => onOpenRfq('faq_consult')}>
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