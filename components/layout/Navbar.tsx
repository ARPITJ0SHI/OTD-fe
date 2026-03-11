"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";

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
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-(--color-jet-black)/90 backdrop-blur-md border-b border-(--color-steel-gray) py-0"
                : "bg-transparent py-0"
                }`}
        >
            <Container className="flex items-center justify-between pointer-events-auto">
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/Screenshot_2026-03-10_154510-removebg-preview.png"
                        alt="OTD Logo"
                        width={120}
                        height={60}
                        className="h-10 md:h-12 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-heading text-lg uppercase tracking-wider text-(--color-chrome-silver) hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/betting"
                        className="ml-4 px-5 py-2 rounded bg-(--color-sharp-red) text-white font-heading uppercase tracking-widest hover:bg-red-600 transition-colors"
                    >
                        Betting
                    </Link>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </Container>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-(--color-jet-black) border-b border-(--color-steel-gray) flex flex-col items-center py-6 gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-heading text-2xl uppercase tracking-wider text-white hover:text-(--color-sharp-red) transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/betting"
                        className="px-8 py-3 rounded bg-(--color-sharp-red) text-white font-heading text-xl uppercase tracking-widest hover:bg-red-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Betting
                    </Link>
                </div>
            )}
        </header>
    );
}
