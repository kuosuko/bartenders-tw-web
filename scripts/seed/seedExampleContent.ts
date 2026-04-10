import { client, uploadImageAsset } from './sanityClient'
import { SEED_NEWS_POSTS, type SeedBlock } from './data/newsPosts'
import { SEED_COURSES } from './data/courses'

const LEGACY_PUBLIC = '/home/ubuntu/bartw/bartenders-tw/public'

/**
 * Converts our compact SeedBlock[] shape into Sanity Portable Text blocks.
 * Keys are prefixed with the post slug so they stay unique within the doc.
 */
function toPortableText(slug: string, blocks: SeedBlock[]) {
  return blocks.map((block, i) => {
    const k = `${slug}-b${i}`
    if (block.type === 'h2') {
      return {
        _key: k,
        _type: 'block',
        style: 'h2',
        markDefs: [],
        children: [{ _key: `${k}s`, _type: 'span', text: block.text, marks: [] }],
      }
    }
    if (block.type === 'li') {
      return {
        _key: k,
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [{ _key: `${k}s`, _type: 'span', text: block.text, marks: [] }],
      }
    }
    return {
      _key: k,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _key: `${k}s`, _type: 'span', text: block.text, marks: [] }],
    }
  })
}

/**
 * Seeds news posts, courses and the home page. Uses stable IDs via
 * createOrReplace so re-running the script updates existing docs instead
 * of creating duplicates.
 */
export async function seedExampleContent(): Promise<void> {
  const goldenCup = await uploadImageAsset(
    `${LEGACY_PUBLIC}/golden-cup-banner.png`,
    '金盃調酒大賽',
  )
  const iba = await uploadImageAsset(`${LEGACY_PUBLIC}/iba.webp`, 'IBA 國際調酒')
  const images = { goldenCup, iba }

  // ---- News posts ---------------------------------------------------------
  console.log(`\n[news] seeding ${SEED_NEWS_POSTS.length} newsPost documents`)
  for (const post of SEED_NEWS_POSTS) {
    await client.createOrReplace({
      _id: post.id,
      _type: 'newsPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      featuredImage: { ...images[post.image], alt: post.title },
      content: toPortableText(post.slug, post.blocks),
      category: { _type: 'reference', _ref: post.categoryRef },
      tags: post.tagRefs.map((ref, i) => ({
        _key: `${post.slug}-t${i}`,
        _type: 'reference',
        _ref: ref,
      })),
      author: { _type: 'reference', _ref: post.authorRef },
      status: 'published',
      publishedAt: post.publishedAt,
    })
    console.log(`  ✓ ${post.id}`)
  }

  // ---- Courses ------------------------------------------------------------
  console.log(`\n[courses] seeding ${SEED_COURSES.length} course documents`)
  for (const c of SEED_COURSES) {
    await client.createOrReplace({
      _id: c.id,
      _type: 'course',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      shortDescription: c.shortDescription,
      description: c.descriptionParagraphs.map((text, i) => ({
        _key: `${c.slug}-d${i}`,
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{ _key: `${c.slug}-d${i}s`, _type: 'span', text, marks: [] }],
      })),
      featuredImage: { ...images[c.image], alt: c.title },
      category: { _type: 'reference', _ref: c.categoryRef },
      instructor: { _type: 'reference', _ref: c.instructorRef },
      level: c.level,
      duration: c.duration,
      price: c.price,
      memberPrice: c.memberPrice,
      maxParticipants: c.maxParticipants,
      schedule: c.schedule.map((s, i) => ({
        _key: `${c.slug}-s${i}`,
        _type: 'scheduleSlot',
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        location: s.location,
      })),
      syllabus: c.syllabus.map((item, i) => ({
        _key: `${c.slug}-sy${i}`,
        _type: 'syllabusItem',
        title: item.title,
        description: item.description,
      })),
      certification: {
        _type: 'certification',
        ...c.certification,
      },
      status: c.status,
      featured: c.featured,
    })
    console.log(`  ✓ ${c.id}`)
  }

  // ---- Home page ----------------------------------------------------------
  console.log('\n[page] seeding page.home')
  await client.createOrReplace({
    _id: 'page.home',
    _type: 'page',
    title: '首頁',
    slug: { _type: 'slug', current: 'home' },
    sections: [
      {
        _key: 'hero',
        _type: 'heroSection',
        heading: '專業調酒，從這裡開始',
        subheading: '中華民國國際調酒協會 — 推廣調酒文化、培訓新世代人才。',
        backgroundImage: { ...goldenCup, alt: '金盃調酒大賽' },
        cta: {
          _type: 'ctaButton',
          label: '瀏覽課程',
          link: '/courses',
          style: 'primary',
        },
      },
      {
        _key: 'cta',
        _type: 'ctaSection',
        heading: '加入我們',
        description: '成為協會會員，享受課程優惠、活動優先報名與專業認證。',
        buttons: [
          { _key: 'b1', _type: 'ctaButton', label: '聯絡我們', link: '/about', style: 'primary' },
          { _key: 'b2', _type: 'ctaButton', label: '查看課程', link: '/courses', style: 'secondary' },
        ],
      },
    ],
    status: 'published',
  })
  console.log('  ✓ page.home')
}
