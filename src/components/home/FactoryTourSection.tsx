import { Card, CardContent } from '@/components/ui/card'
import { Factory } from 'lucide-react'
import { motion } from 'framer-motion'

const facilities = [
  {
    title: 'SMT Production Line',
    machine: 'Panasonic NPM-W2',
    capacity: '50,000 CPH',
    yield: '99.8%',
    description: 'High-speed surface mount technology with automated optical inspection'
  },
  {
    title: 'Testing Laboratory',
    machine: 'Keysight N9030B',
    capacity: '26.5 GHz Analysis',
    yield: '100% QC Pass',
    description: 'Comprehensive RF testing and signal analysis capabilities'
  },
  {
    title: 'Assembly Line',
    machine: 'Selective Soldering',
    capacity: '1,000 units/day',
    yield: '99.5%',
    description: 'Automated assembly with conformal coating and final testing'
  },
  {
    title: 'Environmental Testing',
    machine: 'Climatic Chambers',
    capacity: '-40掳C to +85掳C',
    yield: 'Validated Reliability',
    description: 'Temperature, humidity, and vibration testing for harsh environments'
  },
  {
    title: 'Quality Control',
    machine: '3D AOI Systems',
    capacity: '100% Inspection',
    yield: 'Zero Defects',
    description: 'Automated optical inspection with machine learning defect detection'
  },
  {
    title: 'Packaging & Logistics',
    machine: 'Automated Packing',
    capacity: '5,000 units/day',
    yield: '99.9% Accuracy',
    description: 'Custom packaging solutions with global shipping capabilities'
  }
]

export function FactoryTourSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Factory Tour</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art facilities with advanced manufacturing capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gray-100 h-48 flex items-center justify-center relative overflow-hidden">
                  <Factory className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div><span className="font-medium">Equipment:</span> {facility.machine}</div>
                    <div><span className="font-medium">Capacity:</span> {facility.capacity}</div>
                    <div><span className="font-medium">Yield:</span> <span className="text-green-600 font-semibold">{facility.yield}</span></div>
                  </div>
                  <p className="text-sm text-gray-600">{facility.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}