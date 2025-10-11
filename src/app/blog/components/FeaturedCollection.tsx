"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Download, Star, Clock, Users, Bookmark, CheckCircle, TrendingUp } from "lucide-react"

interface CollectionItem {
  id: string
  title: string
  description: string
  image: string
  type: "whitepaper" | "video" | "tool"
  category: string
  maturity: "beginner" | "intermediate" | "advanced"
  duration?: string
  downloadCount?: number
  rating: number
  enrolledCount?: number
  price: string
  featured?: boolean
  isNew?: boolean
  instructor?: string
  company?: string
  tags: string[]
}

const collectionItems: CollectionItem[] = [
  // Beginner Level
  {
    id: "1",
    title: "RC Technology Fundamentals",
    description: "Comprehensive introduction to remote control technology, perfect for beginners looking to understand the basics.",
    image: "https://picsum.photos/seed/collection1/400/250",
    type: "whitepaper",
    category: "Educational",
    maturity: "beginner",
    rating: 4.8,
    downloadCount: 1250,
    price: "Free",
    featured: true,
    tags: ["Basics", "Introduction", "Technology"]
  },
  {
    id: "2",
    title: "Getting Started with RC Systems",
    description: "Step-by-step video course covering everything you need to know to start working with RC systems.",
    image: "https://picsum.photos/seed/collection2/400/250",
    type: "video",
    category: "Course",
    maturity: "beginner",
    duration: "2.5 hours",
    rating: 4.9,
    enrolledCount: 890,
    price: "$29",
    instructor: "Alex Chen",
    tags: ["Course", "Beginner", "Practical"]
  },
  {
    id: "3",
    title: "RC Protocol Calculator",
    description: "Free tool to calculate optimal RC protocol settings for your specific requirements.",
    image: "https://picsum.photos/seed/collection3/400/250",
    type: "tool",
    category: "Calculator",
    maturity: "beginner",
    rating: 4.7,
    downloadCount: 2100,
    price: "Free",
    tags: ["Tool", "Calculator", "Settings"]
  },
  // Intermediate Level
  {
    id: "4",
    title: "Advanced Signal Processing Guide",
    description: "Deep dive into signal processing techniques for enhanced RC system performance.",
    image: "https://picsum.photos/seed/collection4/400/250",
    type: "whitepaper",
    category: "Technical",
    maturity: "intermediate",
    rating: 4.6,
    downloadCount: 890,
    price: "$19",
    tags: ["Signal Processing", "Advanced", "Performance"]
  },
  {
    id: "5",
    title: "IoT Integration Masterclass",
    description: "Complete video course on integrating RC systems with IoT platforms and services.",
    image: "https://picsum.photos/seed/collection5/400/250",
    type: "video",
    category: "Course",
    maturity: "intermediate",
    duration: "4 hours",
    rating: 4.8,
    enrolledCount: 567,
    price: "$79",
    instructor: "Sarah Johnson",
    featured: true,
    tags: ["IoT", "Integration", "Advanced"]
  },
  {
    id: "6",
    title: "System Design Toolkit",
    description: "Professional toolkit for designing and optimizing RC systems for industrial applications.",
    image: "https://picsum.photos/seed/collection6/400/250",
    type: "tool",
    category: "Toolkit",
    maturity: "intermediate",
    rating: 4.5,
    downloadCount: 1450,
    price: "$49",
    tags: ["Design", "Toolkit", "Professional"]
  },
  // Advanced Level
  {
    id: "7",
    title: "Enterprise RC Architecture",
    description: "Comprehensive whitepaper on designing enterprise-grade RC systems for large-scale deployments.",
    image: "https://picsum.photos/seed/collection7/400/250",
    type: "whitepaper",
    category: "Enterprise",
    maturity: "advanced",
    rating: 4.9,
    downloadCount: 420,
    price: "$99",
    company: "FastFunRC Research",
    tags: ["Enterprise", "Architecture", "Advanced"]
  },
  {
    id: "8",
    title: "Custom Protocol Development",
    description: "Advanced video course on developing custom RC protocols for specialized applications.",
    image: "https://picsum.photos/seed/collection8/400/250",
    type: "video",
    category: "Course",
    maturity: "advanced",
    duration: "6 hours",
    rating: 4.7,
    enrolledCount: 234,
    price: "$199",
    instructor: "Michael Roberts",
    featured: true,
    tags: ["Development", "Custom", "Expert"]
  },
  {
    id: "9",
    title: "Performance Optimization Suite",
    description: "Professional suite of tools for optimizing RC system performance and troubleshooting.",
    image: "https://picsum.photos/seed/collection9/400/250",
    type: "tool",
    category: "Optimization",
    maturity: "advanced",
    rating: 4.8,
    downloadCount: 680,
    price: "$149",
    tags: ["Optimization", "Performance", "Expert"]
  }
]

const maturityColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800"
}

const maturityLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
}

