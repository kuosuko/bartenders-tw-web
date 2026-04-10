import { client } from './sanityClient'
import {
  SEED_NEWS_CATEGORIES,
  SEED_COURSE_CATEGORIES,
  SEED_TAGS,
} from './data/taxonomies'

export async function seedTaxonomies(): Promise<void> {
  console.log('\n[taxonomies] seeding categories, courseCategories, tags')

  for (const cat of SEED_NEWS_CATEGORIES) {
    await client.createOrReplace({
      _id: cat.id,
      _type: 'category',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
    })
    console.log(`  ✓ category ${cat.name}`)
  }

  for (const cat of SEED_COURSE_CATEGORIES) {
    await client.createOrReplace({
      _id: cat.id,
      _type: 'courseCategory',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
    })
    console.log(`  ✓ courseCategory ${cat.name}`)
  }

  for (const tag of SEED_TAGS) {
    await client.createOrReplace({
      _id: tag.id,
      _type: 'tag',
      name: tag.name,
      slug: { _type: 'slug', current: tag.slug },
    })
    console.log(`  ✓ tag ${tag.name}`)
  }
}
