"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Building,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  Phone,
  Shield,
  Target,
  Users,
  Zap,
  ChevronRight,
  Mail,
  MessageCircle,
  Factory,
  Cpu,
  Wifi,
  Radio,
  Star,
  TrendingUp
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeaderBar } from "@/components/home/HeaderBar"
import { Breadcrumb } from "@/components/seo/Breadcrumb"

// Team members data
const teamMembers = [
  {
    name: "Eric Chen",
    position: "Founder & CEO",
    bio: "15+ years in RF engineering and IoT manufacturing. Leading the company's vision and strategic partnerships.",
    expertise: ["RF Engineering", "Business Strategy", "Global Operations"]
  },
  {
    name: "Dr. Sarah Liu",
    position: "CTO",
    bio: "PhD in Wireless Communications. Oversees all R&D activities and technical innovation.",
    expertise: ["Wireless Protocols", "IoT Architecture", "Certification Standards"]
  },
  {
    name: "Michael Wang",
    position: "Head of Production",
    bio: "12 years of experience in electronics manufacturing. Ensures quality and efficiency in all production processes.",
    expertise: ["Manufacturing", "Quality Control", "Supply Chain"]
  },
  {
    name: "Lisa Zhang",
    position: "Sales Director",
    bio: "Expert in international business development. Manages key client relationships and market expansion.",
    expertise: ["Business Development", "Client Relations", "Market Analysis"]
  }
]

// Company milestones
const milestones = [
  {
    year: "2010",
    title: "Company Founded",
    description: "Started as a small RF remote design workshop in Shenzhen",
    icon: Building
  },
  {
    year: "2013",
    title: "ISO 9001 Certification",
    description: "Achieved international quality management standards",
    icon: Award
  },
  {
    year: "2016",
    title: "Global Expansion",
    description: "Opened European office and expanded to 28 export markets",
    icon: Globe
  },
  {
    year: "2018",
    title: "IoT Division Launch",
    description: "Entered smart home and IoT device manufacturing",
    icon: Wifi
  },
  {
    year: "2020",
    title: "R&D Center Established",
    description: "Built dedicated research facility with 8 specialized engineers",
    icon: Cpu
  },
  {
    year: "2023",
    title: "Industry Leadership",
    description: "Recognized as leading OEM partner with 47 NPI projects annually",
    icon: Star
  }
]

// Company values
const values = [
  {
    title: "Quality First",
    description: "98.7% FPY rate with DPPM under 500, ensuring exceptional product reliability",
    icon: Shield,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Customer Focus",
    description: "Dedicated project managers and 24-hour response time for all client inquiries",
    icon: Heart,
    color: "from-red-500 to-red-600"
  },
  {
    title: "Innovation",
    description: "Continuous R&D investment with 15% of engineers holding master's degrees",
    icon: Lightbulb,
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "Integrity",
    description: "Transparent business practices and long-term partnership approach with all clients",
    icon: CheckCircle,
    color: "from-green-500 to-green-600"
  }
]

// Manufacturing capabilities
const capabilities = [
  {
    category: "RF Solutions",
    items: [
      "315/433/868/915MHz frequency bands",
      "Rolling code and learning code protocols",
      "Multi-channel receiver development",
      "Custom RF module design"
    ]
  },
  {
    category: "Smart Home",
    items: [
      "WiFi and Bluetooth integration",
      "Mobile app development",
      "Voice control compatibility",
      "Cloud platform integration"
    ]
  },
  {
    category: "Manufacturing",
    items: [
      "In-house PCB assembly",
      "SMT and through-hole technology",
      "Plastic injection molding",
      "Automated testing equipment"
    ]
  },
  {
    category: "Certification",
    items: [
      "CE RED compliance testing",
      "FCC Part 15 certification",
      "RoHS and REACH compliance",
      "Custom certification support"
    ]
  }
]

export function AboutPage() {
  // HeaderBar state
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]
  
  const handleNavClick = (target: string) => {
    setActiveSection(target)
    setIsMobileMenuOpen(false)
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const handleOpenRfq = (source: string) => {
    console.log(`Open RFQ from ${source}`)
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <HeaderBar
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onToggleMenu={toggleMobileMenu}
        onOpenRfq={handleOpenRfq}
        isMobileMenuOpen={isMobileMenuOpen}
        navLinks={navLinks}
      />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&crop=entropy&auto=format"
            alt="About FastFunRC"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <Breadcrumb 
              items={[
                { name: "Home", url: "/" },
                { name: "About", url: "/about" }
              ]}
              className="mb-6 text-white/80"
            />
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">About FastFunRC</h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                Your trusted OEM/ODM partner for RF remotes, IoT devices, and smart home solutions since 2010
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, FastFunRC began as a specialized RF remote control design workshop in Shenzhen, China. Over the past 13 years, we've grown into a comprehensive OEM/ODM manufacturing partner serving clients across 28 countries worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our journey has been marked by continuous innovation, quality excellence, and a customer-centric approach. Today, we're proud to be recognized as a leading manufacturer in the RF and IoT space, with ISO 9001:2015 certification and a reputation for delivering exceptional products.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From our state-of-the-art manufacturing facility in Dongguan, we combine advanced engineering capabilities with flexible production processes to bring our partners' ideas to life.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">13+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">47</div>
                  <div className="text-sm text-gray-600">NPI Projects Annually</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">98.7%</div>
                  <div className="text-sm text-gray-600">FPY Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">28</div>
                  <div className="text-sm text-gray-600">Export Markets</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=500&fit=crop&crop=entropy&auto=format"
                alt="FastFunRC Manufacturing Facility"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guided by innovation and excellence, we're committed to empowering our partners' success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional OEM/ODM manufacturing solutions that combine innovative RF/IoT technology with uncompromising quality. We strive to be the trusted partner that enables our clients to bring cutting-edge products to market efficiently and reliably.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the global leader in RF and IoT device manufacturing, recognized for our technical expertise, quality excellence, and customer-centric approach. We aim to drive innovation in wireless technology while maintaining the highest standards of sustainability and social responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth and development
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 bg-orange-500 rounded-full border-4 border-white -translate-x-1/2"></div>
                  
                  {/* Content */}
                  <div className="ml-16 flex-1">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                          <milestone.icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          <p className="text-sm text-orange-600 font-medium">{milestone.year}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The experts driving our innovation and success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manufacturing Capabilities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive in-house capabilities for end-to-end production
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{capability.category}</h3>
                <ul className="space-y-3">
                  {capability.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">State-of-the-Art Facilities</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our 8,000 square meter manufacturing facility in Dongguan features advanced SMT lines, 
                automated testing equipment, and dedicated R&D labs to ensure the highest quality standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Factory className="mr-2 h-5 w-5" />
                  Schedule Factory Tour
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Award className="mr-2 h-5 w-5" />
                  View Certifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner with Us?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that trust FastFunRC for their RF/IoT manufacturing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              <Link href="/contact">
                <Users className="mr-2 h-5 w-5" />
                Contact Our Team
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://wa.me/8615899648898?text=Hi, I would like to discuss a partnership with FastFunRC')}
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}