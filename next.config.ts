import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const isProd = process.env.NODE_ENV === "production"
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? ""
const normalizedBasePath = rawBasePath && !rawBasePath.startsWith("/") ? `/${rawBasePath}` : rawBasePath

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },

  // Remove eslint config to avoid compilation issues
  // eslint: {
  //   ignoreDuringBuilds: false,
  // },

  // Removed static export for Vercel deployment
  // output: "export",
  trailingSlash: true,

  images: {
    // Keep unoptimized for now, but Vercel can handle optimized images
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Remove asset prefix and base path for Vercel
  // assetPrefix: isProd && normalizedBasePath ? normalizedBasePath : undefined,
  // basePath: isProd && normalizedBasePath ? normalizedBasePath : undefined,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  compiler: {
    // Keep console logs for debugging in production
    removeConsole: false,
  },

  poweredByHeader: false,
  compress: true,
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withNextIntl(nextConfig)
