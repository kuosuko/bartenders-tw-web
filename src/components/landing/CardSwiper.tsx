'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Card {
  id: number
  year: string
  title: string
  description: string
  image?: string
  color: string
}

const cards: Card[] = [
  {
    id: 1,
    year: "2015",
    title: "世界盃雙料冠軍",
    description: "打破 IBA 國際調酒協會紀錄，首次由單一國家同時包攬傳統與花式調酒世界冠軍。",
    color: "bg-[#1a1a1a]"
  },
  {
    id: 2,
    year: "2007",
    title: "承辦第56屆世界盃",
    description: "成功爭取並在台灣舉辦全球最大規模的 IBA 國際會議暨世界盃調酒大賽。",
    color: "bg-indigo-950"
  },
  {
    id: 3,
    year: "1994",
    title: "協會正式成立",
    description: "由莊富雄先生籌劃創辦，開啟台灣調酒走向國際舞台的新紀元。",
    color: "bg-stone-900"
  },
  {
    id: 4,
    year: "2010",
    title: "推動飲調乙級證照",
    description: "成功推動政府辦理技能檢定，確立調酒師專業形象與證照制度。",
    color: "bg-zinc-900"
  }
]

export function CardSwiper() {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length)
  }

  return (
    <div className="relative w-full max-w-sm h-[500px] perspective-1000">
      <AnimatePresence mode="popLayout">
        {cards.slice(index, index + 3).map((card, i) => {
          const isTop = i === 0
          return (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.8, y: 20 * i, opacity: 0 }}
              animate={{ 
                scale: 1 - i * 0.05, 
                y: -i * 20, 
                opacity: 1 - i * 0.2,
                zIndex: cards.length - i 
              }}
              exit={{ x: 300, opacity: 0, rotate: 20 }}
              onClick={isTop ? handleNext : undefined}
              className={cn(
                "absolute inset-0 rounded-[32px] p-8 flex flex-col justify-between cursor-pointer border border-white/10 shadow-2xl",
                card.color,
                !isTop && "pointer-events-none"
              )}
              style={{
                transformOrigin: "bottom center"
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-white/20 font-line-seed font-black text-6xl">
                  {card.year}
                </span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40">
                  {card.id}
                </div>
              </div>

              <div>
                <h3 className="text-white text-3xl font-line-seed font-bold mb-4">
                  {card.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-white/40 text-sm font-inter tracking-[0.2em] uppercase">
                <span>Tap to swap</span>
                <div className="w-8 h-[1px] bg-white/20" />
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
