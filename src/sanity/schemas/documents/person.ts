import { defineField, defineType } from 'sanity'

/**
 * person is a display-only document — used for showing authors on news posts
 * and instructors on courses. It does NOT participate in authentication.
 * Frontend auth is intentionally absent from v2; see project memory.
 */
export const person = defineType({
  name: 'person',
  title: '人物 (作者 / 講師)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
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
      name: 'role',
      title: '角色',
      type: 'string',
      options: {
        list: [
          { title: '管理員', value: 'admin' },
          { title: '編輯', value: 'editor' },
          { title: '講師', value: 'instructor' },
          { title: '一般成員', value: 'member' },
        ],
        layout: 'radio',
      },
      initialValue: 'instructor',
    }),
    defineField({
      name: 'avatar',
      title: '大頭照',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: '個人簡介',
      type: 'portableText',
    }),
    defineField({
      name: 'certifications',
      title: '證照資歷',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'certificationEntry',
          fields: [
            defineField({
              name: 'name',
              title: '名稱',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: '年份',
              type: 'number',
              validation: (Rule) => Rule.integer().min(1950).max(2100),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'year' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
  },
})
