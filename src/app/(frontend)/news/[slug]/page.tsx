import { sanityClient } from '@/sanity/client'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'

const builder = imageUrlBuilder(createClient({ projectId, dataset, apiVersion, useCdn: true }))

async function getPost(slug: string) {
  return sanityClient.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      content,
      "featuredImage": featuredImage.asset,
      "category": category->name,
      "author": author->{ name, "avatar": avatar.asset }
    }`,
    { slug },
    { next: { revalidate: false, tags: ['newsPost', `newsPost:${slug}`] } },
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) notFound()

  const imgUrl = post.featuredImage
    ? builder.image(post.featuredImage).width(1600).url()
    : '/golden-cup-banner.png'

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={imgUrl} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl mx-auto">
          {post.category && (
            <p className="text-[10px] font-black tracking-widest uppercase text-white/50 mb-3">{post.category}</p>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex items-center gap-6 mb-12 pb-8 border-b border-zinc-100">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.avatar && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={builder.image(post.author.avatar).width(80).url()} alt={post.author.name} fill className="object-cover" sizes="40px" />
                </div>
              )}
              <span className="text-sm font-bold text-zinc-700">{post.author.name}</span>
            </div>
          )}
          {post.publishedAt && (
            <time className="text-sm text-zinc-400">
              {new Date(post.publishedAt).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          )}
        </div>

        {/* Body */}
        {post.content ? (
          <div className="richtext">
            <PortableText value={post.content} />
          </div>
        ) : (
          post.excerpt && <p className="text-zinc-600 text-lg leading-relaxed">{post.excerpt}</p>
        )}

        <div className="mt-16 pt-8 border-t border-zinc-100">
          <Link href="/news" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
            <ChevronRight className="size-4 rotate-180" />
            返回消息列表
          </Link>
        </div>
      </div>
    </article>
  )
}
