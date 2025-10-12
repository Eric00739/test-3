"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  BookOpen,
  Calendar,
  Clock3,
  Eye,
  Facebook,
  Heart,
  Linkedin,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Search,
  Share2,
  Tag,
  Twitter,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeaderBar } from "@/components/home/HeaderBar"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import styles from "./BlogPage.module.css"
import { blogData, type BlogArticle } from "./BlogData"

// Import only needed components

const statsNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const suggestionIcons = {
  article: <BookOpen size={16} />,
  tag: <Tag size={16} />,
  author: <User size={16} />,
} as const

type SuggestionType = keyof typeof suggestionIcons

interface Suggestion {
  type: SuggestionType
  text: string
  articleId?: number
  tag?: string
  author?: string
}

interface ToastState {
  message: string
  visible: boolean
}

const INITIAL_COUNT = 6
const EXCERPT_LENGTH = 160

type SortOption = "newest" | "views" | "likes"
type SharePlatform = "linkedin" | "facebook" | "twitter"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Latest" },
  { value: "views", label: "Most Read" },
  { value: "likes", label: "Editor's Pick" },
]

const FALLBACK_ORIGIN = "https://fastfunrc.com"

export function BlogPage() {
  const [category, setCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [displayedCount, setDisplayedCount] = useState(INITIAL_COUNT)
  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const [likes, setLikes] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [modalArticle, setModalArticle] = useState<BlogArticle | null>(null)
  const [readingArticle, setReadingArticle] = useState<BlogArticle | null>(null)
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false })
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  
  // HeaderBar state
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ]
  
  const handleNavClick = (target: string) => {
    setActiveSection(target)
    setIsMobileMenuOpen(false)
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const handleOpenRfq = (source: string) => {
    // Handle RFQ modal opening
    console.log(`Open RFQ from ${source}`)
  }

  const categories = useMemo(() => {
    const counts = blogData.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1
      return acc
    }, {})

    return [
      { key: "all", label: "All Articles", count: blogData.length },
      ...Object.entries(counts).map(([key, count]) => ({
        key,
        label: key[0].toUpperCase() + key.slice(1),
        count,
      })),
    ]
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const stored = window.localStorage.getItem("fastfunrc-blog-saved")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as number[]
        setSavedArticles(parsed)
      } catch {
        // ignore corrupted storage
      }
    }
  }, [])

  useEffect(() => {
    setLikes(
      blogData.reduce<Record<number, number>>((acc, item) => {
        acc[item.id] = item.likes
        return acc
      }, {}),
    )
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("fastfunrc-blog-saved", JSON.stringify(savedArticles))
  }, [savedArticles])

  useEffect(() => {
    const listener = () => {
      setShowScrollTop(window.scrollY > 200)
    }
    listener()
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener("scroll", listener)
  }, [])

  const filteredArticles = useMemo(() => {
    let result = [...blogData]
    if (category !== "all") {
      result = result.filter((article) => article.category === category)
    }

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase().replace(/^#/, "")
      result = result.filter((article) => {
        return (
          article.title.toLowerCase().includes(lower) ||
          article.excerpt.toLowerCase().includes(lower) ||
          article.author.toLowerCase().includes(lower) ||
          article.tags.some((tag) => tag.toLowerCase().includes(lower))
        )
      })
    }

    const likeLookup = likes

    result.sort((a, b) => {
      if (sortOption === "views") {
        return b.views - a.views || toDate(b.date).getTime() - toDate(a.date).getTime()
      }

      if (sortOption === "likes") {
        const likeA = likeLookup[a.id] ?? a.likes
        const likeB = likeLookup[b.id] ?? b.likes
        return likeB - likeA || toDate(b.date).getTime() - toDate(a.date).getTime()
      }

      return toDate(b.date).getTime() - toDate(a.date).getTime()
    })

    return result
  }, [category, searchTerm, sortOption, likes])

  const featuredArticles = useMemo(() => {
    const highlighted = filteredArticles.filter((article) => article.featured)
    if (highlighted.length >= 4) {
      return highlighted.slice(0, 4)
    }

    const fallback = filteredArticles
      .filter((article) => !article.featured)
      .sort((a, b) => b.views - a.views || toDate(b.date).getTime() - toDate(a.date).getTime())

    return [...highlighted, ...fallback].slice(0, 4)
  }, [filteredArticles])

  const visibleArticles = useMemo(
    () => filteredArticles.slice(0, displayedCount),
    [filteredArticles, displayedCount],
  )

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const lower = searchTerm.toLowerCase()
    const suggestionList: Suggestion[] = []

    for (const article of blogData) {
      if (article.title.toLowerCase().includes(lower)) {
        suggestionList.push({ type: "article", text: article.title, articleId: article.id })
      }
    }

    const allTags = new Set<string>()
    const allAuthors = new Set<string>()
    blogData.forEach((article) => {
      article.tags.forEach((tag) => allTags.add(tag))
      allAuthors.add(article.author)
    })

    for (const tag of allTags) {
      if (tag.toLowerCase().includes(lower)) {
        suggestionList.push({ type: "tag", text: `#${tag}`, tag })
      }
    }

    for (const author of allAuthors) {
      if (author.toLowerCase().includes(lower)) {
        suggestionList.push({ type: "author", text: author, author })
      }
    }

    setSuggestions(suggestionList.slice(0, 6))
    setShowSuggestions(suggestionList.length > 0)
  }, [searchTerm])

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => {
      setToast({ message: "", visible: false })
    }, 2400)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setDisplayedCount(INITIAL_COUNT)
    showToast(value === "all" ? "Showing all articles" : `Filtered by ${value}`)
  }

  const handleSortChange = (value: SortOption) => {
    setSortOption(value)
    setDisplayedCount(INITIAL_COUNT)
    if (value === "views") {
      showToast("Showing most read articles")
    } else if (value === "likes") {
      showToast("Showing editor's picks")
    } else {
      showToast("Sorted by latest articles")
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setDisplayedCount(INITIAL_COUNT)
  }

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setShowSuggestions(false)

    if (suggestion.type === "article" && suggestion.articleId) {
      const article = blogData.find((item) => item.id === suggestion.articleId)
      if (article) {
        setModalArticle(article)
      }
      setSearchTerm("")
      return
    }

    if (suggestion.type === "tag" && suggestion.tag) {
      setSearchTerm(`#${suggestion.tag}`)
      showToast(`Showing articles tagged with #${suggestion.tag}`)
      return
    }

    if (suggestion.type === "author" && suggestion.author) {
      setSearchTerm(suggestion.author)
      showToast(`Showing articles by ${suggestion.author}`)
      return
    }
  }


  const toggleSave = (articleId: number) => {
    setSavedArticles((prev) => {
      const exists = prev.includes(articleId)
      const next = exists ? prev.filter((id) => id !== articleId) : [...prev, articleId]
      showToast(exists ? "Removed from saved" : "Article saved")
      return next
    })
  }

  const handleLike = (articleId: number) => {
    setLikes((prev) => {
      const current = prev[articleId] ?? 0
      return { ...prev, [articleId]: current + 1 }
    })
    showToast("Thanks for the feedback!")
  }

  const handleShare = async (article: BlogArticle) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog#article-${article.id}` : ""
    const summary = formatExcerpt(article.excerpt, 120)
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: summary,
          url,
        })
        showToast("Shared successfully")
        return
      } catch {
        // fallthrough to clipboard
      }
    }

    try {
      if ("clipboard" in navigator && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        const temp = document.createElement("input")
        temp.value = url
        document.body.appendChild(temp)
        temp.select()
        document.execCommand("copy")
        temp.remove()
      }
      showToast("Link copied to clipboard")
    } catch {
      showToast("Could not copy link")
    }
  }

  const openShareWindow = (platform: SharePlatform, article: BlogArticle) => {
    if (typeof window === "undefined") {
      return
    }

    const origin = window.location?.origin ?? FALLBACK_ORIGIN
    const articleUrl = `${origin}/blog#article-${article.id}`
    const encodedUrl = encodeURIComponent(articleUrl)
    const encodedTitle = encodeURIComponent(article.title)

    let shareUrl = ""
    let label = ""

    if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
      label = "LinkedIn"
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      label = "Facebook"
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
      label = "X"
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=540")
      showToast(`Shared to ${label}`)
    }
  }

  const filteredCount = filteredArticles.length

  return (
    <div className={styles.page}>
      <div className={styles.animatedBackground} aria-hidden>
        <div className={`${styles.orb} ${styles.orbPrimary}`} />
        <div className={`${styles.orb} ${styles.orbAccent}`} />
        <div className={`${styles.orb} ${styles.orbHighlight}`} />
      </div>

      {/* Header */}
      <HeaderBar
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onToggleMenu={toggleMobileMenu}
        onOpenRfq={handleOpenRfq}
        isMobileMenuOpen={isMobileMenuOpen}
        navLinks={navLinks}
      />

      <main className="relative z-10 pb-24">
        {/* Hero Section with Image */}
        <section className="relative h-80 sm:h-96">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop&crop=entropy&auto=format"
              alt="RF/IoT Technology"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto w-full">
              {/* Breadcrumb */}
              <Breadcrumb
                items={[
                  { name: "Home", url: "/" },
                  { name: "Blog", url: "/blog" }
                ]}
                currentLabel={category !== "all" ? category : undefined}
                className="mb-6 text-white/80"
              />
              
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">RF/IoT Development & Certification Guide</h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                  Practical insights on RF remotes, IoT solutions, and OEM/ODM manufacturing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="bg-white py-8 sm:py-12 -mt-16 relative z-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className={styles.search}>
                <input
                  value={searchTerm}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                  placeholder="Search articles, tags, or authors..."
                  className={styles.searchInput}
                  aria-label="Search blog articles"
                />
                <Search size={18} className={styles.searchIcon} aria-hidden />
                <div className={`${styles.suggestions} ${showSuggestions ? styles.suggestionsVisible : ""}`}>
                  {suggestions.map((suggestion) => (
                    <button
                      key={`${suggestion.type}-${suggestion.text}`}
                      type="button"
                      className={styles.suggestionItem}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestionIcons[suggestion.type]}
                      <span>{suggestion.text}</span>
                    </button>
                  ))}
                  {!suggestions.length && searchTerm && (
                    <div className={styles.suggestionItem}>
                      <Minus size={16} />
                      No results for "{searchTerm}"
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Advanced Filters */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      category === cat.key
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-gray-600">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(event) => handleSortChange(event.target.value as SortOption)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-8 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Topics</h2>
            {featuredArticles.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-32">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 240px, (min-width: 1024px) 220px, (min-width: 640px) 45vw, 90vw"
                      />
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{formatExcerpt(article.excerpt, 60)}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{article.author}</span>
                        <span className="mx-1 text-gray-300" aria-hidden="true">&middot;</span>
                        <span>{formatDate(article.date)}</span>
                        <span className="mx-1 text-gray-300" aria-hidden="true">&middot;</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No highlighted articles for the current filters.</p>
            )}
          </div>
        </section>

        {/* Blog Articles Section */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">All Articles</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500" aria-live="polite">
                  {filteredCount} {filteredCount === 1 ? "article" : "articles"}
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleArticles.map((article) => (
                    <article
                      key={article.id}
                      id={`article-${article.id}`}
                      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                        article.featured ? 'ring-2 ring-orange-500' : ''
                      }`}
                    >
                      <div className="relative h-48">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                          priority={article.featured}
                        />
                        <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{article.author}</span>
                          <span className="mx-2 text-gray-300" aria-hidden="true">&middot;</span>
                          <span>{formatDate(article.date)}</span>
                          <span className="mx-2 text-gray-300" aria-hidden="true">&middot;</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{formatExcerpt(article.excerpt)}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                              onClick={() => {
                                setSearchTerm(`#${tag}`)
                                showToast(`Showing articles tagged with #${tag}`)
                              }}
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye size={16} />
                              {statsNumberFormatter.format(article.views)}
                            </span>
                            <button
                              type="button"
                              className="flex items-center gap-1 hover:text-orange-500 transition-colors"
                              onClick={() => handleLike(article.id)}
                            >
                              <Heart size={16} />
                              {statsNumberFormatter.format(likes[article.id] ?? article.likes)}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className={`p-2 rounded ${
                                savedArticles.includes(article.id)
                                  ? 'text-orange-500 bg-orange-50'
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                              onClick={() => toggleSave(article.id)}
                              aria-label={savedArticles.includes(article.id) ? "Remove from saved" : "Save article"}
                            >
                              <BookmarkIcon filled={savedArticles.includes(article.id)} />
                            </button>
                            <button
                              type="button"
                              className="p-2 text-gray-400 hover:text-gray-600"
                              onClick={() => handleShare(article)}
                              aria-label="Share article"
                            >
                              <Share2 size={18} />
                            </button>
                            <button
                              type="button"
                              className="p-2 text-gray-400 hover:text-gray-600"
                              onClick={() => setReadingArticle(article)}
                              aria-label="Read article"
                            >
                              <BookOpen size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={displayedCount <= INITIAL_COUNT}
                      onClick={() => setDisplayedCount(Math.max(INITIAL_COUNT, displayedCount - INITIAL_COUNT))}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        displayedCount <= INITIAL_COUNT
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="px-3 py-2 text-sm text-gray-700">
                      {Math.ceil(displayedCount / INITIAL_COUNT)} of {Math.ceil(filteredCount / INITIAL_COUNT)}
                    </span>
                    <button
                      type="button"
                      disabled={displayedCount >= filteredCount}
                      onClick={() => setDisplayedCount(Math.min(filteredCount, displayedCount + INITIAL_COUNT))}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        displayedCount >= filteredCount
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>

                {!filteredCount && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No articles found for your filters.</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      onClick={() => {
                        setCategory("all")
                        setSearchTerm("")
                        setDisplayedCount(INITIAL_COUNT)
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
    </main>

    {/* Simple Subscription Bar */}
    <section className="py-8 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Get the latest RF/IoT insights</h3>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for expert tips and industry updates</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
              onClick={() => window.open('mailto:eric@fastfunrc.com?subject=Newsletter Subscription')}
            >
              <Mail size={16} className="mr-2" />
              Subscribe
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => window.open('https://wa.me/8615899648898?text=Hi, I would like to discuss RF/IoT solutions')}
            >
              <MessageCircle size={16} className="mr-2" />
              Chat with Engineer
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Minimal Footer */}
    <footer className="bg-slate-900 text-white py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="FastFun Remote logo" className="h-8 w-auto" width={120} height={36} sizes="(max-width: 768px) 96px, 120px" />
            </Link>
            <span className="text-sm text-slate-400">© {new Date().getFullYear()} FastFun Remote</span>
          </div>
          <div className="flex gap-6">
            <Link href="/blog" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
              Blog
            </Link>
            <Link href="/#products" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
              Products
            </Link>
            <Link href="/#contact" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>

      {modalArticle && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className={styles.modalContent}>
            <button type="button" className={styles.modalClose} onClick={() => setModalArticle(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className={styles.modalBody}>
              <h3 id="modal-title" className={styles.modalTitle}>
                {modalArticle.title}
              </h3>
              <div className={styles.modalMeta}>
                <span>
                  <User size={16} className="mr-2 inline-block" />
                  {modalArticle.author}
                </span>
                <span>
                  <Calendar size={16} className="mr-2 inline-block" />
                  {formatDate(modalArticle.date)}
                </span>
                <span>
                  <Clock3 size={16} className="mr-2 inline-block" />
                  {modalArticle.readTime}
                </span>
                <span>
                  <Eye size={16} className="mr-2 inline-block" />
                  {statsNumberFormatter.format(modalArticle.views)} views
                </span>
              </div>

              <Image
                src={modalArticle.image}
                alt={modalArticle.title}
                width={960}
                height={640}
                className={styles.modalImage}
                sizes="(min-width: 1024px) 960px, 100vw"
              />

              <div className={styles.modalContentText} dangerouslySetInnerHTML={{ __html: modalArticle.content }} />

              <div className="mt-6 flex flex-wrap gap-2">
                {modalArticle.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {readingArticle && (
        <div className={styles.readingMode} role="dialog" aria-modal="true" aria-labelledby="reading-title">
          <header className={styles.readingHeader}>
            <button type="button" className={`${styles.iconButton} !bg-slate-200`} onClick={() => setReadingArticle(null)} aria-label="Exit reading mode">
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Clock3 size={16} />
              {readingArticle.readTime}
            </div>
          </header>
          <div className={styles.readingContent}>
            <h3 id="reading-title" className={styles.readingTitle}>
              {readingArticle.title}
            </h3>
            <div className={styles.readingMeta}>
              <span>
                <User size={16} className="mr-2 inline-block" />
                {readingArticle.author}
              </span>
              <span>
                <Calendar size={16} className="mr-2 inline-block" />
                {formatDate(readingArticle.date)}
              </span>
            </div>
            <div className={styles.readingText} dangerouslySetInnerHTML={{ __html: readingArticle.content }} />
          </div>
        </div>
      )}

      <button
        type="button"
        className={`${styles.scrollTop} ${showScrollTop ? "" : styles.scrollTopHidden}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
      >
        <ArrowUpIcon />
      </button>

      <div className={`${styles.toast} ${toast.visible ? styles.toastVisible : ""}`} role="status">
        {toast.message}
      </div>

    </div>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-7-3-7 3Z" />
      </svg>
    )
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-6-2-6 2V4a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.75">
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  )
}

function toDate(value: string) {
  return new Date(value)
}

function formatDate(input: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(input))
}

function formatExcerpt(excerpt: string, maxLength: number = EXCERPT_LENGTH) {
  const clean = excerpt.replace(/\s+/g, " ").trim()
  if (clean.length <= maxLength) {
    return clean
  }
  return `${clean.slice(0, maxLength).trimEnd()}...`
}
function getInitials(name: string) {
  return name
    .split(" ")
    .map((value) => value[0]?.toUpperCase())
    .join("")
    .slice(0, 2)
}










