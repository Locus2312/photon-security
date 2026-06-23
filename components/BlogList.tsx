'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

type Category = {
  title: string
}

type Post = {
  _id: string
  title: string
  slug: string
  mainImage: unknown
  publishedAt: string
  seoDescription: string
  categories: Category[]
}

interface BlogListProps {
  posts: Post[]
  allCategories: string[]
}

export default function BlogList({ posts, allCategories }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const container = useRef<HTMLDivElement>(null)

  // Filter posts based on category
  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post =>
      post.categories?.some(cat => cat.title === activeCategory)
    )

  // GSAP Animation for filtering
  useGSAP(() => {
    const cards = container.current?.querySelectorAll('.blog-card')
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', overwrite: true }
      )
    }
  }, { dependencies: [activeCategory], scope: container })

  return (
    <div className="max-w-6xl mx-auto px-4" ref={container}>
      {/* Header Row: Title, Nav Links, Search */}
      <div className="mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8">
          Security Insights
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Category Links */}
          <div className="flex flex-wrap items-center gap-6">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[15px] transition-colors duration-300 ${activeCategory === category
                  ? 'text-white font-medium'
                  : 'text-white/40 hover:text-white/80'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-white/30 group-focus-within:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#0a0a0a] border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:bg-[#111] transition-all w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center text-white/40 mt-20 text-lg font-mono tracking-wide">No posts found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blogs/${post.slug}`}
              className="blog-card group block rounded-xl bg-[#050505] border border-white/10 hover:border-white/30 hover:bg-[#0a0a0a] transition-all duration-300 overflow-hidden"
            >
              {!!post.mainImage && (
                <div className="w-full h-56 relative bg-[#080808] overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(800).height(500).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-out"
                  />
                  {/* Subtle Gradient Mask over image to blend into dark card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
                </div>
              )}
              <div className="p-8 relative">
                {/* Categories Badge */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 mb-5">
                    {post.categories.map((cat) => (
                      <span key={cat.title} className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 border border-white/10 bg-white/5 px-2 py-1 rounded-sm group-hover:text-white group-hover:border-white/30 transition-all">
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-xl font-medium text-white/80 group-hover:text-white mb-3 tracking-tight transition-colors">
                  {post.title}
                </h2>

                {post.seoDescription && (
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2 font-light">
                    {post.seoDescription}
                  </p>
                )}

                {post.publishedAt && (
                  <div className="mt-8 flex items-center text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
