import { Card } from "@/components/ui/Card";
import Image from "next/image";

export function PlayerCard({
    name,
    nickname,
    wins,
    losses,
    imageUrl,
}: {
    name: string;
    nickname?: string;
    wins: number;
    losses: number;
    imageUrl?: string;
}) {
    const winPercentage = Math.round((wins / (wins + losses)) * 100) || 0;

    return (
        <Card className="flex flex-col h-full bg-(--color-graphite) border-(--color-steel-gray) hover:border-(--color-sharp-red) overflow-hidden group">
            <div className="relative w-full aspect-square bg-(--color-jet-black)">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-(--color-steel-gray)">
                        <span className="font-heading text-6xl">OTD</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-(--color-graphite) via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                    {nickname && (
                        <p className="text-(--color-sharp-red) font-heading text-sm uppercase tracking-widest">
                            &quot;{nickname}&quot;
                        </p>
                    )}
                    <h3 className="text-white font-heading text-3xl uppercase tracking-wider truncate">
                        {name}
                    </h3>
                </div>
            </div>

            <div className="p-4 grid grid-cols-3 gap-2 text-center border-t border-(--color-steel-gray)">
                <div>
                    <p className="text-(--color-chrome-silver) text-xs uppercase tracking-wider mb-1">Wins</p>
                    <p className="text-white font-heading text-xl">{wins}</p>
                </div>
                <div className="border-x border-(--color-steel-gray)">
                    <p className="text-(--color-chrome-silver) text-xs uppercase tracking-wider mb-1">Losses</p>
                    <p className="text-white font-heading text-xl">{losses}</p>
                </div>
                <div>
                    <p className="text-(--color-chrome-silver) text-xs uppercase tracking-wider mb-1">Win %</p>
                    <p className="text-(--color-sharp-red) font-heading text-xl">{winPercentage}%</p>
                </div>
            </div>
        </Card>
    );
}
