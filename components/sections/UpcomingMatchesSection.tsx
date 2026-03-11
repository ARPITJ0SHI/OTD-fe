import { MatchSection } from "@/components/matches/MatchSection";
import { MatchCard } from "@/components/matches/MatchCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

export function UpcomingMatchesSection() {
  return (
    <MatchSection title="Upcoming Battles" subtitle="Live & Upcoming">
      {HOMEPAGE_CONSTANTS.UPCOMING_MATCHES.map((match, idx) => (
        <RevealWrapper key={match.id} delay={0.1 * (idx + 1)} className="h-full">
          <MatchCard
            playerA={match.playerA}
            playerB={match.playerB}
            date={match.date}
            location={match.location}
            status={match.status}
          />
        </RevealWrapper>
      ))}
    </MatchSection>
  );
}
