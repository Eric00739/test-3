"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Users, 
  Download, 
  Video, 
  FileText, 
  TrendingUp,
  ChevronUp,
  Menu,
  X
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  count?: number
}

const navItems: NavItem[] = [
  {
    id: "hero",
    label: "Home",
    icon: <ChevronUp size={18} />
  },
  {
    id: "categories",
    label: "Categories",
    icon: <BookOpen size={18} />,
    count: 6
  },
  {
    id: "featured",
    label: "Featured",
    icon: <TrendingUp size={18} />
  },
  {
    id: "collection",
    label: "Collection",
    icon: <FileText size={18} />
  },
  {
    id: "guides",
    label: "Guides",
    icon: <BookOpen size={18} />,
    count: 24
  },
  {
    id: "cases",
    label: "Case Studies",
    icon: <Users size={18} />,
    count: 18
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Download size={18} />,
    count: 12
  },
  {
    id: "videos",
    label: "Videos",
    icon: <Video size={18} />,
    count: 36
  },
  {
    id: "trust",
    label: "Trust",
    icon: <Users size={18} />
  },
  {
    id: "support",
    label: "Support",
    icon: <BookOpen size={18} />
  }
]

export function StickyNavigation() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide navigation based on scroll position
      setIsVisible(window.scrollY > 300)

      // Determine active section based on scroll position
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-24 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 bottom-20 top-20 z-30 bg-white rounded-xl shadow-2xl p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-orange-100 text-orange-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Sticky Navigation */}
      <div className="hidden lg:block fixed top-1/2 right-8 z-30 -translate-y-1/2">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2">
          <nav className="space-y-1" aria-label="Page navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                }`}
                title={item.label}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.icon}
                
                {/* Tooltip */}
                <div className={`absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none ${
                  activeSection === item.id ? "opacity-100" : ""
                }`}>
                  {item.label}
                  {item.count && (
                    <span className="ml-1 text-gray-300">({item.count})</span>
                  )}
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-gray-900 rotate-45 transform origin-right"></div>
                </div>

                {/* Active Indicator */}
                {activeSection === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {activeSection !== "hero" && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 lg:hidden"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  )
}