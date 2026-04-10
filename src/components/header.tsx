"use client"
import React from "react"
import { Equal } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menus } from "@/components/menus"
import { PhoneMenu } from "@/components/phone-menus"
import Link from "next/link"

type NavItem = { label: string; link?: string; children?: { label: string; link: string }[] }

const Header = ({
  navigation = { mainNav: [] },
}: {
  navigation?: { mainNav?: NavItem[] }
  siteSettings?: unknown
}) => {
  const items = navigation?.mainNav ?? []

  return (
    <header className="sticky top-0 h-12 flex justify-center w-full bg-foreground z-[100]">
      <div className="w-full max-w-4xl flex justify-center gap-6">
        <div className="flex w-full items-center justify-between px-4">
          <Link href="/" aria-label="home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="BAT Logo"
              className="h-8 w-8 object-contain"
            />
          </Link>

          <Menus items={items} />

          <Sheet>
            <div className="flex items-center px-2 gap-2">
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="h-9 w-9 flex items-center justify-center text-background hover:text-background/80 lg:hidden"
                >
                  <Equal className="h-5 w-5" />
                </button>
              </SheetTrigger>
            </div>
            <SheetContent
              side="right"
              className="w-[300px] bg-foreground/90 backdrop-blur-lg border-muted-foreground p-0"
            >
              <PhoneMenu items={items} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { Header }
