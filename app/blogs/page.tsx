import { client } from '@/lib/sanity'
import BlogList from '@/components/BlogList'

export const revalidate = 0

export default async function BlogsIndex() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      seoDescription,
      categories[]->{ title }
    }
  `)

  const categories = await client.fetch(`
    *[_type == "category"] | order(title asc) { title }
  `)

  const allCategories = ['All', ...categories.map((c: { title: string }) => c.title)]

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20 pt-24 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-white/[0.02] via-[#050505] to-[#050505] pointer-events-none" />

      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <BlogList posts={posts} allCategories={allCategories} />
      </section>
    </main>
  )
}

