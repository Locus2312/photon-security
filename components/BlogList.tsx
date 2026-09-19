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

// Inline film-grain used to unify disparate cover art into one editorial system.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Cover treatment: default monochrome + duotone + grain, revealing full colour
 * only on hover. This makes AI-looking source images read as intentional,
 * branded editorial art and keeps the whole grid visually cohesive.
 */
function Cover({
  image,
  alt,
  sizes,
  priority,
}: {
  image: unknown
  alt: string
  sizes: string
  priority?: boolean
}) {
  if (!image) {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0d1f1f_0%,#0a0a0a_50%,#141210_100%)]">
        <div
          className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
      </div>
    )
  }

  return (
    <>
      <Image
        src={urlFor(image).width(1400).height(900).url()}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale contrast-[1.15] brightness-[0.82] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.04]"
      />
      {/* Duotone tint (brand teal → warm) that lifts on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2020]/50 via-transparent to-[#1c1408]/50 mix-blend-color opacity-70 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE }}
      />
      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5 pointer-events-none" />
    </>
  )
}

export default function BlogList({
  posts,
  allCategories,
  currentPage,
  totalPages,
  currentCategory,
  currentSearch,
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
      setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('resize', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [allCategories])

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -280, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 280, behavior: 'smooth' })
  }

  const updateQueryParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === '' || (key === 'category' && value === 'All')) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, pathname, router]
  )

  // Debounce search update
  useEffect(() => {
    const delay = setTimeout(() => {
      if (localSearch !== currentSearch) {
        updateQueryParams({ q: localSearch, page: '1' })
      }
    }, 500)
    return () => clearTimeout(delay)
  }, [localSearch, currentSearch, updateQueryParams])

  // Entrance animation on filter / page change
  useGSAP(
    () => {
      const items = container.current?.querySelectorAll('.blog-reveal')
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', overwrite: true }
        )
      }
    },
    { dependencies: [currentCategory, currentSearch, currentPage], scope: container }
  )

  const pageNumbers: (number | string)[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)
  } else if (currentPage <= 4) {
    pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages)
  } else if (currentPage >= totalPages - 3) {
    pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  } else {
    pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
  }

  const isDefaultView = currentPage === 1 && currentCategory === 'All' && !currentSearch
  const featured = isDefaultView && posts.length > 2 ? posts[0] : null
  const gridPosts = featured ? posts.slice(1) : posts
  const indexOffset = featured ? 2 : 1

  return (
    <div className="max-w-6xl mx-auto px-4" ref={container}>
      {/* Masthead */}
      <header className="pt-8 mb-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/40" />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/50">
            Journal / Threat Intelligence
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white leading-[0.95]">
            Security
            <br />
            Insights
          </h1>
          <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 leading-relaxed md:pb-3 md:text-right">
            Field notes, research and adversary intelligence from the Photon team.
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col gap-6 mb-16">
        {/* Search */}
        <div className="relative group max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
            <svg
              className="w-4 h-4 text-white/40 group-focus-within:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="SEARCH ALL TOPICS"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/15 pl-7 pr-4 py-3 text-sm font-mono uppercase tracking-[0.15em] text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="relative flex items-center border-b border-white/10">
          <div
            className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center justify-start z-10 transition-opacity duration-300 ${
              showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={scrollLeft}
              aria-label="Scroll categories left"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto w-full snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {allCategories.map((category) => {
              const active = currentCategory === category
              return (
                <button
                  key={category}
                  onClick={() => updateQueryParams({ category, page: '1' })}
                  className={`relative flex-shrink-0 snap-start whitespace-nowrap px-4 py-3.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active ? 'text-white' : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  {category}
                  <span
                    className={`absolute left-4 right-4 -bottom-px h-px bg-white transition-transform duration-300 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div
            className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent flex items-center justify-end z-10 transition-opacity duration-300 ${
              showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={scrollRight}
              aria-label="Scroll categories right"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-white/40 mt-24 mb-24 text-sm font-mono uppercase tracking-[0.25em]">
          No posts found.
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="blog-reveal group relative grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors duration-500 mb-20"
            >
              <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[420px] overflow-hidden order-1 md:order-2">
                <Cover
                  image={featured.mainImage}
                  alt={featured.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="relative flex flex-col justify-between p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
                    Featured
                  </span>
                  <span className="font-mono text-xs text-white/30 tabular-nums">01</span>
                </div>
                <div>
                  {featured.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.categories.map((cat) => (
                        <span
                          key={cat.title}
                          className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/15 px-2.5 py-1 rounded-sm"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white leading-tight mb-5 text-balance">
                    {featured.title}
                  </h2>
                  {featured.seoDescription && (
                    <p className="text-white/50 text-base leading-relaxed line-clamp-3 font-light max-w-xl">
                      {featured.seoDescription}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                  {featured.publishedAt && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {formatDate(featured.publishedAt)}
                    </span>
                  )}
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white group-hover:gap-3 transition-all">
                    Read
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {gridPosts.map((post, i) => (
              <Link
                key={post._id}
                href={`/blogs/${post.slug}`}
                className="blog-reveal group block"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-500 mb-5">
                  <Cover
                    image={post.mainImage}
                    alt={post.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 font-mono text-[11px] text-white/70 tabular-nums z-10">
                    {String(i + indexOffset).padStart(2, '0')}
                  </span>
                  {post.categories?.length > 0 && (
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-10">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat.title}
                          className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/80 bg-black/40 backdrop-blur-sm border border-white/15 px-2 py-1 rounded-sm"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-medium text-white/85 group-hover:text-white mb-2.5 tracking-tight leading-snug transition-colors text-balance">
                  {post.title}
                </h2>

                {post.seoDescription && (
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2 font-light">
                    {post.seoDescription}
                  </p>
                )}

                {post.publishedAt && (
                  <div className="mt-5 flex items-center gap-3 font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
                    <span className="h-px w-4 bg-white/20" />
                    {formatDate(post.publishedAt)}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-2 md:gap-4">
          <button
            onClick={() => updateQueryParams({ page: (currentPage - 1).toString() })}
            disabled={currentPage <= 1}
            className="hidden md:flex px-6 py-2.5 rounded-full border border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            Prev
          </button>

          <div className="flex items-center gap-1.5 md:gap-2">
            {pageNumbers.map((p, idx) =>
              p === '...' ? (
                <span key={`ellipsis-${idx}`} className="text-white/40 px-1 md:px-2">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  onClick={() => updateQueryParams({ page: p.toString() })}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-mono tabular-nums transition-all ${
                    currentPage === p
                      ? 'bg-white text-black font-medium'
                      : 'border border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => updateQueryParams({ page: (currentPage + 1).toString() })}
            disabled={currentPage >= totalPages}
            className="hidden md:flex px-6 py-2.5 rounded-full border border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
