"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, Heart, MessageCircle, TrendingUp, CalendarDays, Video, Users } from "lucide-react"

interface FeaturedItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  date: string
  readTime: string
  views: number
  likes: number
  comments: number
  featured?: boolean
  type: "resource" | "case" | "event"
  eventDate?: string
  eventLocation?: string
  author?: string
  company?: string
}

const hotResources: FeaturedItem[] = [
  {
    id: "1",
    title: "Complete Guide to RC Protocol Implementation",
    description: "Master the fundamentals of RC protocol implementation with this comprehensive guide covering best practices, common pitfalls, and advanced techniques.",
    image: "https://picsum.photos/seed/guide1/400/250",
    category: "Technical Guide",
    date: "2024-01-15",
    readTime: "12 min",
    views: 5420,
    likes: 234,
    comments: 18,
    featured: true,
    type: "resource",
    author: "Alex Chen"
  },
  {
    id: "2",
    title: "IoT Integration Framework for RC Systems",
    description: "Learn how to seamlessly integrate your RC systems with IoT platforms for enhanced monitoring, control, and data analytics capabilities.",
    image: "https://picsum.photos/seed/guide2/400/250",
    category: "Framework",
    date: "2024-01-12",
    readTime: "8 min",
    views: 3890,
    likes: 156,
    comments: 12,
    type: "resource",
    author: "Sarah Johnson"
  },
  {
    id: "3",
    title: "Advanced Signal Processing Techniques",
    description: "Explore cutting-edge signal processing methods that can significantly improve your RC system's performance and reliability.",
    image: "https://picsum.photos/seed/guide3/400/250",
    category: "Technical",
    date: "2024-01-10",
    readTime: "15 min",
    views: 4210,
    likes: 189,
    comments: 24,
    type: "resource",
    author: "Michael Roberts"
  }
]

const latestCases: FeaturedItem[] = [
  {
    id: "4",
    title: "Manufacturing Automation Success Story",
    description: "How a leading manufacturer reduced operational costs by 40% through our custom RC solution implementation.",
    image: "https://picsum.photos/seed/case1/400/250",
    category: "Manufacturing",
    date: "2024-01-18",
    readTime: "10 min",
    views: 6780,
    likes: 312,
    comments: 28,
    featured: true,
    type: "case",
    company: "TechCorp Industries",
    author: "David Lee"
  },
  {
    id: "5",
    title: "Agricultural Drone Fleet Management",
    description: "Transforming precision agriculture with fleet management solutions that increased crop yield by 25%.",
    image: "https://picsum.photos/seed/case2/400/250",
    category: "Agriculture",
    date: "2024-01-16",
    readTime: "8 min",
    views: 5230,
    likes: 267,
    comments: 19,
    type: "case",
    company: "AgriTech Solutions",
    author: "Emily Watson"
  },
  {
    id: "6",
    title: "Smart City Infrastructure Integration",
    description: "Implementing RC technology across 200+ city infrastructure points with 99.9% uptime reliability.",
    image: "https://picsum.photos/seed/case3/400/250",
    category: "Smart City",
    date: "2024-01-14",
    readTime: "12 min",
    views: 7120,
    likes: 345,
    comments: 31,
    type: "case",
    company: "MetroSmart City",
    author: "James Wilson"
  }
]

const upcomingEvents: FeaturedItem[] = [
  {
    id: "7",
    title: "RC Technology Webinar: Future Trends",
    description: "Join industry experts as they discuss emerging trends and future directions in RC technology and IoT integration.",
    image: "https://picsum.photos/seed/event1/400/250",
    category: "Webinar",
    date: "2024-01-20",
    readTime: "60 min",
    views: 0,
    likes: 0,
    comments: 0,
    featured: true,
    type: "event",
    eventDate: "2024-02-15",
    eventLocation: "Online",
    author: "Industry Experts Panel"
  },
  {
    id: "8",
    title: "Hands-on Workshop: RC System Design",
    description: "Practical workshop covering end-to-end RC system design, from concept to implementation and testing.",
    image: "https://picsum.photos/seed/event2/400/250",
    category: "Workshop",
    date: "2024-01-22",
    readTime: "4 hours",
    views: 0,
    likes: 0,
    comments: 0,
    type: "event",
    eventDate: "2024-02-22",
    eventLocation: "Shenzhen, China",
    author: "Technical Team"
  },
  {
    id: "9",
    title: "Annual RC Technology Conference 2024",
    description: "Connect with industry leaders, discover innovations, and explore partnership opportunities at our flagship event.",
    image: "https://picsum.photos/seed/event3/400/250",
    category: "Conference",
    date: "2024-01-25",
    readTime: "2 days",
    views: 0,
    likes: 0,
    comments: 0,
    type: "event",
    eventDate: "2024-03-15-16",
    eventLocation: "Hong Kong",
    author: "FastFunRC Team"
  }
]

type TabType = "hot" | "cases" | "events"

export function FeaturedSection() {
  const [activeTab, setActiveTab] = useState<TabType>("hot")

  const tabs = [
    { id: "hot" as TabType, label: "Hot Resources", icon: <TrendingUp size={18} /> },
    { id: "cases" as TabType, label: "Latest Cases", icon: <Users size={18} /> },
    { id: "events" as TabType, label: "Upcoming Events", icon: <CalendarDays size={18} /> }
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case "hot":
        return hotResources
      case "cases":
        return latestCases
      case "events":
        return upcomingEvents
      default:
        return hotResources
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const formatEventDate = (dateString: string) => {
    if (dateString.includes("-")) {
      const [start, end] = dateString.split("-")
      return `${formatDate(start)} - ${formatDate(end)}`
    }
    return formatDate(dateString)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Content
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with our most popular resources, latest success stories, and upcoming events
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {getTabContent().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 text-white">Featured</Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {item.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    {item.type === "event" ? (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatEventDate(item.eventDate || "")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video size={14} />
                          <span>{item.readTime}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{item.readTime}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Author/Company Info */}
                {(item.author || item.company) && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600">
                      {item.company && (
                        <span className="font-medium">{item.company}</span>
                      )}
                      {item.company && item.author && " • "}
                      {item.author && <span>{item.author}</span>}
                    </div>
                    {item.type === "event" && item.eventLocation && (
                      <div className="text-sm text-gray-500">
                        📍 {item.eventLocation}
                      </div>
                    )}
                  </div>
                )}

                {/* Stats & Actions */}
                {item.type !== "event" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                    <Button size="sm" className="text-orange-500 hover:text-orange-600 hover:bg-orange-50">
                      {item.type === "case" ? "Read Case" : item.type === "resource" ? "View Resource" : "Register"}
                    </Button>
                  </div>
                )}

                {/* Event CTA */}
                {item.type === "event" && (
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-orange-600 font-medium">
                      {item.eventDate && new Date(item.eventDate) > new Date() ? "Registration Open" : "Register Now"}
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full">
            View All {activeTab === "hot" ? "Resources" : activeTab === "cases" ? "Case Studies" : "Events"}
          </Button>
        </div>
      </div>
    </section>
  )
}