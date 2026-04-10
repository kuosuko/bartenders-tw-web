import type { Metadata, Viewport } from 'next'
import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

export const dynamic = 'force-static'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  title: 'Sanity Studio — Bartenders TW',
  robots: { index: false, follow: false },
  other: {
    'referrer': 'same-origin',
  },
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
