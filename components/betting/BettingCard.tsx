import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function BettingCard({
  matchup,
  playerA,
  playerB,
  oddsA,
  oddsB,
  timeUntil,
}: {
  matchup: string;
  playerA: string;
  playerB: string;
  oddsA: string;
  oddsB: string;
  timeUntil: string;
}) {
  return (
    <Card className="flex flex-col h-full bg-(--color-graphite) border-(--color-steel-gray) hover:border-(--color-sharp-red) p-6">
      <div className="flex justify-between items-start mb-6 border-b border-(--color-steel-gray) pb-4">
        <div>
          <span className="text-sm text-(--color-chrome-silver) uppercase tracking-widest block mb-1 font-sans">Matchup</span>
          <span className="text-xl font-heading text-white">{matchup}</span>
        </div>
        <div className="bg-(--color-jet-black) px-3 py-1 border border-(--color-steel-gray) text-(--color-sharp-red) text-xs font-sans uppercase tracking-widest text-center">
          Starts in<br />{timeUntil}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6 py-4">
        {/* Player A Odds */}
        <button className="group w-full flex justify-between items-center bg-(--color-jet-black) border border-(--color-steel-gray) hover:border-(--color-sharp-red) p-4 transition-colors">
          <span className="text-lg md:text-xl font-heading uppercase text-white tracking-wider group-hover:text-(--color-sharp-red) transition-colors">{playerA}</span>
          <span className="text-2xl font-heading text-(--color-sharp-red)">{oddsA}</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="h-px bg-(--color-steel-gray) flex-1"></div>
          <span className="text-xs font-heading text-(--color-chrome-silver) uppercase">VS</span>
          <div className="h-px bg-(--color-steel-gray) flex-1"></div>
        </div>

        {/* Player B Odds */}
        <button className="group w-full flex justify-between items-center bg-(--color-jet-black) border border-(--color-steel-gray) hover:border-(--color-sharp-red) p-4 transition-colors">
          <span className="text-lg md:text-xl font-heading uppercase text-white tracking-wider group-hover:text-(--color-sharp-red) transition-colors">{playerB}</span>
          <span className="text-2xl font-heading text-white group-hover:text-(--color-sharp-red) transition-colors">{oddsB}</span>
        </button>
      </div>

      <div className="pt-4 mt-2">
        <Button className="w-full" variant="primary">Place Wager</Button>
      </div>
    </Card>
  );
}
