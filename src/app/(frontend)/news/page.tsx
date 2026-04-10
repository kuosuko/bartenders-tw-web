import { sanityClient } from '@/sanity/client'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { BlurFade } from '@/components/ui/blur-fade'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: '最新消息',
  description: '中華民國國際調酒協會最新活動、賽事及公告。',
  openGraph: {
    title: '最新消息 · BAT 台灣調酒師',
    description: '中華民國國際調酒協會最新活動、賽事及公告。',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' as const },
}

const builder = imageUrlBuilder(createClient({ projectId, dataset, apiVersion, useCdn: true }))

async function getNewsPosts() {
  return sanityClient.fetch(
    `*[_type == "newsPost" && status == "published"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "featuredImage": featuredImage.asset->{
        _id,
        url,
        "dimensions": metadata.dimensions{ width, height, aspectRatio }
      },
      "category": category->name
    }`,
    {},
    { next: { revalidate: false } },
  )
}

interface NewsPostDoc {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  featuredImage?: {
    url: string
    dimensions?: { width: number; height: number; aspectRatio: number }
  }
  category?: string
}

export default async function NewsPage() {
  const posts: NewsPostDoc[] = await getNewsPosts().catch(() => [])

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Editorial header — big type, no container */}
        <BlurFade delay={0.1}>
          <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">Dispatches</div>
              <h1
                className="font-noto-serif-tc text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-zinc-900"
              >
                最新
                <br />
                消息
              </h1>
            </div>
            <p className="md:max-w-xs text-sm text-zinc-500 leading-relaxed md:text-right">
              協會最新活動、賽事及公告 —— 按時間倒序排列，
              <br className="hidden md:block" />
              最新的在最上方。
            </p>
          </div>
        </BlurFade>

        {/* Masonry / waterfall via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 [column-fill:_balance]">
          {posts.map((post, i) => {
            const aspectRatio = post.featuredImage?.dimensions?.aspectRatio ?? 1.5
            const imgUrl = post.featuredImage?.url
              ? builder.image(post.featuredImage.url).width(900).url()
              : '/golden-cup-banner.png'
            const imgWidth = post.featuredImage?.dimensions?.width ?? 900
            const imgHeight = post.featuredImage?.dimensions?.height ?? 600

            return (
              <BlurFade
                key={post._id}
                delay={0.1 + i * 0.05}
                className="mb-10 md:mb-14 break-inside-avoid block"
              >
                <Link
                  href={`/news/${post.slug}`}
                  className="group block"
                >
                  <div
                    className="relative w-full overflow-hidden bg-zinc-100"
                    style={{ aspectRatio }}
                  >
                    <Image
                      src={imgUrl}
                      alt={post.title}
                      width={imgWidth}
                      height={imgHeight}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="pt-5">
                    <div className="flex items-center gap-3 mb-2">
                      {post.category && (
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-900">
                          {post.category}
                        </span>
                      )}
                      {post.category && post.publishedAt && (
                        <span className="h-px w-4 bg-zinc-300" />
                      )}
                      {post.publishedAt && (
                        <span className="text-[10px] tracking-wider text-zinc-400">
                          {new Date(post.publishedAt)
                            .toLocaleDateString('zh-TW', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })
                            .replace(/\//g, '.')}
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-black text-zinc-900 leading-[1.25] tracking-tight decoration-zinc-300 decoration-1 underline-offset-[6px] group-hover:underline transition-all"
                      style={{ fontFamily: '"LINESeedTW", sans-serif' }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </BlurFade>
            )
          })}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-zinc-400 py-24">目前尚無消息，敬請期待。</p>
        )}
      </div>
    </div>
  )
}
