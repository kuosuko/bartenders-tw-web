'use client'

import React from 'react'
import CurvedLoop from '@/components/CurvedLoop'
import ShinyText from '@/components/ShinyText'

export function SponsorSection() {
  const sponsors = [
    "I.B.A GLOBAL",
    "MOËT HENNESSY",
    "DIAGEO",
    "CAMPARI GROUP",
    "BACARDI",
    "BROWN-FORMAN",
    "PERNOD RICARD",
    "NESTLÉ PROFESSIONAL",
    "MONIN",
    "REMY COINTREAU"
  ].join(" • ")

  return (
    <div className="py-24 bg-white overflow-hidden flex flex-col items-center">
      <div className="mb-12">
        <ShinyText 
          text="GLOBAL PARTNERS & SPONSORS" 
          disabled={false} 
          speed={3} 
          className="text-neutral-400 font-inter font-black tracking-[0.4em] text-sm md:text-base"
        />
      </div>

      <div className="w-full -mt-20 -mb-24">
        <CurvedLoop 
          marqueeText={sponsors}
          speed={1.5}
          curveAmount={300}
          className="fill-black/5 font-line-seed font-black italic opacity-50"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-24 opacity-20 hover:opacity-100 transition-opacity duration-700">
        <div className="h-8 md:h-12 flex items-center justify-center font-black text-2xl tracking-tighter italic">I.B.A</div>
        <div className="h-8 md:h-12 flex items-center justify-center font-serif text-2xl font-bold tracking-widest">DIAGEO</div>
        <div className="h-8 md:h-12 flex items-center justify-center font-mono font-black border-2 border-black px-2">MONIN</div>
        <div className="h-8 md:h-12 flex items-center justify-center font-bold text-3xl">BACARDÍ</div>
        <div className="h-8 md:h-12 flex items-center justify-center font-serif italic text-2xl">Hennessy</div>
      </div>
    </div>
  )
}
