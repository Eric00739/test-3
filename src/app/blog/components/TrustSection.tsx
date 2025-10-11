"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Award, 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  Star, 
  Quote,
  Shield,
  Globe,
  Building,
  User
} from "lucide-react"

interface CustomerSuccess {
  id: string
  company: string
  logo: string
  testimonial: string
  author: string
  position: string
  industry: string
  results: {
    metric: string
    value: string
    improvement?: string
  }[]
  rating: number
}

interface Certification {
  id: string
  name: string
  organization: string
  logo: string
  description: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
}

interface TeamExpert {
  id: string
  name: string
  position: string
  bio: string
  image: string
  expertise: string[]
  experience: string
  linkedin?: string
  available: boolean
  rating: number
  consultations: number
}

const customerSuccesses: CustomerSuccess[] = [
  {
    id: "1",
    company: "TechCorp Industries",
    logo: "https://picsum.photos/seed/techcorp/200/100",
    testimonial: "FastFunRC's custom solutions transformed our manufacturing process. The 40% cost reduction and 99.9% uptime exceeded our expectations.",
    author: "David Chen",
    position: "CTO",
    industry: "Manufacturing",
    results: [
      { metric: "Cost Reduction", value: "40%", improvement: "in operational costs" },
      { metric: "Uptime", value: "99.9%", improvement: "reliability" },
      { metric: "ROI", value: "280%", improvement: "within 12 months" }
    ],
    rating: 5
  },
  {
    id: "2",
    company: "AgriTech Solutions",
    logo: "https://picsum.photos/seed/agritech/200/100",
    testimonial: "The agricultural drone fleet management system increased our crop yield by 25% while reducing manual labor costs significantly.",
    author: "Sarah Johnson",
    position: "Operations Director",
    industry: "Agriculture",
    results: [
      { metric: "Yield Increase", value: "25%", improvement: "crop production" },
      { metric: "Labor Cost", value: "-35%", improvement: "reduction" },
      { metric: "Coverage", value: "500%", improvement: "more land monitored" }
    ],
    rating: 5
  },
  {
    id: "3",
    company: "MetroSmart City",
    logo: "https://picsum.photos/seed/metrosmart/200/100",
    testimonial: "Implementing FastFunRC across 200+ infrastructure points has revolutionized our city's monitoring and control systems.",
    author: "Michael Roberts",
    position: "Smart City Director",
    industry: "Urban Development",
    results: [
      { metric: "Response Time", value: "-60%", improvement: "faster" },
      { metric: "Coverage", value: "200+", improvement: "points connected" },
      { metric: "Efficiency", value: "45%", improvement: "improvement" }
    ],
    rating: 4.8
  }
]

const certifications: Certification[] = [
  {
    id: "1",
    name: "ISO 9001:2015",
    organization: "International Organization for Standardization",
    logo: "https://picsum.photos/seed/iso9001/150/150",
    description: "Quality management systems certification ensuring consistent quality and customer satisfaction.",
    issueDate: "2022-03-15",
    expiryDate: "2025-03-14",
    credentialId: "ISO-9001-2022-001"
  },
  {
    id: "2",
    name: "CE Marking",
    organization: "European Conformity",
    logo: "https://picsum.photos/seed/ce/150/150",
    description: "European conformity marking indicating compliance with EU safety, health and environmental protection standards.",
    issueDate: "2022-05-20",
    credentialId: "CE-2022-0456"
  },
  {
    id: "3",
    name: "FCC Certification",
    organization: "Federal Communications Commission",
    logo: "https://picsum.photos/seed/fcc/150/150",
    description: "US regulatory certification for electronic products ensuring electromagnetic compatibility.",
    issueDate: "2022-04-10",
    credentialId: "FCC-2022-7890"
  },
  {
    id: "4",
    name: "RoHS Compliance",
    organization: "European Union",
    logo: "https://picsum.photos/seed/rohs/150/150",
    description: "Restriction of Hazardous Substances compliance for environmental protection.",
    issueDate: "2022-06-01",
    credentialId: "RoHS-2022-1234"
  }
]

