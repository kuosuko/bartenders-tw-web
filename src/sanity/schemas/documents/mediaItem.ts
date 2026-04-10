import { defineField, defineType } from 'sanity'

/**
 * mediaItem wraps a Sanity image asset with album + tag references so the
 * competition gallery can do tag-filtering and album grouping. Sanity's native
 * image asset alone has no first-class concept of "this image belongs to album
 * X and has tags Y, Z" — that's what this document type is for.
 */
export const mediaItem = defineType({
  name: 'mediaItem',
  title: '媒體項目',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: '圖片',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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
      name: 'caption',
      title: '說明文字',
      type: 'string',
    }),
    defineField({
      name: 'album',
      title: '相簿 / 分類',
      type: 'reference',
      to: [{ type: 'album' }],
    }),
    defineField({
      name: 'tags',
      title: '標籤',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'album.name',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || '(未命名媒體)',
      subtitle,
      media,
    }),
  },
})
