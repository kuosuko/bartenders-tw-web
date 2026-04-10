'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Sticker } from '@/components/ui/Sticker'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const desktopStickers = [
    { id: 'go', text: ['Go Global', 'With'], x: -400, y: -140, rotate: -10, font: 'font-instrument italic', textCls: 'text-3xl lg:text-4xl', color: '#FF6B35', bg: '#FFE4D6' },
    { id: 'since', text: ['Since', '1995'], x: 400, y: -120, rotate: 8, font: 'font-instrument italic', textCls: 'text-3xl lg:text-4xl', color: '#2EC4B6', bg: '#D4F5F2' },
    { id: 'tw', text: ['台湾', '最高!'], x: -440, y: 80, rotate: -15, font: 'font-mochiy', textCls: 'text-3xl lg:text-4xl', color: '#F5A623', bg: '#FFF3D6' },
    { id: 'ar', text: ['مرحبا!'], x: 440, y: 60, rotate: 12, font: 'font-sans font-black', textCls: 'text-3xl lg:text-4xl', color: '#7B61FF', bg: '#E8E4FF' },
    { id: 'wc', text: ['World', 'Class'], x: -300, y: 260, rotate: 6, font: 'font-inter font-black uppercase', textCls: 'text-2xl lg:text-3xl', color: '#5C5470', bg: '#E8E4F0' },
    { id: 'ch', text: ['Cheers!'], x: 300, y: 240, rotate: -6, font: 'font-marker', textCls: 'text-3xl lg:text-4xl', color: '#E63946', bg: '#FFDDD2' },
  ]

  const mobileStickers = [
    { id: 'go', text: ['Go Global'], x: -80, y: -240, rotate: -8, font: 'font-instrument italic', textCls: 'text-2xl', color: '#FF6B35', bg: '#FFE4D6' },
    { id: 'since', text: ['1995'], x: 90, y: -220, rotate: 12, font: 'font-instrument italic', textCls: 'text-2xl', color: '#2EC4B6', bg: '#D4F5F2' },
    { id: 'tw', text: ['台湾最高!'], x: -100, y: 180, rotate: -15, font: 'font-mochiy', textCls: 'text-2xl', color: '#F5A623', bg: '#FFF3D6' },
    { id: 'ar', text: ['مرحبا!'], x: 100, y: 160, rotate: 15, font: 'font-sans font-black', textCls: 'text-2xl', color: '#7B61FF', bg: '#E8E4FF' },
    { id: 'ch', text: ['Cheers!'], x: 0, y: 240, rotate: -5, font: 'font-marker', textCls: 'text-2xl', color: '#E63946', bg: '#FFDDD2' },
  ]

  const currentStickers = isMobile ? mobileStickers : desktopStickers

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#FDFDFD]" ref={containerRef}>

      {/* Main Anchor Text */}
      <div className="z-10 relative flex flex-col items-center justify-center text-center pointer-events-none select-none px-6">
        <h1 className="font-line-seed font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[1.2] md:leading-[0.85] tracking-tight text-black">
          <span className="block">中華民國</span>
          <span className="block">國際調酒協會</span>
        </h1>
        <p className="mt-6 md:mt-8 font-inter text-xs md:text-base text-neutral-400 tracking-[0.3em] uppercase max-w-[80vw]">
          Bartender Association of Taiwan
        </p>
      </div>

      {currentStickers.map((s) => (
        <Sticker
          key={`${isMobile ? 'm' : 'd'}-${s.id}`}
          dragConstraints={containerRef}
          initialX={s.x}
          initialY={s.y}
          initialRotate={s.rotate}
          textColor="text-current"
          strokeColor={s.bg}
          strokeWidth={isMobile ? 6 : 8}
          className={`z-20 ${s.font} ${s.textCls}`}
          style={{ color: s.color }}
        >
          {s.text.map((line, i) => (
            <span key={i} className="block whitespace-nowrap">{line}</span>
          ))}
        </Sticker>
      ))}

    </div>
  )
}
