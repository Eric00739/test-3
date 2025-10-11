"use client"

import { useEffect, useRef, useState } from "react"

interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp: number
  sessionId: string
  userId?: string
  metadata?: Record<string, any>
}

interface ClickTrackingProps {
  children: React.ReactNode
  trackingData: {
    category: string
    action: string
    label?: string
    value?: number
    metadata?: Record<string, any>
  }
}

interface ViewTrackingProps {
  children: React.ReactNode
  trackingData: {
    category: string
    action: string
    label?: string
    value?: number
    metadata?: Record<string, any>
  }
  threshold?: number
}

class AnalyticsManager {
  private static instance: AnalyticsManager
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private userId: string | null = null

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.loadUserId()
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager()
    }
    return AnalyticsManager.instance
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private loadUserId(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fastfunrc-user-id')
      if (stored) {
        this.userId = stored
      } else {
        this.userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('fastfunrc-user-id', this.userId)
      }
    }
  }

  track(event: AnalyticsEvent): void {
    this.events.push(event)
    this.sendToAnalytics(event)
  }

  trackClick(category: string, action: string, label?: string, value?: number, metadata?: Record<string, any>): void {
    this.track({
      event: 'click',
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      metadata
    })
  }

  trackView(category: string, action: string, label?: string, value?: number, metadata?: Record<string, any>): void {
    this.track({
      event: 'view',
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      metadata
    })
  }

  trackEngagement(category: string, action: string, duration: number, metadata?: Record<string, any>): void {
    this.track({
      event: 'engagement',
      category,
      action,
      value: duration,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      metadata
    })
  }

  trackConversion(category: string, action: string, value?: number, metadata?: Record<string, any>): void {
    this.track({
      event: 'conversion',
      category,
      action,
      value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      metadata
    })
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_map: {
          session_id: event.sessionId,
          user_id: event.userId
        }
      })
    }

    // Send to custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    }).catch(error => {
      console.warn('Analytics tracking failed:', error)
    })

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event)
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  clearEvents(): void {
    this.events = []
  }

  // A/B Testing Methods
  getVariant(testName: string, variants: string[]): string {
    const stored = localStorage.getItem(`ab_test_${testName}`)
    if (stored) {
      return stored
    }

    const hash = this.hashCode(this.userId + testName)
    const variantIndex = Math.abs(hash) % variants.length
    const variant = variants[variantIndex]

    localStorage.setItem(`ab_test_${testName}`, variant)
    
    this.track({
      event: 'ab_test',
      category: 'ab_testing',
      action: 'variant_assigned',
      label: testName,
      value: variantIndex,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      metadata: {
        variant,
        total_variants: variants.length
      }
    })

    return variant
  }

  private hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash
  }
}

// React Components for Tracking
export function ClickTracker({ children, trackingData }: ClickTrackingProps) {
  const analytics = AnalyticsManager.getInstance()
  const elementRef = useRef<HTMLElement>(null)

  const handleClick = () => {
    analytics.trackClick(
      trackingData.category,
      trackingData.action,
      trackingData.label,
      trackingData.value,
      trackingData.metadata
    )
  }

  return (
    <div ref={elementRef as any} onClick={handleClick}>
      {children}
    </div>
  )
}

export function ViewTracker({ children, trackingData, threshold = 0.5 }: ViewTrackingProps) {
  const analytics = AnalyticsManager.getInstance()
  const elementRef = useRef<HTMLElement>(null)
  const hasTracked = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold && !hasTracked.current) {
            analytics.trackView(
              trackingData.category,
              trackingData.action,
              trackingData.label,
              trackingData.value,
              trackingData.metadata
            )
            hasTracked.current = true
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [trackingData, threshold, analytics])

  return (
    <div ref={elementRef as any}>
      {children}
    </div>
  )
}

// Hook for A/B Testing
export function useABTest(testName: string, variants: string[]): string {
  const analytics = AnalyticsManager.getInstance()
  const [variant, setVariant] = useState<string>('')

  useEffect(() => {
    const assignedVariant = analytics.getVariant(testName, variants)
    setVariant(assignedVariant)
  }, [testName, variants, analytics])

  return variant
}

// Hook for tracking engagement time
export function useEngagementTracking(category: string, action: string) {
  const analytics = AnalyticsManager.getInstance()
  const startTime = useRef<number>(Date.now())
  const isActive = useRef(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive.current = false
      } else {
        isActive.current = true
        startTime.current = Date.now()
      }
    }

    const handleBeforeUnload = () => {
      if (isActive.current) {
        const duration = Date.now() - startTime.current
        analytics.trackEngagement(category, action, duration)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      
      if (isActive.current) {
        const duration = Date.now() - startTime.current
        analytics.trackEngagement(category, action, duration)
      }
    }
  }, [category, action, analytics])
}

// Export singleton instance
export const analytics = AnalyticsManager.getInstance()