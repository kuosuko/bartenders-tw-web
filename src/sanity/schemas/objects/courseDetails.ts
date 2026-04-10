import { defineField, defineType } from 'sanity'

export const scheduleSlot = defineType({
  name: 'scheduleSlot',
  title: '開課時程',
  type: 'object',
  fields: [
    defineField({
      name: 'date',
      title: '日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: '開始時間',
      type: 'string',
      description: '格式 HH:mm，例如 14:00',
    }),
    defineField({
      name: 'endTime',
      title: '結束時間',
      type: 'string',
      description: '格式 HH:mm，例如 17:00',
    }),
    defineField({
      name: 'location',
      title: '地點',
      type: 'string',
    }),
  ],
  preview: {
    select: { date: 'date', startTime: 'startTime', location: 'location' },
    prepare: ({ date, startTime, location }) => ({
      title: date ? `${date}${startTime ? ` ${startTime}` : ''}` : '未設定日期',
      subtitle: location,
    }),
  },
})

export const syllabusItem = defineType({
  name: 'syllabusItem',
  title: '課程章節',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: '章節名稱',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '內容說明',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'extraDetails',
      title: '更多細節 / 學習核心',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: '章節圖片',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
