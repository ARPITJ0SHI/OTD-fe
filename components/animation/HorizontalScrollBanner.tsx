"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";

export function HorizontalScrollBanner({
  text,
  direction = "left",
  className = "",
}: {
  text: string;
  direction?: "left" | "right";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // ULTRA-SLOW MOTION: 
  // It only moves 15% of its total width over a massive 500vh scroll distance.
  const xTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === "left" ? ["0%", "-15%"] : ["-15%", "0%"]
  );

  const scrollVelocity = useVelocity(scrollYProgress);
  
  // PREMIUM SKEW: Drastically reduced the lean so it feels heavy and deliberate
  const rawSkew = useTransform(scrollVelocity, [-0.5, 0, 0.5], [8, 0, -8]);
  
  // Softer spring for a buttery smooth recovery
  const skewX = useSpring(rawSkew, {
    stiffness: 80,
    damping: 40,
    mass: 1,
  });

  // Adding lots of repetition so it never runs out of screen space
  const fullText = Array(10).fill(text).join(" \u00A0\u00A0\u00A0\u00A0 ");
  const characters = fullText.split("");

  return (
    <section 
      ref={containerRef}
      // MASSIVE scroll height to slow down the animation naturally
      className={`relative w-full h-[500vh] bg-(--color-jet-black) ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x: xTransform, willChange: "transform" }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={i}
              // Added scale-y-[1.3] to stretch the text vertically like the Leclerc site
              className="text-[12rem] md:text-[18rem] lg:text-[22rem] leading-none font-heading uppercase tracking-tighter text-transparent inline-block scale-y-[1.3]"
              style={{ 
                WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)", // Thinner, more subtle stroke
                opacity: 0.9,
                skewX,
                display: "inline-block",
                willChange: "transform",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}