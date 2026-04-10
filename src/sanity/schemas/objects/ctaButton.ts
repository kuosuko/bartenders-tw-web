import { defineField, defineType } from 'sanity'

export const ctaButton = defineType({
  name: 'ctaButton',
  title: '行動呼籲按鈕',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: '按鈕文字',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: '按鈕連結',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: '按鈕樣式',
      type: 'string',
      options: {
        list: [
          { title: '主要', value: 'primary' },
          { title: '次要', value: 'secondary' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'link' },
  },
})
