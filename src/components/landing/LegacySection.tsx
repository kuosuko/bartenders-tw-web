'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function LegacySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smoothly shift background color from white to a premium stone-50 as we scroll in
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    ["#ffffff", "#f8f8f7", "#f8f8f7", "#ffffff"]
  )

  const opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1])
  const scale = useTransform(scrollYProgress, [0.2, 0.35], [0.95, 1])

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-[100vh] py-40 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-5xl mx-auto px-6 text-center"
      >
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <span className="text-zinc-400 font-inter font-black tracking-[0.5em] text-xs md:text-sm uppercase">Heritage & Vision</span>
            <div className="w-12 h-[1px] bg-zinc-200" />
          </div>
          
          <h2 className="text-4xl md:text-7xl font-line-seed font-black text-black leading-tight tracking-tight">
            深耕台灣<br/>
            邁向世界
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 text-left">
            <div className="p-8 rounded-[32px] bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-bold mb-4 font-line-seed">國際對接</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">
                與 IBA 國際世界組織接軌，引進國際認證課程，確保台灣調酒師具備全球競爭力的專業形象與知識技能。
              </p>
            </div>
            <div className="p-8 rounded-[32px] bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-bold mb-4 font-line-seed">社會培力</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">
                致力於身心障礙者與視覺障礙者的職業訓練，落實「習得一技之長」的初衷，讓技藝成為改變生命的力量。
              </p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm md:text-base font-serif italic mt-16 max-w-2xl leading-relaxed">
            &ldquo;我們不只是傳授調酒的技巧，更是在傳遞一種跨越國界、融合溫度的文化語言。&rdquo;
          </p>
        </div>
      </motion.div>
    </motion.section>
  )
}
