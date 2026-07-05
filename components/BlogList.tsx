'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
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
  currentPage: number
  totalPages: number
  currentCategory: string
  currentSearch: string
}

export default function BlogList({ 
  posts, 
  allCategories, 
  currentPage, 
  totalPages, 
  currentCategory, 
  currentSearch 
}: BlogListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [localSearch, setLocalSearch] = useState(currentSearch)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const container = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      // Use a small threshold (e.g. 5px) for rounding errors
      setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5)
    }
  }

  // Initialize arrow visibility on mount and handle resize
  useEffect(() => {
    handleScroll()
    window.addEventListener('resize', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [allCategories])
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' })
    }
  }

  const updateQueryParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || (key === 'category' && value === 'All')) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, pathname, router])

  // Debounce search update
  useEffect(() => {
    const delay = setTimeout(() => {
      if (localSearch !== currentSearch) {
        updateQueryParams({ q: localSearch, page: '1' })
      }
    }, 500)
    return () => clearTimeout(delay)
  }, [localSearch, currentSearch, updateQueryParams])

  // GSAP Animation for filtering
  useGSAP(() => {
    const cards = container.current?.querySelectorAll('.blog-card')
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', overwrite: true }
      )
    }
  }, { dependencies: [currentCategory, currentSearch, currentPage], scope: container })

  const pageNumbers = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)
  } else {
    if (currentPage <= 4) {
      pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4" ref={container}>
      {/* Header Row: Title, Nav Links, Search */}
      <div className="mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8">
          Security Insights
        </h1>

        <div className="flex flex-col gap-8">
          {/* Search Bar - Full width on mobile like Medium */}
          <div className="relative group max-w-2xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-white/40 group-focus-within:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search all topics..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-base text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all w-full"
            />
          </div>

          {/* Categories - Horizontally Scrollable Pill Buttons (Medium Style) */}
          <div className="relative flex items-center pb-4 border-b border-white/5">
            
            {/* Left Scroll Button */}
            <div className={`absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent flex items-center justify-start z-10 transition-opacity duration-300 ${showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <button 
                onClick={scrollLeft}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-3 w-full snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2"
            >
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => updateQueryParams({ category, page: '1' })}
                  className={`flex-shrink-0 snap-start rounded-full px-5 py-2.5 text-sm transition-all duration-300 border ${
                    currentCategory === category
                      ? 'bg-white text-black border-white font-medium'
                      : 'bg-[#111] text-white/70 border-white/10 hover:border-white/30 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            <div className={`absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent flex items-center justify-end z-10 transition-opacity duration-300 ${showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <button 
                onClick={scrollRight}
                className="w-8 h-8 rounded-full bg-[#111] hover:bg-[#222] text-white flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-colors mr-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="text-center text-white/40 mt-20 text-lg font-mono tracking-wide">No posts found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
                  <div className="flex flex-wrap gap-2 mb-5">
                    {post.categories.map((cat) => (
                      <span key={cat.title} className="text-[9px] md:text-[10px] whitespace-nowrap font-mono uppercase tracking-[0.2em] text-white/50 border border-white/10 bg-white/5 px-2 py-1 rounded-sm group-hover:text-white group-hover:border-white/30 transition-all">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2 md:gap-4">
          <button
            onClick={() => updateQueryParams({ page: (currentPage - 1).toString() })}
            disabled={currentPage <= 1}
            className="hidden md:flex px-6 py-2.5 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1.5 md:gap-2">
            {pageNumbers.map((p, idx) => (
              p === '...' ? (
                <span key={`ellipsis-${idx}`} className="text-white/40 px-1 md:px-2">...</span>
              ) : (
                <button
                  key={`page-${p}`}
                  onClick={() => updateQueryParams({ page: p.toString() })}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                    currentPage === p
                      ? 'bg-white text-black font-medium'
                      : 'border border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              )
            ))}
          </div>

          <button
            onClick={() => updateQueryParams({ page: (currentPage + 1).toString() })}
            disabled={currentPage >= totalPages}
            className="hidden md:flex px-6 py-2.5 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
