import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagazineNewsCard } from "@/components/news/MagazineNewsCard";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RevealWrapper } from "@/components/animation/RevealWrapper";

export function HomepageNewsSection() {
  return (
    <section className="py-24 bg-(--color-graphite)">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading 
            title="Latest News" 
            subtitle="The Culture" 
            className="mb-0"
          />
          <Link 
            href="/news" 
            className="group flex items-center gap-2 text-sm font-heading uppercase tracking-widest text-(--color-chrome-silver) hover:text-white transition-colors"
          >
            Explore All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {HOMEPAGE_CONSTANTS.NEWS.slice(0, 5).map((news, idx) => (
            <MagazineNewsCard
              key={news.id}
              index={idx}
              title={news.title}
              category={news.category}
              date={news.date}
              imageUrl={news.imageUrl}
              featured={idx === 0} // Make the first item the big lead story
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
