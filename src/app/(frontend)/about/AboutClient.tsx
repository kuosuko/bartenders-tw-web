'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Counter } from '@/components/ui/Counter'
import { cn } from '@/lib/utils'

// =============================================================================
// Data shape — mirrors the aboutPage singleton GROQ query in page.tsx
// =============================================================================

export interface AboutHeroData {
  eyebrow?: string
  foundedYear?: string
  title?: string
  subtitle?: string
  tags?: string[]
}

export interface PresidentData {
  term: string
  name: string
  role?: string
  years?: string
  highlight?: string
  current?: boolean
}

export interface PersonRef {
  name?: string
  avatar?: string
}

export interface FeaturedOfficerData {
  person?: PersonRef
  titleEn?: string
  displayTitle?: string
  meta?: string
  ringColor?: string
}

export interface OtherOfficerData {
  person?: PersonRef
  titleEn?: string
  displayTitle?: string
  accentColor?: string
}

export interface GoalData {
  title: string
  description?: string
  color?: string
  image?: string
}

export interface StatData {
  value: number
  suffix?: string
  label: string
  descEn?: string
}

export interface CompetitionData {
  year: string
  title: string
  highlight?: boolean
}

export interface AboutData {
  hero?: AboutHeroData
  presidents?: PresidentData[]
  featuredOfficers?: FeaturedOfficerData[]
  otherOfficers?: OtherOfficerData[]
  missionEyebrow?: string
  missionTitle?: string
  goals?: GoalData[]
  tasks?: string[]
  stats?: StatData[]
  internationalCompetitions?: CompetitionData[]
  domesticCompetitions?: string[]
  internationalCerts?: string[]
  domesticCerts?: string[]
  batTeamTitle?: string
  batTeamDescription?: string
  batTeamMembers?: string[]
  batTeamBadges?: string[]
  batTeamImage?: string
}


