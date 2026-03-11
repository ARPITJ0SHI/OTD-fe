"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function PlayerGrid({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="py-24 relative z-10 bg-(--color-jet-black)">
            <Container>
                <SectionHeading title={title} subtitle={subtitle} />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {children}
                </div>
            </Container>
        </section>
    );
}
