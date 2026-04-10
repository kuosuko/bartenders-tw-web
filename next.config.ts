import path from 'node:path'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root to this repo. The parent directory contains an
  // unrelated package-lock.json that Next would otherwise pick up.
  turbopack: {
    root: path.join(import.meta.dirname, '.'),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Sponsor logos used by SponsorMarquee landing section
      { protocol: 'https', hostname: 'cdn-us.icons8.com' },
      // Placeholder avatars used by CallToAction testimonials
      { protocol: 'https', hostname: 'avatar.vercel.sh' },
      // Mock course fallback images
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Dev-only: allow loading /_next/* HMR + chunk resources when the browser
  // hits this server via its public IP instead of localhost. Required because
  // we develop on a remote Oracle Cloud host. Has no effect in production.
  allowedDevOrigins: ['168.138.211.11', '172.16.0.2', 'gg.sususu.su', '*.sususu.su'],
}

export default nextConfig
