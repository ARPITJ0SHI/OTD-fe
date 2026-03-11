import { PageHero } from "@/components/hero/PageHero";
import { Container } from "@/components/ui/Container";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/LeaderboardTable";

// Mock Data
const globalRankings: LeaderboardEntry[] = [
  { id: "1", rank: 1, name: "Street King", wins: 89, losses: 12, winPercentage: 88, trend: "same" },
  { id: "2", rank: 2, name: "Silent Assassin", wins: 45, losses: 12, winPercentage: 79, trend: "up" },
  { id: "3", rank: 3, name: "Money", wins: 52, losses: 8, winPercentage: 86, trend: "up" },
  { id: "4", rank: 4, name: "The Professor", wins: 60, losses: 20, winPercentage: 75, trend: "down" },
  { id: "5", rank: 5, name: "Flash", wins: 35, losses: 18, winPercentage: 66, trend: "down" },
  { id: "6", rank: 6, name: "Bone Collector", wins: 40, losses: 25, winPercentage: 61, trend: "same" },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      <PageHero 
        title="The Rankings" 
        subtitle="Numbers don't lie. See who runs the global asphalt circuit."
        backgroundImageUrl="/banner.jpg"
      />

      <section className="py-24 relative z-10 bg-(--color-jet-black)">
        <Container>
          <RevealWrapper>
            <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-(--color-steel-gray) pb-6">
              <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter text-white">
                Global <span className="text-(--color-sharp-red)">Top 50</span>
              </h2>
              <div className="flex gap-4">
                <button className="text-(--color-sharp-red) font-sans text-sm uppercase tracking-widest border-b-2 border-(--color-sharp-red) pb-1">All-Time</button>
                <button className="text-(--color-chrome-silver) hover:text-white transition-colors font-sans text-sm uppercase tracking-widest pb-1">Season 3</button>
              </div>
            </div>
          </RevealWrapper>

          <LeaderboardTable data={globalRankings} />

        </Container>
      </section>

    </main>
  );
}
