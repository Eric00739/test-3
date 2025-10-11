import { ReactNode } from 'react'
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import { buildBreadcrumbJsonLd, stringifyJsonLd } from "@/lib/seo"
import Script from 'next/script'

interface AccessoriesLayoutProps {
  children: ReactNode
  title: string
  description: string
  breadcrumbItems: Array<{ name: string; url: string }>
  className?: string
}

export function AccessoriesLayout({
  children,
  title,
  description,
  breadcrumbItems,
  className = ""
}: AccessoriesLayoutProps) {
  const jsonLd = stringifyJsonLd(buildBreadcrumbJsonLd(breadcrumbItems))

  return (
    <main className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
      </header>
      {children}
    </main>
  )
}