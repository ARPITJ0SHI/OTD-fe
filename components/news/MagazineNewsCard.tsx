"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface MagazineNewsCardProps {
  title: string;
  category: string;
  date: string;
  imageUrl?: string;
  featured?: boolean;
  index: number;
}

export function MagazineNewsCard({
  title,
  category,
  date,
  imageUrl,
  featured = false,
  index,
}: MagazineNewsCardProps) {
  // Generate a random Unsplash basketball image based on the title to ensure variety
  const randomImage = `https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop&sig=${encodeURIComponent(title)}`;
  const displayImage = imageUrl || randomImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden bg-black ${
        featured 
          ? "col-span-full md:col-span-2 row-span-2 aspect-[4/5] md:aspect-[3/4] lg:aspect-square" 
          : "aspect-[4/5]"
      }`}
    >
      {/* Background Image */}
      <Image
        src={displayImage}
        alt={title}
        fill
        className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out brightness-50 group-hover:brightness-75"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      
      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <div className="overflow-hidden">
          <motion.span 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ delay: (index * 0.1) + 0.3 }}
            className="inline-block text-(--color-sharp-red) font-heading tracking-[0.3em] uppercase text-xs mb-4"
          >
            {category}
          </motion.span>
        </div>

        <div className="overflow-hidden">
          <motion.h3 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ delay: (index * 0.1) + 0.4 }}
            className={`font-heading uppercase text-white leading-none tracking-tighter ${
              featured ? "text-5xl md:text-8xl lg:text-9xl" : "text-3xl md:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </motion.h3>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[10px] md:text-xs text-white/60 uppercase tracking-widest font-sans">
            {date}
          </span>
          <button className="flex items-center gap-2 text-white font-heading uppercase text-xs tracking-widest">
            Read Entry <ArrowUpRight size={16} className="text-(--color-sharp-red)" />
          </button>
        </div>
      </div>

      {/* Editorial Number Decor */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 pointer-events-none">
        <span className="font-heading text-white/10 text-6xl md:text-8xl leading-none">
          0{index + 1}
        </span>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none" />
    </motion.div>
  );
}
