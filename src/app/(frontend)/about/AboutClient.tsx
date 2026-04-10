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
// Color helpers — map CMS color tokens to Tailwind class snippets
// =============================================================================

const RING_CLASS: Record<string, string> = {
  amber: 'ring-amber-400',
  indigo: 'ring-indigo-400',
  violet: 'ring-violet-400',
  rose: 'ring-rose-400',
  emerald: 'ring-emerald-400',
}

const ACCENT_TEXT: Record<string, string> = {
  amber: 'text-amber-600',
  indigo: 'text-indigo-600',
  violet: 'text-violet-600',
  rose: 'text-rose-600',
  emerald: 'text-emerald-600',
}

const GOAL_COLOR_MAP: Record<
  string,
  { bg: string; text: string; border: string; light: string }
> = {
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200', light: 'bg-indigo-50' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', light: 'bg-amber-50' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-200', light: 'bg-rose-50' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200', light: 'bg-emerald-50' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-600', border: 'border-violet-200', light: 'bg-violet-50' },
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
// LEADERSHIP
// =============================================================================
function LeadershipSection({
  featured,
  others,
}: {
  featured: FeaturedOfficerData[]
  others: OtherOfficerData[]
}) {
  if ((!featured || featured.length === 0) && (!others || others.length === 0)) return null

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-zinc-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
            Current Leadership
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-noto-serif-tc font-black text-zinc-900">
            現任團隊
          </h2>
        </motion.div>

        {/* Featured — up to 3 big photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featured.map((officer, idx) => {
            const ringCls = RING_CLASS[officer.ringColor || 'amber'] || RING_CLASS.amber
            const accentCls = ACCENT_TEXT[officer.ringColor || 'amber'] || ACCENT_TEXT.amber
            return (
              <motion.div
                key={`featured-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div
                  className={cn(
                    'relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-offset-4',
                    ringCls,
                  )}
                >
                  {officer.person?.avatar && (
                    <Image
                      src={officer.person.avatar}
                      alt={officer.person.name ?? ''}
                      fill
                      sizes="192px"
                      className="object-cover object-top"
                    />
                  )}
                </div>
                <span className={cn('text-xs font-bold tracking-wider uppercase', accentCls)}>
                  {officer.displayTitle || officer.titleEn}
                </span>
                <h3 className="mt-2 text-2xl font-noto-serif-tc font-black text-zinc-900">
                  {officer.person?.name}
                </h3>
                {officer.meta && <p className="text-zinc-500 text-sm mt-1">{officer.meta}</p>}
              </motion.div>
            )
          })}
        </div>

        {/* Other officers — small list */}
        {others && others.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-t border-zinc-100 pt-12"
          >
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
              {others.map((officer, idx) => {
                const accentCls =
                  ACCENT_TEXT[officer.accentColor || 'emerald'] || ACCENT_TEXT.emerald
                return (
                  <div key={`other-${idx}`} className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-zinc-100 relative">
                      {officer.person?.avatar && (
                        <Image
                          src={officer.person.avatar}
                          alt={officer.person.name ?? ''}
                          fill
                          sizes="96px"
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                    <p className={cn('text-xs font-bold tracking-wider uppercase mb-1', accentCls)}>
                      {officer.titleEn}
                    </p>
                    <p className="text-xl font-noto-serif-tc font-bold text-zinc-900">
                      {officer.person?.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// =============================================================================
// MISSION
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
    <section className="relative py-32 bg-zinc-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-zinc-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-noto-serif-tc font-black text-zinc-900">
            {title}
          </h2>
        </motion.div>

        <div className="space-y-16 mb-24">
          {goals.map((goal, index) => {
            const colors = GOAL_COLOR_MAP[goal.color || 'indigo'] || GOAL_COLOR_MAP.indigo
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={`${goal.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center',
                  !isEven && 'lg:grid-flow-dense',
                )}
              >
                <div
                  className={cn(
                    'relative aspect-[4/3] rounded-3xl overflow-hidden',
                    colors.light,
                    'border-2',
                    colors.border,
                    !isEven && 'lg:col-start-2',
                  )}
                >
                  {goal.image ? (
                    <Image src={goal.image} alt={goal.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className={cn(
                            'w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center',
                            colors.bg,
                          )}
                        >
                          <span className="text-white text-2xl font-bold">{index + 1}</span>
                        </div>
                        <p className="text-zinc-400 text-sm">放置圖片</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className={cn('flex flex-col justify-center', !isEven && 'lg:col-start-1 lg:row-start-1')}>
                  <span className={cn('text-xs font-bold tracking-wider uppercase mb-3', colors.text)}>
                    目標 {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-noto-serif-tc font-black text-zinc-900 mb-4">
                    {goal.title}
                  </h3>
                  <p className="text-zinc-600 text-lg leading-relaxed mb-6">{goal.description}</p>
                  <div className={cn('h-1 w-20 rounded-full', colors.bg)} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {tasks && tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl p-8 md:p-12 border border-zinc-100"
          >
            <div className="text-center mb-10">
              <span className="text-zinc-400 font-inter font-bold tracking-[0.3em] text-xs uppercase">
                Our Tasks
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-noto-serif-tc font-bold text-zinc-900">
                本會任務
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task, index) => (
                <motion.div
                  key={`${task}-${index}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-zinc-700 font-medium leading-relaxed pt-1">{task}</p>
                </motion.div>
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
    <section className="relative py-32 bg-zinc-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-3xl bg-white/5 border border-white/10"
            >
              <div className="text-4xl md:text-5xl font-noto-serif-tc font-black text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix ?? ''} />
              </div>
              <div className="text-white font-bold">{stat.label}</div>
              {stat.descEn && <div className="text-zinc-500 text-xs mt-1">{stat.descEn}</div>}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-amber-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
              Competitions
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-noto-serif-tc font-black text-white">
              競賽榮耀
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                國際賽事成績
              </h3>
              <div className="space-y-4">
                {international.map((comp, i) => (
                  <div
                    key={`${comp.year}-${i}`}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl transition-all',
                      comp.highlight
                        ? 'bg-amber-500/20 border border-amber-500/30'
                        : 'bg-white/5 border border-white/5',
                    )}
                  >
                    <span
                      className={cn(
                        'text-2xl font-bold font-noto-serif-tc',
                        comp.highlight ? 'text-amber-400' : 'text-zinc-400',
                      )}
                    >
                      {comp.year}
                    </span>
                    <span className={cn('font-medium', comp.highlight ? 'text-white' : 'text-zinc-300')}>
                      {comp.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                國內主辦賽事
              </h3>
              <div className="flex flex-wrap gap-3">
                {domestic.map((comp) => (
                  <span
                    key={comp}
                    className="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="text-emerald-400 font-inter font-bold tracking-[0.4em] text-xs uppercase">
              Certifications
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-noto-serif-tc font-black text-white">
              專業認證
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              引進國際課程及認證，讓台灣學子考國際證照不用到國外去
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20">
              <h3 className="text-lg font-bold text-indigo-400 mb-6">國際認證</h3>
              <ul className="space-y-3">
                {intlCerts.map((cert) => (
                  <li key={cert} className="flex items-start gap-3 text-zinc-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
              <h3 className="text-lg font-bold text-emerald-400 mb-6">教育部民間證照</h3>
              <ul className="space-y-3">
                {domCerts.map((cert) => (
                  <li key={cert} className="flex items-start gap-3 text-zinc-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {cert}
                  </li>
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
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl bg-zinc-100 flex items-center justify-center overflow-hidden relative">
              {image ? (
                <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              ) : (
                <span className="text-zinc-400 text-sm">B.A.T 表演團隊照片</span>
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-amber-500 flex items-center justify-center">
              <span className="text-white font-noto-serif-tc font-black text-4xl">B.A.T</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-500 font-inter font-bold tracking-[0.4em] text-xs uppercase">
              Performance Team
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-noto-serif-tc font-black text-zinc-900">
              {title}
            </h2>
            <p className="mt-6 text-zinc-600 leading-relaxed">{description}</p>
            {members && members.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {members.map((m) => (
                  <span
                    key={m}
                    className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-700 font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
            {badges && badges.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
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
