import { NewsSection as BaseNewsSection } from "@/components/news/NewsSection";
import { NewsCard } from "@/components/news/NewsCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

export function HomepageNewsSection() {
  return (
    <BaseNewsSection>
      {HOMEPAGE_CONSTANTS.NEWS.map((news, idx) => (
        <RevealWrapper 
          key={news.id} 
          delay={0.1 * (idx + 1)} 
          className={`h-full ${news.featured ? "md:col-span-2 lg:col-span-2" : ""}`}
        >
          <NewsCard
            title={news.title}
            category={news.category}
            date={news.date}
            featured={news.featured}
          />
        </RevealWrapper>
      ))}
    </BaseNewsSection>
  );
}
