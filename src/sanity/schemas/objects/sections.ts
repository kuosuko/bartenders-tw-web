import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: '首屏區塊',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: '主標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: '副標題',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: '背景圖片',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cta',
      title: '行動呼籲按鈕',
      type: 'ctaButton',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'subheading', media: 'backgroundImage' },
    prepare: ({ title, subtitle, media }) => ({
      title: `首屏：${title || '(未命名)'}`,
      subtitle,
      media,
    }),
  },
})

export const contentSection = defineType({
  name: 'contentSection',
  title: '豐富文字區塊',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: '內容',
      type: 'portableText',
    }),
  ],
  preview: {
    prepare: () => ({ title: '豐富文字區塊' }),
  },
})

export const featureGridSection = defineType({
  name: 'featureGridSection',
  title: '特色網格區塊',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: '區塊標題',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: '特色項目',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: '圖示',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'title',
              title: '特色標題',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: '特色描述',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'icon' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: `特色網格：${title || '(未命名)'}`,
    }),
  },
})

export const ctaSection = defineType({
  name: 'ctaSection',
  title: '行動呼籲區塊',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述說明',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttons',
      title: '按鈕列表',
      type: 'array',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'description' },
    prepare: ({ title, subtitle }) => ({
      title: `行動呼籲：${title || '(未命名)'}`,
      subtitle,
    }),
  },
})
