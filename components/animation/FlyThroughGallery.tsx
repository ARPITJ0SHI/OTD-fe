"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useFlythroughGallery } from "@/hooks/useFlythroughGallery";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

type FlyThroughCard = typeof HOMEPAGE_CONSTANTS.FLYTHROUGH_CARDS[0];

// ---------- Single Card Sub-Component ----------
function FlyCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: FlyThroughCard;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { scale, opacity, x, y } = useFlythroughGallery(scrollYProgress, index, total);

  // Earlier cards (lower index) need HIGHER z-index so they overlap the later ones
  const zIndex = total - index;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        scale,
        opacity,
        x,
        y,
        zIndex,
        willChange: "transform, opacity",
      }}
    >
      {/* Premium Minimalist Card Frame */}
      <div className="w-[300px] md:w-[420px] aspect-[3/4] relative overflow-hidden border border-white/20 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.8)] group transition-all duration-700">
        
        {/* Crisp Background Image - No dark filters, letting the original image shine */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ 
            backgroundImage: `url('/s${(index % 2) + 2}.png')`
          }}
        />
        
        {/* Subtle inner shadow for depth (optional but adds a premium feel) */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
      </div>
    </motion.div>
  );
}

// ---------- Caption Sub-Component ----------
function FlyCaption({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: FlyThroughCard;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { captionOpacity, captionY } = useFlythroughGallery(scrollYProgress, index, total);

  return (
    <motion.div
      className="absolute bottom-12 md:bottom-20 left-0 right-0 flex justify-center pointer-events-none"
      style={{ opacity: captionOpacity, y: captionY, zIndex: 100, willChange: "transform, opacity" }}
    >
      {/* Sleek, premium caption layout */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full flex items-center gap-4 shadow-xl">
        <span className="text-sm md:text-base font-heading uppercase tracking-[0.2em] text-white">
          {card.date}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF2020]" />
        <span className="text-sm md:text-base font-heading uppercase tracking-[0.2em] text-white/70">
          {card.location}
        </span>
      </div>
    </motion.div>
  );
}

// ---------- Main Gallery Component ----------
export function FlyThroughGallery({
  cards = HOMEPAGE_CONSTANTS.FLYTHROUGH_CARDS,
}: {
  cards?: FlyThroughCard[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={wrapperRef}
      className="relative bg-[#0a0a0a]"
      // SPEED LEVER: Increased from 400vh to 800vh to slow the animation down drastically
      style={{ height: "800vh" }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Immersive dark background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          
          {/* Subtle background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.15] grayscale"
            style={{ backgroundImage: "url('/banner.jpg')" }}
          />
          
          {/* Subtle radial spotlight */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(255, 32, 32, 0.15) 0%, transparent 70%)",
            }}
          />
          
          {/* Refined grid lines for depth */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Cards flying through */}
        {cards.map((card, index) => (
          <FlyCard
            key={card.id}
            card={card}
            index={index}
            total={cards.length}
            scrollYProgress={scrollYProgress}
          />
        ))}



        {/* Section label */}
        <div className="absolute top-10 left-0 right-0 text-center z-50 pointer-events-none flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/50 font-sans font-light">
            Upcoming Showdowns
          </span>
        </div>
      </div>
    </div>
  );
}