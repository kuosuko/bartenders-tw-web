import { defineField, defineType } from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: '證照與考核',
  type: 'object',
  fields: [
    defineField({
      name: 'hasCertification',
      title: '啟用證照資訊',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'type',
      title: '證照類型',
      type: 'string',
      options: {
        list: [
          { title: '課程內包含', value: 'included' },
          { title: '需額外繳費', value: 'additionalFee' },
          { title: '需繳費並通過考核', value: 'feeAndTest' },
        ],
      },
      hidden: ({ parent }) => !parent?.hasCertification,
    }),
    defineField({
      name: 'fee',
      title: '考核 / 證照費用 (NTD)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      hidden: ({ parent }) =>
        !parent?.hasCertification ||
        (parent?.type !== 'additionalFee' && parent?.type !== 'feeAndTest'),
    }),
    defineField({
      name: 'testDetails',
      title: '考核詳細說明',
      type: 'text',
      rows: 4,
      hidden: ({ parent }) =>
        !parent?.hasCertification || parent?.type !== 'feeAndTest',
    }),
    defineField({
      name: 'description',
      title: '證照簡介 / 說明',
      type: 'text',
      rows: 4,
      hidden: ({ parent }) => !parent?.hasCertification,
    }),
  ],
  options: { collapsible: true, collapsed: true },
})
