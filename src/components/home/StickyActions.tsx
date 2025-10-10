'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface StickyActionsProps {
  onContactScroll: () => void
  onWhatsApp: (source: string) => void
}

export function StickyActions({ onContactScroll, onWhatsApp }: StickyActionsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3" aria-live="polite">
      <Button
        size="lg"
        className="group flex items-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-orange-600"
        onClick={onContactScroll}
        aria-label="Jump to contact section"
      >
        <span>Get custom quote</span>
        <motion.span
          aria-hidden="true"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="inline-flex"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-lg transition-all duration-300 hover:bg-slate-50 hover:shadow-xl"
        onClick={() => onWhatsApp('floating_button')}
        aria-label="Open WhatsApp quick chat"
      >
        <MessageCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
        <span className="text-green-600">Chat on WhatsApp</span>
      </Button>
    </div>
  )
}
