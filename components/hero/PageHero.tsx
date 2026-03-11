"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImageUrl?: string;
}

export function PageHero({ 
  title, 
  subtitle, 
  backgroundImageUrl = "/banner.jpg" 
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background parallax: moves slower than scroll (-20% to +30%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Text parallax: moves faster than scroll to create depth
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Text opacity: fades out as it scrolls down
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background layer with parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 origin-top"
        style={{ y: backgroundY, willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-jet-black) via-(--color-jet-black)/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--color-jet-black) via-transparent to-(--color-jet-black) z-10 opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center object-cover opacity-50 block"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        />
      </motion.div>

      {/* Content Layer with upward parallax and fade */}
      <motion.div 
        className="relative z-20 flex flex-col items-center text-center px-4 mt-20"
        style={{ y: textY, opacity: textOpacity, willChange: "transform, opacity" }}
      >
        <div className="overflow-hidden mb-4">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl leading-none uppercase tracking-tighter text-white drop-shadow-2xl"
          >
            {title}
          </motion.h1>
        </div>
        
        {subtitle && (
          <div className="overflow-hidden max-w-2xl">
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-(--color-chrome-silver) text-lg md:text-xl font-sans"
            >
              {subtitle}
            </motion.p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
