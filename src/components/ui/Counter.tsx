'use client'

import React, { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useInView, animate } from 'framer-motion'

interface CounterProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function Counter({ 
  value, 
  duration = 2, 
  className, 
  suffix = '', 
  prefix = '' 
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: duration,
        ease: "easeOut",
      })
    }
  }, [isInView, motionValue, value, duration])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <span 
      ref={ref} 
      className={className}
    >
      {prefix}0{suffix}
    </span>
  )
}
