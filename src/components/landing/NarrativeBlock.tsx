'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion'
import { zh } from '@/lib/dictionaries/zh'

import { Counter } from '@/components/ui/Counter'

const { scenes: zhScenes } = zh.narrative

const scenes = [
  {
    id: 1,
    content: (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-line-seed font-black leading-tight tracking-tight px-10 break-keep">
          <span className="inline-block">我們代表</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 inline-block">
            台灣調酒
          </span>
          <span className="inline-block">文化</span>
        </h2>
        <p className="text-white/20 text-lg md:text-xl font-medium tracking-[0.4em] uppercase mt-6">
          Taiwanese Bartending Culture
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex flex-col items-center gap-12 w-full max-w-5xl">
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-white text-3xl md:text-4xl font-line-seed font-bold tracking-[0.2em]">核心發展目標</h3>
          <p className="text-white/20 text-xs md:text-sm tracking-[0.6em] uppercase">Core Objectives</p>
        </div>
        <div className="flex flex-wrap justify-center gap-10 md:gap-20">
          {[
            { zh: "專業認證", en: "Professional Certs" },
            { zh: "國際賽事", en: "Global Competitions" },
            { zh: "弱勢培力", en: "Empowerment" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-5 group">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all group-hover:w-24 group-hover:via-white" />
              <div className="text-center">
                <span className="block text-white text-3xl md:text-4xl font-bold tracking-widest mb-1.5 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.zh}
                </span>
                <span className="block text-white/30 text-[10px] md:text-xs uppercase tracking-[0.2em] font-inter">
                  {item.en}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40">
        <div className="flex flex-col items-center gap-6">
          <p className="text-white/30 text-xs md:text-sm tracking-[0.4em] uppercase">Joined Since</p>
          <div className="relative">
            <Counter 
              value={1995} 
              className="bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-500 text-7xl md:text-9xl lg:text-[10rem] font-line-seed font-black tabular-nums leading-none" 
            />
          </div>
          <p className="text-white/50 text-xl md:text-2xl font-bold tracking-[0.3em] mt-2 whitespace-nowrap">正式加入大家庭</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <p className="text-white/30 text-xs md:text-sm tracking-[0.4em] uppercase">Awards & Honors</p>
          <div className="relative">
            <Counter 
              value={100} 
              suffix="+"
              className="bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-500 text-7xl md:text-9xl lg:text-[10rem] font-line-seed font-black tabular-nums leading-none" 
            />
          </div>
          <p className="text-white/50 text-xl md:text-2xl font-bold tracking-[0.3em] mt-2 whitespace-nowrap">各項賽事榮譽獎座</p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col items-center gap-10">
        <p className="text-white/30 text-lg md:text-xl font-medium tracking-[0.6em] uppercase">Our Vision</p>
        <div className="relative group max-w-[90vw]">
          <p className="text-white text-5xl md:text-7xl lg:text-8xl font-line-seed font-black drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-[1.2] lg:leading-tight tracking-tighter break-keep">
            <span className="inline-block">讓世界目光<span className="hidden md:inline">，</span></span>
            <br />
            <span className="inline-block">聚焦台灣</span>
            <span className="inline-block">杯中精華</span>
          </p>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80%', opacity: 1 }}
            className="absolute -bottom-6 left-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
        <p className="text-white/40 text-xl md:text-2xl font-serif italic mt-8 tracking-wide">
          &ldquo;From local roots to global stages&rdquo;
        </p>
      </div>
    ),
  },
]

interface NarrativeBlockProps {
  globalBgColor?: MotionValue<string>
}

export function NarrativeBlock({ globalBgColor }: NarrativeBlockProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentSrc, setCurrentSrc] = React.useState<string | null>(null)
  const [videoReady, setVideoReady] = React.useState(false)

  // Progressive video loading: start with low-res, upgrade to high-res
  React.useEffect(() => {
    // Start with low-res immediately for fast initial load
    setCurrentSrc('/0106_low.mp4')

    // Preload high-res video in background
    const highResVideo = document.createElement('video')
    highResVideo.preload = 'auto'
    highResVideo.src = '/0106.mp4'
    let upgraded = false

    const handleCanPlayThrough = () => {
      // High-res is ready, upgrade the video source
      if (videoRef.current && !upgraded) {
        upgraded = true
        const currentTime = videoRef.current.currentTime
        setCurrentSrc('/0106.mp4')

        // Restore playback position after source change
        const video = videoRef.current
        const restorePlayback = () => {
          video.currentTime = currentTime
          video.play().catch(() => {})
          video.removeEventListener('loadeddata', restorePlayback)
        }
        video.addEventListener('loadeddata', restorePlayback)
      }
    }

    highResVideo.addEventListener('canplaythrough', handleCanPlayThrough)
    highResVideo.load()

    return () => {
      highResVideo.removeEventListener('canplaythrough', handleCanPlayThrough)
      highResVideo.src = ''
    }
  }, [])

  const sectionHeight = `${(scenes.length + 2) * 100}vh`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // 1. Expansion phase
  const containerWidth = useTransform(scrollYProgress, [0, 0.1], ["90%", "100%"])
  const containerHeight = useTransform(scrollYProgress, [0, 0.1], ["85vh", "100vh"])
  const borderRadius = useTransform(scrollYProgress, [0, 0.1], ["64px", "0px"])
  
  // 2. Dim video phase
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 0.5])

  // 3. Final fade out to transition to next section
  const finalFadeOpacity = useTransform(scrollYProgress, [0.92, 0.98], [1, 0])
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.85, 0.99], [0, 1])
  
  // Color sync: use the global color if passed, otherwise local fallback
  const localBgColor = useTransform(scrollYProgress, [0.9, 1], ["#ffffff", "#09090b"])
  const bgColor = globalBgColor || localBgColor

  const getSceneStyle = (index: number) => {
    const totalScenes = scenes.length
    
    // Calculate timing: First scene starts WITH expansion
    // Other scenes distributed after
    let startRange, endRange
    if (index === 0) {
      startRange = 0.05
      endRange = 0.20
    } else {
      const restStart = 0.25
      const segment = 0.7 / (totalScenes - 1)
      startRange = restStart + ((index - 1) * segment)
      endRange = startRange + segment
    }
    
    const entry = startRange
    const peakStart = startRange + (index === 0 ? 0.08 : 0.05)
    const peakEnd = endRange - 0.05
    const exit = endRange

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const opacity = useTransform(
      scrollYProgress, 
      [entry, peakStart, peakEnd, exit], 
      [0, 1, 1, 0]
    )
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const scale = useTransform(
      scrollYProgress, 
      [entry, peakStart, peakEnd, exit], 
      [0.9, 1, 1, 1.1] 
    )

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const filter = useTransform(
      scrollYProgress,
      [entry, peakStart, peakEnd],
      ["blur(20px)", "blur(0px)", "blur(0px)"]
    )

    return { opacity, scale, filter }
  }

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative w-full bg-transparent"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            width: containerWidth,
            height: containerHeight,
            borderRadius: borderRadius,
            opacity: finalFadeOpacity,
          }}
          className="relative bg-black overflow-hidden flex items-center justify-center isolation-isolate"
        >
          {currentSrc && (
            <motion.video
              ref={videoRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: videoReady ? 1 : 0 }}
              transition={{ duration: 1 }}
              src={currentSrc}
              autoPlay
              muted
              playsInline
              loop
              onCanPlay={() => setVideoReady(true)}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
            />
          )}

          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black/60 pointer-events-none z-10"
          />

          {/* Progressive Bottom Fade/Blur - Color Synchronized */}
          <motion.div
            style={{ 
              opacity: bottomFadeOpacity,
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
              backgroundColor: bgColor
            }}
            className="absolute bottom-0 left-0 w-full h-[50%] z-40 pointer-events-none backdrop-blur-[40px]"
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {scenes.map((scene, index) => {
              const styles = getSceneStyle(index)
              return (
                <motion.div
                  key={scene.id}
                  style={{ 
                    opacity: styles.opacity, 
                    scale: styles.scale,
                    filter: styles.filter,
                    position: 'absolute'
                  }}
                  className="w-full flex flex-col items-center justify-center text-center px-6 max-w-7xl font-line-seed"
                >
                  {scene.content}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
