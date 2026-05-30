import { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, PortableTextComponents } from '@portabletext/react'

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
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-semibold text-white mt-12 mb-6 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-5 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3 tracking-tight">{children}</h4>,
    normal: ({ children }) => <p className="text-white/70 leading-relaxed text-base md:text-lg mb-6 font-light">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/20 pl-6 my-8 italic text-white/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70 font-light text-base md:text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-white/70 font-light text-base md:text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono text-sm text-white">{children}</code>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: any }) => {
      if (!value || !value.asset) return null;
      return (
        <div className="my-10 w-full">
          <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="mt-3 text-center text-xs text-white/40 font-mono tracking-wide">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }: { value: any }) => {
      if (!value || !value.code) return null;
      return (
        <div className="my-8 w-full">
          {value.filename && (
            <div className="bg-white/5 border-x border-t border-white/10 px-4 py-1.5 rounded-t-xl text-xs font-mono text-white/40 tracking-wider">
              {value.filename}
            </div>
          )}
          <pre className={`bg-[#0d0d0d] border border-white/10 p-6 ${value.filename ? 'rounded-b-xl' : 'rounded-xl'} overflow-x-auto text-sm font-mono text-emerald-400/90 shadow-2xl`}>
            <code>{value.code}</code>
          </pre>
        </div>
      )
    },
    table: ({ value }: { value: any }) => {
      if (!value || !value.rows || value.rows.length === 0) return null;
      
      const [headerRow, ...bodyRows] = value.rows;
      
      return (
        <div className="my-8 w-full overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] shadow-xl">
          <table className="w-full text-left border-collapse text-sm text-white/80">
            {headerRow && (
              <thead>
                <tr className="border-b border-white/10 bg-white/5 font-semibold text-white">
                  {headerRow.cells.map((cell: string, idx: number) => (
                    <th key={idx} className="px-6 py-4 font-semibold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row: any, rowIdx: number) => (
                <tr key={rowIdx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                  {row.cells.map((cell: string, cellIdx: number) => (
                    <td key={cellIdx} className="px-6 py-4 text-white/70 font-light">
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
    iocBlock: ({ value }: { value: any }) => {
      if (!value || !value.indicators || value.indicators.length === 0) return null;
      return (
        <div className="my-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6 shadow-xl">
          <h4 className="text-red-400 font-mono text-sm tracking-wider uppercase mb-4 border-b border-red-500/20 pb-2">
            IOC: {value.type || 'Indicator'}
          </h4>
          <ul className="space-y-2">
            {value.indicators.map((ind: string, idx: number) => (
              <li key={idx} className="font-mono text-white/80 text-sm bg-black/40 px-3 py-1.5 rounded flex justify-between items-center border border-white/5">
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    attackTimeline: ({ value }: { value: any }) => {
      if (!value || !value.events || value.events.length === 0) return null;
      return (
        <div className="my-12 relative border-l border-white/10 ml-4 pl-8 space-y-12">
          {value.events.map((ev: any, idx: number) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-[#050505] border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                <span className="font-mono text-xs text-emerald-400/80 uppercase tracking-widest">{ev.timestamp}</span>
                {ev.mitreTechnique && (
                  <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/60">{ev.mitreTechnique}</span>
                )}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{ev.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed font-light">{ev.description}</p>
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
    <article className="min-h-screen bg-[#050505] text-white/70 pb-24 selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 pt-32 relative z-10">
        <header className="mb-16 text-center">
          {(post.categories?.length > 0 || post.tlp) && (
            <div className="flex justify-center items-center gap-3 mb-8 flex-wrap">
              {post.tlp && (
                <span className={`px-3 py-1 border text-[10px] font-mono uppercase tracking-[0.2em] ${
                  post.tlp === 'red' ? 'border-red-500/30 bg-red-500/10 text-red-400' :
                  post.tlp === 'amber' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                  post.tlp === 'green' ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                  'border-white/30 bg-white/10 text-white/80'
                }`}>
                  TLP:{post.tlp}
                </span>
              )}
              {post.categories && post.categories.map((cat: { title: string }) => (
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

        <div className="max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-white/40 font-mono tracking-wide text-sm">No content available.</p>
          )}
        </div>

        {/* Dynamic Interactive Call-To-Action Card */}
        {(() => {
          const title = (post.title || '').toLowerCase();
          const categories = (post.categories || []).map((c: any) => c.title.toLowerCase());
          
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

          return (
            <>
              <div className="my-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                {/* Glowing background blob */}
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 border border-white/10 bg-white/5 text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-4">
                      {cta.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                      {cta.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
                      {cta.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(cta.title)}`}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-black font-semibold text-sm rounded-xl transition-all duration-300 hover:bg-neutral-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
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
  )
}
