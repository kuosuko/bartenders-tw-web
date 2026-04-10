import type { StructureResolver } from 'sanity/structure'

/**
 * Custom desk structure:
 *  - Singletons (siteSettings, navigation) appear as single documents at the
 *    top, not collections.
 *  - Content lists (news, courses, pages) are grouped logically.
 *  - Taxonomies (categories, tags, albums) are tucked into a sub-group.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('內容')
    .items([
      // Singletons
      S.listItem()
        .title('網站設定')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('網站設定'),
        ),
      S.listItem()
        .title('導覽選單')
        .id('navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
            .title('導覽選單'),
        ),
      S.listItem()
        .title('協會簡介頁面')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('協會簡介頁面'),
        ),

      S.divider(),

      // Main content
      S.documentTypeListItem('newsPost').title('最新消息'),
      S.documentTypeListItem('course').title('課程'),
      S.documentTypeListItem('page').title('頁面'),

      S.divider(),

      // People + media
      S.documentTypeListItem('person').title('人物'),
      S.documentTypeListItem('mediaItem').title('媒體項目'),

      S.divider(),

      // Taxonomies
      S.listItem()
        .title('分類與標籤')
        .id('taxonomies')
        .child(
          S.list()
            .title('分類與標籤')
            .id('taxonomies-list')
            .items([
              S.documentTypeListItem('category').title('最新消息分類'),
              S.documentTypeListItem('courseCategory').title('課程分類'),
              S.documentTypeListItem('tag').title('標籤'),
              S.documentTypeListItem('album').title('相簿 / 媒體分類'),
            ]),
        ),
    ])
