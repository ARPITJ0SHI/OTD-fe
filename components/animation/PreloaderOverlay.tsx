"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ---------- Configuration ----------
const PHASE_DURATIONS = {
  intro: 1200,       // Red bg + geo shapes slide in
  logo: 1500,        // Logo reveal
  blackout: 600,     // Transition to black
  shatter: 1500,     // Diagonal blocks fly away
};

const TOTAL_DURATION =
  PHASE_DURATIONS.intro +
  PHASE_DURATIONS.logo +
  PHASE_DURATIONS.blackout +
  PHASE_DURATIONS.shatter;

// ---------- Shatter Block Grid ----------
const COLS = 5;
const ROWS = 4;
const SKEW = 15; // degrees for the parallelogram slant

function generateBlocks() {
  const blocks: {
    id: number;
    row: number;
    col: number;
    exitX: string;
    exitY: string;
    clipPath: string;
  }[] = [];

  const w = 100 / COLS;
  const h = 100 / ROWS;
  const skewOffset = SKEW; // % horizontal shift for the diagonal

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const left = c * w;
      const top = r * h;

      // Create parallelogram clip-path with slight overlap to avoid gaps
      const overlap = 2; // percent overlap to prevent seams
      const clipPath = `polygon(
        ${skewOffset - overlap}% ${-overlap}%,
        ${100 + overlap}% ${-overlap}%,
        ${100 - skewOffset + overlap}% ${100 + overlap}%,
        ${-overlap}% ${100 + overlap}%
      )`;

      // Calculate exit vector: blocks fly away from center
      const centerCol = (COLS - 1) / 2;
      const centerRow = (ROWS - 1) / 2;
      const dx = c - centerCol;
      const dy = r - centerRow;

      const exitX = `${dx * 120}vw`;
      const exitY = `${dy * 120}vh`;

      blocks.push({
        id: r * COLS + c,
        row: r,
        col: c,
        exitX,
        exitY,
        clipPath,
      });
    }
  }
  return blocks;
}

const shatterBlocks = generateBlocks();

// ---------- Component ----------
type Phase = "intro" | "logo" | "blackout" | "shatter" | "done";

interface PreloaderOverlayProps {
  onComplete: () => void;
}

export function PreloaderOverlay({ onComplete }: PreloaderOverlayProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Hide the server-rendered cover with a tiny delay to ensure this component has painted
    const timer = setTimeout(() => {
      const cover = document.getElementById("preloader-cover");
      if (cover) cover.style.display = "none";
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    // Phase 1 → Phase 2 (logo)
    elapsed += PHASE_DURATIONS.intro;
    timers.push(setTimeout(() => setPhase("logo"), elapsed));

    // Phase 2 → Phase 3 (blackout)
    elapsed += PHASE_DURATIONS.logo;
    timers.push(setTimeout(() => setPhase("blackout"), elapsed));

    // Phase 3 → Phase 4 (shatter)
    elapsed += PHASE_DURATIONS.blackout;
    timers.push(setTimeout(() => setPhase("shatter"), elapsed));

    // Phase 4 → done (unmount)
    elapsed += PHASE_DURATIONS.shatter;
    timers.push(
      setTimeout(() => {
        setPhase("done");
        setShowOverlay(false);
        onComplete();
      }, elapsed)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999]"
          style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
        >
          {/* ===== BASE BACKGROUND: Keeps it solid until the end of shatter ===== */}
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              backgroundColor: (phase === "intro" || phase === "logo") ? "#FF2A2A" : "#000000",
              opacity: phase === "done" ? 0 : 1
            }}
            transition={{ 
              backgroundColor: { duration: 0.6, ease: "easeInOut" },
              opacity: { duration: 0.4 }
            }}
          />

          {/* ===== PHASE 1 & 2: Intro Shapes & Logo ===== */}
          {(phase === "intro" || phase === "logo" || phase === "blackout") && (
            <div className="absolute inset-0 z-10 overflow-hidden">
              {/* Geometric Black Shapes sliding in from edges */}
              <motion.div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0% 0%, 60% 0%, 30% 100%, 0% 100%)",
                  backgroundColor: "#000",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: phase === "intro" ? "-100%" : "0%" }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(70% 0%, 100% 0%, 100% 100%, 40% 100%)",
                  backgroundColor: "#000",
                }}
                initial={{ x: "100%" }}
                animate={{ x: phase === "intro" ? "100%" : "0%" }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              />

              {/* Logo in the center */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: phase === "logo" || phase === "blackout" ? 1 : 0,
                  scale: phase === "logo" || phase === "blackout" ? 1 : 0.85,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/logo.jpg"
                  alt="OTD Logo"
                  width={200}
                  height={200}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          )}

          {/* ===== PHASE 4: Diagonal Shatter ===== */}
          {phase === "shatter" && (
            <div className="absolute inset-0 z-30 overflow-hidden">
              {shatterBlocks.map((block) => {
                const w = 100 / COLS;
                const h = 100 / ROWS;

                return (
                  <motion.div
                    key={block.id}
                    className="absolute bg-[#F5F5F5]"
                    style={{
                      left: `${block.col * w}%`,
                      top: `${block.row * h}%`,
                      width: `${w + 4}%`, // slight overlap
                      height: `${h + 4}%`, // slight overlap
                      clipPath: block.clipPath,
                      willChange: "transform",
                    }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: block.exitX,
                      y: block.exitY,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: block.id * 0.04,
                      ease: [0.77, 0, 0.175, 1], // Snappy cubic-bezier
                    }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
