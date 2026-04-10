import { defineField, defineType } from 'sanity'

/**
 * Reusable object types used by the `aboutPage` singleton.
 * Kept in one file because they only show up inside this single document.
 */

const RING_COLORS = [
  { title: '琥珀 (Amber)', value: 'amber' },
  { title: '靛藍 (Indigo)', value: 'indigo' },
  { title: '紫羅蘭 (Violet)', value: 'violet' },
  { title: '玫瑰 (Rose)', value: 'rose' },
  { title: '翡翠 (Emerald)', value: 'emerald' },
] as const

// -----------------------------------------------------------------------------
// HERO
// -----------------------------------------------------------------------------
export const aboutHero = defineType({
  name: 'aboutHero',
  title: '協會簡介 / Hero 區塊',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow 小字', type: 'string', initialValue: 'Established' }),
    defineField({ name: 'foundedYear', title: '創立年份 (大字)', type: 'string', initialValue: '1994' }),
    defineField({ name: 'title', title: '主標題', type: 'string', initialValue: '中華民國國際調酒協會' }),
    defineField({
      name: 'subtitle',
      title: '副標題 (英文)',
      type: 'string',
      initialValue: 'Bartender Association of Taiwan',
    }),
    defineField({
      name: 'tags',
      title: 'Tag Chips',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})

// -----------------------------------------------------------------------------
// HISTORY — presidents timeline
// -----------------------------------------------------------------------------
export const presidentEntry = defineType({
  name: 'presidentEntry',
  title: '歷屆理事長',
  type: 'object',
  fields: [
    defineField({ name: 'term', title: '屆別', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'name', title: '姓名', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: '職稱', type: 'string', initialValue: '理事長' }),
    defineField({ name: 'years', title: '任期 (例: 1994-2000)', type: 'string' }),
    defineField({ name: 'highlight', title: '任內亮點', type: 'string' }),
    defineField({ name: 'current', title: '現任?', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'term' },
  },
})

// -----------------------------------------------------------------------------
// LEADERSHIP — featured officer card (3 big) + small officer card
// -----------------------------------------------------------------------------
export const leadershipFeatured = defineType({
  name: 'leadershipFeatured',
  title: '重點幹部 (大圖)',
  type: 'object',
  fields: [
    defineField({
      name: 'person',
      title: '人物',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'titleEn', title: '英文職稱', type: 'string' }),
    defineField({ name: 'displayTitle', title: '顯示職稱 (中文)', type: 'string' }),
    defineField({ name: 'meta', title: '附註 (任期等)', type: 'string' }),
    defineField({
      name: 'ringColor',
      title: 'Ring 顏色',
      type: 'string',
      options: { list: [...RING_COLORS] },
      initialValue: 'amber',
    }),
  ],
  preview: {
    select: { title: 'person.name', subtitle: 'displayTitle', media: 'person.avatar' },
  },
})

export const leadershipOther = defineType({
  name: 'leadershipOther',
  title: '其他幹部 (小圖)',
  type: 'object',
  fields: [
    defineField({
      name: 'person',
      title: '人物',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'titleEn', title: '英文職稱', type: 'string' }),
    defineField({ name: 'displayTitle', title: '顯示職稱', type: 'string' }),
    defineField({
      name: 'accentColor',
      title: '強調色',
      type: 'string',
      options: { list: [...RING_COLORS] },
      initialValue: 'emerald',
    }),
  ],
  preview: {
    select: { title: 'person.name', subtitle: 'titleEn', media: 'person.avatar' },
  },
})

// -----------------------------------------------------------------------------
// MISSION / GOALS
// -----------------------------------------------------------------------------
export const missionGoal = defineType({
  name: 'missionGoal',
  title: '發展目標',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: '目標標題', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: '說明', type: 'text', rows: 3 }),
    defineField({
      name: 'color',
      title: '強調色',
      type: 'string',
      options: { list: [...RING_COLORS] },
      initialValue: 'indigo',
    }),
    defineField({
      name: 'image',
      title: '圖片 (選填)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'color' } },
})

// -----------------------------------------------------------------------------
// ACHIEVEMENTS
// -----------------------------------------------------------------------------
export const achievementStat = defineType({
  name: 'achievementStat',
  title: '統計數字',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: '數字', type: 'number', validation: (R) => R.required() }),
    defineField({ name: 'suffix', title: '後綴 (+ / 年 / 連霸)', type: 'string' }),
    defineField({ name: 'label', title: '中文標籤', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'descEn', title: '英文說明', type: 'string' }),
  ],
  preview: { select: { title: 'label', subtitle: 'value' } },
})

export const competitionEntry = defineType({
  name: 'competitionEntry',
  title: '國際賽事紀錄',
  type: 'object',
  fields: [
    defineField({ name: 'year', title: '年份', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'title', title: '成績/事件', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'highlight', title: '醒目顯示 (金框)', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'year' } },
})
