"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { PlayerCard } from "@/components/players/PlayerCard";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

type PlayerType = typeof HOMEPAGE_CONSTANTS.FEATURED_PLAYERS[0];

interface FanningCardProps {
  player: PlayerType;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function FanningCard({ player, index, total, progress }: FanningCardProps) {
  // Stagger sliding so they peel out sequentially from underneath
  const step = 1 / (total - 1); 
  const startSlide = Math.max(0, (index - 1) * step); 
  const endSlide = index * step;
  
  // They start stacked in the center. As they slide out, they move right.
  // We use percentage so it scales perfectly on mobile and desktop.
  const targetX = `${index * 90}%`;

  const x = useTransform(
    progress,
    [startSlide, endSlide],
    ["0%", targetX]
  );
  
  // Scale down slightly while hidden, scaling up as it slides out
  const scale = useTransform(
    progress,
    [startSlide, endSlide],
    [0.85, 1]
  );

  const finalX = index === 0 ? "0px" : x;
  const finalScale = index === 0 ? 1 : scale;
  
  // Critical: Card 0 is on top! The others are hidden *beneath* it
  const zIndex = total - index;

  return (
    <motion.div 
      className="absolute top-0 left-0 h-full flex items-center"
      style={{ 
        x: finalX,
        scale: finalScale,
        zIndex, 
        willChange: "transform" 
      }}
    >
      <div className="w-[75vw] md:w-[320px] lg:w-[400px] shadow-[20px_0_40px_rgba(0,0,0,0.8)] rounded-2xl border border-white/10 bg-(--color-graphite) origin-left overflow-hidden h-[90%] md:h-auto">
        <PlayerCard 
          name={player.name} 
          nickname={player.nickname} 
          wins={player.wins} 
          losses={player.losses} 
          imageUrl={player.imageUrl}
        />
      </div>
    </motion.div>
  );
}

export function FeaturedPlayersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = HOMEPAGE_CONSTANTS.FEATURED_PLAYERS;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Pan the camera left as the cards spread out to the right.
  // If each card pushes out by 90%, we shift left by exactly half of that total spread
  // to keep the entire group perfectly centered in the viewport.
  const maxShift = (cards.length - 1) * 45; // 45 is half of 90
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", `-${maxShift}%`]);

  return (
    <section ref={containerRef} className="relative bg-(--color-jet-black) h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20">
        <Container>
           <SectionHeading title="Featured Players" subtitle="Hall of Fame" />
        </Container>
        
        {/* Relative container allows absolute child to center vertically */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-[500px] mt-4 mb-12 overflow-hidden">
          <motion.div 
            className="relative h-full flex items-center w-[320px] lg:w-[400px]"
            style={{ x: trackX }}
          >
            {cards.map((player, idx) => (
              <FanningCard 
                key={player.id} 
                player={player} 
                index={idx} 
                total={cards.length} 
                progress={scrollYProgress} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
