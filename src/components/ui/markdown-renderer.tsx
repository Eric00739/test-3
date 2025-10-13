"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'
import Link from 'next/link'
import { getAssetPath } from '@/lib/assets'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          // Custom heading component with anchor links
          h1: ({ children, id, ...props }) => (
            <h1 id={id} className="text-3xl font-bold text-gray-900 mt-8 mb-4 scroll-mt-20" {...props}>
              {children}
              {id && (
                <a href={`#${id}`} className="ml-2 text-gray-400 hover:text-orange-500 no-underline">
                  #
                </a>
              )}
            </h1>
          ),
          h2: ({ children, id, ...props }) => (
            <h2 id={id} className="text-2xl font-bold text-gray-900 mt-6 mb-3 scroll-mt-20" {...props}>
              {children}
              {id && (
                <a href={`#${id}`} className="ml-2 text-gray-400 hover:text-orange-500 no-underline">
                  #
                </a>
              )}
            </h2>
          ),
          h3: ({ children, id, ...props }) => (
            <h3 id={id} className="text-xl font-semibold text-gray-900 mt-4 mb-2 scroll-mt-20" {...props}>
              {children}
              {id && (
                <a href={`#${id}`} className="ml-2 text-gray-400 hover:text-orange-500 no-underline">
                  #
                </a>
              )}
            </h3>
          ),
          
          // Custom paragraph component
          p: ({ children, ...props }) => (
            <p className="text-gray-700 leading-relaxed mb-4" {...props}>
              {children}
            </p>
          ),
          
          // Custom list components
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed" {...props}>
              {children}
            </li>
          ),
          
          // Custom blockquote component
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-4 bg-orange-50 italic text-gray-700" {...props}>
              {children}
            </blockquote>
          ),
          
          // Custom code components
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !className
            return !isInline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg mb-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props}>
                {children}
              </code>
            )
          },
          
          // Custom image component with Next.js optimization
          img: ({ src, alt, ...props }: any) => {
            // Handle relative paths
            const srcString = typeof src === 'string' ? src : ''
            const imageSrc = srcString?.startsWith('/') ? getAssetPath(srcString) : srcString
            
            return (
              <div className="my-6">
                <Image
                  src={imageSrc || ''}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-md w-full h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  {...props}
                />
                {alt && (
                  <p className="text-center text-sm text-gray-600 mt-2 italic">
                    {alt}
                  </p>
                )}
              </div>
            )
          },
          
          // Custom link component
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http')
            
            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 underline"
                  {...props}
                >
                  {children}
                </a>
              )
            }
            
            return (
              <Link
                href={href || ''}
                className="text-orange-500 hover:text-orange-600 underline"
                {...props}
              >
                {children}
              </Link>
            )
          },
          
          // Custom table component
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300" {...props}>
                {children}
              </table>
            </div>
          ),
          
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50" {...props}>
              {children}
            </thead>
          ),
          
          th: ({ children, ...props }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900" {...props}>
              {children}
            </th>
          ),
          
          td: ({ children, ...props }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props}>
              {children}
            </td>
          ),
          
          // Custom hr component
          hr: ({ ...props }) => (
            <hr className="my-8 border-gray-300" {...props} />
          ),
          
          // Custom strong component
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props}>
              {children}
            </strong>
          ),
          
          // Custom em component
          em: ({ children, ...props }) => (
            <em className="italic text-gray-700" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}