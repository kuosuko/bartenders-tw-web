import type { SchemaTypeDefinition } from 'sanity'

// Object types (reusable, embedded in documents)
import { seo } from './objects/seo'
import { socialLink } from './objects/socialLink'
import { navLink, navItem, footerColumn } from './objects/navLink'
import { ctaButton } from './objects/ctaButton'
import { certification } from './objects/certification'
import { scheduleSlot, syllabusItem } from './objects/courseDetails'
import { portableText } from './objects/portableText'
import {
  heroSection,
  contentSection,
  featureGridSection,
  ctaSection,
} from './objects/sections'
import {
  aboutHero,
  presidentEntry,
  leadershipFeatured,
  leadershipOther,
  missionGoal,
  achievementStat,
  competitionEntry,
} from './objects/aboutSections'

// Document types (top-level content)
import { category } from './documents/category'
import { courseCategory } from './documents/courseCategory'
import { tag } from './documents/tag'
import { album } from './documents/album'
import { mediaItem } from './documents/mediaItem'
import { person } from './documents/person'
import { newsPost } from './documents/newsPost'
import { course } from './documents/course'
import { page } from './documents/page'
import { siteSettings } from './documents/siteSettings'
import { navigation } from './documents/navigation'
import { aboutPage } from './documents/aboutPage'

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  socialLink,
  navLink,
  navItem,
  footerColumn,
  ctaButton,
  certification,
  scheduleSlot,
  syllabusItem,
  portableText,
  heroSection,
  contentSection,
  featureGridSection,
  ctaSection,
  // about section objects
  aboutHero,
  presidentEntry,
  leadershipFeatured,
  leadershipOther,
  missionGoal,
  achievementStat,
  competitionEntry,
  // documents
  category,
  courseCategory,
  tag,
  album,
  mediaItem,
  person,
  newsPost,
  course,
  page,
  // singletons
  siteSettings,
  navigation,
  aboutPage,
]

// IDs of singletons — used by structure.ts to pin them as single docs
// and by any custom code that needs to fetch them by exact ID.
export const SINGLETON_TYPES = new Set(['siteSettings', 'navigation', 'aboutPage'])
export const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])
