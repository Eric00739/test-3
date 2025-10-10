"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  BookOpen,
  Calendar,
  Clock3,
  Eye,
  Factory,
  Facebook,
  FileText,
  Globe,
  Heart,
  Linkedin,
  Minus,
  Menu,
  Phone,
  Plus,
  Search,
  Send,
  Share2,
  Shield,
  Tag,
  Twitter,
  User,
  X,
} from "lucide-react"

import styles from "./BlogPage.module.css"
import { blogData, type BlogArticle } from "./BlogData"

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
  { value: "views", label: "Most Viewed" },
  { value: "likes", label: "Top Rated" },
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

  const totalArticles = blogData.length
  const totalViews = blogData.reduce((acc, item) => acc + item.views, 0)
  const totalLikes = blogData.reduce((acc, item) => acc + item.likes, 0)
  const totalAuthors = new Set(blogData.map((item) => item.author)).size

  const stats = [
    { icon: <BookOpen size={22} />, label: "Published Articles", value: totalArticles },
    { icon: <User size={22} />, label: "Contributing Authors", value: totalAuthors },
    { icon: <Eye size={22} />, label: "Total Article Views", value: totalViews },
    { icon: <Heart size={22} />, label: "Reader Likes Logged", value: totalLikes },
  ]

  const topTags = useMemo(() => {
    const counts = blogData.reduce<Record<string, number>>((acc, article) => {
      article.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1
      })
      return acc
    }, {})

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag)
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

  const handleSortChange = (value: SortOption) => {
    setSortOption(value)
    setDisplayedCount(INITIAL_COUNT)
    if (value === "views") {
      showToast("Showing most viewed articles")
    } else if (value === "likes") {
      showToast("Showing top rated articles")
    } else {
      showToast("Sorted by latest articles")
    }
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
  const hasMore = displayedCount < filteredCount

  return (
    <div className={styles.page}>
      <BlogHeader />
      <div className={styles.animatedBackground} aria-hidden>
        <div className={`${styles.orb} ${styles.orbPrimary}`} />
        <div className={`${styles.orb} ${styles.orbAccent}`} />
        <div className={`${styles.orb} ${styles.orbHighlight}`} />
      </div>

      <main className="relative z-10 pb-24">
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
        <p className={styles.categoryHint}>Choose a category to tailor the insights you see.</p>
        <div className={styles.categories}>
          {categories.map((item) => (
            <button
              key={item.key}
              type="button"
              className={styles.category}
              data-active={category === item.key}
              aria-pressed={category === item.key}
              onClick={() => handleCategoryChange(item.key)}
            >
              {category === item.key ? <Minus size={16} /> : <Plus size={16} />}
              {item.label}
              <span className={styles.categoryCount}>{item.count}</span>
            </button>
          ))}
        </div>
        {!!topTags.length && (
          <div className={styles.quickFilters}>
            <span className={styles.quickFiltersLabel}>Popular tags:</span>
            <div className={styles.quickFiltersChips}>
              {topTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={styles.quickFiltersChip}
                  onClick={() => {
                    setSearchTerm(`#${tag}`)
                    showToast(`Showing articles tagged with #${tag}`)
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarHeading}>
            <h2 className={styles.sectionTitle}>Latest Articles</h2>
            <span className={styles.articleCount} aria-live="polite">
              {filteredCount} {filteredCount === 1 ? "article" : "articles"}
            </span>
          </div>
          <div className={styles.toolbarControls}>
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
            <label className={styles.sortControl}>
              <span className="sr-only">Sort articles</span>
              <select
                value={sortOption}
                onChange={(event) => handleSortChange(event.target.value as SortOption)}
                className={styles.sortSelect}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
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
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className={styles.cardImageMedia}
                      sizes="(min-width: 1280px) 360px, (min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                      priority={article.featured}
                    />
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
                      <p className={styles.excerpt}>{formatExcerpt(article.excerpt)}</p>
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
                          aria-label="Copy article link"
                        >
                          <Share2 size={18} />
                        </button>
                        <div className={styles.socialLinks} role="group" aria-label="Share on social media">
                          <button
                            type="button"
                            className={styles.socialButton}
                            onClick={() => openShareWindow("linkedin", article)}
                            aria-label="Share on LinkedIn"
                          >
                            <Linkedin size={16} />
                          </button>
                          <button
                            type="button"
                            className={styles.socialButton}
                            onClick={() => openShareWindow("facebook", article)}
                            aria-label="Share on Facebook"
                          >
                            <Facebook size={16} />
                          </button>
                          <button
                            type="button"
                            className={styles.socialButton}
                            onClick={() => openShareWindow("twitter", article)}
                            aria-label="Share on X"
                          >
                            <Twitter size={16} />
                          </button>
                        </div>
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
    </main>

      <BlogFooter />

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

function BlogHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog", current: true },
    { href: "/#products", label: "Products" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-fastfun-remote.png" alt="FastFun Remote logo" priority className="h-10 w-auto" />
            <span className="sr-only">FastFun Remote homepage</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={item.current ? "text-orange-500" : "transition-colors hover:text-orange-500"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="mailto:eric@fastfunrc.com"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-orange-600"
            >
              <Send size={16} />
              Email Us
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 sm:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 space-y-3 border-t border-slate-200 pt-3 sm:hidden">
            <nav className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="mailto:eric@fastfunrc.com"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-orange-600"
              onClick={() => setMenuOpen(false)}
            >
              <Send size={16} />
              Email Us
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

function BlogFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center justify-center sm:justify-start">
              <Image src="/logo-fastfun-remote.png" alt="FastFun Remote logo" className="h-12 w-auto" />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-slate-300">
              FastFun Remote is a trusted OEM/ODM partner delivering reliable RF remotes, receivers, and IoT solutions with ISO 9001 certified manufacturing.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-orange-400" />
                Global shipping support
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-400" />
                ISO 9001 certified
              </span>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick links</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-orange-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange-400">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-orange-400">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-orange-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-orange-400" />
                <a href="tel:+8615899648898" className="hover:text-orange-400">
                  +86 158 9964 8898
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Send className="mt-1 h-5 w-5 text-orange-400" />
                <a href="mailto:eric@fastfunrc.com" className="hover:text-orange-400">
                  eric@fastfunrc.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Factory className="mt-1 h-5 w-5 text-orange-400" />
                <span>8F, Building 1, Huawei Ke Valley, Dalingshan Town, Dongguan, Guangdong, China</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span> {currentYear} FastFun Remote. All rights reserved.</span>
          <div className="flex flex-wrap gap-6">
            <Link href="/#contact" className="hover:text-orange-400">
              Request support
            </Link>
            <Link href="/#products" className="hover:text-orange-400">
              View products
            </Link>
          </div>
        </div>
      </div>
    </footer>
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










