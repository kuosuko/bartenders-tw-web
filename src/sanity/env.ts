function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage)
  }
  return value
}

export const apiVersion = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_VERSION'
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// Server-only. Do NOT expose in client bundles.
export const apiToken = process.env.SANITY_API_TOKEN

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

export const previewSecret = process.env.SANITY_PREVIEW_SECRET
