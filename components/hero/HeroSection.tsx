"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Play } from "lucide-react";

export function HeroSection({ preloaderDone = true }: { preloaderDone?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoRef.current) return;
    if (latest > 0.02 && !videoRef.current.paused) {
      videoRef.current.pause();
    } else if (latest <= 0.02 && videoRef.current.paused) {
      videoRef.current.play();
    }
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.2]);

  const textScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [4, 1.5, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.8, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["10vh", "-8vh", "-8vh", "-25vh"]);
  const textBlur = useTransform(scrollYProgress, [0, 0.2, 0.4], ["blur(20px)", "blur(8px)", "blur(0px)"]);

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.5], ["30px", "0px"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[200vh] w-full bg-black" 
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
        
        {/* Layer 0: Background Video */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-0 origin-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: preloaderDone ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ scale: videoScale, opacity: videoOpacity, willChange: "transform, opacity" }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </motion.div>

        {/* Layer 1: The Massive Animated Title */}
        <motion.div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center w-full pointer-events-none"
          style={{ 
            y: textY, 
            opacity: textOpacity, 
            scale: textScale,
            filter: textBlur,
            willChange: "transform, opacity, filter" 
          }}
        >
          <div className="flex flex-col items-center justify-center w-full leading-[0.85] md:leading-[0.8]">
            <span 
              className="font-heading font-black italic text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.9)" }}
            >
              Off The
            </span>
            <span 
              className="font-heading font-black italic text-7xl md:text-[8rem] lg:text-[12rem] uppercase tracking-tighter text-[#FF2020] relative z-10 -mt-2 md:-mt-4 lg:-mt-8"
              style={{ textShadow: "0 10px 40px rgba(255, 32, 32, 0.6)" }}
            >
              Dribble
            </span>
          </div>
        </motion.div>

        {/* Layer 2: Subtitle & Buttons - Pushed slightly lower to fix overlap */}
        <motion.div
          className="absolute bottom-10 md:bottom-16 lg:bottom-20 z-40 flex flex-col items-center text-center px-6 w-full max-w-4xl"
          style={{
            opacity: contentOpacity,
            y: contentY,
            willChange: "transform, opacity"
          }}
        >
          <p className="text-white/90 text-sm md:text-lg lg:text-xl font-sans font-medium mb-10 tracking-wide drop-shadow-md">
            The ultimate street basketball platform showcasing the most competitive 1v1, 2v2, and 3v3 matchups around the globe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center">
            {/* FIX: Added !text-black, !bg-white to force override your global button styles, 
                and explicitly colored the Play icon stroke/fill to black 
            */}
            <Button size="lg" className="gap-2 !bg-white !text-black hover:!bg-gray-200 transition-colors uppercase tracking-widest font-bold text-sm h-14 px-8">
              <Play size={18} fill="black" stroke="black" /> Watch Latest
            </Button>
            
            <Button variant="outline" size="lg" className="bg-black/20 text-white border-2 border-white/40 hover:bg-white/10 hover:border-white transition-all uppercase tracking-widest font-bold text-sm h-14 px-8 backdrop-blur-md">
              View Schedule
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}