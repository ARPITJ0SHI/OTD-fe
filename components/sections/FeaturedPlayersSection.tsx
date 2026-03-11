import { PlayerGrid } from "@/components/players/PlayerGrid";
import { PlayerCard } from "@/components/players/PlayerCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

export function FeaturedPlayersSection() {
  return (
    <PlayerGrid title="Featured Players" subtitle="Hall of Fame">
      {HOMEPAGE_CONSTANTS.FEATURED_PLAYERS.map((player, idx) => (
        <RevealWrapper key={player.id} delay={0.1 * (idx + 1)} className="h-full">
          <PlayerCard 
            name={player.name} 
            nickname={player.nickname} 
            wins={player.wins} 
            losses={player.losses} 
          />
        </RevealWrapper>
      ))}
    </PlayerGrid>
  );
}
