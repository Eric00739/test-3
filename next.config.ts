import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

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
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? '/nextjs_tailwind_shadcn_ts' 
    : undefined,
  
  // 基础路径配置
  basePath: process.env.NODE_ENV === 'production' 
    ? '/nextjs_tailwind_shadcn_ts' 
    : undefined,
};

export default nextConfig;