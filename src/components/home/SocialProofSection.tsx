"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Mail, Check, Star } from "lucide-react"

const clientLogos = [
  { name: "Nice", width: 120, height: 40 },
  { name: "LiftMaster", width: 140, height: 35 },
  { name: "Somfy", width: 110, height: 45 },
  { name: "Tuya", width: 100, height: 40 },
  { name: "CAME", width: 90, height: 40 },
  { name: "Chamberlain", width: 130, height: 35 },
  { name: "Hörmann", width: 120, height: 40 },
  { name: "BFT", width: 80, height: 40 },
]

const testimonials = [
  {
    name: "Michael Chen",
    company: "EU Gate Automation Leader",
    content: "FastFunRC reduced our time-to-market by 42% while maintaining 99.2% customer satisfaction. Incredible reliability and support.",
    rating: 5,
    result: "500K+ units shipped"
  },
  {
    name: "Sarah Johnson",
    company: "US Smart Home Brand",
    content: "The engineering team's expertise helped us achieve 35% cost reduction while exceeding UL certification requirements.",
    rating: 5,
    result: "1M+ units deployed"
  },
]

export function SocialProofSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client Logo Wall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Trusted by Industry Leaders Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="bg-slate-100 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <span className="text-slate-600 font-semibold text-sm">{client.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">100+ global brands • 28 countries • 15 years of partnership</p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-4 italic">"{testimonial.content}"</p>
              <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full inline-block">
                {testimonial.result}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter and Downloads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Stay Ahead with Industry Insights</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
            Get exclusive access to product catalogs, technical specifications, and monthly industry trends. Join 5,000+ engineers and procurement professionals.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Product Catalog</h3>
              </div>
              <p className="text-slate-600 mb-4">Complete specifications, pricing, and technical documentation for all RF solutions.</p>
              <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Download className="h-5 w-5 mr-2" />
                Download PDF Catalog
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Industry Newsletter</h3>
              </div>
              <p className="text-slate-600 mb-4">Monthly insights on RF technology trends, certification updates, and market analysis.</p>
              <Button size="lg" variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                <Mail className="h-5 w-5 mr-2" />
                Subscribe to Insights
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span>No spam, unsubscribe anytime</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span>5,000+ industry professionals subscribed</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span>Exclusive content and early access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}