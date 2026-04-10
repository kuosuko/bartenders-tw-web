'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import DottedMap from 'dotted-map/without-countries'
import { worldMapJson } from '@/lib/worldMapJson'

interface TaiwanDottedMapProps {
  className?: string
}

export function TaiwanDottedMap({ className }: TaiwanDottedMapProps) {
  const svgMap = useMemo(() => {
    // Re-create the map from pre-computed JSON
    const map = new DottedMap({ map: JSON.parse(worldMapJson) })

    // Kaohsiung/Taiwan area beacon spot
    map.addPin({
      lat: 22.6,
      lng: 120.3,
      svgOptions: { color: "#FF6B35", radius: 0.8 },
    })

    return map.getSVG({
      radius: 0.15,
      color: 'currentColor',
      shape: 'circle',
      backgroundColor: 'transparent',
    })
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Background Map */}
      <div 
        className="w-full h-auto text-current"
        dangerouslySetInnerHTML={{ __html: svgMap }}
      />
    </div>
  )
}
