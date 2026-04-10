export type CourseItem = {
  id: string
  title: string
  slug: string
  shortDescription?: string
  description?: any
  featuredImage: string
  category?: string
  level?: string
  duration?: string
  price: number
  memberPrice?: number
  featured?: boolean
  syllabus?: any[]
  schedule?: any[]
  certification?: {
    hasCertification: boolean
    type: 'included' | 'additionalFee' | 'feeAndTest'
    fee?: number
    testDetails?: string
    description?: string
  }
}
