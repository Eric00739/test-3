"use client"

import { useState, useEffect } from 'react'
import { ChevronUp, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface QuickNavProps {
  sections: Array<{ id: string; label: string }>
}

export function QuickNav({ sections }: QuickNavProps) {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const showThreshold = 500

      // Show/hide quick nav based on scroll position
      setIsVisible(scrollPosition > showThreshold)

      // Update active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }))

      for (const { id, element } of sectionElements) {
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-2 min-w-48">
        <div className="flex items-center gap-2 mb-2 px-2 py-1">
          <Menu className="h-4 w-4 text-slate-600" />
          <span className="text-xs font-semibold text-slate-700">Quick Navigation</span>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-orange-100 text-orange-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Back to Top Button */}
      <Button
        size="sm"
        onClick={scrollToTop}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 h-10 w-10 shadow-lg"
        aria-label="Back to top"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  )
}