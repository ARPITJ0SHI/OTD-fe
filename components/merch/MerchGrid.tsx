"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function MerchGrid({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="py-24 relative z-10 bg-(--color-jet-black)">
            <Container>
                <SectionHeading title="Official Merch" subtitle="Cop The Look" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {children}
                </div>
            </Container>
        </section>
    );
}
