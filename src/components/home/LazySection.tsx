"use client"

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface LazySectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  threshold?: number
}

export function LazySection({ children, className = "", id, threshold = 0.1 }: LazySectionProps) {
  return (
    <section id={id} className={className}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <span className="ml-2 text-slate-600">Loading...</span>
          </div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: threshold }}
        >
          {children}
        </motion.div>
      </Suspense>
    </section>
  )
}