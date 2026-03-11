"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Play } from "lucide-react";

export function HeroSection({ preloaderDone = true }: { preloaderDone?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background parallax: moves slower than scroll (-20% to +30%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Text parallax: moves faster than scroll to create depth
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  
  // Text opacity: fades out as it scrolls down
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background layer with parallax — hidden until preloader finishes */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 origin-top"
        style={{ y: backgroundY, willChange: "transform", opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-jet-black) via-(--color-jet-black)/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--color-jet-black) via-transparent to-(--color-jet-black) z-10 opacity-80" />
        <div 
          className="absolute inset-0 bg-cover bg-center object-cover opacity-60"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        />
      </motion.div>

      {/* Content Layer with upward parallax and fade */}
      <motion.div 
        className="relative z-20 flex flex-col items-center text-center px-4"
        style={{ y: textY, opacity: textOpacity, willChange: "transform, opacity" }}
      >
        <div className="overflow-hidden mb-4">
          <motion.span 
            initial={{ y: 50, opacity: 0 }}
            animate={preloaderDone ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="inline-block text-(--color-sharp-white) tracking-[0.3em] font-heading uppercase text-sm md:text-lg"
          >
            The Streets Are Calling
          </motion.span>
        </div>
        
        <div className="overflow-hidden mb-6 flex justify-center w-full">
          <motion.div 
            className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center"
            initial={{ scale: 3, opacity: 0, rotate: -5 }}
            animate={preloaderDone ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 3, opacity: 0, rotate: -5 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.175, 0.885, 0.32, 1.275], // Custom spring bounce ease
              delay: 0.3 
            }}
          >
            <span className="font-heading text-6xl md:text-8xl lg:text-9xl leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
              Off The
            </span>
            <span className="font-heading text-7xl md:text-9xl lg:text-[10rem] leading-none uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-(--color-sharp-red) to-red-600 drop-shadow-2xl"
                  style={{ textShadow: "0 10px 30px rgba(255, 42, 42, 0.3)" }}
            >
              Dribble
            </span>
          </motion.div>
        </div>
        
        <div className="overflow-hidden mb-12 max-w-2xl">
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={preloaderDone ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            className="text-(--color-chrome-silver) text-lg md:text-2xl font-sans"
          >
            The ultimate street basketball platform showcasing the most competitive 1v1, 2v2, and 3v3 matchups around the globe.
          </motion.p>
        </div>
        
        <div className="overflow-hidden flex flex-col sm:flex-row gap-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={preloaderDone ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          >
            <Button size="lg" className="gap-2">
              <Play size={20} fill="currentColor" /> Watch Latest
            </Button>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={preloaderDone ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.0 }}
          >
             <Button variant="outline" size="lg">
              View Schedule
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
