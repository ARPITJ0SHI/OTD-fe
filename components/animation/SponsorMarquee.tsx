"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SponsorMarqueeProps {
  logos: string[];
  speed?: number;
  className?: string;
}

export function SponsorMarquee({ logos, speed = 10, className = "" }: SponsorMarqueeProps) {
  // Multiply the logos many times to fill the thin belt tightly
  const duplicatedLogos = Array(15).fill(logos).flat();

  return (
    <div className={`group relative flex overflow-hidden border-y border-white/20 bg-white py-3 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-8 transition-all duration-300"
          >
            <div className="relative h-6 w-24">
               <Image
                src={logo}
                alt={`Sponsor ${index}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
