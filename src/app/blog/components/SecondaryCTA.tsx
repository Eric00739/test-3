"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  FileText, 
  CheckCircle, 
  Mail, 
  Phone,
  Calendar,
  TrendingUp,
  Award,
  BarChart3
} from "lucide-react"

export function SecondaryCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
      // Handle form submission
      console.log("Email submitted:", email)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  const reportFeatures = [
    {
      icon: <BarChart3 size={20} />,
      title: "Market Analysis",
      description: "2024 RC Technology Trends"
    },
    {
      icon: <TrendingUp size={20} />,
      title: "ROI Calculator",
      description: "Calculate your potential savings"
    },
    {
      icon: <Award size={20} />,
      title: "Implementation Guide",
      description: "Step-by-step deployment process"
    },
    {
      icon: <FileText size={20} />,
      title: "Case Studies",
      description: "Real-world success stories"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-white/20 text-white mb-4">Limited Time Offer</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Get Your Free Diagnostic Report
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Discover how our RC solutions can transform your business. Get personalized insights 
            and recommendations tailored to your specific needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Report Features */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              What's Included in Your Report:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reportFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-orange-100 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-white" />
                <span className="text-white">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-white" />
                <span className="text-white">Ready in 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Side: Email Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download size={32} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Request Your Free Report
              </h3>
              <p className="text-gray-600">
                Enter your email to receive your personalized diagnostic report
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium"
                >
                  Get My Free Report
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your diagnostic report will be sent to your email within 24 hours.
                </p>
                <div className="text-sm text-gray-500">
                  Check your inbox for a confirmation email.
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  <span>eric@fastfunrc.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  <span>+86 158 9964 8898</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By requesting this report, you agree to receive occasional emails from us. 
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative CTAs */}
        <div className="mt-12 text-center">
          <p className="text-white mb-4">Or schedule a consultation with our experts:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-full font-medium flex items-center gap-2"
            >
              <Calendar size={18} />
              Schedule Consultation
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-full font-medium flex items-center gap-2"
            >
              <Phone size={18} />
              Call Us Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}