const teamExperts: TeamExpert[] = [
  {
    id: "1",
    name: "Dr. Alex Chen",
    position: "Chief Technology Officer",
    bio: "Leading RC technology expert with 15+ years of experience in wireless communication and IoT integration.",
    image: "https://picsum.photos/seed/alex/200/200",
    expertise: ["RC Protocol Design", "IoT Integration", "Signal Processing"],
    experience: "15+ years",
    linkedin: "https://linkedin.com/in/alexchen",
    available: true,
    rating: 4.9,
    consultations: 250
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Head of Solutions Architecture",
    bio: "Specialized in enterprise RC system design with focus on scalability and reliability for large-scale deployments.",
    image: "https://picsum.photos/seed/sarah/200/200",
    expertise: ["System Architecture", "Enterprise Solutions", "Performance Optimization"],
    experience: "12+ years",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    available: true,
    rating: 4.8,
    consultations: 180
  },
  {
    id: "3",
    name: "Michael Roberts",
    position: "Senior RF Engineer",
    bio: "Expert in radio frequency engineering with extensive experience in antenna design and signal optimization.",
    image: "https://picsum.photos/seed/michael/200/200",
    expertise: ["RF Engineering", "Antenna Design", "Signal Optimization"],
    experience: "10+ years",
    linkedin: "https://linkedin.com/in/michaelroberts",
    available: false,
    rating: 4.7,
    consultations: 150
  },
  {
    id: "4",
    name: "Emily Watson",
    position: "IoT Integration Specialist",
    bio: "Specializing in connecting RC systems with IoT platforms and developing custom integration solutions.",
    image: "https://picsum.photos/seed/emily/200/200",
    expertise: ["IoT Platforms", "Custom Integration", "Data Analytics"],
    experience: "8+ years",
    linkedin: "https://linkedin.com/in/emilywatson",
    available: true,
    rating: 4.9,
    consultations: 120
  }
]

export function TrustSection() {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    customers: 0,
    projects: 0,
    successRate: 0,
    countries: 0
  })

  const targetNumbers = {
    customers: 500,
    projects: 1200,
    successRate: 98,
    countries: 45
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = {
      customers: targetNumbers.customers / steps,
      projects: targetNumbers.projects / steps,
      successRate: targetNumbers.successRate / steps,
      countries: targetNumbers.countries / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setAnimatedNumbers({
        customers: Math.min(Math.floor(increment.customers * currentStep), targetNumbers.customers),
        projects: Math.min(Math.floor(increment.projects * currentStep), targetNumbers.projects),
        successRate: Math.min(Math.floor(increment.successRate * currentStep), targetNumbers.successRate),
        countries: Math.min(Math.floor(increment.countries * currentStep), targetNumbers.countries)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))
  }

  const bookConsultation = (expertId: string) => {
    console.log(`Booking consultation with expert: ${expertId}`)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join hundreds of companies that rely on our expertise and proven track record of success
          </p>
        </div>

        {/* Scrolling Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users size={24} className="text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.customers}+
            </div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle size={24} className="text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.projects}+
            </div>
            <div className="text-sm text-gray-600">Completed Projects</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.successRate}%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Globe size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.countries}+
            </div>
            <div className="text-sm text-gray-600">Countries Served</div>
          </div>
        </div>

        {/* Customer Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Customer Success Stories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerSuccesses.map((success) => (
              <div key={success.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg p-2">
                    <Image
                      src={success.logo}
                      alt={success.company}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{success.company}</h4>
                    <Badge variant="outline" className="text-xs">
                      {success.industry}
                    </Badge>
                  </div>
                </div>

                <div className="mb-4">
                  <Quote className="text-orange-500 mb-2" size={20} />
                  <p className="text-gray-600 italic">"{success.testimonial}"</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(success.rating)}
                    </div>
                    <span className="text-sm text-gray-600">{success.rating}/5</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{success.author}</div>
                    <div>{success.position}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {success.results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{result.metric}</span>
                      <span className="font-bold text-green-600">
                        {result.value} {result.improvement && <span className="text-xs text-gray-500">({result.improvement})</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Industry Certifications & Compliance
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-lg p-2">
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Issued: {new Date(cert.issueDate).toLocaleDateString()}</div>
                  {cert.expiryDate && (
                    <div>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</div>
                  )}
                  {cert.credentialId && (
                    <div>ID: {cert.credentialId}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Experts */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Meet Our Expert Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamExperts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {expert.available && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">Available</Badge>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-1">{expert.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{expert.position}</p>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {expert.bio}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Expertise
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {expert.expertise.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {expert.expertise.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{expert.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(expert.rating)}
                      <span className="ml-1">{expert.rating}</span>
                    </div>
                    <div>{expert.experience}</div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div>{expert.consultations} consultations</div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => bookConsultation(expert.id)}
                      disabled={!expert.available}
                      className={`flex-1 ${
                        expert.available
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {expert.available ? "Book Consultation" : "Unavailable"}
                    </Button>
                    {expert.linkedin && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(expert.linkedin, "_blank")}
                      >
                        <User size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}