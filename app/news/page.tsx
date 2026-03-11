import { PageHero } from "@/components/hero/PageHero";
import { NewsSection } from "@/components/news/NewsSection";
import { NewsCard } from "@/components/news/NewsCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";

// Mock Data
const articleList = [
  { id: 1, title: "Silent Assassin Crowned King of Rucker Park After Historic 1v1 Run", category: "Highlights", date: "Oct 20, 2026", imageUrl: "", featured: true },
  { id: 2, title: "The Next Generation: 5 Streetballers to Watch in 2027", category: "Announcements", date: "Oct 18, 2026", imageUrl: "", featured: false },
  { id: 3, title: "Venice Beach Shutdown: How The Professor Broke the Internet Again", category: "Results", date: "Oct 15, 2026", imageUrl: "", featured: false },
  { id: 4, title: "Rules Update: Changes to the 3v3 Global Tournament Format", category: "Announcements", date: "Oct 10, 2026", imageUrl: "", featured: false },
  { id: 5, title: "Behind the Scenes: Inside the Mosswood Park Culture", category: "Highlights", date: "Oct 05, 2026", imageUrl: "", featured: true },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      <PageHero 
        title="The Culture" 
        subtitle="Stay locked in on the latest rumors, highlights, results, and updates from the global asphalt circuits."
        backgroundImageUrl="/banner.jpg"
      />

      {/* Featured News / Grid */}
      <RevealWrapper>
        <NewsSection>
          {articleList.map((article, index) => (
            <RevealWrapper key={article.id} delay={index * 0.1} className={article.featured ? "md:col-span-2 lg:col-span-2" : ""}>
              <NewsCard {...article} />
            </RevealWrapper>
          ))}
        </NewsSection>
      </RevealWrapper>

    </main>
  );
}
