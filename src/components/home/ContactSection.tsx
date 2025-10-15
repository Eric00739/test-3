"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Send, Upload, Check } from "lucide-react"

interface ContactSectionProps {
  onOpenRfq: (source: string) => void
}

export function ContactSection({ onOpenRfq }: ContactSectionProps) {
  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Request Your Quote</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Share your requirements and receive pricing or sample plans within 24 business hours.
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-orange-600 mr-2" />
              <span className="text-lg font-semibold text-orange-800">
                Work order ID generated after submission; email response guaranteed within 24 business hours
              </span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-1/4 pr-8">
            <div className="sticky top-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Submission tips</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Attach photos of the existing remote and receiver so we can verify compatibility quickly.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Note your target market to confirm regional certification requirements.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Flag urgent launch timelines so we can prioritize sampling and scheduling.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>A work order ID is created automatically after submission—refer to it in follow-ups.</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-orange-200">
                <p className="text-sm font-semibold text-orange-800">
                  Average response time: <span className="block text-lg">under 10 minutes</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  Required information (about 20 seconds)
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Contact person *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Company name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="Your company"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="+1 555 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Application *</label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                      <option>Select application</option>
                      <option>Gate / garage opener</option>
                      <option>Smart lighting / RF control</option>
                      <option>Automotive aftermarket</option>
                      <option>Industrial access</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Target quantity *</label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                      <option>Select quantity</option>
                      <option>Samples (2–10 units)</option>
                      <option>50–100 units</option>
                      <option>100–500 units</option>
                      <option>500–1000 units</option>
                      <option>1000+ units</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Project description *</label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                    rows={3}
                    placeholder="Describe the target product or retrofit scenario (frequency, range, receiver type, quantities, timeline)."
                    required
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  Additional information (optional)
                </h3>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Target market</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Select market</option>
                        <option>Europe</option>
                        <option>North America</option>
                        <option>Asia-Pacific</option>
                        <option>Middle East</option>
                        <option>Latin America</option>
                        <option>Africa</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Frequency band</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Select frequency</option>
                        <option>315 MHz</option>
                        <option>433.92 MHz</option>
                        <option>446 / 447 MHz</option>
                        <option>868 MHz</option>
                        <option>915 MHz</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity range</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Select range</option>
                        <option>50–200 units</option>
                        <option>200–500 units</option>
                        <option>500–1000 units</option>
                        <option>1000–5000 units</option>
                        <option>5000+ units</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Expected lead time</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Standard (20–30 days)</option>
                        <option>Expedited (15–20 days)</option>
                        <option>Rush (7–10 days)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Attachment (optional)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Drop files here or click to upload</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOC, DWG, STEP files (max 10 MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4"
            onClick={() => onOpenRfq("contact_start")}
          >
            <Send className="h-5 w-5 mr-2" />
            Launch quote workflow
          </Button>
        </div>
      </div>
    </section>
  )
}
