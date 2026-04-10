"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

const PhoneMenu = ({ items = [] }: { items?: any[] }) => {
  return (
    <nav className="flex flex-col py-6">
      {items.map((item, index) => (
        <div key={index} className="border-b border-white/10">
          <a
            href={item.link || "#"}
            className="w-full px-6 py-4 flex items-center justify-between text-white text-sm hover:bg-white/5 transition-colors group"
          >
            <span>{item.label}</span>
            {item.children?.length > 0 && (
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </a>
          {item.children?.length > 0 && (
            <div className="bg-white/5 pb-2">
              {item.children.map((child: any, ci: number) => (
                <a
                  key={ci}
                  href={child.link}
                  className="block px-10 py-2 text-white/70 text-xs hover:text-white"
                >
                  {child.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export { PhoneMenu };
