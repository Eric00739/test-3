import { Card } from '@/components/ui/card'
import { Users, Cpu, Shield, Factory, Package, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const processSteps = [
  {
    phase: 'Feasibility',
    duration: '1-2 weeks',
    deliverables: 'Technical analysis, Cost estimation, Risk assessment',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    metrics: 'Success rate: 95%'
  },
  {
    phase: 'EVT',
    duration: '2-3 weeks',
    deliverables: 'Functional prototype, Initial testing, Design validation',
    icon: Cpu,
    color: 'from-green-500 to-green-600',
    metrics: 'Prototype success: 88%'
  },
  {
    phase: 'EMC/RF Testing',
    duration: '3-4 weeks',
    deliverables: 'EN 300 220 / FCC Part 15, Certification preparation',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    metrics: 'First-pass yield: 92%'
  },
  {
    phase: 'PVT',
    duration: '2-3 weeks',
    deliverables: 'Pilot production, Process validation, Quality setup',
    icon: Factory,
    color: 'from-orange-500 to-orange-600',
    metrics: 'Process yield: 96%'
  },
  {
    phase: 'Reliability',
    duration: '2-3 weeks',
    deliverables: 'Drop test, HT/LT test, Salt-spray, Vibration',
    icon: Award,
    color: 'from-red-500 to-red-600',
    metrics: 'Reliability pass: 99%'
  },
  {
    phase: 'Mass Production',
    duration: 'Ongoing',
    deliverables: 'Full-scale production, Quality assurance, Shipping',
    icon: Package,
    color: 'from-indigo-500 to-indigo-600',
    metrics: 'FPY 98.7% | RMA 0.38% (Q4 2024)'
  }
]

export function ProcessTimelineSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">R&D & Testing Timeline</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete 6-stage development process from concept to mass production in just 12 weeks
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 rounded-full -translate-y-1/2" 
               style={{ width: '100%' }} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg relative z-10 mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.phase}</h3>
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${step.color} text-white rounded-full text-xs font-semibold mb-2`}>
                      {step.duration}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{step.deliverables}</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {step.metrics}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
            <div className="text-sm text-gray-600 mb-1">Final Production Yield (FPY)</div>
            <div className="text-xs text-slate-500">Industry average: 95-96%</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0.38%</div>
            <div className="text-sm text-gray-600 mb-1">RMA Rate (Q4 2024)</div>
            <div className="text-xs text-slate-500">Industry average: 1-2%</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">12 weeks</div>
            <div className="text-sm text-gray-600 mb-1">Total Development Time</div>
            <div className="text-xs text-slate-500">From concept to MP</div>
          </Card>
        </div>
      </div>
    </section>
  )
}