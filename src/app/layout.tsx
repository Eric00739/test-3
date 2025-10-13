import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.fastfunrc.com/#organization",
  "name": "FastFunRC",
  "alternateName": "FastFunRC | Gate & RF Remote Parts",
  "url": "https://www.fastfunrc.com/",
  "logo": "https://www.fastfunrc.com/logo-fastfun-remote.png",
  "sameAs": [
    "https://www.linkedin.com/company/fastfunrc/"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.fastfunrc.com/#website",
  "url": "https://www.fastfunrc.com/",
  "name": "FastFunRC",
  "publisher": { "@id": "https://www.fastfunrc.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.fastfunrc.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0B63E5' },
    { media: '(prefers-color-scheme: dark)', color: '#0B63E5' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fastfunrc.com"),
  title: "FastFunRC | OEM/ODM RF Remotes & Wi-Fi Switches",
  description:
    "FastFunRC provides in-house tooling, PCBA, RF tuning, and global certifications for custom RF remotes and Wi-Fi switch solutions.",
  keywords: [
    "RF remote OEM",
    "Wi-Fi switch manufacturer",
    "custom remote control",
    "RF PCBA",
    "FastFunRC"
  ],
  authors: [{ name: "FastFunRC" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/assets/icons/favicon-32x32.png", sizes: "32x32" },
      { url: "/assets/icons/favicon-192x192.png", sizes: "192x192" }
    ],
    apple: "/assets/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "FastFunRC | OEM/ODM RF Remotes & Wi-Fi Switches",
    description:
      "In-house factory for RF remote controls, Wi-Fi switches, and IoT modules with CE/FCC/RoHS support.",
    url: "https://www.fastfunrc.com/",
    siteName: "FastFunRC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastFunRC | OEM/ODM RF Remotes & Wi-Fi Switches",
    description:
      "In-house factory for RF remote controls and Wi-Fi switches with global certification support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        {children}
      </body>
    </html>
  );
}





