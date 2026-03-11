"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function MatchSection({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="py-24 w-full relative z-10 bg-(--color-jet-black)">
            <Container>
                <SectionHeading title={title} subtitle={subtitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {children}
                </div>
            </Container>
        </section>
    );
}
