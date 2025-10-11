"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Play, Calendar, Download } from "lucide-react"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onSearch: (term: string) => void
}

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Resources", url: "/resources" },
  { name: "Blog", url: "/blog" }
]

const carouselImages = [
  {
    src: "https://picsum.photos/seed/rc-hero1/800/500",
    alt: "RC Technology Innovation"
  },
  {
    src: "https://picsum.photos/seed/rc-hero2/800/500",
    alt: "Remote Control Solutions"
  },
  {
    src: "https://picsum.photos/seed/rc-hero3/800/500",
    alt: "IoT Integration"
  }
]

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Industry Positioning + Value Proposition */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
              Industry Leader in RC Technology
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Innovating Remote Control
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Solutions for Tomorrow
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 max-w-lg">
              Empowering businesses with cutting-edge RF remotes, IoT integration, and custom control solutions. 
              Transform your operations with our ISO 9001 certified technology.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources, guides, and solutions..."
                  className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Primary/Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
                <Calendar size={18} />
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full font-medium flex items-center gap-2">
                <Download size={18} />
                Download Resource Pack
              </Button>
            </div>
          </div>

          {/* Right Side: Image Carousel/Video */}
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative w-full h-full">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Carousel Controls */}
              <button
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Video Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="p-4 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                  <Play size={24} className="text-orange-500 ml-1" />
                </button>
              </div>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}