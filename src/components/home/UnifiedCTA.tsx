"use client"

import { ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
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
  className = "",
}: UnifiedCTAProps) {
  const t = useTranslations("ctaButtons")
  const baseClasses =
    "rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-white shadow-md transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
  const whatsappClasses =
    "rounded-full border-slate-300 px-8 py-3 text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"

  const renderPrimaryButton = () => (
    <Button
      size="lg"
      className={`${baseClasses} group relative overflow-hidden`}
      onClick={() => onOpenRfq(source)}
    >
      <span className="relative z-10 flex items-center">
        {t("quote")}
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  )

  const renderWhatsappButton = () =>
    showWhatsApp && (
      <Button
        size="lg"
        variant="outline"
        className={whatsappClasses}
        onClick={() => onWhatsApp(`${source}_whatsapp`)}
      >
        <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        {t("whatsappConsult")}
      </Button>
    )

  if (variant === "compact") {
    return (
      <div className={`flex gap-3 ${className}`}>
        {renderPrimaryButton()}
        {renderWhatsappButton()}
      </div>
    )
  }

  const content = (
    <>
      {title && <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>}
      {subtitle && <p className="mb-4 text-sm text-slate-600">{subtitle}</p>}
      <div className="flex flex-col gap-3 sm:flex-row">{renderPrimaryButton()}{renderWhatsappButton()}</div>
    </>
  )

  if (variant === "centered") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-center ${className}`}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      {content}
    </motion.div>
  )
}
