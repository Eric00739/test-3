import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const normalizedBasePath = rawBasePath && !rawBasePath.startsWith("/")
  ? `/${rawBasePath}`
  : rawBasePath;

const nextConfig: NextConfig = {
  // 启用严格模式以提前发现潜在问题
  reactStrictMode: true,
  
  // 开启类型检查以确保代码质量
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // 开启ESLint检查
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // GitHub Pages 静态导出配置
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // 资源前缀配置（用于GitHub Pages）
  assetPrefix: isProd && normalizedBasePath ? normalizedBasePath : undefined,
  
  // 基础路径配置
  basePath: isProd && normalizedBasePath ? normalizedBasePath : undefined,
};

export default nextConfig;