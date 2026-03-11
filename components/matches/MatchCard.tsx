import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Play } from "lucide-react";

export function MatchCard({
    playerA,
    playerB,
    date,
    location,
    status = "upcoming",
    scoreA,
    scoreB,
}: {
    playerA: string;
    playerB: string;
    date: string;
    location: string;
    status?: "upcoming" | "live" | "completed";
    scoreA?: number;
    scoreB?: number;
}) {
    return (
        <Card className="flex flex-col h-full bg-(--color-graphite) border-(--color-steel-gray) hover:border-(--color-sharp-red) p-6">
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-sm text-(--color-chrome-silver) uppercase tracking-widest mb-1 font-sans">{date}</span>
                    <span className="text-xs text-(--color-chrome-silver) font-sans">{location}</span>
                </div>
                <Badge variant={status === "live" ? "live" : "default"}>
                    {status}
                </Badge>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 py-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl md:text-3xl font-heading uppercase text-white tracking-wider truncate mr-2">{playerA}</span>
                    {scoreA !== undefined && <span className="text-3xl font-heading text-(--color-sharp-red)">{scoreA}</span>}
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-px bg-(--color-steel-gray) flex-1"></div>
                    <span className="text-sm font-heading text-(--color-chrome-silver) uppercase">VS</span>
                    <div className="h-px bg-(--color-steel-gray) flex-1"></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-2xl md:text-3xl font-heading uppercase text-white tracking-wider truncate mr-2">{playerB}</span>
                    {scoreB !== undefined && <span className="text-3xl font-heading text-(--color-sharp-red)">{scoreB}</span>}
                </div>
            </div>

            <div className="border-t border-(--color-steel-gray) pt-4 mt-2 flex justify-end">
                <button className="flex items-center gap-2 text-sm uppercase tracking-wide font-heading text-(--color-sharp-red) hover:text-red-400 transition-colors">
                    <Play size={16} fill="currentColor" /> Watch Highlights
                </button>
            </div>
        </Card>
    );
}
