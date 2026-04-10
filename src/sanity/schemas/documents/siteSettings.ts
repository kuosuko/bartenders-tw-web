import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '網站設定',
  type: 'document',
  // Singleton: structure.ts pins this to a single document, but liveEdit + a
  // hidden create flag in the schema also helps avoid duplicates appearing in
  // search results.
  fields: [
    defineField({
      name: 'siteName',
      title: '網站名稱',
      type: 'string',
      initialValue: '台灣調酒師協會',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: '網站描述',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: '網站 Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: '網站圖示 (Favicon)',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: '聯絡信箱',
      type: 'email',
    }),
    defineField({
      name: 'contactPhone',
      title: '聯絡電話',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: '地址',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'socialLinks',
      title: '社群連結',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'defaultSeo',
      title: '預設 SEO 設定',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: '網站設定' }),
  },
})
