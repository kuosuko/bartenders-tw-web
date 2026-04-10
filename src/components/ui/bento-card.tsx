"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  isHoveredByParent?: boolean;
}

export function ExpandableCard({
  children,
  className,
  color = "#000",
  isHoveredByParent,
}: ExpandableCardProps) {
  const [isLocalHovered, setIsLocalHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Use MotionValues for high-performance coordinate tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const expansionProgress = useMotionValue(0);

  // If isHoveredByParent is provided, it takes precedence.
  // We use !== undefined to be super safe.
  const isHovered = isHoveredByParent !== undefined ? isHoveredByParent : isLocalHovered;

  // Handle expansion progress
  useEffect(() => {
    animate(expansionProgress, isHovered ? 1 : 0, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    });
  }, [isHovered, expansionProgress]);

  // Unified coordinate update function
  const updateCoords = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // CLIP PATH: 0-latency tracking
  const clipPath = useTransform(
    [mouseX, mouseY, expansionProgress],
    ([x, y, p]) => `circle(${(p as number) * 200}% at ${x}px ${y}px)`
  );

  return (
    <div
      ref={ref}
      onMouseMove={updateCoords}
      onMouseEnter={(e) => {
        updateCoords(e);
        setIsLocalHovered(true);
      }}
      onMouseLeave={() => setIsLocalHovered(false)}
      className={cn(
        "relative rounded-3xl border border-zinc-200 bg-zinc-50 transition-colors duration-300 overflow-hidden",
        className
      )}
    >
      {/* 
          BASE LAYER:
          Static content with original theme colors.
      */}
      <div className="relative h-full w-full p-8 md:p-12 z-10 pointer-events-none">
        {children}
      </div>

      {/* 
          ANIMATED OVERLAY LAYER:
          Revealed via clipPath, forces white text.
      */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-20">
        <motion.div
           className="absolute inset-0 h-full w-full"
           style={{ 
             backgroundColor: color,
             clipPath 
           }}
        >
          {/* WHITE TEXT OVERLAY CONTAINER */}
          <div className="flex flex-col h-full w-full p-8 md:p-12 justify-between text-white pointer-events-none
            [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white [&_span:not(.no-flip)]:!text-white 
            [&_div:not(.no-flip)]:!text-white [&_svg:not(.no-flip)]:!fill-white [&_path:not(.no-flip)]:!fill-white">
              {children}
          </div>
        </motion.div>
      </div>

      {/* SIZING (HIDDEN) */}
      <div className="relative h-full w-full p-8 md:p-12 z-0 opacity-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
