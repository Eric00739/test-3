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
            Get pricing and samples within 24 hours
          </p>
          
          {/* Form Promise */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-orange-600 mr-2" />
              <span className="text-lg font-semibold text-orange-800">Work order number generated after submission; reply by email within [24] hours on working days</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Fixed Tips */}
          <div className="hidden lg:block lg:w-1/4 pr-8">
            <div className="sticky top-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">表单填写提示</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>提供原产品照片以便准确评估兼容性</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>指明目标市场以便正确认证</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>包含预期交货时间以便优先处理</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>提交后立即生成工单号</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-orange-200">
                <p className="text-sm font-semibold text-orange-800">
                  平均响应时间: <span className="block text-lg">10分钟以内</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:w-3/4">
              {/* Step 1: Required Information */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                  Required Information (20 seconds)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Company Name *
                    </label>
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
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Phone/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="+Country Code Number"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Application Scenario *
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                    rows={3}
                    placeholder="Describe your application (e.g., garage door control, smart lighting, etc.)"
                    required
                  />
                </div>
              </div>
              
              {/* Step 2: Optional Information */}
              <div className="bg-slate-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                  Additional Information (Optional)
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Target Market
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Select Market</option>
                        <option>Europe</option>
                        <option>North America</option>
                        <option>Asia</option>
                        <option>South America</option>
                        <option>Africa</option>
                        <option>Oceania</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Frequency Band
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Select Frequency</option>
                        <option>315MHz</option>
                        <option>433.92MHz</option>
                        <option>868MHz</option>
                        <option>915MHz</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Target Quantity
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Select Quantity</option>
                        <option>50-100 units</option>
                        <option>100-500 units</option>
                        <option>500-1000 units</option>
                        <option>1000-5000 units</option>
                        <option>5000+ units</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Expected Lead Time
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                        <option>Standard (20-30 days)</option>
                        <option>Expedited (15-20 days)</option>
                        <option>Rush (7-10 days)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Attachment (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Drop files here or click to upload</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOC, DWG, STEP files (Max 10MB)</p>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
            </div>
          </div>
        </div>
      </section>
  )
}