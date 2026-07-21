import { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { BlogThemeWrapper } from '@/components/BlogThemeWrapper'

export const revalidate = 0

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
    alternates: {
      canonical: `https://www.photonsecurity.in/blogs/${slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription,
      url: `https://www.photonsecurity.in/blogs/${slug}`,
      type: 'article',
    }
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-12 mb-6 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-10 mb-5 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-3xl font-semibold text-foreground mt-8 mb-4 tracking-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-2xl font-semibold text-foreground mt-6 mb-3 tracking-tight">{children}</h4>,
    normal: ({ children }) => <p className="text-muted-foreground leading-loose text-lg md:text-xl mb-8 font-light">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-foreground/90 text-xl font-serif">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-3 text-muted-foreground font-light text-lg md:text-xl">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-muted-foreground font-light text-lg md:text-xl">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-muted border border-border px-1.5 py-0.5 rounded font-mono text-sm text-foreground">{children}</code>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-foreground underline underline-offset-4 decoration-border hover:decoration-primary transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: { asset?: unknown; alt?: string; caption?: string } }) => {
      if (!value || !value.asset) return null;
      return (
        <div className="my-12 w-full">
          <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden border border-border shadow-xl">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="mt-4 text-center text-sm text-muted-foreground font-mono tracking-wide">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }: { value: { code?: string; filename?: string } }) => {
      if (!value || !value.code) return null;
      return (
        <div className="my-10 w-full">
          {value.filename && (
            <div className="bg-card border-x border-t border-border px-4 py-2 rounded-t-xl text-sm font-mono text-muted-foreground tracking-wider">
              {value.filename}
            </div>
          )}
          <pre className={`bg-[#0d0d0d] border border-border p-6 ${value.filename ? 'rounded-b-xl' : 'rounded-xl'} overflow-x-auto text-sm md:text-base font-mono text-emerald-400/90 shadow-xl`}>
            <code>{value.code}</code>
          </pre>
        </div>
      )
    },
    table: ({ value }: { value: { rows?: { cells: string[] }[] } }) => {
      if (!value || !value.rows || value.rows.length === 0) return null;
      
      const [headerRow, ...bodyRows] = value.rows;
      
      return (
        <div className="my-10 w-full overflow-x-auto rounded-xl border border-border bg-card shadow-lg">
          <table className="w-full text-left border-collapse text-base md:text-lg text-foreground/80">
            {headerRow && (
              <thead>
                <tr className="border-b border-border bg-muted/50 font-semibold text-foreground">
                  {headerRow.cells.map((cell: string, idx: number) => (
                    <th key={idx} className="px-6 py-5 font-semibold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row: { cells: string[] }, rowIdx: number) => (
                <tr key={rowIdx} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  {row.cells.map((cell: string, cellIdx: number) => (
                    <td key={cellIdx} className="px-6 py-5 text-muted-foreground font-light">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    iocBlock: ({ value }: { value: { type?: string; indicators?: string[] } }) => {
      if (!value || !value.indicators || value.indicators.length === 0) return null;
      return (
        <div className="my-10 rounded-xl border border-destructive/30 bg-destructive/10 p-6 md:p-8 shadow-lg">
          <h4 className="text-destructive font-mono text-base tracking-wider uppercase mb-5 border-b border-destructive/20 pb-3">
            IOC: {value.type || 'Indicator'}
          </h4>
          <ul className="space-y-3">
            {value.indicators.map((ind: string, idx: number) => (
              <li key={idx} className="font-mono text-foreground/90 text-sm md:text-base bg-background/50 px-4 py-2.5 rounded-lg flex justify-between items-center border border-border/50">
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    attackTimeline: ({ value }: { value: { events?: { timestamp: string; mitreTechnique?: string; title: string; description: string }[] } }) => {
      if (!value || !value.events || value.events.length === 0) return null;
      return (
        <div className="my-14 relative border-l-2 border-border ml-5 pl-10 space-y-14">
          {value.events.map((ev: { timestamp: string; mitreTechnique?: string; title: string; description: string }, idx: number) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[49px] top-1.5 h-4 w-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
                <span className="font-mono text-sm text-primary uppercase tracking-widest">{ev.timestamp}</span>
                {ev.mitreTechnique && (
                  <span className="bg-muted px-2.5 py-1 rounded text-xs font-mono text-muted-foreground">{ev.mitreTechnique}</span>
                )}
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3">{ev.title}</h4>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">{ev.description}</p>
            </div>
          ))}
        </div>
      )
    }
  },
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      seoTitle,
      seoDescription,
      mainImage,
      publishedAt,
      tlp,
      body,
      cta,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    description: post.seoDescription,
    image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
    datePublished: post.publishedAt,
    author: [{
      '@type': 'Person',
      name: post.authorName || 'Photon Security',
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Photon Security',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.photonsecurity.in/icon.png',
      },
    },
    url: `https://www.photonsecurity.in/blogs/${slug}`,
  };

  return (
    <BlogThemeWrapper>
      <article className="min-h-screen pb-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Subtle top gradient using theme vars */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 relative z-10">
          <header className="mb-20 text-center">
            {(post.categories?.length > 0 || post.tlp) && (
              <div className="flex justify-center items-center gap-3 mb-10 flex-wrap">
                {post.tlp && (
                  <span className={`px-4 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-[0.2em] ${
                    post.tlp === 'red' ? 'border-destructive/30 bg-destructive/10 text-destructive' :
                    post.tlp === 'amber' ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' :
                    post.tlp === 'green' ? 'border-green-500/30 bg-green-500/10 text-green-500' :
                    'border-border bg-card text-muted-foreground'
                  }`}>
                    TLP:{post.tlp}
                  </span>
                )}
                {post.categories && post.categories.map((cat: { title: string }) => (
                  <span key={cat.title} className="px-4 py-1.5 rounded-full border border-border bg-card text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-10 text-foreground leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
              {post.authorName && <span className="font-semibold text-foreground/80">{post.authorName}</span>}
              {post.authorName && post.publishedAt && <span className="text-border">{"//"}</span>}
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              )}
            </div>
          </header>

          {post.mainImage && (
            <div className="w-full aspect-[16/9] relative rounded-3xl overflow-hidden mb-20 border border-border shadow-2xl">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-muted-foreground font-mono tracking-wide text-base">No content available.</p>
          )}
        </div>

        {/* Dynamic Interactive Call-To-Action Card */}
        {(() => {
          const title = (post.title || '').toLowerCase();
          const categories = (post.categories || []).map((c: { title: string }) => c.title.toLowerCase());
          
          let cta = {
            title: "Secure Your Digital Infrastructure Today",
            description: "Identify critical security loopholes and vulnerabilities before hackers do. Partner with our certified ethical hacking specialists for professional VAPT assessments.",
            buttonText: "Request Security Assessment",
            tag: "VAPT & TESTING"
          };

          if (title.includes('sebi') || title.includes('cscrf')) {
            cta = {
              title: "Ensure SEBI CSCRF Compliance Before the Deadline",
              description: "Our certified security auditors hold OSCP, CISA, and CISSP credentials to deliver end-to-end CSCRF audits, gap analysis, and VAPT testing.",
              buttonText: "Request SEBI CSCRF Pre-Audit",
              tag: "SEBI CSCRF COMPLIANCE"
            };
          } else if (title.includes('ifsca') || title.includes('gift city') || title.includes('ifsc')) {
            cta = {
              title: "Prepare Your GIFT IFSC Entity for Audits",
              description: "Get tailored regulatory guidance, mock audits, and vulnerability assessments designed specifically for IFSCA regulations.",
              buttonText: "Get IFSCA Readiness Assessment",
              tag: "IFSCA COMPLIANCE"
            };
          } else if (
            title.includes('rbi') || 
            title.includes('bank') || 
            title.includes('compliance') || 
            title.includes('audit') || 
            categories.some((c: string) => c.includes('compliance') || c.includes('banking'))
          ) {
            cta = {
              title: "Is Your Cooperative Bank RBI-Audit Ready?",
              description: "Meet RBI's strict annual VAPT and IS Audit requirements. Access Board-ready reporting and rapid vulnerability remediation.",
              buttonText: "Schedule UCB Audit Consulting",
              tag: "RBI UCB MANDATES"
            };
          }

          if (post.cta?.title && post.cta?.description) {
            cta = {
              title: post.cta.title,
              description: post.cta.description,
              buttonText: post.cta.buttonText || cta.buttonText || "Request Security Assessment",
              tag: post.cta.tag || cta.tag || "VAPT & TESTING"
            };
          }

          return (
            <>
              <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="relative group overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
                {/* Glowing background blob */}
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1.5 rounded-md border border-primary/20 bg-primary/10 text-[11px] font-mono text-primary uppercase tracking-[0.2em] mb-6">
                      {cta.tag}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
                      {cta.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light">
                      {cta.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(cta.title)}`}
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-semibold text-base rounded-xl transition-all duration-300 hover:bg-foreground/80 active:scale-95 shadow-xl"
                    >
                      {cta.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>
      </article>
    </BlogThemeWrapper>
  )
}
