"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Package, Send, Wifi, Radio, Settings, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ProductsSectionProps {
  onOpenRfq: (source: string) => void
}

const products = [
  {
    category: 'Smart Home & Appliance Controls',
    description: 'For brands in the home electronics sector',
    items: [
      {
        title: 'WiFi Smart Switch Manufacturer',
        icon: Wifi,
        specs: 'Protocol: 2.4GHz 802.11b/g/n • Power: 10A/16A/20A • Voltage: 100-240V AC • Size: 45&times;45&times;22mm • Cert: CE/FCC/UL',
        features: ['App Control', 'Voice Control', 'Timer Function', 'Energy Monitoring'],
        useCase: 'Smart Home',
        certification: 'CE/FCC/UL',
        color: 'from-indigo-500 to-indigo-600',
        details: '2.4GHz 802.11b/g/n, 10A/16A/20A options, Tuya/Smart Life compatible'
      },
      {
        title: 'WiFi Smart Socket',
        icon: Zap,
        specs: 'Protocol: 2.4GHz 802.11b/g/n • Power: 16A max • Voltage: 100-240V AC • Size: 60&times;60&times;78mm • Cert: CE/FCC/UL',
        features: ['Power Metering', 'Schedule', 'Overload Protection', 'Voice Control'],
        useCase: 'Home Automation',
        certification: 'CE/FCC/UL',
        color: 'from-cyan-500 to-cyan-600',
        details: '2.4GHz, 16A max load, 卤1% energy metering accuracy'
      },
      {
        title: '868/915MHz Universal Remote',
        icon: Radio,
        specs: 'Band: 868/915MHz • Modulation: ASK/FSK • Code: learning • TX: 12dBm • RX: -98dBm • Power: AAA • Size: 70&times;40&times;18mm • Cert: CE RED/FCC',
        features: ['Learning Code', 'Multi-button', 'Low Power', 'EU/US compliant'],
        useCase: 'Smart Home',
        certification: 'CE RED/FCC',
        color: 'from-green-500 to-green-600',
        details: '868.3MHz (EU) / 915MHz (US), -98dBm sensitivity, 100m range'
      }
    ]
  },
  {
    category: 'Industrial & Automotive Remote Systems',
    description: 'For industrial and automotive clients',
    items: [
      {
        title: '433MHz Rolling Code Remote',
        icon: Radio,
        specs: 'Band: 433.92MHz • Modulation: ASK/FSK • Code: rolling • TX: 10dBm • RX: -100dBm • Power: CR2032 • Size: 58&times;35&times;12mm • Cert: CE/FCC',
        features: ['Rolling Code', '4-Button', '12V Battery', 'IP65'],
        useCase: 'Garage Doors',
        certification: 'CE/FCC/RoHS',
        color: 'from-blue-500 to-blue-600',
        details: 'EV1527/PT2262 compatible, 433.92MHz 卤100kHz, -100dBm sensitivity'
      },
      {
        title: '315MHz Car Remote',
        icon: Settings,
        specs: 'Band: 315MHz • Modulation: ASK • Code: fixed/rolling • TX: 8dBm • RX: -95dBm • Power: AAA • Size: 65&times;35&times;15mm • Cert: ISO 11452',
        features: ['Keyless Entry', 'Remote Start', 'Alarm System', '433MHz'],
        useCase: 'Automotive',
        certification: 'ISO 11452',
        color: 'from-red-500 to-red-600',
        details: 'Immobilizer compatible, 315MHz 卤150kHz, -95dBm sensitivity'
      },
      {
        title: 'Superheterodyne Receiver',
        icon: Wifi,
        specs: 'Band: 433/315MHz • Modulation: ASK/FSK • Channels: 4 • RX: -110dBm • Power: 12V DC • Size: 45&times;25&times;8mm • Cert: CE/FCC',
        features: ['Multi-channel', 'Learning Code', 'Relay Output', 'LED indicator'],
        useCase: 'Security Systems',
        certification: 'CE/FCC',
        color: 'from-purple-500 to-purple-600',
        details: '433.92MHz 卤100kHz, -110dBm sensitivity, 4-channel output'
      }
    ]
  },
  {
    category: 'Custom WiFi & Bluetooth Modules',
    description: 'For developers needing wireless integration',
    items: [
      {
        title: 'RF Kit (Transmitter + Receiver)',
        icon: Package,
        specs: 'Band: 433MHz • Modulation: ASK • Code: pre-paired • TX: 10dBm • RX: -105dBm • Power: CR2032/12V • Cert: RoHS',
        features: ['Pre-paired', 'Ready to Use', 'Custom Frequencies', 'Technical Support'],
        useCase: 'DIY Projects',
        certification: 'RoHS Compliant',
        color: 'from-orange-500 to-orange-600',
        details: '433MHz paired set, 100m range, includes transmitter and receiver'
      }
    ]
  }
]

export function ProductsSection({ onOpenRfq }: ProductsSectionProps) {
  return (
    <section id="products" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Custom OEM/ODM Solutions</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4 mb-6">
            Industry-specific wireless control solutions tailored to your application requirements
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              View All Product Categories
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {products.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-20">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center px-4">
              <div className="h-px bg-slate-300 flex-1 mr-4 sm:mr-6" />
              <span className="px-2 sm:px-4">{category.category}</span>
              <div className="h-px bg-slate-300 flex-1 ml-4 sm:ml-6" />
            </h3>
            <p className="text-center text-slate-600 mb-6 sm:mb-8 px-4">{category.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {category.items.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                    <div className={`h-2 sm:h-3 bg-gradient-to-r ${product.color}`} />
                    <div className="p-4 sm:p-6 lg:p-8">
                      {/* Product Image Display */}
                      <div className="relative mb-4 sm:mb-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5`}></div>
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center`}>
                          <product.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                        {/* Certification Badges */}
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1">
                          {product.certification && (
                            <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                              {product.certification.includes('CE') ? 'CE' : product.certification.includes('FCC') ? 'FCC' : 'ISO'}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${product.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <product.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{product.title}</h3>
                      
                      {/* Engineering Specs */}
                      <div className="bg-slate-50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-slate-600 font-mono leading-relaxed">{product.specs}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {product.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs sm:text-sm">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 sm:pt-4 border-t border-slate-100 gap-2 mb-4">
                        <div>
                          <div className="text-xs sm:text-sm text-slate-500 mb-1">Use Case</div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">{product.useCase}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xs sm:text-sm text-slate-500 mb-1">Certification</div>
                          <div className="font-semibold text-green-600 text-sm sm:text-base">{product.certification}</div>
                        </div>
                      </div>
                      
                      {/* Standardized Action Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <Button size="sm" className="text-xs bg-blue-500 hover:bg-blue-600">
                          <Download className="h-3 w-3 mr-1" />
                          Datasheet
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs border-green-500 text-green-600 hover:bg-green-50">
                          <Package className="h-3 w-3 mr-1" />
                          Sample
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs border-orange-500 text-orange-600 hover:bg-orange-50" type="button" onClick={() => onOpenRfq('product_highlight')}>
                          <Send className="h-3 w-3 mr-1" />
                          Quote
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}