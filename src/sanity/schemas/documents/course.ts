import { defineField, defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: '課程',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '課程標題',
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
      name: 'shortDescription',
      title: '簡短描述',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: '內容詳細描述',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: '精選圖片',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文字',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: '圖片藝廊',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '替代文字',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: '課程分類',
      type: 'reference',
      to: [{ type: 'courseCategory' }],
    }),
    defineField({
      name: 'instructor',
      title: '授課老師',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'level',
      title: '課程等級',
      type: 'string',
      options: {
        list: [
          { title: '入門', value: 'beginner' },
          { title: '初階', value: 'intermediate' },
          { title: '進階', value: 'advanced' },
          { title: '專業級', value: 'professional' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: '課程時數',
      type: 'string',
      description: '例如「三天 / 24 小時」',
    }),
    defineField({
      name: 'price',
      title: '原價 (NTD)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'memberPrice',
      title: '會員優惠價 (NTD)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'maxParticipants',
      title: '人數上限',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: 'schedule',
      title: '開課時程',
      type: 'array',
      of: [{ type: 'scheduleSlot' }],
    }),
    defineField({
      name: 'syllabus',
      title: '課程大綱',
      type: 'array',
      of: [{ type: 'syllabusItem' }],
    }),
    defineField({
      name: 'certification',
      title: '證照與考核',
      type: 'certification',
    }),
    defineField({
      name: 'status',
      title: '狀態',
      type: 'string',
      options: {
        list: [
          { title: '草稿', value: 'draft' },
          { title: '即將開課', value: 'upcoming' },
          { title: '報名中', value: 'open' },
          { title: '已額滿', value: 'full' },
          { title: '已結束', value: 'completed' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: '精選推薦',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO 設定',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: '精選優先',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.name',
      media: 'featuredImage',
      featured: 'featured',
      status: 'status',
    },
    prepare: ({ title, subtitle, media, featured, status }) => ({
      title: `${featured ? '⭐ ' : ''}${title}`,
      subtitle: `${status} · ${subtitle || ''}`.trim(),
      media,
    }),
  },
})
