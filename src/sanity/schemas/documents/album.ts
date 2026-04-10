import { defineField, defineType } from 'sanity'

export const album = defineType({
  name: 'album',
  title: '相簿 / 媒體分類',
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
