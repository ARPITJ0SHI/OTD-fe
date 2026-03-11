"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionHeading({
    title,
    subtitle,
    className = "",
}: {
    title: string;
    subtitle?: string;
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-text",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`mb-12 ${className}`}>
            {subtitle && (
                <span className="reveal-text inline-block text-(--color-sharp-red) font-heading tracking-widest uppercase mb-2">
                    {subtitle}
                </span>
            )}
            <h2 className="reveal-text font-heading text-5xl md:text-7xl uppercase tracking-wider">
                {title}
            </h2>
        </div>
    );
}
