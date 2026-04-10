import { defineField, defineType } from 'sanity'

export const newsPost = defineType({
  name: 'newsPost',
  title: '最新消息',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: '網址別名',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
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
      name: 'content',
      title: '內容',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '分類',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: '標籤',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'author',
      title: '作者',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'status',
      title: '狀態',
      type: 'string',
      options: {
        list: [
          { title: '草稿', value: 'draft' },
          { title: '已發佈', value: 'published' },
          { title: '已封存', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '發佈日期',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO 設定',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: '發佈日期：新到舊',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.name',
      media: 'featuredImage',
      status: 'status',
    },
    prepare: ({ title, subtitle, media, status }) => ({
      title,
      subtitle: `${status === 'published' ? '✅' : status === 'archived' ? '📦' : '📝'} ${subtitle || ''}`.trim(),
      media,
    }),
  },
})
