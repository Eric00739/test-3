"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Building,
  Clock,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
  ChevronRight,
  Check,
  Mail,
  Users
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeaderBar } from "@/components/home/HeaderBar"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const officeLocations = [
  {
    city: "Shenzhen Headquarters",
    address: "Building A, Innovation Park, Nanshan District",
    phone: "+86 755 1234 5678",
    email: "info@fastfunrc.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM (GMT+8)"
  },
  {
    city: "Hong Kong Office",
    address: "Central Tower, 15 Queen's Road Central",
    phone: "+852 2345 6789",
    email: "hk@fastfunrc.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM (GMT+8)"
  },
  {
    city: "European Office",
    address: "Tech Hub, Berlin, Germany",
    phone: "+49 30 9876 5432",
    email: "eu@fastfunrc.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM (CET)"
  }
]

const faqItems = [
  {
    question: "What's the typical lead time for custom RF remote development?",
    answer: "For custom RF remote development, the typical timeline is 4-6 weeks for design and prototyping, followed by 2-3 weeks for testing and certification. Mass production usually begins 8-10 weeks from initial design approval."
  },
  {
    question: "Do you provide samples before bulk production?",
    answer: "Yes, we provide functional samples for approval before proceeding with mass production. Sample development typically takes 7-10 days after design confirmation."
  },
  {
    question: "What certifications do your products have?",
    answer: "Our products comply with CE RED, FCC Part 15, UKCA, and RoHS standards. We also support specific regional certifications upon request, including CCC for China and KC for Korea."
  },
  {
    question: "What's your minimum order quantity (MOQ)?",
    answer: "MOQ varies by product complexity and customization requirements. For standard products, MOQ starts at 50 units with flexible volume discounts. Custom projects typically require 1000-5000 units depending on complexity, but we can discuss flexible options for strategic partnerships."
  },
  {
    question: "Do you offers technical support after purchase?",
    answer: "Yes, we provide comprehensive technical support including documentation, integration assistance, and troubleshooting. We also offer training sessions for your engineering team upon request."
  }
]

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  
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
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // 准备表单数据
      const apiFormData = new FormData()
      apiFormData.append('name', formData.name.trim())
      apiFormData.append('email', formData.email.trim())
      apiFormData.append('country', formData.company.trim())
      apiFormData.append('message', formData.message.trim())
      apiFormData.append('source', 'contact_page')
      
      // 发送API请求
      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: apiFormData,
      })
      
      const result = await response.json()
      
      if (result.success) {
        // 服务器成功发送邮件
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: ""
        })
      } else if (result.fallback) {
        // 服务器无法发送邮件，使用客户端回退
        const params = new URLSearchParams({
          subject: `Contact Form: ${formData.subject}`,
          body: `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
        })
        
        const mailtoUrl = `mailto:eric@fastfunrc.com?${params.toString()}`
        window.location.href = mailtoUrl
        
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: ""
        })
      } else {
        // 发生错误
        throw new Error(result.error || 'Failed to submit contact form')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
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
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=600&fit=crop&crop=entropy&auto=format"
            alt="Contact Us"
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
                { name: "Contact", url: "/contact" }
              ]}
              className="mb-6 text-white/80"
            />
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                Connect with our RF/IoT experts to discuss your project requirements and explore how we can help bring your ideas to life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
              </div>
              <p className="text-gray-600 mb-2">Speak directly with our sales team</p>
              <p className="font-medium text-gray-900">+86 755 1234 5678</p>
              <p className="text-sm text-gray-500">Mon-Fri: 9:00 AM - 6:00 PM (GMT+8)</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
              </div>
              <p className="text-gray-600 mb-2">Quick responses for urgent inquiries</p>
              <p className="font-medium text-gray-900">+86 158 9964 8898</p>
              <p className="text-sm text-gray-500">Available 24/7 for urgent matters</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              </div>
              <p className="text-gray-600 mb-2">Send detailed project specifications</p>
              <p className="font-medium text-gray-900">info@fastfunrc.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitStatus === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-900">Message Sent Successfully!</h3>
                  </div>
                  <p className="text-green-700 mt-2">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : submitStatus === "error" ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-900">Something went wrong</h3>
                  <p className="text-red-700 mt-2">
                    Please try again later or contact us directly via phone or WhatsApp.
                  </p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your project or inquiry..."
                    rows={5}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Company Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose FastFunRC</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Expert Technical Support</h3>
                    <p className="text-gray-600">Our engineers provide comprehensive consultation from design to production</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Global Compliance</h3>
                    <p className="text-gray-600">Products certified for international markets including CE, FCC, and UKCA</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Quick Response Time</h3>
                    <p className="text-gray-600">Dedicated sales team responds within 24 hours to all inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Flexible Solutions</h3>
                    <p className="text-gray-600">Customizable RF solutions tailored to your specific requirements</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 6:00 PM (GMT+8)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 12:00 PM (GMT+8)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">For urgent inquiries outside business hours:</p>
                  <div className="flex items-center text-green-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="font-medium">WhatsApp: +86 158 9964 8898</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              With strategic locations worldwide, we're never far from our partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{office.city}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{office.address}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{office.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{office.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common inquiries about our products and services
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Contact Our Team
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our engineering team to discuss your RF/IoT requirements and receive a personalized consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              <Users className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://wa.me/8615899648898?text=Hi, I would like to discuss a project with FastFunRC')}
              className="border-white text-white hover:bg-white hover:!text-orange-600"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
      <SiteFooter className="pt-0" />
    </div>
  )
}
