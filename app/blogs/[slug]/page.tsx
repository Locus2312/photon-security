import { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

export const revalidate = 0

// This function dynamically generates the SEO tags for this specific blog
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      seoTitle,
      seoDescription,
      seoKeywords,
      title
    }`,
    { slug }
  )

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription,
    keywords: post.seoKeywords || [],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription,
      type: 'article',
    }
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      body,
      "authorName": author->name,
      categories[]->{ title }
    }`,
    { slug }
  )

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <h1 className="text-3xl font-light text-gray-500">Post not found</h1>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-[#050505] text-white/70 pb-24 selection:bg-white/20">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 pt-32 relative z-10">
        <header className="mb-16 text-center">
          {post.categories && post.categories.length > 0 && (
            <div className="flex justify-center gap-3 mb-8">
              {post.categories.map((cat: { title: string }) => (
                <span key={cat.title} className="px-3 py-1 border border-white/10 bg-white/5 text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">
                  {cat.title}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center space-x-3 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
            {post.authorName && <span>{post.authorName}</span>}
            {post.authorName && post.publishedAt && <span>{"//"}</span>}
            {post.publishedAt && (
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            )}
          </div>
        </header>

        {post.mainImage && (
          <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/60 prose-p:leading-relaxed prose-headings:text-white prose-a:text-white prose-a:underline hover:prose-a:text-white/70">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-white/40 font-mono tracking-wide text-sm">No content available.</p>
          )}
        </div>
      </div>
    </article>
  )
}
