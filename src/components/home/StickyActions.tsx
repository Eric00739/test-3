"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X } from "lucide-react"

interface StickyActionsProps {
  onOpenRfq: (source: string) => void
  onWhatsApp: (source: string) => void
}

export function StickyActions({ onOpenRfq, onWhatsApp }: StickyActionsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky actions after scrolling past hero section
      if (window.scrollY > 600) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-2xl p-4 mb-2 mr-2 w-64"
          >
            <h4 className="font-semibold text-gray-900 mb-3">Need help?</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onOpenRfq("sticky_quote")
                  setIsExpanded(false)
                }}
                className="w-full text-left px-3 py-2 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition-colors text-sm font-medium flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Get Quote
              </button>
              <button
                onClick={() => {
                  onWhatsApp("sticky_whatsapp")
                  setIsExpanded(false)
                }}
                className="w-full text-left px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-sm font-medium flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onWhatsApp("sticky_whatsapp")}
          className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        <button
          onClick={() => onOpenRfq("sticky_quote")}
          className="w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center"
          aria-label="Get a quote"
        >
          <Send className="h-6 w-6" />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle help menu"
        >
          {isExpanded ? <X className="h-5 w-5" /> : "?"}
        </button>
      </div>
    </div>
  )
}
