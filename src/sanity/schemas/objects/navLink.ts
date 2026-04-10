import { defineField, defineType } from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: '連結項目',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: '顯示文字',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: '連結網址',
      type: 'string',
      description: '可以是相對路徑 (如 /news) 或完整網址',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'link' },
  },
})

export const navItem = defineType({
  name: 'navItem',
  title: '主選單項目',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: '顯示文字',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: '連結網址',
      type: 'string',
    }),
    defineField({
      name: 'children',
      title: '子選單項目',
      type: 'array',
      of: [{ type: 'navLink' }],
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'link' },
  },
})

export const footerColumn = defineType({
  name: 'footerColumn',
  title: '頁尾欄位',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: '區塊標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: '連結清單',
      type: 'array',
      of: [{ type: 'navLink' }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
