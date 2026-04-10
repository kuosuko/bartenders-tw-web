import { sanityClient } from '@/sanity/client'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { PortableText } from '@portabletext/react'
import { Clock, Award, ChevronRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const builder = imageUrlBuilder(createClient({ projectId, dataset, apiVersion, useCdn: true }))

async function getCourse(slug: string) {
  return sanityClient.fetch(
    `*[_type == "course" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      description,
      "featuredImage": featuredImage.asset,
      "category": category->name,
      level,
      duration,
      price,
      memberPrice,
      featured,
      syllabus[]{ title, description },
      schedule[]{ date, startTime, endTime, location },
      certification{ hasCertification, type, fee, testDetails, description }
    }`,
    { slug },
    { next: { revalidate: false, tags: ['course', `course:${slug}`] } },
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourse(slug).catch(() => null)
  if (!course) return {}
  return { title: course.title, description: course.shortDescription }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourse(slug).catch(() => null)
  if (!course) notFound()

  const imgUrl = course.featuredImage
    ? builder.image(course.featuredImage).width(1600).url()
    : '/golden-cup-banner.png'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={imgUrl} alt={course.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-6xl mx-auto">
          {course.category && (
            <p className="text-[10px] font-black tracking-widest uppercase text-white/50 mb-3">{course.category}</p>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>
            {course.title}
          </h1>
          {course.shortDescription && (
            <p className="text-white/70 text-lg max-w-2xl">{course.shortDescription}</p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {course.description && (
              <div>
                <h2 className="text-2xl font-black mb-6 text-zinc-900" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>課程介紹</h2>
                <div className="richtext">
                  <PortableText value={course.description} />
                </div>
              </div>
            )}

            {course.syllabus?.length > 0 && (
              <div>
                <h2 className="text-2xl font-black mb-6 text-zinc-900" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>課程大綱</h2>
                <ol className="space-y-4">
                  {course.syllabus.map((item: any, i: number) => (
                    <li key={i} className="flex gap-4 p-5 rounded-2xl border border-zinc-100 bg-zinc-50">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 text-white text-sm font-black flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
                        {item.description && <p className="text-sm text-zinc-500">{item.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {course.schedule?.length > 0 && (
              <div>
                <h2 className="text-2xl font-black mb-6 text-zinc-900" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>上課時間</h2>
                <div className="space-y-3">
                  {course.schedule.map((s: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100">
                      <div className="text-sm font-bold text-zinc-900">{s.date}</div>
                      {s.startTime && <div className="text-sm text-zinc-500">{s.startTime} – {s.endTime}</div>}
                      {s.location && (
                        <div className="flex items-center gap-1 text-sm text-zinc-400 ml-auto">
                          <MapPin className="size-3.5" />{s.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-3xl border border-zinc-200 p-8 space-y-6">
                <div className="space-y-3">
                  {course.duration && (
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="size-4 text-orange-500" />
                      <span className="text-zinc-500">課程時數</span>
                      <span className="font-bold text-zinc-900 ml-auto">{course.duration}</span>
                    </div>
                  )}
                  {course.certification?.hasCertification && (
                    <div className="flex items-center gap-3 text-sm">
                      <Award className="size-4 text-blue-500" />
                      <span className="text-zinc-500">認證</span>
                      <span className="font-bold text-zinc-900 ml-auto">IBA / BAT</span>
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-zinc-500">程度</span>
                      <span className="font-bold text-zinc-900 ml-auto">{course.level}</span>
                    </div>
                  )}
                </div>

                {course.memberPrice && (
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1">會員價格</p>
                    <p className="text-3xl font-black text-zinc-900">NT$ {course.memberPrice.toLocaleString()}</p>
                  </div>
                )}

                <a
                  href="mailto:bat@bartenders.tw"
                  className="block w-full py-4 rounded-2xl bg-zinc-900 text-white text-center font-bold text-sm hover:bg-black transition-colors"
                >
                  立即報名詢問
                </a>
              </div>

              <Link href="/courses" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
                <ChevronRight className="size-4 rotate-180" />
                返回課程列表
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
