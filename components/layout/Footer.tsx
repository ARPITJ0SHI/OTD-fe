import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <footer className="bg-(--color-graphite) border-t border-(--color-steel-gray) pt-20 pb-10 mt-auto">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <Link href="/" className="mb-6 block w-fit">
                            <Image
                                src="/Screenshot_2026-03-10_154510-removebg-preview.png"
                                alt="Off The Dribble Logo"
                                width={1600}
                                height={1600}
                                className="h-16 w-auto object-contain origin-left"
                            />
                        </Link>
                        <p className="text-(--color-chrome-silver) font-sans text-sm mb-6">
                            The premier street basketball platform showcasing the world&apos;s most competitive 1v1, 2v2, and 3v3 matchups.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-6">Explore</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/matches" className="text-(--color-chrome-silver) hover:text-white transition-colors">Matches</Link></li>
                            <li><Link href="/players" className="text-(--color-chrome-silver) hover:text-white transition-colors">Players</Link></li>
                            <li><Link href="/leaderboard" className="text-(--color-chrome-silver) hover:text-white transition-colors">Leaderboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-6">More</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/news" className="text-(--color-chrome-silver) hover:text-white transition-colors">Latest News</Link></li>
                            <li><Link href="/merch" className="text-(--color-chrome-silver) hover:text-white transition-colors">Merch Shop</Link></li>
                            <li><Link href="/betting" className="text-(--color-chrome-silver) hover:text-white transition-colors">Betting Partners</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-6">Social</h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="text-(--color-chrome-silver) hover:text-white transition-colors">YouTube</a></li>
                            <li><a href="#" className="text-(--color-chrome-silver) hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="text-(--color-chrome-silver) hover:text-(--color-sharp-red) transition-colors">X (Twitter)</a></li>
                            <li><a href="#" className="text-(--color-chrome-silver) hover:text-white transition-colors">TikTok</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-(--color-steel-gray)/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-(--color-steel-gray) text-sm font-sans text-center md:text-left">
                        &copy; {new Date().getFullYear()} Off The Dribble. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-(--color-steel-gray) font-sans">
                        <Link href="/privacy" className="hover:text-(--color-chrome-silver) transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-(--color-chrome-silver) transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
