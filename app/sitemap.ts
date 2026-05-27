import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.photonsecurity.in'
  const lastModified = new Date()
 
  const staticRoutes = [
    { url: baseUrl, lastModified, changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/legal/privacy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/legal/cookies`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  // Fetch all blog slugs from Sanity
  const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current, publishedAt }`)
  
  const blogRoutes = posts.map((post: { slug: string; publishedAt?: string }) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}

