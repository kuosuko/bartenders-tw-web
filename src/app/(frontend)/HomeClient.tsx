'use client'

import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Hero } from '@/components/landing/Hero'
import { NarrativeBlock } from '@/components/landing/NarrativeBlock'
import { SponsorMarquee } from '@/components/landing/SponsorMarquee'
import { IBASection } from '@/components/landing/IBASection'
import { CallToAction } from '@/components/landing/CallToAction'
import { FeaturedCourse } from '@/components/landing/FeaturedCourse'
import type { CourseItem } from '@/lib/types'

const COLOR_OPTIONS = [
  { name: 'Soft Stone', value: '#f8f8f7', isDark: false },
  { name: 'Original White', value: '#ffffff', isDark: false },
  { name: 'Zinc 950', value: '#09090b', isDark: true },
]

export function HomeClient({ featuredCourse }: { featuredCourse?: CourseItem }) {
  const [targetConfig] = React.useState(COLOR_OPTIONS[0])
  const sponsorRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress: sponsorScrollProgress } = useScroll({
    target: sponsorRef,
    offset: ['start 98%', 'start 40%'],
  })

  const smoothProgress = useSpring(sponsorScrollProgress, { stiffness: 80, damping: 24 })
  const bgColor = useTransform(smoothProgress, [0, 1], ['#ffffff', targetConfig.value])
  const isDark = targetConfig.isDark

  return (
    <motion.main
      style={{ backgroundColor: bgColor }}
      className={`relative will-change-colors ${isDark ? 'dark' : ''}`}
    >
      <Hero />
      <NarrativeBlock globalBgColor={bgColor} />

      <div ref={sponsorRef} className="relative">
        <SponsorMarquee isDarkTheme={isDark} />
      </div>

      <IBASection isDarkTheme={isDark} />
      <FeaturedCourse isDarkTheme={isDark} course={featuredCourse} />
      <CallToAction isDarkTheme={isDark} />
    </motion.main>
  )
}
