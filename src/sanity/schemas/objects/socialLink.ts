import { defineField, defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: '社群連結',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: '平台',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'LINE', value: 'line' },
          { title: 'Twitter / X', value: 'twitter' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: '連結網址',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).required(),
    }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
  },
})
