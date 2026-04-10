import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: '頁面',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '頁面標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址別名',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: '頁面區塊',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'contentSection' },
        { type: 'featureGridSection' },
        { type: 'ctaSection' },
      ],
    }),
    defineField({
      name: 'status',
      title: '狀態',
      type: 'string',
      options: {
        list: [
          { title: '草稿', value: 'draft' },
          { title: '已發佈', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO 設定',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', status: 'status' },
    prepare: ({ title, subtitle, status }) => ({
      title,
      subtitle: `/${subtitle || ''} · ${status}`,
    }),
  },
})
