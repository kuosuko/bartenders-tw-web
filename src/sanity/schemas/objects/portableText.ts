import { defineArrayMember, defineType } from 'sanity'

/**
 * Shared Portable Text definition for body content (news, course descriptions,
 * page content sections). Mirrors Plate.js basics: headings, lists, marks,
 * inline images. Custom block migration is intentionally not supported — see
 * the project memory for the rationale.
 */
export const portableText = defineType({
  name: 'portableText',
  title: '內容',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: '正文', value: 'normal' },
        { title: '標題 H2', value: 'h2' },
        { title: '標題 H3', value: 'h3' },
        { title: '標題 H4', value: 'h4' },
        { title: '引用', value: 'blockquote' },
      ],
      lists: [
        { title: '項目符號', value: 'bullet' },
        { title: '編號', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: '粗體', value: 'strong' },
          { title: '斜體', value: 'em' },
          { title: '底線', value: 'underline' },
          { title: '刪除線', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: '連結',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: '網址',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: '在新分頁開啟',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: '行內圖片',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文字',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: '說明文字',
        },
      ],
    }),
  ],
})
