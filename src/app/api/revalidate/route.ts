import { revalidatePath } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Sanity webhook endpoint — invalidates Next.js page cache on CMS mutations.
 *
 * Configure in Sanity Manage → API → Webhooks:
 *   URL:        https://<domain>/api/revalidate
 *   Dataset:    production
 *   Trigger on: Create / Update / Delete
 *   Filter:     _type in ["aboutPage","siteSettings","navigation","newsPost","course","page","person"]
 *   Projection: { "_type": _type, "slug": slug.current }
 *   Secret:     value of SANITY_REVALIDATE_SECRET env var
 */

type WebhookPayload = {
  _type?: string
  slug?: string
}

// Map each Sanity document type to the Next.js paths to revalidate.
// 'layout' type clears the full page cache for that route tree.
const PATH_MAP: Record<string, Array<{ path: string; type: 'layout' | 'page' }>> = {
  newsPost:    [{ path: '/news', type: 'layout' }],
  course:      [{ path: '/courses', type: 'layout' }, { path: '/', type: 'page' }],
  aboutPage:   [{ path: '/about', type: 'layout' }],
  navigation:  [{ path: '/', type: 'layout' }],
  siteSettings:[{ path: '/', type: 'layout' }],
  page:        [{ path: '/', type: 'page' }],
  person:      [{ path: '/about', type: 'layout' }],
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ ok: false, error: 'Missing _type in payload' }, { status: 400 })
    }

    const targets = PATH_MAP[body._type] ?? [{ path: '/', type: 'layout' as const }]

    for (const { path, type } of targets) {
      revalidatePath(path, type)
    }

    // Also revalidate the specific slug page if present
    if (body.slug) {
      if (body._type === 'newsPost') revalidatePath(`/news/${body.slug}`, 'page')
      if (body._type === 'course')   revalidatePath(`/courses/${body.slug}`, 'page')
    }

    return NextResponse.json({
      ok: true,
      revalidated: targets.map((t) => t.path),
      slug: body.slug ?? null,
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
