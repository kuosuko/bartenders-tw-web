import { defineField, defineType } from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: '標籤',
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
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
})
