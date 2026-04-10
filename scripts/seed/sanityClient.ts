/**
 * Sanity write client for one-shot scripts (seeding, fixups). Loads .env.local
 * itself instead of relying on Next.js, since these scripts run via tsx outside
 * the Next runtime. Never import this from app code.
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { config } from 'dotenv'
import { createClient } from '@sanity/client'

config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-11-01'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error(
    'Sanity write client missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local',
  )
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: 'raw',
})

export type ImageAssetRef = {
  _type: 'image'
  asset: { _type: 'reference'; _ref: string }
  alt?: string
}

/**
 * Upload a local image file as a Sanity image asset, returning a reference
 * shape ready to drop into any document.image field. Idempotent on a single
 * run only — Sanity dedupes uploads by SHA hash internally, so re-running this
 * script will reuse existing assets and not create duplicates.
 */
export async function uploadImageAsset(
  filePath: string,
  alt: string,
): Promise<ImageAssetRef> {
  const absolute = resolve(filePath)
  const stats = await stat(absolute)
  if (!stats.isFile()) {
    throw new Error(`Not a file: ${absolute}`)
  }

  const filename = basename(absolute)
  const stream = createReadStream(absolute)
  const asset = await client.assets.upload('image', stream, { filename })

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  }
}
