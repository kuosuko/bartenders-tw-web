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

export const metadata: Metadata = {
  title: {
    default: 'BAT - 中華民國國際調酒協會',
    template: '%s · BAT',
  },
  description: '中華民國國際調酒協會 (BAT) 官方網站。推動台灣調酒藝術接軌國際，培育卓越技藝人才。',
  metadataBase: new URL('https://bartenders.tw'),
  openGraph: {
    title: 'BAT - 中華民國國際調酒協會',
    description: '推動台灣調酒藝術接軌國際，培育卓越技藝人才。',
    url: 'https://bartenders.tw',
    siteName: '中華民國國際調酒協會',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BAT' }],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAT - 中華民國國際調酒協會',
    description: '推動台灣調酒藝術接軌國際，培育卓越技藝人才。',
    images: ['/og-image.png'],
  },
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
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
