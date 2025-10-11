import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Categories | FastFunRC - RF Remotes & WiFi Solutions",
  description: "Explore our comprehensive product portfolio including RF Remote Controls, RF Receivers, RF Kits, Car Remotes, WiFi Switches, WiFi Sockets, and Infrared Beams. Custom OEM/ODM solutions available.",
  keywords: [
    "RF Remote Controls",
    "RF Receivers",
    "RF Kits",
    "Car Remotes",
    "WiFi Switches",
    "WiFi Sockets",
    "Infrared Beams",
    "Wireless Control Systems",
    "OEM RF Solutions",
    "Custom Remote Manufacturing",
    "Smart Home Devices",
    "Industrial Remote Controls",
    "Automotive Security",
    "IoT Solutions"
  ],
  openGraph: {
    title: "Product Categories | FastFunRC - RF Remotes & WiFi Solutions",
    description: "Explore our comprehensive product portfolio including RF Remote Controls, RF Receivers, RF Kits, Car Remotes, WiFi Switches, WiFi Sockets, and Infrared Beams. Custom OEM/ODM solutions available.",
    url: "https://www.fastfunrc.com/products",
    siteName: "FastFunRC",
    type: "website",
    images: [
      {
        url: "https://www.fastfunrc.com/assets/logo-512.png",
        width: 512,
        height: 512,
        alt: "FastFunRC Product Categories"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Categories | FastFunRC - RF Remotes & WiFi Solutions",
    description: "Explore our comprehensive product portfolio including RF Remote Controls, RF Receivers, RF Kits, Car Remotes, WiFi Switches, WiFi Sockets, and Infrared Beams. Custom OEM/ODM solutions available.",
    images: ["https://www.fastfunrc.com/assets/logo-512.png"]
  },
  alternates: {
    canonical: "/products",
  },
};

// Structured data for product categories
export const productCategoriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Product Categories - FastFunRC",
  "description": "Comprehensive portfolio of RF remotes, WiFi solutions, and wireless control systems",
  "url": "https://www.fastfunrc.com/products",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Product",
        "name": "RF Remote Controls",
        "description": "High-performance RF remote controls with advanced encryption and extended range capabilities",
        "category": "Wireless Control Systems"
      },
      {
        "@type": "Product",
        "name": "RF Receivers",
        "description": "Professional grade RF receivers with superior sensitivity and multi-channel capabilities",
        "category": "Wireless Control Systems"
      },
      {
        "@type": "Product",
        "name": "RF Kits",
        "description": "All-in-one RF control kits with paired transmitters and receivers for quick deployment",
        "category": "Wireless Control Systems"
      },
      {
        "@type": "Product",
        "name": "Car Remotes",
        "description": "Professional automotive remote controls with immobilizer compatibility and advanced features",
        "category": "Automotive Security"
      },
      {
        "@type": "Product",
        "name": "WiFi Switches",
        "description": "WiFi-enabled smart switches with app control, voice commands, and energy monitoring",
        "category": "Smart Home"
      },
      {
        "@type": "Product",
        "name": "WiFi Sockets",
        "description": "Smart WiFi sockets with remote control, scheduling, and energy monitoring capabilities",
        "category": "Smart Home"
      },
      {
        "@type": "Product",
        "name": "Infrared Beams",
        "description": "Professional grade infrared beam sensors for perimeter security and detection systems",
        "category": "Security Systems"
      }
    ]
  },
  "provider": {
    "@type": "Organization",
    "name": "FastFunRC",
    "url": "https://www.fastfunrc.com",
    "logo": "https://www.fastfunrc.com/assets/logo-512.png"
  }
};