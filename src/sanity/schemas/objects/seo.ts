import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO 設定',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: '元標題',
      type: 'string',
      validation: (Rule) => Rule.max(70).warning('建議 70 字以內'),
    }),
    defineField({
      name: 'metaDescription',
      title: '元描述',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('建議 160 字以內'),
    }),
    defineField({
      name: 'ogImage',
      title: '社群分享圖片',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  options: { collapsible: true, collapsed: true },
})
