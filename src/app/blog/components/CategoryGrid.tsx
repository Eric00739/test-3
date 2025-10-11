"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, Download, Users, TrendingUp, Clock, Filter } from "lucide-react"

interface Category {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  resourceCount: number
  contentFormats: string[]
  benefits: string[]
  featured?: boolean
}

const categories: Category[] = [
  {
    id: "guides",
    title: "Technical Guides",
    description: "Step-by-step tutorials and best practices for RC implementation",
    icon: <BookOpen size={24} />,
    color: "bg-blue-500",
    resourceCount: 24,
    contentFormats: ["PDF", "Interactive", "Video"],
    benefits: ["Expert knowledge", "Practical solutions", "Time-saving"],
    featured: true
  },
  {
    id: "case-studies",
    title: "Success Stories",
    description: "Real-world implementations and results from our clients",
    icon: <Users size={24} />,
    color: "bg-green-500",
    resourceCount: 18,
    contentFormats: ["Case Study", "Video", "Interview"],
    benefits: ["Proven results", "Industry insights", "ROI data"]
  },
  {
    id: "tools",
    title: "Free Tools",
    description: "Calculators, templates, and resources to accelerate your project",
    icon: <Download size={24} />,
    color: "bg-purple-500",
    resourceCount: 12,
    contentFormats: ["Download", "Interactive", "Template"],
    benefits: ["Immediate value", "Customizable", "Professional grade"]
  },
  {
    id: "videos",
    title: "Video Library",
    description: "Product demos, tutorials, and expert interviews",
    icon: <Video size={24} />,
    color: "bg-red-500",
    resourceCount: 36,
    contentFormats: ["HD Video", "Webinar", "Tutorial"],
    benefits: ["Visual learning", "Expert insights", "On-demand access"]
  },
  {
    id: "whitepapers",
    title: "White Papers",
    description: "In-depth research and industry analysis reports",
    icon: <FileText size={24} />,
    color: "bg-indigo-500",
    resourceCount: 8,
    contentFormats: ["PDF", "Research", "Analysis"],
    benefits: ["Data-driven", "Industry trends", "Strategic insights"]
  },
  {
    id: "trends",
    title: "Industry Trends",
    description: "Latest developments and future predictions in RC technology",
    icon: <TrendingUp size={24} />,
    color: "bg-orange-500",
    resourceCount: 15,
    contentFormats: ["Article", "Infographic", "Report"],
    benefits: ["Stay ahead", "Market insights", "Innovation updates"]
  }
]

const allTags = ["Beginner", "Advanced", "Technical", "Business", "Implementation", "Strategy"]

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void
  onTagFilter: (tags: string[]) => void
}

export function CategoryGrid({ onCategorySelect, onTagFilter }: CategoryGridProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    onTagFilter(newTags)
  }

  const clearFilters = () => {
    setSelectedTags([])
    onTagFilter([])
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Resource Library
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover comprehensive resources tailored to your needs. From technical guides to success stories, 
            find everything you need to excel in RC technology.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Category Grid - Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`relative group cursor-pointer transform transition-all duration-300 ${
                hoveredCard === category.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onCategorySelect(category.id)}
            >
              {/* Featured Badge */}
              {category.featured && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-orange-500 text-white px-2 py-1 text-xs">
                    Featured
                  </Badge>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                {/* Card Header */}
                <div className={`${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{category.resourceCount}</div>
                      <div className="text-xs opacity-90">Resources</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Content Formats */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Content Formats
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.contentFormats.map((format) => (
                        <span
                          key={format}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      What You'll Gain
                    </div>
                    <ul className="space-y-1">
                      {category.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover CTA */}
                  <div className={`transition-all duration-300 ${
                    hoveredCard === category.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Explore {category.title}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  )
}