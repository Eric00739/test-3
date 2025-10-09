import type { Metadata } from 'next'
import { BlogPage } from './BlogPage'

export const metadata: Metadata = {
  title: 'FastFunRC Blog - Innovation & Insights',
  description: 'Discover cutting-edge insights, industry trends, and expert perspectives on RC technology and innovation from FastFunRC.',
}

export default function Blog() {
  return <BlogPage />
}
