"use client"

import { ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface UnifiedCTAProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
  source: string
  title?: string
  subtitle?: string
  variant?: "default" | "compact" | "centered"
  showWhatsApp?: boolean
  className?: string
}

export function UnifiedCTA({ 
  onOpenRfq, 
  onWhatsApp, 
  source, 
  title, 
  subtitle,
  variant = "default",
  showWhatsApp = true,
  className = ""
}: UnifiedCTAProps) {
  const baseClasses = "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
  const whatsappClasses = "border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-full"

  if (variant === "compact") {
    return (
      <div className={`flex gap-3 ${className}`}>
        <Button
          className={`${baseClasses} group relative overflow-hidden px-8 py-3`}
          onClick={() => onOpenRfq(source)}
        >
          <span className="relative z-10 flex items-center">
            Get a Quote
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        
        {showWhatsApp && (
          <Button
            variant="outline"
            className={`${whatsappClasses} px-8 py-3`}
            onClick={() => onWhatsApp(`${source}_whatsapp`)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        )}
      </div>
    )
  }

  if (variant === "centered") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-center ${className}`}
      >
        {title && <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>}
        {subtitle && <p className="text-sm text-slate-600 mb-4">{subtitle}</p>}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className={`${baseClasses} group relative overflow-hidden px-8 py-3`}
              onClick={() => onOpenRfq(source)}
            >
              <span className="relative z-10 flex items-center">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>
          
          {showWhatsApp && (
            <Button
              size="lg"
              variant="outline"
              className={`${whatsappClasses} px-8 py-3`}
              onClick={() => onWhatsApp(`${source}_whatsapp`)}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Consult
            </Button>
          )}
        </div>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      {title && <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>}
      {subtitle && <p className="text-sm text-slate-600 mb-4">{subtitle}</p>}
      
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            size="lg"
            className={`${baseClasses} group relative overflow-hidden w-full sm:w-auto px-8 py-3`}
            onClick={() => onOpenRfq(source)}
          >
            <span className="relative z-10 flex items-center">
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
        
        {showWhatsApp && (
          <Button
            size="lg"
            variant="outline"
            className={`${whatsappClasses} w-full sm:w-auto px-8 py-3`}
            onClick={() => onWhatsApp(`${source}_whatsapp`)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Consult
          </Button>
        )}
      </div>
    </motion.div>
  )
}