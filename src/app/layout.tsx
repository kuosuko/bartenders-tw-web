import type { Metadata } from 'next'
import {
  Inter,
  Instrument_Serif,
  Mochiy_Pop_One,
  Permanent_Marker,
  Noto_Serif_TC,
} from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/lib/utils'
import { sanityClient } from '@/sanity/client'
import { urlFor } from '@/sanity/image'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-instrument' })
const mochiyPopOne = Mochiy_Pop_One({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-mochiy' })
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-marker' })
const notoSerifTC = Noto_Serif_TC({ weight: ['400', '600', '700', '900'], subsets: ['latin'], display: 'swap', variable: '--font-noto-serif-tc' })
const handWrittenLocal = localFont({ src: '../../public/fonts/hand-written/100.ttf', display: 'swap', variable: '--font-handwritten-local' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bartenders.tw'
const FALLBACK_TITLE = 'BAT - 中華民國國際調酒協會'
const FALLBACK_DESC = '推動台灣調酒藝術接軌國際，培育卓越技藝人才。IBA 正式會員國。'

async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]{
      siteName,
      siteDescription,
      "logoUrl": logo.asset->url,
      "ogImageUrl": defaultSeo.ogImage.asset->url,
      "ogImageAsset": defaultSeo.ogImage.asset,
      defaultSeo{ metaTitle, metaDescription }
    }`,
    {},
    { next: { revalidate: false, tags: ['siteSettings'] } },
  ).catch(() => null)
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()

  const title = s?.defaultSeo?.metaTitle || s?.siteName || FALLBACK_TITLE
  const description = s?.defaultSeo?.metaDescription || s?.siteDescription || FALLBACK_DESC

  // OG image: prefer Sanity ogImage, fall back to static file
  const ogImageUrl = s?.ogImageAsset
    ? urlFor(s.ogImageAsset).width(1200).height(630).fit('crop').url()
    : `${SITE_URL}/og-image.png`

  return {
    title: {
      default: title,
      template: `%s · BAT 台灣調酒師`,
    },
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: s?.siteName || '中華民國國際調酒協會',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      locale: 'zh_TW',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-TW"
      className={cn(
        inter.variable,
        instrumentSerif.variable,
        mochiyPopOne.variable,
        permanentMarker.variable,
        notoSerifTC.variable,
        handWrittenLocal.variable,
      )}
    >
      <body className={cn('antialiased min-h-screen flex flex-col', inter.className)}>
        {children}
      </body>
    </html>
  )
}
