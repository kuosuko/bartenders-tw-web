'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'

const sponsors = [
  { name: "Brandwerk", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/QZLJy6pDJUOR7_Ruhwi6-w/Logo.png" },
  { name: "開元食品", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/yRv9MIO-S0eHUzTJnXGh2w/LOGO.png" },
  { name: "墾丁夏都沙灘酒店", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/GsmgGUmwakiHPc5iARFyJA/Logo.png" },
  { name: "極", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/Te3cSgcsW0KRdZgyuVdhPA/Logo.png" },
  { name: "Ice Walker", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/UwxR8gPtK0epdOmTGKuvWQ/Logo.png" },
  { name: "交通部觀光局", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/iebMyJjqnkydhQ1obomUzQ/Logo.png" },
  { name: "果喜釀", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/pNJBlKdtiUu_z6-L7B4a_g/Logo.png" },
  { name: "山寨村", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/zKZXRHwlEU2Rxv9aVJaU_w/Logo.png" },
  { name: "博士茶", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/BHmbJztT7EybKplDa041FA/Logo.png" },
  { name: "小惡魔", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/l4bkoFFeo0KuT3zrXWQA5w/Logo.png" },
  { name: "采成咖啡", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/TNCWpcni6kiIG0gS9mKD7A/Logo.png" },
  { name: "家齊", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/LEqu8HAFl0SgFKkatzpJ8Q/Logo.png" },
  { name: "長榮女子高級中學", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/d2ISnxnZqkSfCSyWCaxiKQ/Logo.png" },
  { name: "五洲", logo: "https://cdn-us.icons8.com/7eYX484X_0-jYXYkIB4Zcw/Mz4h2vVSDkyH6kfLviwNOw/Logo.png" },
  { name: "5+", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/7fUqArFJmkKgcosR4ETOMg/LOGO.png" },
  { name: "樂水智研", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/x9cZZgY7RkakE670gpQG3w/LOGO.png" },
  { name: "藝太消毒", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/mshwO_8NZ0GzAJkYszUpkw/LOGO.png" },
  { name: "Hope&Harvest", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/vPIzGwYtfE-LuJxbngEQGA/LOGO.png" },
  { name: "水巷茶弄", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/O5da0cQ3G0uHJf7CCGbDbg/LOGO.png" },
  { name: "尚品咖啡", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/384IvYlrSkis5ujsGaZPvA/LOGO.png" },
  { name: "外交部", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/UGIAgujEKEKn15ZP90Tz4A/LOGO.png" },
  { name: "教育部", logo: "https://cdn-us.icons8.com/0JooIdyWrEidqC4Vr6oMtQ/c4dV1CUXokutP5CoFwYfzg/LOGO.png" },
]

import { Highlighter } from '@/components/ui/highlighter'

interface SponsorMarqueeProps {
  isDarkTheme?: boolean
}

export function SponsorMarquee({ isDarkTheme = true }: SponsorMarqueeProps) {
  return (
    <section className="py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center gap-3">
            <span className={`font-inter font-black tracking-[0.5em] text-xs uppercase ${isDarkTheme ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Solid Partnership
            </span>
            <div className={`w-12 h-[1px] ${isDarkTheme ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
          </div>

          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-line-seed font-bold tracking-tight leading-[1.6] ${isDarkTheme ? 'text-white' : 'text-zinc-900'}`}>
            堅實<Highlighter action="underline" color="#FF6B35" strokeWidth={3} iterations={2} padding={8} isView={true}>
              <span className="font-handwritten text-[#FF6B35] text-3xl md:text-5xl px-2 inline-block">後盾</span>
            </Highlighter>：深耕台灣的產業夥伴
          </h2>

          <p className={`mt-4 font-medium tracking-wide max-w-2xl leading-relaxed ${isDarkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
            攜手在地品牌與學術機構，共同推動台灣調酒藝術，<br className="hidden md:block" />
            邁向國際卓越平台。
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12">
        <Marquee className="max-w-full" duration="80s" gap="1rem" pauseOnHover>
          {sponsors.map((sponsor, idx) => (
            <div 
              key={idx} 
              className={`relative w-32 md:w-40 h-16 md:h-20 flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700 ease-out ${isDarkTheme ? 'invert' : ''}`}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="(max-w-768px) 128px, 160px"
              />
            </div>
          ))}
        </Marquee>
        
        {/* Gradients to fade in/out logos smoothly */}
        <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r to-transparent z-10 ${isDarkTheme ? 'from-[#09090b]/40' : 'from-white/60'}`}></div>
        <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l to-transparent z-10 ${isDarkTheme ? 'from-[#09090b]/40' : 'from-white/60'}`}></div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className={`h-[1px] w-12 ${isDarkTheme ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
        <p className={`font-inter text-xs tracking-wider font-medium ${isDarkTheme ? 'text-zinc-500' : 'text-zinc-400'}`}>
          And many more partners standing with us
        </p>
      </div>
    </section>
  )
}
