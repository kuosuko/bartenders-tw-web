import { client, uploadImageAsset } from './sanityClient'
import { SEED_PEOPLE } from './data/people'

export async function seedPeople(): Promise<void> {
  console.log(`\n[people] seeding ${SEED_PEOPLE.length} person documents`)
  for (const person of SEED_PEOPLE) {
    const avatar = await uploadImageAsset(person.photoPath, `${person.name} 大頭照`)
    const doc = {
      _id: person.id,
      _type: 'person',
      name: person.name,
      slug: { _type: 'slug', current: person.slug },
      role: person.role,
      avatar,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${person.name} (${person.id})`)
  }
}
