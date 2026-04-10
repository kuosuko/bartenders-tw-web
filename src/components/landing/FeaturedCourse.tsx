import React from 'react'
import { MOCK_COURSES } from '@/lib/mock-courses'
import { BlurFade } from '@/components/ui/blur-fade'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import type { CourseItem } from '@/lib/types'

export function FeaturedCourse({
  isDarkTheme = false,
  course: propCourse,
}: {
  isDarkTheme?: boolean
  course?: CourseItem
}) {
  const course = propCourse || MOCK_COURSES[0]
  if (!course) return null

  const meta: Array<{ label: string; value: string }> = [
    { label: 'Category', value: course.category || 'Signature' },
    { label: 'Hours', value: course.duration || 'TBA' },
    { label: 'Cert.', value: 'IBA / BAT' },
    { label: 'Level', value: course.level || 'Advanced' },
  ]

  return (
    <section
      className={cn(
        'relative py-28 md:py-40 overflow-hidden transition-colors duration-1000',
        isDarkTheme ? 'text-zinc-100' : 'text-zinc-900',
      )}
    >
      {/* Section label — editorial eyebrow */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <BlurFade delay={0.05}>
          <div className="flex items-end justify-between gap-6 mb-16 md:mb-24">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-current opacity-40" />
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">
                Annual Flagship — N°01
              </span>
            </div>
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              All Courses
              <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </BlurFade>

        {/* Main editorial feature */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Image — 7 cols on desktop, bleeds down below content */}
          <BlurFade delay={0.1} className="col-span-12 md:col-span-7 relative">
            <div className="relative aspect-[4/5] md:aspect-[5/6] w-full overflow-hidden bg-zinc-100">
              <Image
                src={course.featuredImage || '/golden-cup-banner.png'}
                alt={course.title}
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
              />
              {/* Corner frame marks */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/60" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/60" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/60" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/60" />
            </div>
          </BlurFade>

          {/* Content — 5 cols, hangs off the right */}
          <BlurFade
            delay={0.2}
            className="col-span-12 md:col-span-5 md:pt-16 lg:pt-24"
          >
            <div
              className={cn(
                'text-[10px] tracking-[0.3em] uppercase mb-6 transition-colors duration-1000',
                isDarkTheme ? 'text-zinc-500' : 'text-zinc-400',
              )}
            >
              {course.category || 'Featured Programme'} — Est. 1995
            </div>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
              style={{ fontFamily: '"LINESeedTW", sans-serif' }}
            >
              {course.title}
            </h2>

            <p
              className={cn(
                'text-base md:text-lg leading-[1.7] mb-12 max-w-md transition-colors duration-1000',
                isDarkTheme ? 'text-zinc-400' : 'text-zinc-600',
              )}
            >
              {course.shortDescription}
            </p>

            {/* Meta table — magazine-style stat row */}
            <div
              className={cn(
                'grid grid-cols-2 md:grid-cols-4 border-t transition-colors duration-1000',
                isDarkTheme ? 'border-zinc-800' : 'border-zinc-200',
              )}
            >
              {meta.map((item, idx) => (
                <div
                  key={item.label}
                  className={cn(
                    'py-4 pr-4 border-b',
                    idx !== meta.length - 1 && 'md:border-r',
                    isDarkTheme ? 'border-zinc-800' : 'border-zinc-200',
                  )}
                >
                  <div
                    className={cn(
                      'text-[9px] tracking-[0.25em] uppercase mb-1.5 transition-colors duration-1000',
                      isDarkTheme ? 'text-zinc-500' : 'text-zinc-400',
                    )}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-black tracking-tight"
                    style={{ fontFamily: '"LINESeedTW", sans-serif' }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — underline arrow link, not a button */}
            <div className="mt-12 flex items-baseline justify-between gap-4">
              <Link
                href={`/courses/${course.slug}`}
                className="group inline-flex items-center gap-3"
              >
                <span
                  className={cn(
                    'text-xl md:text-2xl font-black tracking-tight transition-all duration-500',
                    'border-b-2 pb-1',
                    isDarkTheme
                      ? 'border-zinc-100 group-hover:border-orange-400 group-hover:text-orange-400'
                      : 'border-zinc-900 group-hover:border-orange-500 group-hover:text-orange-500',
                  )}
                  style={{ fontFamily: '"LINESeedTW", sans-serif' }}
                >
                  報名本課程
                </span>
                <ArrowUpRight
                  className={cn(
                    'size-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1',
                    isDarkTheme ? 'group-hover:text-orange-400' : 'group-hover:text-orange-500',
                  )}
                />
              </Link>

              {course.memberPrice && (
                <div className="text-right">
                  <div
                    className={cn(
                      'text-[9px] tracking-[0.25em] uppercase mb-0.5 transition-colors duration-1000',
                      isDarkTheme ? 'text-zinc-500' : 'text-zinc-400',
                    )}
                  >
                    From
                  </div>
                  <div
                    className="text-2xl font-black tracking-tight"
                    style={{ fontFamily: '"LINESeedTW", sans-serif' }}
                  >
                    NT${course.memberPrice.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Decorative big numeral — sits behind as editorial accent */}
      <div
        aria-hidden
        className={cn(
          'absolute -right-6 md:-right-16 top-8 md:top-16 text-[18rem] md:text-[28rem] leading-none font-black opacity-[0.03] pointer-events-none select-none',
          isDarkTheme ? 'text-white' : 'text-zinc-900',
        )}
        style={{ fontFamily: '"LINESeedTW", sans-serif' }}
      >
        01
      </div>
    </section>
  )
}
