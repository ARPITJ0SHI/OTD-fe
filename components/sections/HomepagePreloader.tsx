"use client";

import { useState, useCallback, ReactNode, cloneElement, isValidElement } from "react";
import { PreloaderOverlay } from "@/components/animation/PreloaderOverlay";

interface HomepagePreloaderProps {
  children: ReactNode;
}

export function HomepagePreloader({ children }: HomepagePreloaderProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* Server-rendered cover — only on homepage, hidden once PreloaderOverlay hydrates */}
      {!preloaderDone && (
        <div
          id="preloader-cover"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "#FF2A2A",
            pointerEvents: "none",
          }}
        />
      )}
      <PreloaderOverlay onComplete={handlePreloaderComplete} />
      {/* We intercept the children (HeroSection) and inject the preloaderDone prop */}
      {isValidElement(children) 
        ? cloneElement(children, { preloaderDone } as any) 
        : children}
    </>
  );
}
