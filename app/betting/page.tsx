import { PageHero } from "@/components/hero/PageHero";
import { Container } from "@/components/ui/Container";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { BettingCard } from "@/components/betting/BettingCard";
import { SponsorMarquee } from "@/components/animation/SponsorMarquee";

// Mock Data
const upcomingOdds = [
  { id: 1, matchup: "Rucker Park Showdown", playerA: "Silent Assassin", playerB: "Bone Collector", oddsA: "-150", oddsB: "+120", timeUntil: "24h 10m" },
  { id: 2, matchup: "Venice Beach Clash", playerA: "The Professor", playerB: "Hot Sauce", oddsA: "-200", oddsB: "+160", timeUntil: "2d 5h" },
  { id: 3, matchup: "Dyckman Tournament", playerA: "White Chocolate", playerB: "Skip To My Lou", oddsA: "EVEN", oddsB: "EVEN", timeUntil: "5d 12h" },
];

const sponsorLogos = [
  "/sponsor.svg",
];

export default function BettingPage() {
  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      <PageHero 
        title="The Book" 
        subtitle="Put your money where your mouth is. Live odds and predictions for global matchups."
        backgroundImageUrl="/banner.jpg"
      />

      <SponsorMarquee logos={sponsorLogos} className="-mt-8 relative z-20" />

      <section className="py-24 relative z-10 bg-(--color-jet-black)">
        <Container>
          <RevealWrapper>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter text-white">
                Upcoming <span className="text-(--color-sharp-red)">Odds</span>
              </h2>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingOdds.map((odds, index) => (
              <RevealWrapper key={odds.id} delay={index * 0.1}>
                <BettingCard {...odds} />
              </RevealWrapper>
            ))}
          </div>

        </Container>
      </section>

    </main>
  );
}
