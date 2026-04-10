import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: '導覽選單',
  type: 'document',
  // Singleton — see structure.ts for desk pinning.
  fields: [
    defineField({
      name: 'mainNav',
      title: '主要導覽選單',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
    defineField({
      name: 'footerNav',
      title: '頁尾導覽選單',
      type: 'array',
      of: [{ type: 'footerColumn' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: '導覽選單' }),
  },
})
