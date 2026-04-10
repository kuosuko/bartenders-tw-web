import { HomeClient } from './HomeClient'
import { sanityClient } from '@/sanity/client'
import { MOCK_COURSES } from '@/lib/mock-courses'
import type { CourseItem } from '@/lib/types'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { createClient } from 'next-sanity'

const builder = imageUrlBuilder(createClient({ projectId, dataset, apiVersion, useCdn: true }))

async function getFeaturedCourse(): Promise<CourseItem | undefined> {
  try {
    const doc = await sanityClient.fetch(
      `*[_type == "course" && featured == true] | order(_createdAt desc) [0]{
        _id,
        title,
        "slug": slug.current,
        shortDescription,
        "featuredImage": featuredImage.asset,
        "category": category->name,
        level,
        duration,
        price,
        memberPrice,
        featured,
        certification
      }`,
      {},
      { next: { revalidate: false, tags: ['course'] } },
    )
    if (!doc) return MOCK_COURSES[0] as CourseItem
    return {
      id: doc._id,
      title: doc.title,
      slug: doc.slug,
      shortDescription: doc.shortDescription,
      featuredImage: doc.featuredImage
        ? builder.image(doc.featuredImage).width(1200).url()
        : '/golden-cup-banner.png',
      category: doc.category,
      level: doc.level,
      duration: doc.duration,
      price: doc.price ?? 0,
      memberPrice: doc.memberPrice,
      featured: doc.featured,
      certification: doc.certification,
    }
  } catch {
    return MOCK_COURSES[0] as CourseItem
  }
}

export default async function HomePage() {
  const featuredCourse = await getFeaturedCourse()
  return <HomeClient featuredCourse={featuredCourse} />
}
