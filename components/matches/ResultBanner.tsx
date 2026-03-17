"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface ResultBannerProps {
  playerA: string;
  playerB: string;
  scoreA: number;
  scoreB: number;
  date: string;
  location: string;
  imageA?: string;
  imageB?: string;
}

export function ResultBanner({
  playerA,
  playerB,
  scoreA,
  scoreB,
  date,
  location,
}: ResultBannerProps) {
  const isWinnerA = scoreA > scoreB;
  const isWinnerB = scoreB > scoreA;

  // Generate unique seeded images based on names for variety
  const imgA = `https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop&sig=${encodeURIComponent(playerA)}`;
  const imgB = `https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop&sig=${encodeURIComponent(playerB)}`;

  return (
    <motion.div 
      className="group relative w-full h-64 md:h-80 overflow-hidden border-b border-white/5 bg-black transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Background Portait Split */}
      <div className="absolute inset-0 flex">
        {/* Left Portrait (Player A) */}
        <div className={`relative flex-1 overflow-hidden transition-all duration-700 ${!isWinnerA ? "grayscale brightness-50" : "grayscale-0"}`}>
          <Image 
            src={imgA} 
            alt={playerA} 
            fill 
            className="object-cover object-top group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Right Portrait (Player B) */}
        <div className={`relative flex-1 overflow-hidden transition-all duration-700 ${!isWinnerB ? "grayscale brightness-50" : "grayscale-0"}`}>
          <Image 
            src={imgB} 
            alt={playerB} 
            fill 
            className="object-cover object-top group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
        </div>
      </div>

      <div className="relative h-full flex items-center px-6 md:px-12 z-10">
        {/* Left Side - Player A */}
        <div className="flex-1 flex flex-col items-start justify-center h-full">
          {isWinnerA && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] md:text-xs font-heading text-(--color-sharp-red) tracking-[0.2em] uppercase mb-1 bg-black/40 px-2 py-1 backdrop-blur-sm"
            >
              [ Winner ]
            </motion.span>
          )}
          <h3 className={`text-4xl md:text-7xl font-heading uppercase leading-none tracking-tighter transition-all duration-500 ${isWinnerA ? "text-white" : "text-white/40"}`}>
            {playerA}
          </h3>
          <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest font-sans mt-2">
            Home Team
          </span>
        </div>

        {/* Center - Score */}
        <div className="flex flex-col items-center justify-center px-6 md:px-12 border-x border-white/10 h-full py-8 group-hover:bg-(--color-sharp-red)/90 transition-all duration-500 backdrop-blur-[2px]">
          <div className="flex items-center gap-4 md:gap-8">
            <span className={`text-6xl md:text-9xl font-heading leading-none transition-colors ${isWinnerA ? "text-white" : "text-white/60"}`}>
              {scoreA}
            </span>
            <div className="w-1.5 md:w-3 h-1.5 md:h-3 bg-white rounded-full group-hover:scale-150 transition-transform" />
            <span className={`text-6xl md:text-9xl font-heading leading-none transition-colors ${isWinnerB ? "text-white" : "text-white/60"}`}>
              {scoreB}
            </span>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[10px] md:text-xs text-white/80 uppercase tracking-[0.4em] font-heading font-normal">
              Final Result
            </span>
          </div>
        </div>

        {/* Right Side - Player B */}
        <div className="flex-1 flex flex-col items-end justify-center h-full">
          {isWinnerB && (
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] md:text-xs font-heading text-(--color-sharp-red) tracking-[0.2em] uppercase mb-1 bg-black/40 px-2 py-1 backdrop-blur-sm"
            >
              [ Winner ]
            </motion.span>
          )}
          <h3 className={`text-4xl md:text-7xl font-heading uppercase leading-none tracking-tighter transition-all duration-500 text-right ${isWinnerB ? "text-white" : "text-white/40"}`}>
            {playerB}
          </h3>
           <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest font-sans mt-2">
            Visitor
          </span>
        </div>
      </div>

      {/* Metadata / Hover Action */}
      <div className="absolute top-6 left-6 md:left-12 flex items-center gap-4 z-20">
        <span className="text-[10px] text-white/60 uppercase tracking-widest font-sans border-r border-white/20 pr-4">
          {date}
        </span>
        <span className="text-[10px] text-white/60 uppercase tracking-widest font-sans">
          {location}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 md:right-12 z-20">
        <button className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 text-[10px] md:text-xs uppercase tracking-widest font-heading text-white/70 group-hover:text-white group-hover:border-(--color-sharp-red) transition-all">
          <Play size={14} className="fill-current text-(--color-sharp-red)" />
          Watch Highlights
        </button>
      </div>
      
      {/* Interactive Line Accent */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-(--color-sharp-red) z-30"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
