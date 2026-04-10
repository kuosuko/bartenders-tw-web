/**
 * One-shot seed script. Run with: pnpm tsx scripts/seed/run.ts
 *
 * Idempotent — every document uses a stable _id and createOrReplace, so
 * re-running this updates existing docs instead of creating duplicates.
 *
 * Order matters because of references:
 *   1. taxonomies  → no deps
 *   2. people      → no deps
 *   3. singletons  → no deps
 *   4. example     → depends on taxonomies + people
 */
import { seedTaxonomies } from './seedTaxonomies'
import { seedPeople } from './seedPeople'
import { seedSiteSettings, seedNavigation, seedAboutPage } from './seedSingletons'
import { seedExampleContent } from './seedExampleContent'

async function main() {
  console.log('=== bartenders-tw-v2 seed ===')
  await seedTaxonomies()
  await seedPeople()
  await seedSiteSettings()
  await seedNavigation()
  await seedAboutPage()
  await seedExampleContent()
  console.log('\n=== seed complete ===')
}

main().catch((err) => {
  console.error('seed failed:', err)
  process.exit(1)
})
