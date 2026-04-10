'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StickerProps {
  children: React.ReactNode
  className?: string
  initialX?: number
  initialY?: number
  initialRotate?: number
  dragConstraints?: React.RefObject<Element | null>
  textColor?: string
  strokeColor?: string
  strokeWidth?: number
  style?: React.CSSProperties
}

export function Sticker({
  children,
  className,
  initialX = 0,
  initialY = 0,
  initialRotate = 0,
  dragConstraints,
  textColor = 'text-black',
  strokeColor = 'white',
  strokeWidth = 8,
  style,
}: StickerProps) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${initialX}px, ${initialY}px)`,
      }}
    >
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        whileHover={{ scale: 1.05, rotate: initialRotate + 2, zIndex: 100 }}
        whileTap={{ scale: 0.95, zIndex: 100 }}
        initial={{ opacity: 0, rotate: initialRotate }}
        animate={{ opacity: 1, rotate: initialRotate }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={style}
        className={cn(
          'cursor-grab active:cursor-grabbing select-none',
          'flex items-center justify-center',
          className
        )}
      >
      {/* Background Stroke Layer */}
      <div 
        className={cn("absolute pointer-events-none", textColor)}
        style={{
          WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Foreground Fill Layer */}
      <div 
        className={cn("relative z-[2]", textColor)}
      >
        {children}
      </div>
    </motion.div>
    </div>
  )
}
