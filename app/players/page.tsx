import { PageHero } from "@/components/hero/PageHero";
import { PlayerGrid } from "@/components/players/PlayerGrid";
import { PlayerCard } from "@/components/players/PlayerCard";
import { Container } from "@/components/ui/Container";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import Link from "next/link";

// Mock Data
export const playersData = [
  { id: "1", name: "Tyrone Evans", nickname: "Silent Assassin", wins: 45, losses: 12, imageUrl: "" },
  { id: "2", name: "Marcus Johnson", nickname: "Springs", wins: 38, losses: 15, imageUrl: "" },
  { id: "3", name: "David Miller", nickname: "Money", wins: 52, losses: 8, imageUrl: "" },
  { id: "4", name: "James Carter", nickname: "The General", wins: 40, losses: 20, imageUrl: "" },
  { id: "5", name: "Kevin Davis", nickname: "Flash", wins: 35, losses: 18, imageUrl: "" },
  { id: "6", name: "Michael Smith", nickname: "Ice", wins: 28, losses: 5, imageUrl: "" },
];

export default function PlayersPage() {
  return (
    <main className="min-h-screen bg-(--color-jet-black)">
      <PageHero 
        title="The Roster" 
        subtitle="Meet the elite athletes dominating the asphalt. Legends aren't born, they're forged here."
        backgroundImageUrl="/banner.jpg" // Using the same banner for now
      />

      {/* The PlayerGrid itself contains a <section>, <Container>, and <SectionHeading> */}
      <PlayerGrid title="All Players" subtitle="ROSTER">
        {playersData.map((player, index) => (
          <RevealWrapper key={player.id} delay={index * 0.1}>
            {/* Wrap the card in a link to get to the dynamic profile page */}
            <Link href={`/players/${player.id}`} className="block h-full cursor-pointer">
              <PlayerCard {...player} />
            </Link>
          </RevealWrapper>
        ))}
      </PlayerGrid>

    </main>
  );
}
