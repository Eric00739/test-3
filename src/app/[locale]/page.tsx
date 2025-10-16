import type { Metadata } from "next"
import { HomeClient } from "./HomeClient"

export const metadata: Metadata = {
  title: "FastFun Remote - RF Remote & Wi-Fi Switch Manufacturing | OEM/ODM Solutions",
  description:
    "Leading manufacturer of RF remotes, receivers, and Wi-Fi switches. 15+ years experience, 98.7% reliability, CE/FCC certified. Get samples in 2-5 days with complete documentation.",
  keywords:
    "RF remote control, Wi-Fi switch, OEM manufacturing, ODM solutions, 315MHz, 433MHz, IoT devices, electronic manufacturing",
  openGraph: {
    title: "FastFun Remote - RF Remote & Wi-Fi Switch Manufacturing",
    description:
      "Leading manufacturer of RF remotes, receivers, and Wi-Fi switches. 15+ years experience, 98.7% reliability.",
    type: "website",
    locale: "en_US",
    url: "https://www.fastfunrc.com",
    siteName: "FastFun Remote",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastFun Remote - RF Remote & Wi-Fi Switch Manufacturing",
    description:
      "Leading manufacturer of RF remotes, receivers, and Wi-Fi switches. 15+ years experience, 98.7% reliability.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function Home() {
  return <HomeClient />
}
