import { PageHero } from "@/components/hero/PageHero";
import { MerchCard } from "@/components/merch/MerchCard";
import { Container } from "@/components/ui/Container";
import { RevealWrapper } from "@/components/animation/RevealWrapper";

// Mock Data
const products = [
  { id: 1, title: "OTD Classic Hoodie - Jet Black", price: "$65.00", imageUrl: "", available: true },
  { id: 2, title: "OTD Logo Tee - Sharp Red", price: "$35.00", imageUrl: "", available: true },
  { id: 3, title: "Street Kings Snapback", price: "$30.00", imageUrl: "", available: false },
  { id: 4, title: "Asphalt Pro Basketball", price: "$45.00", imageUrl: "", available: true },
  { id: 5, title: "OTD Reversible Practice Jersey", price: "$55.00", imageUrl: "", available: true },
  { id: 6, title: "Performance Crew Socks (3-Pack)", price: "$20.00", imageUrl: "", available: false },
];

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      <PageHero 
        title="The Drop" 
        subtitle="Rep the culture. Official Off The Dribble apparel and gear."
        backgroundImageUrl="/banner.jpg"
      />

      <section className="py-24 relative z-10 bg-(--color-graphite)">
        <Container>
          <RevealWrapper>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter text-white">
                All <span className="text-(--color-sharp-red)">Gear</span>
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <RevealWrapper key={product.id} delay={index * 0.1}>
                <MerchCard {...product} />
              </RevealWrapper>
            ))}
          </div>

        </Container>
      </section>

    </main>
  );
}
