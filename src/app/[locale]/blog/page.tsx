import type { Metadata } from 'next'
import { BlogPage, type BlogArticle } from './BlogPage'
import { getAllBlogPosts } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'FastFunRC Blog - Innovation & Insights',
  description: 'Discover cutting-edge insights, industry trends, and expert perspectives on RC technology and innovation from FastFunRC.',
}

export default function Blog() {
  const articles = getAllBlogPosts().map<BlogArticle>((post, index) => ({
    id: index + 1,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    tags: post.tags,
    image: post.image,
    featured: post.featured || false,
    views: Math.floor(Math.random() * 10000) + 1000,
    likes: Math.floor(Math.random() * 500) + 50,
  }))

  return <BlogPage articles={articles} />
}
