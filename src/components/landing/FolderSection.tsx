'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Folder {
  id: string
  title: string
  label: string
  content: string[]
  color: string
}

const folders: Folder[] = [
  {
    id: 'cert',
    title: '國際認證課程',
    label: 'CERTIFICATION',
    color: 'bg-zinc-900',
    content: [
      'IBA 國際專業吧檯調酒師初階',
      'IBA 國際專業吧檯調酒師中階',
      'IFBA 國際專業咖啡師認證',
      'TIPS 飲酒安全國際認證'
    ]
  },
  {
    id: 'events',
    title: '相關賽事舉辦',
    label: 'EVENTS',
    color: 'bg-indigo-950',
    content: [
      '金爵獎國際調酒大賽',
      '杜康盃全國調酒大賽',
      '五洲盃全國調酒大賽',
      '港都盃全國調酒大賽'
    ]
  },
  {
    id: 'social',
    title: '社會服務與培力',
    label: 'SOCIAL',
    color: 'bg-zinc-800',
    content: [
      '幫助弱勢團體習得技能',
      '身心障礙者職業訓練',
      '視覺障礙者調酒推廣',
      '偏鄉調酒技能教育'
    ]
  }
]

export function FolderSection() {
  const [activeId, setActiveId] = useState(folders[0].id)

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24">
      <div className="flex flex-col gap-1">
        {folders.map((folder, idx) => {
          const isActive = activeId === folder.id
          
          return (
            <div key={folder.id} className="relative">
              {/* Folder Tab */}
              <button
                onClick={() => setActiveId(folder.id)}
                className={cn(
                  "relative w-full text-left px-8 py-6 rounded-t-3xl transition-all duration-500 flex items-end justify-between overflow-hidden",
                  folder.color,
                  isActive ? "h-24" : "h-16 hover:h-20 opacity-60 hover:opacity-100"
                )}
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-white/20 font-black text-xl italic font-inter">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="text-white text-xl md:text-2xl font-line-seed font-black tracking-wider">
                    {folder.title}
                  </h3>
                </div>
                <span className="text-white/40 font-inter text-xs tracking-[0.3em] font-black uppercase mb-1">
                  {folder.label}
                </span>

                {/* Decorative folder corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 skew-y-12 translate-x-8 -translate-y-8" />
              </button>

              {/* Folder Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className={cn("overflow-hidden rounded-b-3xl mb-4", folder.color)}
                  >
                    <div className="px-8 pb-12 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {folder.content.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-4 group cursor-default"
                        >
                          <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-indigo-500 transition-colors" />
                          <span className="text-white/70 font-medium hover:text-white transition-colors">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
