"use client"

import { useEffect, useMemo, useState } from "react"
import { BookOpen, Calendar, Clock3, Eye, Heart, FileText, Minus, Plus, Search, Share2, Tag, TrendingUp, User, X } from "lucide-react"

import styles from "./BlogPage.module.css"
import { blogData, type BlogArticle } from "./BlogData"

const stats = [
  { icon: <TrendingUp size={22} />, label: "Published Articles", value: 256 },
  { icon: <User size={22} />, label: "Expert Authors", value: 48 },
  { icon: <Eye size={22} />, label: "Monthly Readers", value: 125_000 },
  { icon: <AwardIcon />, label: "Industry Awards", value: 15 },
]

function AwardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M15.24 10.76a4 4 0 1 1-6.48 0" />
      <path d="M17 10a5 5 0 1 0-10 0" />
      <path d="M12 19.6V22" />
      <path d="M7 21h10" />
      <path d="m4 12 1.5 2.7" />
      <path d="m20 12-1.5 2.7" />
    </svg>
  )
}

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
    let result = blogData
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

    return result
  }, [category, searchTerm])

  const visibleArticles = useMemo(() => filteredArticles.slice(0, displayedCount), [filteredArticles, displayedCount])

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
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

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 3)
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
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

  const filteredCount = filteredArticles.length
  const hasMore = displayedCount < filteredCount

  return (
    <div className={styles.page}>
      <div className={styles.animatedBackground} aria-hidden>
        <div className={`${styles.orb} ${styles.orbPrimary}`} />
        <div className={`${styles.orb} ${styles.orbAccent}`} />
        <div className={`${styles.orb} ${styles.orbHighlight}`} />
      </div>

      <header className={`${styles.section} ${styles.hero}`}>
        <span className={styles.badge}>
          <RocketIcon /> Innovation Hub
        </span>
        <h1 className={styles.heroTitle}>Welcome to FastFunRC Blog</h1>
        <p className={styles.heroSubtitle}>
          Discover cutting-edge insights, industry trends, and expert perspectives on RC technology and innovation.
        </p>
      </header>

      <section className={`${styles.section} ${styles.statsGrid}`} aria-label="Blog statistics">
        {stats.map((item) => (
          <article key={item.label} className={styles.statCard}>
            <div className={styles.statIcon}>{item.icon}</div>
            <div className={styles.statNumber}>{statsNumberFormatter.format(item.value)}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Explore Categories</h2>
        <div className={styles.categories}>
          {categories.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.category} ${category === item.key ? styles.categoryActive : ""}`}
              onClick={() => handleCategoryChange(item.key)}
            >
              <Plus size={16} />
              {item.label}
              <span className={styles.categoryCount}>{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          <div className={styles.search}>
            <input
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              placeholder="Search articles, tags, or authors…"
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

        {isLoading ? (
          <div className={styles.blogGrid}>
            {[...Array(6)].map((_, index) => (
              <article key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonBody}>
                  <div className={styles.skeletonLine} />
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                  <div className={styles.skeletonLine} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.blogGrid}>
              {visibleArticles.map((article) => (
                <article
                  key={article.id}
                  id={`article-${article.id}`}
                  className={`${styles.card} ${article.featured ? styles.cardFeatured : ""}`}
                >
                  <div className={styles.cardImage}>
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <span className={styles.categoryBadge}>{article.category}</span>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.meta}>
                      <button
                        type="button"
                        className={styles.author}
                        onClick={() => {
                          setSearchTerm(article.author)
                          showToast(`Showing articles by ${article.author}`)
                        }}
                      >
                        <span className={styles.avatar}>{getInitials(article.author)}</span>
                        <span>{article.author}</span>
                      </button>
                      <span>
                        <Calendar size={16} className="inline-block mr-2 text-slate-400" aria-hidden />
                        {formatDate(article.date)}
                      </span>
                      <span>
                        <Clock3 size={16} className="inline-block mr-2 text-slate-400" aria-hidden />
                        {article.readTime}
                      </span>
                    </div>

                    <div>
                      <h3 className={styles.cardTitle}>{article.title}</h3>
                      <p className={styles.excerpt}>{article.excerpt}</p>
                    </div>

                    <div className={styles.tags}>
                      {article.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className={styles.tag}
                          onClick={() => {
                            setSearchTerm(`#${tag}`)
                            showToast(`Showing articles tagged with #${tag}`)
                          }}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.stats}>
                        <span className={styles.stat}>
                          <Eye size={16} />
                          {statsNumberFormatter.format(article.views)}
                        </span>
                        <button type="button" className={styles.stat} onClick={() => handleLike(article.id)}>
                          <Heart size={16} />
                          {statsNumberFormatter.format(likes[article.id] ?? article.likes)}
                        </button>
                      </div>

                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={`${styles.iconButton} ${savedArticles.includes(article.id) ? styles.iconButtonActive : ""}`}
                          onClick={() => toggleSave(article.id)}
                          aria-label={savedArticles.includes(article.id) ? "Remove article from saved articles" : "Save article"}
                        >
                          <BookmarkIcon filled={savedArticles.includes(article.id)} />
                        </button>
                        <button
                          type="button"
                          className={styles.iconButton}
                          onClick={() => handleShare(article)}
                          aria-label="Share article"
                        >
                          <Share2 size={18} />
                        </button>
                        <button
                          type="button"
                          className={styles.iconButton}
                          onClick={() => setModalArticle(article)}
                          aria-label="Open article preview"
                        >
                          <FileText size={18} />
                        </button>
                        <button
                          type="button"
                          className={styles.iconButton}
                          onClick={() => setReadingArticle(article)}
                          aria-label="Open reading mode"
                        >
                          <BookOpen size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className={styles.loadMore}>
                <button type="button" onClick={handleLoadMore}>
                  Load more articles
                </button>
              </div>
            )}

            {!filteredCount && (
              <div className="mt-16 text-center text-slate-500">
                <p>No articles found for your filters.</p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow"
                  onClick={() => {
                    setCategory("all")
                    setSearchTerm("")
                    setDisplayedCount(INITIAL_COUNT)
                  }}
                >
                  <X size={16} />
                  Reset filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

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

              <img src={modalArticle.image} alt="" className={styles.modalImage} />

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

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="m4 13-1 4 4-1 10-10a3 3 0 1 0-4.2-4.3L4 13Z" />
      <path d="m2 22 5-5" />
      <path d="M4 13a3.32 3.32 0 1 0 4.7 4.7" />
      <path d="m7.5 10.5 2 2" />
    </svg>
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

function formatDate(input: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(input))
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((value) => value[0]?.toUpperCase())
    .join("")
    .slice(0, 2)
}
