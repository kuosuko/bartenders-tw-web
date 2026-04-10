/**
 * Taxonomies referenced by news posts, courses, and media items.
 * Stable IDs let the seed script be re-run safely.
 */

export type SeedCategory = {
  id: string
  slug: string
  name: string
  description?: string
}

export const SEED_NEWS_CATEGORIES: SeedCategory[] = [
  {
    id: 'category.announcements',
    slug: 'announcements',
    name: '公告',
    description: '協會官方公告與消息',
  },
  {
    id: 'category.events',
    slug: 'events',
    name: '活動報導',
    description: '比賽、講座、活動花絮',
  },
  {
    id: 'category.competition',
    slug: 'competition',
    name: '賽事消息',
    description: '國內外調酒競賽相關消息',
  },
  {
    id: 'category.education',
    slug: 'education',
    name: '教育訓練',
    description: '課程開班、認證與教育合作',
  },
  {
    id: 'category.partnership',
    slug: 'partnership',
    name: '產業合作',
    description: '品牌、協會、場館合作消息',
  },
]

export const SEED_COURSE_CATEGORIES: SeedCategory[] = [
  { id: 'courseCategory.foundation', slug: 'foundation', name: '基礎調酒' },
  { id: 'courseCategory.competition', slug: 'competition', name: '競賽培訓' },
  { id: 'courseCategory.certification', slug: 'certification', name: '證照課程' },
  { id: 'courseCategory.advanced', slug: 'advanced', name: '進階技術' },
  { id: 'courseCategory.flair', slug: 'flair', name: '花式調酒' },
]

export type SeedTag = { id: string; slug: string; name: string }

export const SEED_TAGS: SeedTag[] = [
  { id: 'tag.iba', slug: 'iba', name: 'IBA' },
  { id: 'tag.classic', slug: 'classic', name: '經典調酒' },
  { id: 'tag.competition', slug: 'competition', name: '比賽' },
  { id: 'tag.training', slug: 'training', name: '培訓' },
  { id: 'tag.cocktail', slug: 'cocktail', name: '雞尾酒' },
  { id: 'tag.flair', slug: 'flair', name: '花式' },
]
