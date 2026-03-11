"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

interface PlayerProfileProps {
  name: string;
  nickname?: string;
  wins: number;
  losses: number;
  imageUrl?: string;
  bio?: string;
}

export function PlayerProfileHeader({
  name,
  nickname,
  wins,
  losses,
  imageUrl,
  bio = "This player's legend is still being written on the asphalt. Expect high-flying dunks, ankle-breaking crossovers, and an unmatched competitive drive."
}: PlayerProfileProps) {
  const winPercentage = Math.round((wins / (wins + losses)) * 100) || 0;

  return (
    <section className="relative w-full bg-(--color-jet-black) pt-32 pb-16 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-(--color-sharp-red) rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-(--color-steel-gray) rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
          
          {/* Avatar / Image */}
          <RevealWrapper className="w-full md:w-1/3 shrink-0">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden border-4 border-(--color-steel-gray)">
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={name} 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-(--color-graphite) flex items-center justify-center">
                  <span className="font-heading text-8xl text-(--color-steel-gray)">OTD</span>
                </div>
              )}
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-(--color-sharp-red) m-2 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-(--color-sharp-red) m-2 pointer-events-none" />
            </div>
          </RevealWrapper>

          {/* Player Info & Stats */}
          <div className="flex-1 flex flex-col justify-center">
            <RevealWrapper delay={0.1}>
              <div className="mb-6 text-center md:text-left">
                {nickname && (
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-(--color-sharp-red) font-heading text-xl md:text-2xl uppercase tracking-[0.2em] mb-2"
                  >
                    &quot;{nickname}&quot;
                  </motion.p>
                )}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl md:text-8xl lg:text-[7rem] leading-none font-heading uppercase tracking-tighter text-white drop-shadow-lg"
                >
                  {name}
                </motion.h1>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="w-full">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-(--color-graphite) p-6 border border-(--color-steel-gray) text-center group hover:border-(--color-sharp-red) transition-colors">
                  <p className="text-(--color-chrome-silver) text-sm uppercase tracking-widest mb-2 font-sans">Wins</p>
                  <motion.p 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    className="text-4xl md:text-6xl font-heading text-white group-hover:text-(--color-sharp-red) transition-colors"
                  >
                    {wins}
                  </motion.p>
                </div>
                <div className="bg-(--color-graphite) p-6 border border-(--color-steel-gray) text-center group hover:border-(--color-sharp-red) transition-colors">
                  <p className="text-(--color-chrome-silver) text-sm uppercase tracking-widest mb-2 font-sans">Losses</p>
                  <motion.p 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    className="text-4xl md:text-6xl font-heading text-white group-hover:text-(--color-sharp-red) transition-colors"
                  >
                    {losses}
                  </motion.p>
                </div>
                <div className="bg-(--color-graphite) p-6 border border-(--color-steel-gray) text-center group hover:border-(--color-sharp-red) transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-(--color-sharp-red)/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-(--color-chrome-silver) text-sm uppercase tracking-widest mb-2 font-sans relative z-10">Win %</p>
                  <motion.p 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                    className="text-4xl md:text-6xl font-heading text-(--color-sharp-red) relative z-10"
                  >
                    {winPercentage}%
                  </motion.p>
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={0.3}>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-(--color-chrome-silver) leading-relaxed font-sans text-lg">
                  {bio}
                </p>
              </div>
            </RevealWrapper>
            
          </div>
        </div>
      </Container>
    </section>
  );
}
