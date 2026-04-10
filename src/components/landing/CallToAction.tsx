"use client";

import { ChevronRight, HeartHandshake } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import Link from "next/link"
import Image from "next/image"

const reviews = [
  {
    name: "學員 阿豪",
    username: "@hao_bartender",
    body: "課程非常扎實，導師對細節的要求讓我受益匪淺，終於拿到了國際認證！",
    img: "https://avatar.vercel.sh/hao",
  },
  {
    name: "學員 芝芝",
    username: "@mixology_zhi",
    body: "環境很專業，實作機會超多，這是我參加過最有價值的調酒培訓課。",
    img: "https://avatar.vercel.sh/zhi",
  },
  {
    name: "學員 曉明",
    username: "@ming_drinks",
    body: "從零基礎到現在能調出職業級的雞尾酒，真的很感謝協會導師的指導。",
    img: "https://avatar.vercel.sh/ming",
  },
  {
    name: "學員 雅婷",
    username: "@ting_cocktails",
    body: "在這裡不只學技術，更學到了調酒師的職人精神。大推給想入行的人！",
    img: "https://avatar.vercel.sh/ting",
  },
  {
    name: "學員 冠宇",
    username: "@yu_barlife",
    body: "課堂內容與國際接軌，讓我對調酒文化的理解有了質的飛躍。",
    img: "https://avatar.vercel.sh/yu",
  },
  {
    name: "學員 芯妤",
    username: "@xin_flair",
    body: "終於掌握了花式調酒的竅門，課程設計非常科學，新手也能快速上手。",
    img: "https://avatar.vercel.sh/xin",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative w-56 cursor-pointer overflow-hidden rounded-2xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width={28} height={28} alt="" src={img} />
        <div className="flex flex-col text-left">
          <figcaption className="text-xs font-bold dark:text-white">
            {name}
          </figcaption>
          <p className="text-[10px] font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-xs text-left leading-relaxed opacity-70">{body}</blockquote>
    </figure>
  )
}

export function CallToAction({ isDarkTheme = false }: { isDarkTheme?: boolean }) {
  return (
    <section id="cta" className={isDarkTheme ? "dark" : ""}>
      <div className="py-12">
        <div className="container mx-auto flex w-full flex-col items-center justify-center px-6">
          <div className="relative flex w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl border p-8 py-12">
            <div className="absolute rotate-[20deg] opacity-10 scale-125">
              <Marquee pauseOnHover className="[--duration:30s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:30s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>
            
            <div className="z-10 mx-auto size-16 rounded-2xl border bg-white/10 p-3 shadow-xl backdrop-blur-md lg:size-20 dark:bg-black/10 transition-all duration-700">
              <HeartHandshake className="mx-auto size-10 text-black lg:size-12 dark:text-white" />
            </div>
            
            <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
              <h1 className="text-2xl font-bold lg:text-3xl tracking-tight leading-tight">
                開啟你的專業調酒之路
              </h1>
              <p className="mt-2 text-sm opacity-60">
                加入國際認證課程，成就職人夢想，立即預約下期培訓。
              </p>
              <Link
                href="/courses"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group mt-6 h-auto rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 active:scale-95"
                )}
              >
                查看課程詳情
                <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className={cn(
                "absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-90%",
                isDarkTheme ? "to-black" : "to-white"
            )} />
          </div>
        </div>
      </div>
    </section>
  )
}
