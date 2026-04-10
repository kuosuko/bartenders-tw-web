import { createClient } from 'next-sanity'

import { apiVersion, apiToken, dataset, projectId } from './env'

/**
 * Public read client. Uses the CDN for speed.
 * Server-only — the token is needed because the dataset is private (public
 * role has no read access). Must NOT be imported from client components.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  token: apiToken,
})

/**
 * Write-enabled client. Requires SANITY_API_TOKEN. Server-only — do not
 * import from client components.
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: apiToken,
  perspective: 'drafts',
})

/**
 * Draft preview client. Used inside Draft Mode so editors see unpublished
 * documents. Requires SANITY_API_TOKEN with read permission.
 */
export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: apiToken,
  perspective: 'drafts',
  stega: { studioUrl: '/studio' },
})
