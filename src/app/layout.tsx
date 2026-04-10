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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument',
})

const mochiyPopOne = Mochiy_Pop_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mochiy',
})

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-marker',
})

const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-tc',
})

const handWrittenLocal = localFont({
  src: '../../public/fonts/hand-written/100.ttf',
  display: 'swap',
  variable: '--font-handwritten-local',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bartenders.tw'
const OG_DESC = '推動台灣調酒藝術接軌國際，培育卓越技藝人才。IBA 正式會員國。'

export const metadata: Metadata = {
  title: {
    default: 'BAT - 中華民國國際調酒協會',
    template: '%s · BAT 台灣調酒師',
  },
  description: `中華民國國際調酒協會 (BAT) 官方網站。${OG_DESC}`,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'BAT - 中華民國國際調酒協會',
    description: OG_DESC,
    url: SITE_URL,
    siteName: '中華民國國際調酒協會',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BAT — Bartender Association of Taiwan' }],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAT - 中華民國國際調酒協會',
    description: OG_DESC,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
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
