'use client';

import { ArrowRight, Download } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export interface HeaderBarProps {
  activeSection: string
  onNavClick: (target: string) => void
  onToggleMenu: () => void
  onOpenRfq: (source: string) => void
  isMobileMenuOpen: boolean
  navLinks: { label: string; target: string }[]
}

export function HeaderBar({
  activeSection,
  onNavClick,
  onToggleMenu,
  onOpenRfq,
  isMobileMenuOpen,
  navLinks,
}: HeaderBarProps) {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src="/logo-fastfun-remote.png" alt="FastFun Remote logo" width={160} height={48} priority className="h-10 w-auto" />
          </div>
            <div className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => onNavClick(link.target)}
                  className={`text-sm sm:text-base font-medium transition-colors cursor-pointer hover:text-orange-500 ${
                    activeSection === link.target ? 'text-orange-600 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex text-xs sm:text-sm"
              type="button"
              onClick={() => onOpenRfq('header_catalog')}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Catalog</span>
              <span className="sm:hidden">Cat</span>
            </Button>
            <Button
              size="sm"
              type="button"
              className="text-xs sm:text-sm px-2 sm:px-4 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => onOpenRfq('header_quote')}
            >
              <span className="hidden sm:inline">Get a Custom Quote</span>
              <span className="sm:hidden">Quote</span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={onToggleMenu}>
              <span className="sr-only">Toggle menu</span>
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}
                ></span>
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}
                ></span>
              </div>
            </Button>
          </div>
        </div>
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                className={`block w-full text-left py-2 px-4 text-sm font-medium transition-colors hover:bg-gray-50 cursor-pointer ${
                  activeSection === link.target ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-500'
                }`}
                onClick={() => onNavClick(link.target)}
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button variant="outline" size="sm" className="w-full mb-2 text-sm" onClick={() => onOpenRfq('header_catalog')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Catalog
              </Button>
              <Button size="sm" className="w-full text-sm" onClick={() => onOpenRfq('header_quote')}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}