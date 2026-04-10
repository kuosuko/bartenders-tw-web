/**
 * The 6 people we have photos for in /home/ubuntu/bartw/bartenders-tw/public/people/.
 * These are the only `person` documents we can seed automatically — everything
 * else needs to be added by hand in /studio.
 *
 * IDs are stable (`person.<slug>`) so re-running the seed updates the same
 * documents instead of creating duplicates.
 */

const LEGACY_PUBLIC = '/home/ubuntu/bartw/bartenders-tw/public'

export type SeedPerson = {
  id: string
  slug: string
  name: string
  role: 'admin' | 'editor' | 'instructor' | 'member'
  photoPath: string
}

export const SEED_PEOPLE: SeedPerson[] = [
  {
    id: 'person.kuo-chih-ling',
    slug: 'kuo-chih-ling',
    name: '郭植伶',
    role: 'instructor',
    photoPath: `${LEGACY_PUBLIC}/people/郭植伶.png`,
  },
  {
    id: 'person.deng-chi-chu',
    slug: 'deng-chi-chu',
    name: '鄧杞祝',
    role: 'instructor',
    photoPath: `${LEGACY_PUBLIC}/people/鄧杞祝.png`,
  },
  {
    id: 'person.kuo-chao-kun',
    slug: 'kuo-chao-kun',
    name: '郭朝坤',
    role: 'instructor',
    photoPath: `${LEGACY_PUBLIC}/people/郭朝坤.webp`,
  },
  {
    id: 'person.jao-wen-pin',
    slug: 'jao-wen-pin',
    name: '饒文彬',
    role: 'instructor',
    photoPath: `${LEGACY_PUBLIC}/people/饒文彬.png`,
  },
  {
    id: 'person.hsieh-mei-mei',
    slug: 'hsieh-mei-mei',
    name: '謝美美',
    role: 'instructor',
    photoPath: `${LEGACY_PUBLIC}/people/謝美美.png`,
  },
  {
    id: 'person.wang-nien-tzu',
    slug: 'wang-nien-tzu',
    name: '王念慈',
    role: 'instructor',
    photoPath: `${LEGACY_PUBLIC}/people/王念慈.png`,
  },
]
