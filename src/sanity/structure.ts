import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('內容')
    .id('root')
    .items([
      // ── Singletons ──────────────────────────────────────────────────────────
      S.listItem()
        .title('網站設定')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('導覽選單')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('協會簡介頁面')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

      S.divider(),

      // ── Main content ────────────────────────────────────────────────────────
      S.documentTypeListItem('newsPost').title('最新消息'),
      S.documentTypeListItem('course').title('課程'),
      S.documentTypeListItem('page').title('頁面'),

      S.divider(),

      // ── People & media ──────────────────────────────────────────────────────
      S.documentTypeListItem('person').title('人物'),
      S.documentTypeListItem('mediaItem').title('媒體項目'),

      S.divider(),

      // ── Taxonomies (flat — no nested list) ──────────────────────────────────
      S.documentTypeListItem('category').title('最新消息分類'),
      S.documentTypeListItem('courseCategory').title('課程分類'),
      S.documentTypeListItem('tag').title('標籤'),
      S.documentTypeListItem('album').title('相簿'),
    ])
