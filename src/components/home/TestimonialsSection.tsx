"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    company: 'SmartHome Inc.',
    result: '42% faster time-to-market',
    quote: 'Their engineering team helped us reduce our development cycle from 6 to 3.5 months. The quality is exceptional.',
    savings: '$1.2M saved in development costs'
  },
  {
    company: 'Industrial Controls Ltd.',
    result: '99.8% field reliability',
    quote: 'We\'ve shipped over 500,000 units with DPPM under 200. Their quality control is second to none.',
    savings: 'Zero warranty claims in 24 months'
  }
]

const caseStudies = [
  {
    title: 'Garage Door Remote Control',
    company: 'Leading EU Gate Control Brand',
    challenge: 'Needed a custom 433MHz rolling code remote with extended range and weather resistance for European market.',
    solution: 'Developed custom RF module with -100dBm sensitivity, IP65 housing, and EV1527 compatibility. 3-day prototyping, 15-day tooling.',
    result: '42% faster time-to-market',
    partnership: '6 Year Partnership',
    icon: 'Radio'
  },
  {
    title: 'Smart Light Switch',
    company: 'US Home Automation Company',
    challenge: 'Required WiFi smart switch with energy monitoring, voice control compatibility, and UL certification for US market.',
    solution: 'Created 2.4GHz 802.11b/g/n module with 卤1% energy metering, Tuya/Smart Life compatibility, and UL/CE/FCC certification.',
    result: '99.8% field reliability',
    partnership: '3 Year Partnership',
    icon: 'Wifi'
  },
  {
    title: 'Automotive Keyless Entry',
    company: 'Aftermarket Auto Brand',
    challenge: 'Needed 315MHz remote with immobilizer compatibility, extended battery life, and ISO 11452 certification.',
    solution: 'Engineered custom RF module with 30% longer battery life, immobilizer compatibility, and -95dBm sensitivity.',
    result: 'Zero warranty claims',
    partnership: '5 Year Partnership',
    icon: 'Settings'
  },
  {
    title: 'Smart Lighting Control',
    company: 'APAC Lighting Brand',
    challenge: 'Required multi-channel RF receiver with learning code functionality for smart lighting systems in Asian market.',
    solution: 'Developed 4-channel superheterodyne receiver with -110dBm sensitivity, learning code, and relay output for easy integration.',
    result: 'DPPM under 200',
    partnership: '4 Year Partnership',
    icon: 'Zap'
  }
]

const competitorComparison = [
  { feature: 'Rapid Prototyping', us: '3-Day Samples, 15-Day Tooling', them: '7-10 Days Samples' },
  { feature: 'Proprietary RF Tech', us: '30% Longer Battery Life', them: 'Standard Battery Life' },
  { feature: 'Quality Control', us: 'Defect Rate < 0.1%', them: 'Defect Rate 0.5-1%' },
  { feature: 'Service Level', us: 'Dedicated Project Manager', them: 'Account Manager' },
  { feature: 'FPY Rate', us: '98.7%', them: '95-97%' },
  { feature: 'Lead Time', us: '12 weeks', them: '16-20 weeks' },
  { feature: '24h Response', us: 'Guaranteed', them: '48-72h' }
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-switch testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Customer Success Stories</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Quantified results from long-term partnerships
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: -currentTestimonial * 100 + '%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="p-12 bg-white shadow-xl border-0">
                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold text-green-600 mb-4">{testimonial.result}</div>
                      <p className="text-2xl text-slate-700 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                      <div className="text-lg text-slate-600">
                        <div className="font-bold text-gray-900 text-xl mb-2">{testimonial.company}</div>
                        <div className="text-orange-600 font-semibold">{testimonial.savings}</div>
                      </div>
                    </div>
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Industry Applications & Case Studies */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Industry Applications & Success Stories</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4 text-center mb-12">
            Discover how we've helped leading companies solve their wireless control challenges
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{study.title.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                      <p className="text-sm text-slate-600">{study.company}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Challenge:</h4>
                    <p className="text-sm text-blue-800">{study.challenge}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                    <p className="text-sm text-green-800">{study.solution}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">Result:</span>
                      <span className="text-green-600 ml-2">{study.result}</span>
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold">
                      {study.partnership}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitor Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="p-10 bg-white shadow-xl border-0">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose FastFun Remote as Your Manufacturing Supplier</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-6 text-lg font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 text-lg font-bold text-green-600">FastFun Remote</th>
                    <th className="text-center py-4 px-6 text-lg text-slate-500">Typical Competitors</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                      <td className="text-center py-4 px-6">
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                          {row.us}
                        </span>
                      </td>
                      <td className="text-center py-4 px-6 text-slate-600">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}