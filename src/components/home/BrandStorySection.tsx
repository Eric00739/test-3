"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Lightbulb, Target, Award, Calendar, TrendingUp } from "lucide-react"

const milestones = [
  {
    year: "2010",
    title: "The Beginning",
    description: "Founded in a small workshop with a vision to make RF technology accessible to businesses of all sizes.",
    icon: Lightbulb,
    color: "from-orange-400 to-orange-600"
  },
  {
    year: "2014",
    title: "First Breakthrough",
    description: "Developed proprietary RF tuning technology that reduced interference by 70%, catching the attention of major gate automation brands.",
    icon: TrendingUp,
    color: "from-blue-400 to-blue-600"
  },
  {
    year: "2017",
    title: "Global Expansion",
    description: "Opened international sales office and began exporting to 12 countries, establishing our reputation for quality and reliability.",
    icon: Users,
    color: "from-green-400 to-green-600"
  },
  {
    year: "2020",
    title: "Innovation Leap",
    description: "Launched smart IoT product line and achieved 98.7% production yield, setting new industry standards for reliability.",
    icon: Target,
    color: "from-purple-400 to-purple-600"
  },
  {
    year: "2023",
    title: "Industry Leadership",
    description: "Recognized as top OEM partner by 100+ global brands, with 47 NPI projects completed and presence in 28 countries.",
    icon: Award,
    color: "from-red-400 to-red-600"
  }
]

const values = [
  {
    title: "Customer-Centric Innovation",
    description: "Every product we develop starts with understanding our customers' challenges and delivering solutions that exceed their expectations.",
    icon: Users
  },
  {
    title: "Engineering Excellence",
    description: "Our team of 50+ engineers is committed to pushing the boundaries of what's possible in RF and IoT technology.",
    icon: Lightbulb
  },
  {
    title: "Reliability First",
    description: "We've built our reputation on delivering products that work flawlessly, with 98.7% yield and 0.38% RMA rate.",
    icon: Target
  },
  {
    title: "Sustainable Growth",
    description: "We believe in growing responsibly, with eco-friendly manufacturing processes and long-term partnerships.",
    icon: TrendingUp
  }
]

export function BrandStorySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Journey: From Workshop to Global Partner</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            Founded in 2010 with a simple mission: to make reliable RF technology accessible to innovators worldwide. 
            Today, we're proud to be the trusted manufacturing partner behind 100+ global brands.
          </p>
        </motion.div>

        {/* Founder Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Vision That Started It All</h3>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  "When I founded FastFun Remote in 2010, I saw a gap in the market. Small and medium-sized businesses 
                  struggled to access quality RF technology without ordering massive quantities. My vision was simple: 
                  provide enterprise-grade RF solutions with accessible MOQs and uncompromising quality."
                </p>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  "Thirteen years later, that vision remains our North Star. We've grown from a small workshop to a 
                  state-of-the-art facility, but our commitment to helping innovators bring their ideas to life has never wavered."
                </p>
                <p className="text-base text-slate-600 font-medium">— Eric Chen, Founder & CEO</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                  <Users className="h-24 w-24 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">Eric Chen speaking at the 2022 IoT Innovation Summit</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Milestones in Our Journey</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Key moments that shaped our company and defined our path to becoming an industry leader
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-red-500 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start md:items-center gap-8"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-slate-200 z-10">
                    <Calendar className="h-8 w-8 text-slate-600" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${milestone.color} rounded-lg flex items-center justify-center`}>
                        <milestone.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{milestone.title}</h4>
                        <p className="text-sm font-semibold text-orange-600">{milestone.year}</p>
                      </div>
                    </div>
                    <p className="text-slate-700">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Values That Guide Us</h3>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            The principles that shape our decisions, our culture, and our relationships with customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-sm text-slate-600">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Be Part of Our Story?</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Whether you're a startup with an innovative idea or an established brand looking for a reliable manufacturing partner, 
              we're here to help you succeed. Let's create something remarkable together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Schedule Factory Tour
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}