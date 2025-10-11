"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Send, Upload } from "lucide-react"

interface ContactSectionProps {
  onOpenRfq: (source: string) => void
}

export function ContactSection({ onOpenRfq }: ContactSectionProps) {
  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-lg font-semibold text-orange-800">Engineer replies within 24 hours • NDA available • Support EU/FCC certification</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl border-0 p-8 sm:p-12"
        >
          <form className="space-y-6">
            {/* Step 1: Required Information */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                Required Information (20 seconds)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
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
                    Country/Region *
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300" required>
                    <option>Select Country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Italy</option>
                    <option>Spain</option>
                    <option>Netherlands</option>
                    <option>Poland</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Japan</option>
                    <option>South Korea</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Product Type *
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300" required>
                    <option>Select Product</option>
                    <option>RF Remote Controls</option>
                    <option>RF Receivers</option>
                    <option>RF Kits</option>
                    <option>Car Remotes</option>
                    <option>Wi-Fi Switches</option>
                    <option>Wi-Fi Sockets</option>
                    <option>Custom ODM Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Target Quantity *
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300" required>
                    <option>Select Quantity</option>
                    <option>50-100 units</option>
                    <option>100-500 units</option>
                    <option>500-1000 units</option>
                    <option>1000-5000 units</option>
                    <option>5000+ units</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
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
            
            {/* Step 2: Optional Information */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                Additional Information (Optional)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Application Scenario
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                    rows={3}
                    placeholder="Describe your application (e.g., garage door control, smart lighting, etc.)"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Certification Requirements
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300">
                      <option>None</option>
                      <option>CE Only</option>
                      <option>FCC Only</option>
                      <option>CE + FCC</option>
                      <option>UL Required</option>
                      <option>Other</option>
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
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg" type="button" onClick={() => onOpenRfq('contact_form')}>
                <Send className="h-5 w-5 mr-2" />
                Submit Request
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-8 py-4 text-lg" type="button">
                <Upload className="h-5 w-5 mr-2" />
                Download NDA Template
              </Button>
            </div>
            
            {/* Privacy Notice */}
            <div className="text-center text-xs text-slate-500 mt-6">
              <p>By submitting this form, you agree to our Privacy Policy. We protect your data and never share it with third parties.</p>
              <p className="mt-1">Protected by reCAPTCHA • Google Privacy Policy • Terms of Service</p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}