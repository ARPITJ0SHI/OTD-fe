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

  // Horizontal translation mapped to scroll progress
  const xTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === "left" ? ["100vw", "-50%"] : ["-50%", "100vw"]
  );

  // Velocity-based skew: track scroll speed
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Map velocity → skewX degrees (fast scroll = more lean)
  const rawSkew = useTransform(scrollVelocity, [-0.5, 0, 0.5], [30, 0, -30]);
  
  // Smooth the skew with a spring for fluid feel
  const skewX = useSpring(rawSkew, {
    stiffness: 150,
    damping: 30,
    mass: 0.5,
  });

  // Build the repeated text string with separators
  const fullText = `${text} \u00A0\u00A0\u00A0 ${text} \u00A0\u00A0\u00A0 ${text} \u00A0\u00A0\u00A0 ${text}`;
  const characters = fullText.split("");

  return (
    <section 
      ref={containerRef}
      className={`relative w-full h-[200vh] bg-(--color-jet-black) ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          className="flex whitespace-nowrap"
          style={{ x: xTransform, willChange: "transform" }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={i}
              className="text-[10rem] md:text-[15rem] leading-none font-heading uppercase italic tracking-tighter text-transparent inline-block"
              style={{ 
                WebkitTextStroke: "3px rgba(255, 255, 255, 0.4)", 
                opacity: 0.85,
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
