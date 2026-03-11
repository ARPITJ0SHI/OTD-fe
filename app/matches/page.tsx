import { PageHero } from "@/components/hero/PageHero";
import { MatchSection } from "@/components/matches/MatchSection";
import { MatchCard } from "@/components/matches/MatchCard";
import { Container } from "@/components/ui/Container";
import { RevealWrapper } from "@/components/animation/RevealWrapper";

// Mock Data
const upcomingMatches = [
  { id: 1, playerA: "Silent Assassin", playerB: "Bone Collector", date: "Oct 24, 2026", location: "Rucker Park, NYC", status: "upcoming" as const },
  { id: 2, playerA: "The Professor", playerB: "Hot Sauce", date: "Nov 02, 2026", location: "Venice Beach, LA", status: "upcoming" as const },
  { id: 3, playerA: "White Chocolate", playerB: "Skip To My Lou", date: "Nov 15, 2026", location: "Dyckman Park, NYC", status: "upcoming" as const },
];

const pastMatches = [
  { id: 4, playerA: "King Handles", playerB: "Flight Time", date: "Sep 12, 2026", location: "The Cage, West 4th", status: "completed" as const, scoreA: 21, scoreB: 18 },
  { id: 5, playerA: "Silk", playerB: "Main Event", date: "Aug 28, 2026", location: "Mosswood Park, Oakland", status: "completed" as const, scoreA: 15, scoreB: 21 },
  { id: 6, playerA: "50", playerB: "Helicopter", date: "Aug 10, 2026", location: "Barry Farms, DC", status: "completed" as const, scoreA: 22, scoreB: 20 },
  { id: 7, playerA: "I'll Be Right Back", playerB: "Half Man Half Amazing", date: "Jul 22, 2026", location: "Rucker Park, NYC", status: "completed" as const, scoreA: 19, scoreB: 21 },
  { id: 8, playerA: "High Octane", playerB: "The Dribble Machine", date: "Jul 05, 2026", location: "Venice Beach, LA", status: "completed" as const, scoreA: 21, scoreB: 14 },
  { id: 9, playerA: "Flash", playerB: "Thunder", date: "Jun 18, 2026", location: "Dyckman Park, NYC", status: "completed" as const, scoreA: 21, scoreB: 19 },
];

export default function MatchesPage() {
  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      <PageHero 
        title="The Proving Grounds" 
        subtitle="Where legends are made and ankles are broken. Explore the full schedule of upcoming battles and historic matchups."
        backgroundImageUrl="/banner.jpg"
      />

      {/* Upcoming Matches */}
      <RevealWrapper>
        <MatchSection title="Upcoming" subtitle="BATTLES">
          {upcomingMatches.map((match, index) => (
            <RevealWrapper key={match.id} delay={index * 0.1}>
              <MatchCard {...match} />
            </RevealWrapper>
          ))}
        </MatchSection>
      </RevealWrapper>

      {/* Past Matches */}
      <RevealWrapper>
        <section className="py-24 w-full relative z-10 bg-(--color-graphite)">
          <Container>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter text-white">
                Archived <span className="text-(--color-sharp-red)">Results</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pastMatches.map((match, index) => (
                <RevealWrapper key={match.id} delay={index * 0.1}>
                  <MatchCard {...match} />
                </RevealWrapper>
              ))}
            </div>
          </Container>
        </section>
      </RevealWrapper>

    </main>
  );
}
