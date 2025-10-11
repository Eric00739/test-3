import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Radio, Wifi, Settings, Zap, Download } from 'lucide-react'
import { motion } from 'framer-motion'

const caseStudies = [
  {
    title: 'Garage Door Remote Control',
    company: 'Leading EU Gate Control Brand',
    icon: Radio,
    iconColor: 'bg-blue-500',
    challenge: 'Needed a custom 433MHz rolling code remote with extended range and weather resistance for European market.',
    solution: 'Developed custom RF module with -100dBm sensitivity, IP65 housing, and EV1527 compatibility. 3-day prototyping, 15-day tooling.',
    result: '42% faster time-to-market',
    partnership: '6 Year Partnership',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Smart Light Switch',
    company: 'US Home Automation Company',
    icon: Wifi,
    iconColor: 'bg-green-500',
    challenge: 'Required WiFi smart switch with energy monitoring, voice control compatibility, and UL certification for US market.',
    solution: 'Created 2.4GHz 802.11b/g/n module with 卤1% energy metering, Tuya/Smart Life compatibility, and UL/CE/FCC certification.',
    result: '99.8% field reliability',
    partnership: '3 Year Partnership',
    badgeColor: 'bg-green-100 text-green-700'
  },
  {
    title: 'Automotive Keyless Entry',
    company: 'Aftermarket Auto Brand',
    icon: Settings,
    iconColor: 'bg-purple-500',
    challenge: 'Needed 315MHz remote with immobilizer compatibility, extended battery life, and ISO 11452 certification.',
    solution: 'Engineered custom RF module with 30% longer battery life, immobilizer compatibility, and -95dBm sensitivity.',
    result: 'Zero warranty claims',
    partnership: '5 Year Partnership',
    badgeColor: 'bg-purple-100 text-purple-700'
  },
  {
    title: 'Smart Lighting Control',
    company: 'APAC Lighting Brand',
    icon: Zap,
    iconColor: 'bg-orange-500',
    challenge: 'Required multi-channel RF receiver with learning code functionality for smart lighting systems in Asian market.',
    solution: 'Developed 4-channel superheterodyne receiver with -110dBm sensitivity, learning code, and relay output for easy integration.',
    result: 'DPPM under 200',
    partnership: '4 Year Partnership',
    badgeColor: 'bg-orange-100 text-orange-700'
  }
]

export function CaseStudiesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Industry Applications & Success Stories</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            Discover how we've helped leading companies solve their wireless control challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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
                  <div className={`w-12 h-12 ${study.iconColor} rounded-xl flex items-center justify-center mr-4`}>
                    <study.icon className="h-6 w-6 text-white" />
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
                  <Badge variant="secondary" className={study.badgeColor}>{study.partnership}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Download className="h-5 w-5 mr-2" />
            Download Full Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}