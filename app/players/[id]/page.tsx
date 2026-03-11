import { notFound } from "next/navigation";
import { PlayerProfileHeader } from "@/components/players/PlayerProfileHeader";
import { MatchSection } from "@/components/matches/MatchSection";
import { MatchCard } from "@/components/matches/MatchCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { playersData } from "../page"; // importing mock data from the main players route

// Mock Match History for individual players
const playerMatchHistory = [
  { id: 10, playerA: "Silent Assassin", playerB: "Helicopter", date: "Sep 01, 2026", location: "Rucker Park", status: "completed" as const, scoreA: 21, scoreB: 15 },
  { id: 11, playerA: "Silent Assassin", playerB: "The Professor", date: "Aug 15, 2026", location: "Dyckman", status: "completed" as const, scoreA: 19, scoreB: 21 },
  { id: 12, playerA: "Silent Assassin", playerB: "Hot Sauce", date: "Jul 28, 2026", location: "Venice Beach", status: "completed" as const, scoreA: 22, scoreB: 20 },
];

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Find the mocked player
  const player = playersData.find((p) => p.id === id);

  if (!player) {
    notFound();
  }

  // To simulate the 'player' page, let's just show mock history for them if we want
  const history = playerMatchHistory.map(match => ({
    ...match,
    // Just inject the current player's name into the mock history for visual purposes
    playerA: player.name 
  }));

  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      {/* Dynamic Profile Header */}
      <PlayerProfileHeader {...player} />

      {/* Player's Match History */}
      <RevealWrapper>
        <MatchSection title="Match History" subtitle="THE TAPE">
          {history.map((match, index) => (
            <RevealWrapper key={match.id} delay={index * 0.1}>
              <MatchCard {...match} />
            </RevealWrapper>
          ))}
        </MatchSection>
      </RevealWrapper>

    </main>
  );
}
