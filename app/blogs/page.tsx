import { client } from '@/lib/sanity'
import BlogList from '@/components/BlogList'

export const revalidate = 0

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogsIndex({ searchParams }: PageProps) {
  const params = await searchParams
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1
  const category = typeof params.category === 'string' ? params.category : 'All'
  const q = typeof params.q === 'string' ? params.q : ''

  const limit = 12
  const offset = (page - 1) * limit

  let filterQuery = `_type == "post"`
  if (category !== 'All') {
    filterQuery += ` && "${category}" in categories[]->title`
  }
  if (q) {
    // Sanity string matching
    filterQuery += ` && (title match "*${q}*" || seoDescription match "*${q}*")`
  }

  const postsQuery = `*[${filterQuery}] | order(publishedAt desc)[${offset}...${offset + limit}] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    seoDescription,
    categories[]->{ title }
  }`

  const countQuery = `count(*[${filterQuery}])`

  const [posts, totalPosts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(countQuery),
    client.fetch(`*[_type == "category"] | order(title asc) { title }`)
  ])

  const totalPages = Math.ceil(totalPosts / limit)
  const allCategories = ['All', ...categories.map((c: { title: string }) => c.title)]

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20 pt-24 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-white/[0.02] via-[#050505] to-[#050505] pointer-events-none" />

      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <BlogList 
          posts={posts} 
          allCategories={allCategories} 
          currentPage={page} 
          totalPages={totalPages} 
          currentCategory={category}
          currentSearch={q}
        />
      </section>
    </main>
  )
}

