'use client'

import React, { useState } from 'react'
import { ExpandableCard } from '@/components/ui/bento-card'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { TaiwanDottedMap } from '@/components/ui/taiwan-dotted-map'
import { Globe } from '@/components/ui/globe'
import { Highlighter } from '@/components/ui/highlighter'
import { cn } from '@/lib/utils'

interface IBASectionProps {
  isDarkTheme?: boolean
}

export function IBASection({ isDarkTheme = true }: IBASectionProps) {
  const [isGlobalCardHovered, setIsGlobalCardHovered] = useState(false)
  const [isJoinedCardHovered, setIsJoinedCardHovered] = useState(false)
  const [isChampCardHovered, setIsChampCardHovered] = useState(false)
  const [isStickerCardHovered, setIsStickerCardHovered] = useState(false)

  const numberSpringConfig = { stiffness: 300, damping: 15 }

  return (
    <section className="bg-transparent relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-text {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
      
      {/* World Map Background Container */}
      <div className="absolute top-0 left-0 w-full h-[800px] opacity-100 pointer-events-none z-0">
          <TaiwanDottedMap className={`w-full h-full transition-colors duration-1000 ${isDarkTheme ? 'text-zinc-700' : 'text-zinc-900'}`} />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-32 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center relative">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-7xl font-serif font-black leading-[1.2] tracking-tight relative inline-block transition-colors duration-1000 ${isDarkTheme ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'text-zinc-900'}`}
              style={{ fontFamily: '"Songti TC", "Noto Serif TC", serif' }}
            >
              世界舞台的<br />
              <span 
                className="inline-block transition-colors duration-1000"
                style={{ 
                  color: isDarkTheme ? '#27272a' : '#3f3f46',
                  WebkitTextStroke: '8px white',
                  paintOrder: 'stroke fill',
                  filter: `
                    drop-shadow(1px 1px 0px rgba(0,0,0,1)) 
                    drop-shadow(-1px -1px 0px rgba(0,0,0,1)) 
                    drop-shadow(1px -1px 0px rgba(0,0,0,1)) 
                    drop-shadow(-1px 1px 0px rgba(0,0,0,1))
                  `
                }}
              >
                台灣坐標
              </span>
            </motion.h2>

            <div className="mt-6 flex justify-center">
              <div className={cn(
                "px-4 py-1 rounded-full shadow-lg transition-all duration-1000 border",
                isDarkTheme 
                  ? "bg-white border-white/20 shadow-white/5" 
                  : "bg-white border-zinc-200 shadow-zinc-200"
              )}>
                <p className="text-[11px] font-bold tracking-[0.15em] text-zinc-900">
                  正式會員國成員
                </p>
              </div>
            </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] lg:auto-rows-[320px]">
          
          {/* Card 1: 65+ Nations (Large) */}
          <div 
            className="md:col-span-2 relative z-10 group/card1"
            onMouseEnter={() => setIsGlobalCardHovered(true)}
            onMouseLeave={() => setIsGlobalCardHovered(false)}
          >
            <ExpandableCard 
              color="#4338CA" 
              isHoveredByParent={isGlobalCardHovered}
              className={`h-full w-full border transition-all duration-300 ${isDarkTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-400'}`}
            >
              <div className="flex flex-col h-full justify-between relative z-20 text-inherit">
                <div className="flex justify-between items-start">
                  <span className="uppercase tracking-widest text-xs font-bold opacity-60">Global Network</span>
                </div>
                <div className="relative z-30">
                  <motion.div 
                    animate={{ 
                      scale: isGlobalCardHovered ? 1.05 : 1,
                      y: isGlobalCardHovered ? -5 : 0 
                    }}
                    transition={numberSpringConfig}
                    className={`text-[clamp(4rem,7vw,7rem)] font-line-seed font-black leading-none -ml-1 flex items-start transition-colors duration-300 ${isDarkTheme ? 'text-white/90' : 'text-zinc-900'}`}
                  >
                    65<span className="text-[0.5em] mt-2 opacity-50 no-flip">+</span>
                  </motion.div>
                  <h3 className={`text-2xl font-bold mt-2 transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-zinc-900'}`}>會員國遍佈全球</h3>
                  <p className="mt-2 font-medium text-base opacity-70 max-w-sm">
                    連結台灣與全球 65 個會員國，<br className="hidden md:block"/>推動調酒藝術的共通語言。
                  </p>
                </div>
              </div>
              
              {/* Globe - INSIDE the bento (Higher position) */}
              <div className="absolute top-[25%] -right-12 md:-right-8 w-[300px] h-[300px] md:w-[420px] md:h-[420px] pointer-events-none z-10 flex items-center justify-center">
                <Globe className={`w-full h-full transition-opacity duration-1000 ${!isDarkTheme ? 'opacity-90' : 'opacity-60'}`} />
              </div>
            </ExpandableCard>
          </div>

          {/* Card 2: 1995 Joined */}
          <div 
            className="relative z-10 group/card2"
            onMouseEnter={() => setIsJoinedCardHovered(true)}
            onMouseLeave={() => setIsJoinedCardHovered(false)}
          >
            <ExpandableCard 
              color="#D97706" 
              isHoveredByParent={isJoinedCardHovered}
              className={`h-full w-full border ${isDarkTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-400'}`}
            >
              <div className="flex flex-col h-full justify-between relative z-20">
                <span className="uppercase tracking-widest text-xs font-bold opacity-60">Since 1995</span>
                <div>
                  <motion.div 
                    animate={{ 
                      scale: isJoinedCardHovered ? 1.08 : 1,
                      x: isJoinedCardHovered ? 5 : 0 
                    }}
                    transition={numberSpringConfig}
                    className={`text-5xl font-line-seed font-black mb-4 transition-colors duration-300 ${isDarkTheme ? 'text-white/90' : 'text-zinc-900'}`}
                  >
                    95&apos;
                  </motion.div>
                  <h3 className={`text-2xl font-bold font-line-seed leading-tight transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-zinc-900'}`}>
                    正式加入<br/>成員大家庭
                  </h3>
                  <p className={`mt-3 text-sm opacity-60 leading-relaxed transition-colors duration-300 ${isDarkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    成立第二年即加入國際組織，<br/>自此與世界並肩同行。
                  </p>
                </div>
              </div>
            </ExpandableCard>
          </div>

          {/* Card 3: World Champion */}
          <div 
            className="relative group/card3 z-20"
            onMouseEnter={() => setIsChampCardHovered(true)}
            onMouseLeave={() => setIsChampCardHovered(false)}
          >
            <ExpandableCard 
              color="#BE185D" 
              isHoveredByParent={isChampCardHovered}
              className={`h-full w-full border ${isDarkTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-400'}`}
            >
              <div className="flex flex-col h-full justify-between relative z-20">
                <span className="uppercase tracking-widest text-xs font-bold opacity-60">2015 Sofia</span>
                <div className="relative z-10">
                  <motion.div 
                    animate={{ 
                      scale: isChampCardHovered ? 1.1 : 1,
                      rotate: isChampCardHovered ? [0, -2, 2, 0] : 0
                    }}
                    transition={isChampCardHovered ? { duration: 0.4 } : numberSpringConfig}
                    className={`text-5xl font-line-seed font-black mb-4 transition-colors duration-300 ${isDarkTheme ? 'text-white/90' : 'text-zinc-900'}`}
                  >
                    No.1
                  </motion.div>
                  <h3 className={`text-2xl font-bold font-line-seed leading-tight transition-colors duration-300 ${isDarkTheme ? 'text-white' : 'text-zinc-900'}`}>
                    史上首次<br/>雙料冠軍
                  </h3>
                  <p className={`mt-3 text-sm opacity-80 leading-relaxed transition-colors duration-300 ${isDarkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    單一國家同時包辦<br/>傳統與花式調酒世界冠軍
                  </p>
                </div>
                
                <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none">
                   <div className="absolute inset-0 z-10" style={{ animation: "spin-text 12s linear infinite" }}>
                       <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-300 ${isChampCardHovered ? 'fill-white' : isDarkTheme ? 'fill-white' : 'fill-black'}`}>
                          <path id="curve" className="no-flip" d="M 50 50 m -35 0 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" fill="transparent"/>
                          <text className={`text-[11px] font-bold uppercase tracking-widest transition-opacity duration-300 ${isChampCardHovered ? 'opacity-40' : 'opacity-80'}`}>
                             <textPath xlinkHref="#curve" startOffset="0%">
                                Record Breaker • World Champion •
                             </textPath>
                          </text>
                       </svg>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className={`w-14 h-14 relative transition-all duration-500 ease-out 
                        ${isChampCardHovered ? 'opacity-100 invert grayscale-0' : 
                          isDarkTheme ? 'opacity-60 invert grayscale' : 'opacity-40 grayscale'}`}>
                          <Image src="/logo.png" alt="BAT Logo" fill className="object-contain" />
                      </div>
                   </div>
                </div>
              </div>
            </ExpandableCard>
          </div>

          {/* Card 4: Global Standards & Sticker */}
          <div 
            className="md:col-span-2 relative z-50 group/card4"
            onMouseEnter={() => setIsStickerCardHovered(true)}
            onMouseLeave={() => setIsStickerCardHovered(false)}
          >
            <ExpandableCard 
              color="#059669" 
              isHoveredByParent={isStickerCardHovered}
              className={`h-full w-full border overflow-visible ${isDarkTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-400'}`}
            >
               <div className="flex flex-col h-full justify-between relative z-20">
                <div className="flex justify-between items-start">
                  <span className="uppercase tracking-widest text-xs font-bold opacity-60">Certification</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div className="z-30">
                     <h3 
                      className={`text-2xl md:text-3xl font-bold font-line-seed leading-tight mb-3 transition-all duration-300 text-balance break-keep`}
                      style={{ 
                        color: isStickerCardHovered ? 'white' : (isDarkTheme ? '#27272a' : '#3f3f46'),
                        WebkitTextStroke: isStickerCardHovered ? '2.5px black' : '2.5px white',
                        paintOrder: 'stroke fill',
                        filter: isStickerCardHovered ? 'none' : `
                          drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.2)) 
                          drop-shadow(-0.5px -0.5px 0px rgba(0,0,0,0.2))
                        `
                      }}
                    >
                      專業標準・在地深耕
                    </h3>
                    <p className={`text-sm opacity-70 leading-relaxed max-w-[240px] md:max-w-xs transition-colors duration-300 text-pretty break-words ${isDarkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      引進國際認證課程與安全飲酒規範，讓台灣人才與世界無縫接軌。
                    </p>
                  </div>
                  <div className="hidden md:flex gap-2 flex-wrap mb-4 z-30">
                     {['Classic', 'Flair', 'Mixology'].map(tag => (
                      <span key={tag} className={`px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm transition-colors duration-300
                        ${isStickerCardHovered ? 'bg-black/20 text-white border-white/20 border' : 
                          isDarkTheme ? 'bg-white/10 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                        {tag}
                      </span>
                     ))}
                  </div>
                </div>
              </div>

              {/* Shaker Sticker - Outside card clipping specifically */}
              <div 
                className="absolute bottom-0 -right-4 w-48 h-72 md:w-56 md:h-80 pointer-events-none transition-transform group-hover/card4:scale-105 duration-500 origin-bottom z-10"
                style={{ clipPath: 'inset(-100% -100% 0% -100% round 0 0 24px 24px)' }}
              >
                 <Image 
                    src="/shaker-sticker.png" 
                    alt="Shaker Sticker" 
                    fill 
                    className="object-contain object-bottom"
                    style={{
                      filter: `drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white) drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white) drop-shadow(0 15px 30px rgba(0,0,0,0.3))`
                    }}
                 />
              </div>
            </ExpandableCard>
          </div>

        </div>
      </div>
    </section>
  )
}
