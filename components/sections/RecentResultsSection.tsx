import { MatchSection } from "@/components/matches/MatchSection";
import { MatchCard } from "@/components/matches/MatchCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

export function RecentResultsSection() {
  return (
    <MatchSection title="Recent Results" subtitle="Archive">
      {HOMEPAGE_CONSTANTS.RECENT_RESULTS.map((match, idx) => (
        <RevealWrapper key={match.id} delay={0.1 * (idx + 1)} className="h-full">
          <MatchCard
            playerA={match.playerA}
            playerB={match.playerB}
            date={match.date}
            location={match.location}
            status={match.status}
            scoreA={match.scoreA}
            scoreB={match.scoreB}
          />
        </RevealWrapper>
      ))}
    </MatchSection>
  );
}
