"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Calendar,
  Download,
  FileText,
  Users,
  Headphones,
  Wrench,
  Award
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
}

interface SupportService {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  availability: string
  responseTime: string
  contact: string
  features: string[]
}

interface Consultant {
  id: string
  name: string
  title: string
  expertise: string[]
  image: string
  available: boolean
  languages: string[]
  rating: number
  consultations: number
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "What RC technologies do you specialize in?",
    answer: "We specialize in a wide range of RC technologies including 433MHz, 2.4GHz, and custom frequency solutions. Our expertise covers protocol development, signal optimization, and IoT integration for various industrial applications.",
    category: "General",
    helpful: 45
  },
  {
    id: "2",
    question: "How long does custom development typically take?",
    answer: "Custom development timelines vary based on complexity. Simple modifications to existing solutions can take 2-4 weeks, while completely custom solutions typically require 8-16 weeks from concept to delivery. We provide detailed timelines during the consultation phase.",
    category: "Development",
    helpful: 38
  },
  {
    id: "3",
    question: "What is your warranty and support policy?",
    answer: "All our products come with a comprehensive 2-year warranty covering manufacturing defects. We provide lifetime technical support, with different service levels available. Premium support includes 24/7 assistance and guaranteed response times.",
    category: "Support",
    helpful: 52
  },
  {
    id: "4",
    question: "Do you provide international shipping?",
    answer: "Yes, we ship worldwide through our network of logistics partners. Standard shipping typically takes 7-14 business days depending on destination. Express shipping options are available for urgent requirements.",
    category: "Shipping",
    helpful: 31
  },
  {
    id: "5",
    question: "Can you integrate with existing systems?",
    answer: "Absolutely. We specialize in seamless integration with existing infrastructure. Our team can work with your current systems, APIs, and protocols to ensure smooth implementation without disrupting your operations.",
    category: "Integration",
    helpful: 47
  },
  {
    id: "6",
    question: "What industries do you serve?",
    answer: "We serve diverse industries including manufacturing, agriculture, smart cities, security, entertainment, and automotive. Our solutions are adaptable to various sectors requiring reliable remote control and IoT integration.",
    category: "General",
    helpful: 29
  }
]

const supportServices: SupportService[] = [
  {
    id: "1",
    title: "Technical Support",
    description: "Expert assistance for technical issues, troubleshooting, and product optimization",
    icon: <Headphones size={24} />,
    availability: "24/7 Premium",
    responseTime: "< 2 hours",
    contact: "support@fastfunrc.com",
    features: ["Remote diagnostics", "Firmware updates", "Performance optimization", "Emergency support"]
  },
  {
    id: "2",
    title: "After-Sales Service",
    description: "Comprehensive post-purchase support including maintenance and upgrades",
    icon: <Wrench size={24} />,
    availability: "Mon-Fri 9:00-18:00",
    responseTime: "< 24 hours",
    contact: "service@fastfunrc.com",
    features: ["Preventive maintenance", "Hardware upgrades", "Spare parts", "Repair services"]
  },
  {
    id: "3",
    title: "Solution Consulting",
    description: "Strategic guidance for implementing RC solutions in your business",
    icon: <Award size={24} />,
    availability: "By appointment",
    responseTime: "< 48 hours",
    contact: "consulting@fastfunrc.com",
    features: ["Needs assessment", "Solution design", "Implementation planning", "ROI analysis"]
  }
]

const consultants: Consultant[] = [
  {
    id: "1",
    name: "Dr. Alex Chen",
    title: "Senior Solutions Architect",
    expertise: ["Industrial Automation", "IoT Integration", "Custom Protocols"],
    image: "https://picsum.photos/seed/consultant1/150/150",
    available: true,
    languages: ["English", "Mandarin", "Cantonese"],
    rating: 4.9,
    consultations: 280
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: "Implementation Specialist",
    expertise: ["System Integration", "Training", "Project Management"],
    image: "https://picsum.photos/seed/consultant2/150/150",
    available: true,
    languages: ["English", "Spanish"],
    rating: 4.8,
    consultations: 195
  },
  {
    id: "3",
    name: "Michael Roberts",
    title: "Technical Consultant",
    expertise: ["RF Engineering", "Signal Optimization", "Testing"],
    image: "https://picsum.photos/seed/consultant3/150/150",
    available: false,
    languages: ["English", "German"],
    rating: 4.7,
    consultations: 156
  }
]

export function SupportCenter() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({})

  const categories = ["all", "General", "Development", "Support", "Shipping", "Integration"]

  const filteredFAQs = selectedCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory)

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  const markHelpful = (id: string) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  const bookConsultation = (consultantId: string) => {
    console.log(`Booking consultation with consultant: ${consultantId}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-4 h-4 rounded-full ${
          i < Math.floor(rating) ? "bg-yellow-400" : "bg-gray-300"
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Support Center
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get the help you need with our comprehensive support services, expert consultants, and extensive knowledge base
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle size={24} className="text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category === "all" ? "All Topics" : category}
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQs.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(item.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      {expandedFAQ === item.id ? (
                        <ChevronUp size={20} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                      )}
                    </button>
                    
                    {expandedFAQ === item.id && (
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 mb-3">{item.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Was this helpful?</span>
                            <button
                              onClick={() => markHelpful(item.id)}
                              className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600"
                            >
                              <CheckCircle size={16} />
                              Yes ({item.helpful + (helpfulVotes[item.id] || 0)})
                            </button>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <div className="mt-6 text-center">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>

          {/* Support Services Column */}
          <div className="space-y-6">
            {/* Support Services */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Support Services</h3>
              <div className="space-y-4">
                {supportServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{service.title}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{service.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageCircle size={14} />
                        <span>Response: {service.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span>{service.contact}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Features
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{service.features.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Contact {service.title.split(" ")[0]}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Resources */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Resources</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText size={20} className="text-orange-500" />
                  <div>
                    <div className="font-medium text-gray-900">User Manuals</div>
                    <div className="text-sm text-gray-600">Download product documentation</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download size={20} className="text-orange-500" />
                  <div>
                    <div className="font-medium text-gray-900">Software & Drivers</div>
                    <div className="text-sm text-gray-600">Latest updates and utilities</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={20} className="text-orange-500" />
                  <div>
                    <div className="font-medium text-gray-900">Training Schedule</div>
                    <div className="text-sm text-gray-600">Upcoming webinars and workshops</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Consultants Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-orange-500" />
              <h3 className="text-xl font-bold text-gray-900">Solution Consultants</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {consultants.map((consultant) => (
                <div key={consultant.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={consultant.image}
                        alt={consultant.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {consultant.available && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{consultant.name}</h4>
                      <p className="text-sm text-gray-600">{consultant.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(consultant.rating)}
                        <span className="text-xs text-gray-500 ml-1">{consultant.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Expertise
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {consultant.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Languages
                    </div>
                    <div className="text-sm text-gray-600">
                      {consultant.languages.join(", ")}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div>{consultant.consultations} consultations completed</div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => bookConsultation(consultant.id)}
                    disabled={!consultant.available}
                    className={`w-full ${
                      consultant.available
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {consultant.available ? "Book Consultation" : "Currently Unavailable"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Level Agreement */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Service Level Guarantee</h3>
              <p className="text-orange-100">
                We commit to industry-leading service standards with guaranteed response times and resolution rates.
                All supported by our comprehensive SLA with clear performance metrics.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                View SLA Details
              </Button>
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}