// =============================================================================
// HERO
// =============================================================================
function AboutHero({ hero }: { hero: AboutHeroData }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-zinc-500 font-inter font-bold tracking-[0.4em] text-xs uppercase">
            {hero.eyebrow || 'Established'}
          </span>
          <div className="mt-4 text-[12rem] md:text-[18rem] font-noto-serif-tc font-black text-white leading-none tracking-tighter">
            <span className="bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent">
              {hero.foundedYear || '1994'}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-noto-serif-tc font-black text-3xl md:text-5xl text-white leading-tight">
            {hero.title}
          </h1>
          <p className="mt-4 text-zinc-400 font-inter text-sm tracking-[0.2em] uppercase">
            {hero.subtitle}
          </p>
        </motion.div>

        {hero.tags && hero.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {hero.tags.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  )
}

// =============================================================================
// HISTORY
// =============================================================================
function HistorySection({ presidents }: { presidents: PresidentData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!presidents || presidents.length === 0) return null

  const activePresident = presidents[activeIndex]

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-0 lg:w-[35%] bg-zinc-950" />
        <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] bg-zinc-50" />
      </div>

      <div className="relative lg:flex">
        {/* Left sticky panel */}
        <div className="hidden lg:flex lg:w-[35%] lg:sticky lg:top-0 lg:h-screen flex-col justify-center p-12 bg-zinc-950">
          <div className="max-w-sm">
            <span className="text-zinc-500 font-inter font-bold tracking-[0.4em] text-xs uppercase">
              Leadership Legacy
            </span>
            <h2 className="mt-4 text-3xl xl:text-4xl font-noto-serif-tc font-black text-white">
              歷屆理事長
            </h2>

            <motion.div
              key={activePresident.name + activePresident.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              <div className="text-7xl xl:text-8xl font-noto-serif-tc font-black text-white/10 leading-none">
                {activePresident.years?.split('-')[0] ?? ''}
              </div>
              <div className="-mt-6 xl:-mt-8">
                <span
                  className={cn(
                    'text-xs font-bold tracking-wider',
                    activePresident.current ? 'text-amber-400' : 'text-zinc-500',
                  )}
                >
                  {activePresident.term}
                </span>
                <h3 className="text-3xl xl:text-4xl font-noto-serif-tc font-black text-white mt-1">
                  {activePresident.name}
                </h3>
                <p className="text-zinc-400 mt-1">{activePresident.role}</p>
                {activePresident.highlight && (
                  <span
                    className={cn(
                      'inline-block mt-6 px-4 py-1.5 rounded-full text-sm font-bold',
                      activePresident.current
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/10 text-zinc-300',
                    )}
                  >
                    {activePresident.highlight}
                  </span>
                )}
              </div>
            </motion.div>

            <div className="mt-12 flex items-center gap-2">
              {presidents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`前往第 ${idx + 1} 位理事長`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    idx === activeIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-600',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right zigzag timeline */}
        <div className="lg:w-[65%] py-20 lg:py-40 px-6 lg:px-12 bg-zinc-50 lg:bg-transparent">
          <div className="lg:hidden text-center mb-12">
            <span className="text-zinc-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
              Leadership Legacy
            </span>
            <h2 className="mt-3 text-3xl font-noto-serif-tc font-black text-zinc-900">
              歷屆理事長
            </h2>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-300 md:-translate-x-1/2" />

            <div className="space-y-4 md:space-y-0">
              {presidents.map((president, index) => {
                const isLeft = index % 2 === 0
                const isActive = index === activeIndex
                return (
                  <motion.div
                    key={`${president.term}-${index}`}
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, margin: '-50% 0px -40% 0px' }}
                    onViewportEnter={() => setActiveIndex(index)}
                    className={cn(
                      'relative pl-10 md:pl-0 md:w-[calc(50%-24px)] md:py-4 cursor-pointer',
                      isLeft ? 'md:text-right' : 'md:ml-auto md:text-left',
                    )}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className={cn(
                        'md:hidden absolute left-4 top-6 -translate-x-1/2 rounded-full border-4 border-zinc-50 transition-all duration-300 z-10',
                        isActive
                          ? president.current
                            ? 'w-4 h-4 bg-amber-500'
                            : 'w-4 h-4 bg-zinc-900'
                          : 'w-2.5 h-2.5 bg-zinc-400',
                      )}
                    />
                    <div
                      className={cn(
                        'hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-zinc-50 transition-all duration-300 z-10',
                        isLeft
                          ? 'right-0 translate-x-[calc(100%+24px)]'
                          : 'left-0 -translate-x-[calc(100%+24px)]',
                        isActive
                          ? president.current
                            ? 'w-5 h-5 bg-amber-500'
                            : 'w-5 h-5 bg-zinc-900'
                          : 'w-3 h-3 bg-zinc-400',
                      )}
                    />

                    <div
                      className={cn(
                        'p-4 md:p-5 rounded-xl border transition-all duration-300',
                        isActive
                          ? president.current
                            ? 'bg-white border-amber-300 shadow-lg'
                            : 'bg-white border-zinc-300 shadow-lg'
                          : 'bg-white/60 border-zinc-200 hover:bg-white hover:shadow-sm',
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center gap-2 mb-2',
                          isLeft ? 'md:justify-end' : 'md:justify-start',
                        )}
                      >
                        <span
                          className={cn(
                            'text-xs font-bold',
                            isActive ? 'text-zinc-900' : 'text-zinc-400',
                          )}
                        >
                          {president.years}
                        </span>
                        {president.current && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold">
                            現任
                          </span>
                        )}
                      </div>
                      <h4
                        className={cn(
                          'text-lg md:text-xl font-noto-serif-tc font-bold',
                          isActive ? 'text-zinc-900' : 'text-zinc-500',
                        )}
                      >
                        {president.name}
                      </h4>
                      <p
                        className={cn(
                          'text-xs mt-1',
                          isActive ? 'text-zinc-600' : 'text-zinc-400',
                        )}
                      >
                        {president.term} · {president.role}
                      </p>
                      {isActive && president.highlight && (
                        <p className="md:hidden text-xs text-zinc-500 mt-2 pt-2 border-t border-zinc-100">
                          {president.highlight}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// LEADERSHIP — editorial grid, no decorative rings
// =============================================================================
function LeadershipSection({
  featured,
  others,
}: {
  featured: FeaturedOfficerData[]
  others: OtherOfficerData[]
}) {
  if ((!featured || featured.length === 0) && (!others || others.length === 0)) return null

  const allOfficers = [
    ...featured.map((o) => ({
      name: o.person?.name ?? '',
      avatar: o.person?.avatar,
      title: o.displayTitle || o.titleEn || '',
      titleEn: o.titleEn || '',
      meta: o.meta,
      big: true,
    })),
    ...others.map((o) => ({
      name: o.person?.name ?? '',
      avatar: o.person?.avatar,
      title: o.displayTitle || '',
      titleEn: o.titleEn || '',
      meta: undefined as string | undefined,
      big: false,
    })),
  ]

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="text-zinc-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
            Current Leadership
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-noto-serif-tc font-black text-zinc-900">
            現任團隊
          </h2>
        </motion.div>

        {/* Officers as rows — name-first editorial feel */}
        <div className="border-t border-zinc-900">
          {allOfficers.map((officer, idx) => (
            <motion.div
              key={`officer-${idx}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-center gap-5 md:gap-8 py-5 md:py-6 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors"
            >
              {/* Photo — simple square, grayscale on idle */}
              <div className={cn(
                'relative shrink-0 overflow-hidden bg-zinc-100',
                officer.big ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-16 md:h-16',
              )}>
                {officer.avatar && (
                  <Image
                    src={officer.avatar}
                    alt={officer.name}
                    fill
                    sizes="80px"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                )}
              </div>

              {/* Name + title */}
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  'font-noto-serif-tc font-black text-zinc-900 tracking-tight',
                  officer.big ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl',
                )}>
                  {officer.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                    {officer.titleEn}
                  </span>
                  {officer.meta && (
                    <>
                      <span className="h-px w-3 bg-zinc-300" />
                      <span className="text-[10px] text-zinc-400">{officer.meta}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Chinese title on the right — desktop only */}
              <span className="hidden md:block text-sm text-zinc-400 shrink-0">
                {officer.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// MISSION — text-only manifesto, no placeholder images
// =============================================================================
function MissionSection({
  eyebrow,
  title,
  goals,
  tasks,
}: {
  eyebrow: string
  title: string
  goals: GoalData[]
  tasks: string[]
}) {
  return (
    <section className="relative py-24 md:py-32 bg-[#fafaf9] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-zinc-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-noto-serif-tc font-black text-zinc-900">
            {title}
          </h2>
        </motion.div>

        {/* Goals as numbered manifesto rows */}
        <div className="border-t border-zinc-300 mb-20 md:mb-28">
          {goals.map((goal, index) => (
            <motion.div
              key={`${goal.title}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-zinc-200"
            >
              {/* Large index number */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-noto-serif-tc text-4xl md:text-5xl font-black text-zinc-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title + description */}
              <div className="col-span-10 md:col-span-11 flex flex-col md:flex-row md:items-baseline md:gap-12">
                <h3 className="font-noto-serif-tc text-xl md:text-2xl font-black text-zinc-900 shrink-0 md:w-[240px] mb-2 md:mb-0">
                  {goal.title}
                </h3>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed flex-1">
                  {goal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tasks — compact inline list, no card wrapper */}
        {tasks && tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-zinc-900" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                本會任務 — {String(tasks.length).padStart(2, '0')} Items
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {tasks.map((task, index) => (
                <div
                  key={`${task}-${index}`}
                  className="flex items-baseline gap-3 py-2"
                >
                  <span className="text-[10px] font-black text-zinc-300 tabular-nums w-5 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-zinc-700 text-sm leading-relaxed">{task}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// =============================================================================
// ACHIEVEMENTS
// =============================================================================
function AchievementsSection({
  stats,
  international,
  domestic,
  intlCerts,
  domCerts,
}: {
  stats: StatData[]
  international: CompetitionData[]
  domestic: string[]
  intlCerts: string[]
  domCerts: string[]
}) {
  return (
    <section className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Stats — big serif numbers, no card chrome */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-zinc-800 mb-20 md:mb-28">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'py-8 md:py-10 text-center',
                index !== stats.length - 1 && 'md:border-r border-zinc-800',
              )}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-noto-serif-tc font-black text-white leading-none mb-3">
                <Counter value={stat.value} suffix={stat.suffix ?? ''} />
              </div>
              <div className="text-white/90 text-sm font-bold">{stat.label}</div>
              {stat.descEn && <div className="text-zinc-600 text-[10px] tracking-wider uppercase mt-1">{stat.descEn}</div>}
            </motion.div>
          ))}
        </div>

        {/* Competitions — two columns, minimal borders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-10 bg-amber-500" />
            <span className="text-amber-400 font-inter font-bold tracking-[0.4em] text-[10px] uppercase">
              Competitions
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* International */}
            <div>
              <h3 className="text-xl font-noto-serif-tc font-black text-white mb-6">
                國際賽事成績
              </h3>
              <div className="border-t border-zinc-800">
                {international.map((comp, i) => (
                  <div
                    key={`${comp.year}-${i}`}
                    className={cn(
                      'flex items-baseline gap-4 py-3 border-b border-zinc-800/60',
                      comp.highlight && 'text-amber-400',
                    )}
                  >
                    <span className={cn(
                      'font-noto-serif-tc text-lg font-black tabular-nums shrink-0',
                      comp.highlight ? 'text-amber-400' : 'text-zinc-500',
                    )}>
                      {comp.year}
                    </span>
                    <span className={cn(
                      'text-sm',
                      comp.highlight ? 'text-amber-400 font-bold' : 'text-zinc-300',
                    )}>
                      {comp.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domestic */}
            <div>
              <h3 className="text-xl font-noto-serif-tc font-black text-white mb-6">
                國內主辦賽事
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {domestic.map((comp, i) => (
                  <span key={comp} className="text-zinc-400 text-sm">
                    {comp}{i !== domestic.length - 1 && <span className="text-zinc-700 ml-6">/</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications — two columns, simple lists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-10 bg-zinc-500" />
            <span className="text-zinc-500 font-inter font-bold tracking-[0.4em] text-[10px] uppercase">
              Certifications
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-noto-serif-tc font-black text-white mb-3">
            專業認證
          </h2>
          <p className="text-zinc-500 text-sm mb-10 max-w-lg">
            引進國際課程及認證，讓台灣學子考國際證照不用到國外去
          </p>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4">國際認證</h3>
              <ul className="space-y-2 border-t border-zinc-800 pt-4">
                {intlCerts.map((cert) => (
                  <li key={cert} className="text-zinc-300 text-sm py-1">{cert}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4">教育部民間證照</h3>
              <ul className="space-y-2 border-t border-zinc-800 pt-4">
                {domCerts.map((cert) => (
                  <li key={cert} className="text-zinc-300 text-sm py-1">{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// BAT TEAM
// =============================================================================
function BATTeamSection({
  title,
  description,
  members,
  badges,
  image,
}: {
  title: string
  description: string
  members: string[]
  badges: string[]
  image?: string
}) {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-zinc-900" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
              Performance Team
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            {/* Text — 5 cols */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-noto-serif-tc font-black text-zinc-900 mb-6">
                {title}
              </h2>
              <p className="text-zinc-600 leading-[1.8] text-sm md:text-base mb-8">{description}</p>

              {members && members.length > 0 && (
                <div className="border-t border-zinc-200 pt-6">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-3">
                    Members
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {members.map((m, i) => (
                      <span key={m} className="text-zinc-900 font-noto-serif-tc font-bold">
                        {m}{i !== members.length - 1 && <span className="text-zinc-300 ml-4">/</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                  {badges.map((b) => (
                    <span key={b} className="text-xs text-amber-600">{b}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Image — 7 cols */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[3/2] overflow-hidden bg-zinc-100">
                {image ? (
                  <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-400 text-sm">B.A.T 表演團隊照片</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// MAIN EXPORT
// =============================================================================
export function AboutClient({ data }: { data: AboutData }) {
  return (
    <main>
      <AboutHero hero={data.hero ?? {}} />
      <HistorySection presidents={data.presidents ?? []} />
      <LeadershipSection
        featured={data.featuredOfficers ?? []}
        others={data.otherOfficers ?? []}
      />
      <MissionSection
        eyebrow={data.missionEyebrow ?? 'Mission & Goals'}
        title={data.missionTitle ?? '發展目標'}
        goals={data.goals ?? []}
        tasks={data.tasks ?? []}
      />
      <AchievementsSection
        stats={data.stats ?? []}
        international={data.internationalCompetitions ?? []}
        domestic={data.domesticCompetitions ?? []}
        intlCerts={data.internationalCerts ?? []}
        domCerts={data.domesticCerts ?? []}
      />
      <BATTeamSection
        title={data.batTeamTitle ?? '表演團隊'}
        description={data.batTeamDescription ?? ''}
        members={data.batTeamMembers ?? []}
        badges={data.batTeamBadges ?? []}
        image={data.batTeamImage}
      />
    </main>
  )
}