const typeIcons = {
  whitepaper: <BookOpen size={20} />,
  video: <Video size={20} />,
  tool: <Download size={20} />
}

export function FeaturedCollection() {
  const [savedItems, setSavedItems] = useState<string[]>([])
  const [filterType, setFilterType] = useState<"all" | "whitepaper" | "video" | "tool">("all")
  const [filterMaturity, setFilterMaturity] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")

  const toggleSave = (itemId: string) => {
    setSavedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredItems = collectionItems.filter(item => {
    const typeMatch = filterType === "all" || item.type === filterType
    const maturityMatch = filterMaturity === "all" || item.maturity === filterMaturity
    return typeMatch && maturityMatch
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))
  }

  const handleSubscribe = (itemId: string) => {
    // Handle subscription logic
    console.log(`Subscribed to item: ${itemId}`)
  }

  const handleDownload = (itemId: string) => {
    // Handle download logic
    console.log(`Downloaded item: ${itemId}`)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Curated resources organized by skill level. From beginner guides to advanced enterprise solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              All Types
            </Button>
            <Button
              variant={filterType === "whitepaper" ? "default" : "outline"}
              onClick={() => setFilterType("whitepaper")}
              className={filterType === "whitepaper" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              White Papers
            </Button>
            <Button
              variant={filterType === "video" ? "default" : "outline"}
              onClick={() => setFilterType("video")}
              className={filterType === "video" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              Video Courses
            </Button>
            <Button
              variant={filterType === "tool" ? "default" : "outline"}
              onClick={() => setFilterType("tool")}
              className={filterType === "tool" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              Tools
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterMaturity === "all" ? "default" : "outline"}
              onClick={() => setFilterMaturity("all")}
              className={filterMaturity === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              All Levels
            </Button>
            <Button
              variant={filterMaturity === "beginner" ? "default" : "outline"}
              onClick={() => setFilterMaturity("beginner")}
              className={filterMaturity === "beginner" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              Beginner
            </Button>
            <Button
              variant={filterMaturity === "intermediate" ? "default" : "outline"}
              onClick={() => setFilterMaturity("intermediate")}
              className={filterMaturity === "intermediate" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            >
              Intermediate
            </Button>
            <Button
              variant={filterMaturity === "advanced" ? "default" : "outline"}
              onClick={() => setFilterMaturity("advanced")}
              className={filterMaturity === "advanced" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              Advanced
            </Button>
          </div>
        </div>

        {/* Funnel Sections by Maturity Level */}
        {["beginner", "intermediate", "advanced"].map((maturity) => {
          const maturityItems = filteredItems.filter(item => item.maturity === maturity)
          if (maturityItems.length === 0) return null

          return (
            <div key={maturity} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${maturityColors[maturity as keyof typeof maturityColors]}`}>
                  {maturityLabels[maturity as keyof typeof maturityLabels]} Level
                </div>
                <div className="h-px flex-1 bg-gray-200"></div>
                <div className="text-sm text-gray-500">
                  {maturityItems.length} resource{maturityItems.length !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maturityItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${maturityColors[item.maturity]} border-0`}>
                          {maturityLabels[item.maturity]}
                        </Badge>
                      </div>
                      {item.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-orange-500 text-white">Featured</Badge>
                        </div>
                      )}
                      {item.isNew && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-blue-500 text-white">New</Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`p-2 rounded-lg bg-gray-100 text-gray-600`}>
                          {typeIcons[item.type]}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          {renderStars(item.rating)}
                          <span className="ml-1">{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.downloadCount && (
                            <span className="flex items-center gap-1">
                              <Download size={14} />
                              {item.downloadCount}
                            </span>
                          )}
                          {item.enrolledCount && (
                            <span className="flex items-center gap-1">
                              <Users size={14} />
                              {item.enrolledCount}
                            </span>
                          )}
                          {item.duration && (
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {item.duration}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Instructor/Company */}
                      {(item.instructor || item.company) && (
                        <div className="text-sm text-gray-600 mb-4">
                          {item.instructor && (
                            <div>Instructor: <span className="font-medium">{item.instructor}</span></div>
                          )}
                          {item.company && (
                            <div>By: <span className="font-medium">{item.company}</span></div>
                          )}
                        </div>
                      )}

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-orange-600">
                          {item.price}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleSave(item.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              savedItems.includes(item.id)
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            aria-label={savedItems.includes(item.id) ? "Remove from saved" : "Save for later"}
                          >
                            <Bookmark size={16} className={savedItems.includes(item.id) ? "fill-current" : ""} />
                          </button>
                          <Button
                            size="sm"
                            onClick={() => {
                              if (item.type === "whitepaper" || item.type === "tool") {
                                handleDownload(item.id)
                              } else {
                                handleSubscribe(item.id)
                              }
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            {item.type === "whitepaper" || item.type === "tool" ? "Download" : "Enroll"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full">
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  )
}