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
        className="bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 flex items-center justify-center group"
        onClick={onContactScroll}
        aria-label="Jump to contact section"
      >
        <motion.span
          aria-hidden="true"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="inline-flex"
        >
          <ArrowRight className="h-6 w-6 text-white" />
        </motion.span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="bg-white hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 flex items-center justify-center border-2"
        onClick={() => onWhatsApp('floating_button')}
        aria-label="Open WhatsApp quick chat"
      >
        <MessageCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
      </Button>
    </div>
  )
}
