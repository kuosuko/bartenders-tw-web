"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/navigation";
import { useState } from "react";

export function Menus({ items = [] }: { items?: any[] }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // Small buffer to navigate to content
  };

  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item, index) => (
            <NavigationMenuItem
              key={index}
              onMouseEnter={() => item.children?.length > 0 && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.children?.length > 0 ? (
                <>
                  <NavigationMenuTrigger isActive={activeMenu === item.label}>
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent isOpen={activeMenu === item.label}>
                    <ul className="flex flex-col gap-4 w-full">
                      {item.children.map((child: any, ci: number) => (
                        <li key={ci}>
                          <a href={child.link} className="block group">
                            <div className="text-xl font-line-seed font-black hover:text-background text-background/60 transition-colors uppercase tracking-wider">
                              {child.label}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <a
                  href={item.link}
                  className="inline-flex h-10 items-center justify-center px-4 py-2 text-xs transition-colors text-background/90 hover:text-background"
                >
                  {item.label}
                </a>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
