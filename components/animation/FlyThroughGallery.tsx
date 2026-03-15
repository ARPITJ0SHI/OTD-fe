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
      {/* Portrait Match Card */}
      <div className="w-[280px] md:w-[340px] aspect-[3/4] relative overflow-hidden border-2 border-(--color-steel-gray) bg-(--color-graphite) shadow-2xl">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-(--color-sharp-red) z-10" />
        
        {/* Background Image - Randomized from s1, s2, s3 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/s${(index % 3) + 1}.png')`,
            filter: "brightness(0.6) saturate(1.1)" 
          }}
        />
        
        {/* Background texture / gradient overlay - Softened for visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-(--color-jet-black)/30 to-(--color-jet-black)/70" />
        
        {/* VS Layout */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-(--color-chrome-silver) font-sans">Off The Dribble Presents</span>
          
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-heading text-5xl md:text-6xl uppercase tracking-tighter text-white leading-none">
              {card.playerA}
            </h3>
            
            <div className="flex items-center gap-4 w-full">
              <div className="h-px bg-(--color-steel-gray) flex-1" />
              <span className="text-2xl font-heading text-(--color-sharp-red) tracking-widest">VS</span>
              <div className="h-px bg-(--color-steel-gray) flex-1" />
            </div>
            
            <h3 className="font-heading text-5xl md:text-6xl uppercase tracking-tighter text-white leading-none">
              {card.playerB}
            </h3>
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-sm uppercase tracking-widest text-(--color-sharp-red) font-heading">{card.date}</span>
            <span className="text-xs uppercase tracking-widest text-(--color-chrome-silver) font-sans">{card.location}</span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-(--color-sharp-red) z-10" />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-(--color-sharp-red) pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-(--color-sharp-red) pointer-events-none" />
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
      className="absolute bottom-16 left-0 right-0 text-center pointer-events-none"
      style={{ opacity: captionOpacity, y: captionY, zIndex: 100, willChange: "transform, opacity" }}
    >
      <p className="text-xl md:text-2xl font-heading uppercase tracking-widest text-white">
        {card.date} <span className="text-(--color-sharp-red)">—</span> {card.location}
      </p>
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
      className="relative bg-(--color-jet-black)"
      style={{ height: "400vh" }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Immersive dark background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-(--color-jet-black)" />
          
          {/* Background Image from Hero - moved here */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 grayscale contrast-125"
            style={{ backgroundImage: "url('/banner.jpg')" }}
          />
          
          {/* Subtle radial spotlight */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(255, 42, 42, 0.2) 0%, transparent 70%)",
            }}
          />
          {/* Grid lines for depth */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
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

        {/* Coordinated captions */}
        {cards.map((card, index) => (
          <FlyCaption
            key={`caption-${card.id}`}
            card={card}
            index={index}
            total={cards.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Section label */}
        <div className="absolute top-8 left-0 right-0 text-center z-50 pointer-events-none">
          <span className="text-xs uppercase tracking-[0.4em] text-(--color-chrome-silver) font-sans">
            Upcoming Showdowns
          </span>
        </div>
      </div>
    </div>
  );
}
