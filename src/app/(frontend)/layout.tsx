import React from 'react'
import NextImage from 'next/image'
import { Header } from '@/components/header'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { sanityClient } from '@/sanity/client'

// Navigation shape matches what Header/Menus expect: { mainNav, footerNav }
async function getNavigation() {
  return sanityClient.fetch(
    `*[_type == "navigation"][0]{
      mainNav[]{ label, link, children[]{ label, link } },
      footerNav[]{ heading, links[]{ label, link } }
    }`,
    {},
    { next: { revalidate: false, tags: ['navigation'] } },
  )
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const navigation = await getNavigation().catch(() => ({ mainNav: [], footerNav: [] }))

  return (
    <SmoothScroll>
      <Header navigation={navigation ?? { mainNav: [], footerNav: [] }} siteSettings={{}} />
      <main className="flex-grow">{children}</main>

      <footer className="bg-[#f8f8f7] py-24 px-6 text-black/80 text-sm border-t border-zinc-200/50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-xl text-black flex items-center gap-2" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>
                中華民國國際調酒協會
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50/50 border border-blue-100/50">
                  <svg className="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.54-1.53.2-3.28-1-4.48s-2.95-1.54-4.48-1c-.71-1.3-2.08-2.18-3.66-2.18s-2.95.88-3.66 2.18c-1.53-.54-3.28-.2-4.48 1s-1.54 2.95-1 4.48c-1.3.71-2.18 2.08-2.18 3.66s.88 2.95 2.18 3.66c-.54 1.53-.2 3.28 1 4.48s2.95 1.54 4.48 1c.71 1.3 2.08 2.18 3.66 2.18s2.95-.88 3.66-2.18c1.53.54 3.28.2 4.48-1s1.54-2.95 1-4.48c1.3-.71 2.18-2.08 2.18-3.66zM9.5 16.5l-4.5-4.5 1.41-1.41L9.5 13.67l7.59-7.59 1.41 1.41-9 9z" />
                  </svg>
                </div>
              </h3>
              <div className="relative w-10 h-10 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <NextImage src="/iba.webp" alt="IBA Logo" fill className="object-contain" />
              </div>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              BAT - Bartender Association of Taiwan<br />
              推動台灣調酒藝術接軌國際，培育卓越技藝人才。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {(navigation?.footerNav ?? []).map((group: any, i: number) => (
              <div key={i}>
                <h4 className="font-bold text-black mb-6 uppercase tracking-widest text-xs opacity-50" style={{ fontFamily: '"LINESeedTW", sans-serif' }}>
                  {group.heading}
                </h4>
                <ul className="space-y-4 text-zinc-600">
                  {group.links?.map((link: any, li: number) => (
                    <li key={li}>
                      <a href={link.link} className="hover:text-black transition-colors font-medium">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-24 pt-8 border-t border-zinc-200 text-center text-zinc-400 text-xs tracking-wide">
          © 2026 BAT - Bartender Association of Taiwan. All rights reserved.
        </div>
      </footer>
    </SmoothScroll>
  )
}
