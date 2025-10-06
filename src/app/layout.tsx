import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Custom Remote Control & WiFi Switch Manufacturer | FastFun Remote",
  description: "Leading OEM/ODM manufacturer of custom remote controls, WiFi switches, and IoT modules. 15 years experience, ISO 9001 certified, 3M monthly capacity. Get your custom solution today.",
  keywords: ["OEM manufacturer", "ODM supplier", "custom remote control", "WiFi switch manufacturer", "IoT module factory", "RF remote supplier", "garage door remote manufacturer", "smart home OEM", "wireless control solutions", "FastFun Remote"],
  authors: [{ name: "FastFun Remote" }],
  openGraph: {
    title: "Custom Remote Control & WiFi Switch Manufacturer | FastFun Remote",
    description: "Expert OEM/ODM manufacturer of custom remote controls and IoT modules. From R&D to mass production.",
    url: "https://fastfunremote.com",
    siteName: "FastFun Remote",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Remote Control & WiFi Switch Manufacturer | FastFun Remote",
    description: "Expert OEM/ODM manufacturer of custom remote controls and IoT modules. From R&D to mass production.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
