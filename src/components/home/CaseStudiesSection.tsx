import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Radio, Wifi, Settings, Zap, Download, Filter, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const caseStudies = [
  {
    id: 1,
    title: 'Garage Door Remote Control',
    company: 'Leading EU Gate Control Brand',
    icon: Radio,
    iconColor: 'bg-blue-500',
    category: 'Automotive',
    industry: 'Gate Automation',
    challenge: 'Needed a custom 433MHz rolling code remote with extended range and weather resistance for European market.',
    solution: 'Developed custom RF module with -100dBm sensitivity, IP65 housing, and EV1527 compatibility. 3-day prototyping, 15-day tooling.',
    result: '42% faster time-to-market • 500K+ units shipped • 99.2% customer satisfaction',
    partnership: '6 Year Partnership',
    badgeColor: 'bg-blue-100 text-blue-700',
    summary: 'Reduced time-to-market by 42% with 99.2% customer satisfaction'
  },
  {
    id: 2,
    title: 'Smart Light Switch',
    company: 'US Home Automation Company',
    icon: Wifi,
    iconColor: 'bg-green-500',
    category: 'IoT',
    industry: 'Smart Home',
    challenge: 'Required WiFi smart switch with energy monitoring, voice control compatibility, and UL certification for US market.',
    solution: 'Created a 2.4GHz 802.11b/g/n module with ±1% energy metering accuracy, Tuya/Smart Life compatibility, and UL/CE/FCC certification.',
    result: '99.8% field reliability • 35% cost reduction • 1M+ units deployed',
    partnership: '3 Year Partnership',
    badgeColor: 'bg-green-100 text-green-700',
    summary: 'Achieved 35% cost reduction with 99.8% field reliability'
  },
  {
    id: 3,
    title: 'Automotive Keyless Entry',
    company: 'Aftermarket Auto Brand',
    icon: Settings,
    iconColor: 'bg-purple-500',
    category: 'Automotive',
    industry: 'Aftermarket',
    challenge: 'Needed 315MHz remote with immobilizer compatibility, extended battery life, and ISO 11452 certification.',
    solution: 'Engineered custom RF module with 30% longer battery life, immobilizer compatibility, and -95dBm sensitivity.',
    result: 'Zero warranty claims • 40% longer battery life • 200K+ units annually',
    partnership: '5 Year Partnership',
    badgeColor: 'bg-purple-100 text-purple-700',
    summary: 'Extended battery life by 40% with zero warranty claims'
  },
  {
    id: 4,
    title: 'Smart Lighting Control',
    company: 'APAC Lighting Brand',
    icon: Zap,
    iconColor: 'bg-orange-500',
    category: 'IoT',
    industry: 'Lighting',
    challenge: 'Required multi-channel RF receiver with learning code functionality for smart lighting systems in Asian market.',
    solution: 'Developed 4-channel superheterodyne receiver with -110dBm sensitivity, learning code, and relay output for easy integration.',
    result: 'DPPM under 200 • 25% performance improvement • 800K+ installations',
    partnership: '4 Year Partnership',
    badgeColor: 'bg-orange-100 text-orange-700',
    summary: 'Improved performance by 25% with DPPM under 200'
  }
]

const categories = ['All', 'Automotive', 'IoT']
const industries = ['All', 'Gate Automation', 'Smart Home', 'Aftermarket', 'Lighting']

export function CaseStudiesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [filteredStudies, setFilteredStudies] = useState(caseStudies)

  useEffect(() => {
    let filtered = caseStudies

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(study => study.category === selectedCategory)
    }

    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(study => study.industry === selectedIndustry)
    }

    setFilteredStudies(filtered)
  }, [selectedCategory, selectedIndustry])

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Proven Results: 100+ Brands Trust Our Solutions</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            Real-world success stories with measurable outcomes: faster time-to-market, cost reduction, and exceptional reliability
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <Filter className="h-4 w-4 text-slate-600 mr-2" />
                <h3 className="text-sm font-semibold text-slate-900">Filter by Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center mb-3">
                <Filter className="h-4 w-4 text-slate-600 mr-2" />
                <h3 className="text-sm font-semibold text-slate-900">Filter by Industry</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedIndustry === industry
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredStudies.length !== caseStudies.length && (
            <div className="mt-4 flex items-center text-sm text-slate-600">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span>Showing {filteredStudies.length} of {caseStudies.length} case studies</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredStudies.map((study, index) => (
            <motion.div
              key={study.id}
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

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                    {study.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                    {study.industry}
                  </Badge>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-green-800">{study.summary}</p>
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

        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600 mb-4">No case studies found matching your filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('All')
                setSelectedIndustry('All')
              }}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Clear Filters
            </Button>
          </div>
        )}

        <div className="text-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Download className="h-5 w-5 mr-2" />
            Download Complete Success Stories
          </Button>
          <p className="text-sm text-slate-500 mt-2">
            Includes detailed metrics, ROI analysis, and technical specifications
          </p>
        </div>
      </div>
    </section>
  )
}



