import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { getMessages } from "@/i18n/get-messages"
import { defaultLocale, locales } from "@/i18n/config"
import type { Locale } from "@/i18n/types"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const metadataContent: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "FastFunRC | OEM/ODM RF Remotes & Wi-Fi Switches",
    description:
      "FastFunRC provides in-house tooling, PCBA, RF tuning, and global certifications for custom RF remotes and Wi-Fi switch solutions.",
  },
  pt: {
    title: "FastFunRC | Controles RF OEM/ODM & Interruptores Wi-Fi",
    description:
      "A FastFunRC oferece ferramentaria própria, PCBA, ajuste RF e certificações globais para controles remotos RF e soluções de interruptores Wi-Fi sob medida.",
  },
  es: {
    title: "FastFunRC | Mandos RF OEM/ODM y Interruptores Wi-Fi",
    description:
      "FastFunRC integra herramentales propios, PCBA, sintonía RF y certificaciones globales para controles remotos RF e interruptores Wi-Fi personalizados.",
  },
  fr: {
    title: "FastFunRC | Télécommandes RF OEM/ODM & Interrupteurs Wi-Fi",
    description:
      "FastFunRC assure outillage interne, PCBA, réglage RF et certifications mondiales pour vos télécommandes RF et solutions Wi-Fi sur mesure.",
  },
  it: {
    title: "FastFunRC | Telecomandi RF OEM/ODM & Interruttori Wi-Fi",
    description:
      "FastFunRC cura internamente stampi, PCBA, taratura RF e certificazioni globali per telecomandi RF e interruttori Wi-Fi personalizzati.",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.fastfunrc.com/#organization",
  name: "FastFunRC",
  alternateName: "FastFunRC | Gate & RF Remote Parts",
  url: "https://www.fastfunrc.com/",
  logo: "https://www.fastfunrc.com/logo-fastfun-remote.png",
  sameAs: ["https://www.linkedin.com/company/fastfunrc/"],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.fastfunrc.com/#website",
  url: "https://www.fastfunrc.com/",
  name: "FastFunRC",
  publisher: { "@id": "https://www.fastfunrc.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.fastfunrc.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const { title, description } = metadataContent[locale] ?? metadataContent[defaultLocale]

  return {
    metadataBase: new URL("https://www.fastfunrc.com"),
    title,
    description,
    keywords: [
      "RF remote OEM",
      "Wi-Fi switch manufacturer",
      "custom remote control",
      "RF PCBA",
      "FastFunRC",
    ],
    authors: [{ name: "FastFunRC" }],
    alternates: {
      canonical: locale === defaultLocale ? "/" : `/${locale}`,
      languages: Object.fromEntries(
        locales.map((code) => [code, code === defaultLocale ? "/" : `/${code}`])
      ),
    },
    openGraph: {
      title,
      description,
      url: locale === defaultLocale ? "https://www.fastfunrc.com/" : `https://www.fastfunrc.com/${locale}`,
      siteName: "FastFunRC",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: [
        { url: "/assets/icons/favicon-32x32.png", sizes: "32x32" },
        { url: "/assets/icons/favicon-192x192.png", sizes: "192x192" },
      ],
      apple: "/assets/icons/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B63E5" },
    { media: "(prefers-color-scheme: dark)", color: "#0B63E5" },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    return null
  }

  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="supported-languages" content={locales.join(",")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
