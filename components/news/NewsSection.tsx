import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function NewsSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-24 relative z-10 bg-(--color-graphite)">
      <Container>
        <SectionHeading title="Latest News" subtitle="The Culture" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      </Container>
    </section>
  );
}
