"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Play } from "lucide-react";

export function HeroSection({ preloaderDone = true }: { preloaderDone?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video only after preloader finishes
  useEffect(() => {
    if (preloaderDone && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video playback failed:", err);
      });
    }
  }, [preloaderDone]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Automatically pause the video when scrolling starts, play when back at the top
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoRef.current) return;
    if (latest > 0.02 && !videoRef.current.paused) {
      videoRef.current.pause();
    } else if (latest <= 0.02 && videoRef.current.paused) {
      videoRef.current.play();
    }
  });

  // SCROLL CHOREOGRAPHY MATH
  // 1. Black Screen: Fades in completely by 15% scroll.
  const blackScreenOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 0, 1]);
  
  // 2. Volumetric Lightning: Explosive radial burst peaking at 15% scroll (synced with text illuminate).
  const lightningOpacity = useTransform(scrollYProgress, [0.10, 0.15, 0.20, 0.25], [0, 1, 0.3, 0]);
  
  // 3. Text Reveal: Hits full opacity (1) at the peak of the flash (0.15) for illumination effect.
  const textOpacity = useTransform(scrollYProgress, [0, 0.10, 0.15, 0.85, 1], [0, 0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.10, 0.15, 0.85, 1], [1.1, 1.1, 1, 1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["10vh", "0vh", "0vh", "-10vh"]);

  // Clean, subtle chamfered top corners
  const cleanFrameClipPath = {
    clipPath: "polygon(4vw 0, calc(100% - 4vw) 0, 100% 4vw, 100% 100%, 0 100%, 0 4vw)",
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-[150vh] w-full bg-black pt-[80px]" 
    >
      <div 
        className="sticky top-[80px] h-[calc(100vh-80px)] w-full overflow-hidden flex items-center justify-center bg-black"
        style={cleanFrameClipPath}
      >
        
        {/* Layer 0: Background Video */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: preloaderDone ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="auto"
            poster="/banner.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Layer 1: The Blackout Overlay */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-black z-10"
          style={{ opacity: blackScreenOpacity, willChange: "opacity" }}
        />

        {/* Layer 2: Volumetric Cinematic Lightning Flash */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none origin-center"
          style={{ 
            opacity: lightningOpacity, 
            scale: 1.5,
            mixBlendMode: "color-dodge",
            background: "radial-gradient(circle at center, white 0%, rgba(255,255,255,0.8) 30%, transparent 70%)",
            willChange: "opacity" 
          }}
        />

        {/* Layer 3: Hero Content (Text & Buttons) */}
        <motion.div 
          className="relative z-30 flex flex-col items-center text-center px-4 w-full"
          style={{ 
            y: textY, 
            opacity: textOpacity, 
            scale: textScale,
            willChange: "transform, opacity, scale" 
          }}
        >
          <div className="overflow-hidden mb-4">
            <span className="inline-block text-white tracking-[0.3em] font-heading uppercase text-sm md:text-lg drop-shadow-md">
              The Streets Are Calling
            </span>
          </div>
          
          <div className="overflow-hidden mb-6 flex justify-center w-full">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
              <span className="font-heading text-6xl md:text-8xl lg:text-9xl leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
                Off The
              </span>
              <span className="font-heading text-7xl md:text-9xl lg:text-[10rem] leading-none uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 drop-shadow-2xl"
                    style={{ textShadow: "0 10px 30px rgba(255, 42, 42, 0.4)" }}
              >
                Dribble
              </span>
            </div>
          </div>
          
          <div className="overflow-hidden mb-12 max-w-2xl">
            <p className="text-white text-lg md:text-2xl font-sans drop-shadow-lg font-medium">
              The ultimate street basketball platform showcasing the most competitive 1v1, 2v2, and 3v3 matchups around the globe.
            </p>
          </div>
          
          <div className="overflow-hidden flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2 shadow-lg">
              <Play size={20} fill="currentColor" /> Watch Latest
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black shadow-lg">
              View Schedule
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}