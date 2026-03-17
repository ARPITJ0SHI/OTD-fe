"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Matches", href: "/matches" },
        { name: "Players", href: "/players" },
        { name: "News", href: "/news" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "Shop", href: "/merch" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-between items-start pt-0 md:pt-4">
                
                {/* LEFT SIDE: Angled Logo Box - Now with a dark glassmorphic background to keep logo colors original */}
                <div className="pointer-events-auto">
                    <Link 
                        href="/" 
                        className="relative flex items-center justify-start pl-6 pr-12 md:pl-10 md:pr-16 py-4 md:py-5 bg-black/60 backdrop-blur-md border-b border-r border-white/10 transition-transform origin-left hover:scale-105"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
                    >
                        <Image
                            src="/Screenshot_2026-03-10_154510-removebg-preview.png"
                            alt="OTD Logo"
                            width={120}
                            height={60}
                            className="h-8 md:h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* RIGHT SIDE: Floating Links & Custom Menu */}
                <div className="pointer-events-auto flex items-center gap-4 md:gap-8 pr-4 md:pr-8 pt-4 md:pt-2">
                    
                    <nav className={`hidden lg:flex items-center gap-8 px-8 py-3 rounded-full border border-white/10 transition-all duration-500 ${
                        isScrolled ? "bg-black/80 backdrop-blur-md shadow-2xl" : "bg-black/40 backdrop-blur-sm"
                    }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-heading text-sm xl:text-base uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    <Link
                        href="/betting"
                        className="hidden md:flex items-center justify-center px-10 py-3 bg-[#FF2020] text-white font-heading font-bold italic uppercase tracking-widest text-sm transition-all hover:bg-red-600 hover:scale-105"
                        style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)' }}
                    >
                        Betting
                    </Link>

                    <button
                        className="flex flex-col justify-center gap-[6px] w-12 h-12 items-end group bg-black/40 backdrop-blur-md rounded-full p-3 border border-white/10 hover:bg-white/10 transition-all"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <div className="h-[2px] w-full bg-white transition-all duration-300 group-hover:w-3/4"></div>
                        <div className="h-[2px] w-3/4 bg-white transition-all duration-300 group-hover:w-full"></div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center items-center ${
                mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}>
                <button 
                    className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <X size={40} strokeWidth={1} />
                </button>

                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-heading text-4xl md:text-6xl uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 hover:to-white transition-all hover:scale-110"
                            style={{ transitionDelay: `${index * 50}ms` }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/betting"
                        className="mt-8 px-12 py-4 border border-[#FF2020] text-[#FF2020] font-heading text-2xl uppercase tracking-widest hover:bg-[#FF2020] hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Betting
                    </Link>
                </div>
            </div>
        </>
    );
}