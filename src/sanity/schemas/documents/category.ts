import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: '最新消息分類',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名稱',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址別名',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
})
