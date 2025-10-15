"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Check, AlertCircle, Upload, Send, Mail, Phone } from "lucide-react"

interface StepFormSectionProps {
  onOpenRfq: (source: string) => void
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 
  'Canada', 'Australia', 'Japan', 'South Korea', 'China', 'India', 
  'Brazil', 'Mexico', 'Netherlands', 'Belgium', 'Switzerland', 'Austria',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic',
  'Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines', 'Vietnam',
  'South Africa', 'Egypt', 'Israel', 'Turkey', 'Russia', 'Ukraine'
]

const APPLICATIONS = [
  'Gate / garage opener',
  'Smart lighting / RF control',
  'Automotive aftermarket',
  'Industrial access',
  'Home automation',
  'Agricultural equipment',
  'Medical devices',
  'Other'
]

const QUANTITIES = [
  'Samples (2–10 units)',
  '50–100 units',
  '100–500 units',
  '500–1000 units',
  '1000–5000 units',
  '5000+ units'
]

export function StepFormSection({ onOpenRfq }: StepFormSectionProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    company: '',
    phone: '',
    // Step 2
    application: '',
    quantity: '',
    description: '',
    // Step 3
    country: '',
    timeline: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.company.trim()) newErrors.company = 'Company is required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    }
    
    if (step === 2) {
      if (!formData.application) newErrors.application = 'Application is required'
      if (!formData.quantity) newErrors.quantity = 'Quantity is required'
      if (!formData.description.trim()) newErrors.description = 'Project description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Quote Request Submitted Successfully!
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your interest. Our sales representative will contact you within 12 hours with your personalized quote.
            </p>
            <div className="bg-orange-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">What happens next?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-orange-600 mr-2" />
                  <span>Email confirmation sent</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-orange-600 mr-2" />
                  <span>Call within 12 hours</span>
                </div>
                <div className="flex items-center">
                  <Send className="h-5 w-5 text-orange-600 mr-2" />
                  <span>Detailed quote provided</span>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/'}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Back to Homepage
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Get Your Custom Quote in 3 Simple Steps
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Complete our streamlined form and receive your personalized quote within 12 hours.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {currentStep > step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-colors ${
                      currentStep > step ? 'bg-orange-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Smith"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@company.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="Acme Corporation"
                      className={errors.company ? 'border-red-500' : ''}
                    />
                    {errors.company && (
                      <p className="mt-1 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.company}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone/WhatsApp <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 555 123 4567"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Requirements</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={formData.application}
                    onChange={(e) => updateField('application', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.application ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select application</option>
                    {APPLICATIONS.map(app => (
                      <option key={app} value={app}>{app}</option>
                    ))}
                  </select>
                  {errors.application && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.application}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Quantity <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => updateField('quantity', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.quantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select quantity</option>
                    {QUANTITIES.map(qty => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                  {errors.quantity && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description <span className="text-orange-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Describe your project requirements, technical specifications, target market, certification needs..."
                    rows={4}
                    className={`resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country/Region
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => updateField('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="Standard (20-30 days)">Standard (20-30 days)</option>
                    <option value="Expedited (15-20 days)">Expedited (15-20 days)</option>
                    <option value="Rush (7-10 days)">Rush (7-10 days)</option>
                    <option value="ASAP">ASAP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Any additional requirements, questions, or special considerations..."
                    rows={3}
                    className="resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-300"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Quick Summary</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-orange-700">
                    <div><strong>Name:</strong> {formData.name}</div>
                    <div><strong>Company:</strong> {formData.company}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Application:</strong> {formData.application}</div>
                    <div><strong>Quantity:</strong> {formData.quantity}</div>
                    <div><strong>Timeline:</strong> {formData.timeline || 'Not specified'}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}