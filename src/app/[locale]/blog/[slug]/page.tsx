import { notFound } from "next/navigation"
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { HeaderBar } from "@/components/home/HeaderBar"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Breadcrumb } from "@/components/seo/Breadcrumb"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { locales } from "@/i18n/config"
import { getAssetPath } from "@/lib/assets"
import { Calendar, Clock3, User, ArrowLeft, Share2, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    })),
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [getAssetPath(post.image)],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getAllBlogPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <HeaderBar
        activeSection="blog"
        navLinks={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/#products" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-64 sm:h-80">
          <div className="absolute inset-0">
            <Image
              src={getAssetPath(post.image)}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto w-full">
              {/* Breadcrumb */}
              <Breadcrumb
                items={[
                  { name: "Home", url: "/" },
                  { name: "Blog", url: "/blog" },
                  { name: post.title, url: `/blog/${post.slug}` },
                ]}
                className="mb-4 text-white/80"
              />
              
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 sm:mb-0">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Heart size={16} />
                  Like
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Article Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/blog" className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors">
                  <ArrowLeft size={20} />
                  <span>Back to Blog</span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye size={16} />
                    <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart size={16} />
                    <span>{Math.floor(Math.random() * 100) + 10} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40">
                      <Image
                        src={getAssetPath(relatedPost.image)}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{relatedPost.author}</span>
                        <span className="mx-2 text-gray-300">·</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
