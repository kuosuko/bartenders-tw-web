import { sanityClient } from '@/sanity/client'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { BlurFade } from '@/components/ui/blur-fade'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: '課程列表' }

const builder = imageUrlBuilder(createClient({ projectId, dataset, apiVersion, useCdn: true }))

interface CourseDoc {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  featuredImage?: {
    url: string
    dimensions?: { width: number; height: number; aspectRatio: number }
  }
  category?: string
  level?: string
  duration?: string
  price?: number
  memberPrice?: number
  featured?: boolean
  certification?: { hasCertification?: boolean; type?: string }
}

async function getCourses(): Promise<CourseDoc[]> {
  return sanityClient.fetch(
    `*[_type == "course" && status != "draft"] | order(featured desc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      "featuredImage": featuredImage.asset->{
        _id,
        url,
        "dimensions": metadata.dimensions{ width, height, aspectRatio }
      },
      "category": category->name,
      level,
      duration,
      price,
      memberPrice,
      featured,
      certification{ hasCertification, type }
    }`,
    {},
    { next: { revalidate: false, tags: ['course'] } },
  )
}

function pad2(n: number) {
  return n.toString().padStart(2, '0')
}

export default async function CoursesPage() {
  const allCourses: CourseDoc[] = await getCourses().catch(() => [])

  if (allCourses.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <p className="text-zinc-400">課程資料建置中，敬請期待。</p>
      </div>
    )
  }

  const [hero, ...rest] = allCourses

  const heroImgUrl = hero.featuredImage?.url
    ? builder.image(hero.featuredImage.url).width(1800).url()
    : '/golden-cup-banner.png'

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* =========================================================
          HERO BANNER — current flagship / promoted course (poster)
          ========================================================= */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-12 md:pb-16">
        <BlurFade delay={0.05}>
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-zinc-900" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
              Now Enrolling — Programme 2026
            </span>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <Link href={`/courses/${hero.slug}`} className="group block relative">
            {/* Cinematic image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-zinc-200">
              <Image
                src={heroImgUrl}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              {/* Bottom fade for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Corner frame marks */}
              <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-white/60" />
              <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-white/60" />
              <div className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-white/60" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-white/60" />

              {/* "Now Enrolling" stamp — top left */}
              <div className="absolute top-8 left-8 md:top-10 md:left-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30">
                  <span className="block w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white font-bold">
                    正在招生
                  </span>
                </div>
              </div>

              {/* Title + meta overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3">
                  {hero.category || 'Signature Programme'} · Est. 1995
                </div>
                <h1 className="font-noto-serif-tc text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-3 max-w-4xl">
                  {hero.title}
                </h1>
                {hero.shortDescription && (
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-xl line-clamp-2">
                    {hero.shortDescription}
                  </p>
                )}
              </div>

              {/* Bottom-right CTA arrow */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
                <div className="size-12 md:size-14 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:scale-110">
                  <ArrowUpRight className="size-4 md:size-5 text-white transition-colors duration-500 group-hover:text-zinc-900" />
                </div>
              </div>
            </div>
          </Link>
        </BlurFade>

        {/* Meta strip under banner */}
        <BlurFade delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-200">
            {[
              { label: 'Category', value: hero.category || '—' },
              { label: 'Duration', value: hero.duration || 'TBA' },
              { label: 'Level', value: hero.level || 'Advanced' },
              {
                label: 'Fee',
                value: hero.memberPrice
                  ? `NT$${hero.memberPrice.toLocaleString()}`
                  : hero.price
                    ? `NT$${hero.price.toLocaleString()}`
                    : 'Contact',
              },
            ].map((item, idx, arr) => (
              <div
                key={item.label}
                className={`py-3 px-4 md:px-5 border-t border-zinc-200 ${
                  idx !== arr.length - 1 ? 'md:border-r border-zinc-200' : ''
                }`}
              >
                <div className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-1">
                  {item.label}
                </div>
                <div className="font-noto-serif-tc text-sm md:text-base font-black text-zinc-900 tracking-tight">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* =========================================================
          INDEX — all other courses listed as numbered directory
          ========================================================= */}
      {rest.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
          {/* Index section header */}
          <BlurFade delay={0.1}>
            <div className="flex items-end justify-between mb-6 md:mb-8 pb-4 border-b border-zinc-900">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
                  Index — {pad2(rest.length)} Titles
                </div>
                <h2 className="font-noto-serif-tc text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-zinc-900">
                  全部課程
                </h2>
              </div>
              <div className="hidden md:block text-right text-[10px] tracking-[0.3em] uppercase text-zinc-400 pb-2">
                Ref. / Duration / Level
              </div>
            </div>
          </BlurFade>

          {/* Course rows */}
          <ul>
            {rest.map((course, i) => {
              const rowImgUrl = course.featuredImage?.url
                ? builder.image(course.featuredImage.url).width(600).url()
                : '/golden-cup-banner.png'

              return (
                <BlurFade key={course._id} delay={0.05 + i * 0.03}>
                  <li className="relative border-b border-zinc-200 group">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex items-baseline gap-4 md:gap-8 py-4 md:py-5 pr-4 md:pr-[220px] transition-colors duration-500 hover:bg-white"
                    >
                      {/* Index number */}
                      <span className="font-noto-serif-tc text-xs md:text-sm font-black text-zinc-300 tabular-nums tracking-tight w-6 md:w-10 shrink-0 pt-2">
                        {pad2(i + 2)}
                      </span>

                      {/* Title + meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-1">
                          {course.category && (
                            <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-400">
                              {course.category}
                            </span>
                          )}
                          {course.certification?.hasCertification && (
                            <>
                              <span className="h-px w-3 bg-zinc-300" />
                              <span className="text-[10px] tracking-[0.25em] uppercase text-orange-500 font-bold">
                                IBA 認證
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="font-noto-serif-tc text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] text-zinc-900 transition-colors duration-500 group-hover:text-orange-500">
                          {course.title}
                        </h3>
                      </div>

                      {/* Right-side meta (hidden on mobile, visible md+) */}
                      <div className="hidden md:flex items-baseline gap-6 text-right shrink-0 pt-2">
                        <div>
                          <div className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-0.5">
                            Duration
                          </div>
                          <div className="text-xs font-bold text-zinc-900 tabular-nums">
                            {course.duration || '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 mb-0.5">
                            Level
                          </div>
                          <div className="text-xs font-bold text-zinc-900">
                            {course.level || '—'}
                          </div>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <ArrowUpRight className="size-4 md:size-5 text-zinc-300 shrink-0 transition-all duration-500 group-hover:text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 self-center" />
                    </Link>

                    {/* Hover image peek — absolute, desktop only */}
                    <div
                      aria-hidden
                      className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 w-[180px] h-[110px] overflow-hidden pointer-events-none opacity-0 scale-95 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100"
                    >
                      <Image
                        src={rowImgUrl}
                        alt=""
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                    </div>
                  </li>
                </BlurFade>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
