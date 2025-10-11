"use client"

import Head from "next/head"
import { useEffect, useRef } from "react"

interface StructuredData {
  "@context": string
  "@type": string
  name?: string
  description?: string
  url?: string
  image?: string
  author?: {
    "@type": string
    name: string
  }
  publisher?: {
    "@type": string
    name: string
    logo?: {
      "@type": string
      url: string
    }
  }
  datePublished?: string
  dateModified?: string
  mainEntityOfPage?: {
    "@type": string
    "@id": string
  }
  breadcrumb?: {
    "@type": string
    itemListElement: {
      "@type": string
      position: number
      name: string
      item: string
    }[]
  }
  articleSection?: string[]
  keywords?: string[]
  inLanguage?: string
  isPartOf?: {
    "@type": string
    name: string
    url: string
  }
  headline?: string
}

interface SEOAccessibilityProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  imageUrl?: string
  articleData?: {
    author: string
    publishDate: string
    modifyDate?: string
    category: string
    tags: string[]
  }
  breadcrumbItems?: {
    name: string
    url: string
  }[]
}

export function SEOAccessibility({
  title = "FastFunRC Blog - Innovation & Insights",
  description = "Discover cutting-edge insights, industry trends, and expert perspectives on RC technology and innovation from FastFunRC.",
  keywords = ["RC technology", "remote control", "IoT", "innovation", "FastFunRC"],
  canonicalUrl,
  imageUrl = "https://fastfunrc.com/images/blog-og.jpg",
  articleData,
  breadcrumbItems = [
    { name: "Home", url: "https://fastfunrc.com" },
    { name: "Blog", url: "https://fastfunrc.com/blog" }
  ]
}: SEOAccessibilityProps) {
  useEffect(() => {
    // Accessibility enhancements
    // Skip to main content link
    const skipLink = document.createElement('a')
    skipLink.href = '#main-content'
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50'
    skipLink.textContent = 'Skip to main content'
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Announce page changes to screen readers
    const announcePageChange = () => {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = `Page loaded: ${title}`
      document.body.appendChild(announcement)
      setTimeout(() => document.body.removeChild(announcement), 1000)
    }
    announcePageChange()

    // Focus management for keyboard navigation
    const handleFocusTrap = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent
      if (keyboardEvent.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (keyboardEvent.shiftKey && document.activeElement === firstElement) {
          keyboardEvent.preventDefault()
          lastElement?.focus()
        } else if (!keyboardEvent.shiftKey && document.activeElement === lastElement) {
          keyboardEvent.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Add focus trap to modals
    const modals = document.querySelectorAll('[role="dialog"]')
    modals.forEach(modal => {
      modal.addEventListener('keydown', handleFocusTrap)
    })

    // Cleanup
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink)
      }
      modals.forEach(modal => {
        modal.removeEventListener('keydown', handleFocusTrap)
      })
    }
  }, [title])

  // Generate structured data
  const generateStructuredData = (): StructuredData[] => {
    const structuredData: StructuredData[] = []

    // Website/Blog structured data
    const websiteData: StructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "FastFunRC Blog",
      description,
      url: canonicalUrl || "https://fastfunrc.com/blog",
      publisher: {
        "@type": "Organization",
        name: "FastFunRC",
        logo: {
          "@type": "ImageObject",
          url: "https://fastfunrc.com/logo.png"
        }
      },
      inLanguage: "en-US"
    }
    structuredData.push(websiteData)

    // Breadcrumb structured data
    if (breadcrumbItems.length > 0) {
      const breadcrumbData: StructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        breadcrumb: {
          "@type": "ItemList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        }
      }
      structuredData.push(breadcrumbData)
    }

    // Article structured data (if article data is provided)
    if (articleData) {
      const articleDataStructured: StructuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: canonicalUrl,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: articleData.author
        },
        publisher: {
          "@type": "Organization",
          name: "FastFunRC",
          logo: {
            "@type": "ImageObject",
            url: "https://fastfunrc.com/logo.png"
          }
        },
        datePublished: articleData.publishDate,
        dateModified: articleData.modifyDate || articleData.publishDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl || "https://fastfunrc.com/blog"
        },
        articleSection: [articleData.category],
        keywords: articleData.tags,
        inLanguage: "en-US"
      }
      structuredData.push(articleDataStructured)
    }

    // Organization structured data
    const organizationData: StructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "FastFunRC",
      url: "https://fastfunrc.com",
      description: "Trusted OEM/ODM partner delivering reliable RF remotes, receivers, and IoT solutions with ISO 9001 certified manufacturing."
    }
    structuredData.push(organizationData)

    return structuredData
  }

  const structuredData = generateStructuredData()

  return (
    <>
      <Head>
        {/* Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl || "https://fastfunrc.com/blog"} />
        <meta property="og:type" content={articleData ? "article" : "website"} />
        <meta property="og:site_name" content="FastFunRC" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@fastfunrc" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content={articleData?.author || "FastFunRC Team"} />
        <meta name="language" content="English" />
        <meta name="geo.region" content="CN" />
        <meta name="geo.placename" content="Dongguan, Guangdong, China" />
        
        {/* Article specific meta tags */}
        {articleData && (
          <>
            <meta property="article:published_time" content={articleData.publishDate} />
            <meta property="article:modified_time" content={articleData.modifyDate || articleData.publishDate} />
            <meta property="article:author" content={articleData.author} />
            <meta property="article:section" content={articleData.category} />
            {articleData.tags.map((tag, index) => (
              <meta key={index} property="article:tag" content={tag} />
            ))}
          </>
        )}
        
        {/* Structured Data */}
        {structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect for Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </Head>
      
      {/* Accessibility Features */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        <div id="accessibility-announcements"></div>
      </div>
      
      {/* Main Content Landmark */}
      <main id="main-content" role="main" tabIndex={-1}>
        {/* Content will be rendered here */}
      </main>
      
      {/* Screen Reader Only Styles */}
      <style jsx global>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .focus:not-sr-only {
          position: static;
          width: auto;
          height: auto;
          padding: revert;
          margin: revert;
          overflow: visible;
          clip: auto;
          white-space: revert;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .high-contrast-support {
            border: 2px solid;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}

// Hook for announcing changes to screen readers
export function useAnnouncer() {
  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.getElementById("accessibility-announcements")
    if (announcement) {
      announcement.setAttribute("aria-live", priority)
      announcement.textContent = message
      
      // Clear after announcement
      setTimeout(() => {
        announcement.textContent = ""
      }, 1000)
    }
  }
  
  return { announce }
}

// Component for focus management
export function FocusManager({ children, restoreFocus = true }: { 
  children: React.ReactNode
  restoreFocus?: boolean 
}) {
  const previousFocusRef = useRef<HTMLElement | null>(null)
  
  useEffect(() => {
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement
      
      return () => {
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [restoreFocus])
  
  return <>{children}</>
}