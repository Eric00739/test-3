import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? ""
const normalizedBasePath = rawBasePath && !rawBasePath.startsWith("/") ? `/${rawBasePath}` : rawBasePath

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  assetPrefix: isProd && normalizedBasePath ? normalizedBasePath : undefined,
  basePath: isProd && normalizedBasePath ? normalizedBasePath : undefined,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  compiler: {
    removeConsole: isProd,
  },

  poweredByHeader: false,
  compress: true,
}

export default nextConfig
