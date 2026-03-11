"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "@/components/animation/RevealWrapper";

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  wins: number;
  losses: number;
  winPercentage: number;
  trend: "up" | "down" | "same";
}

export function LeaderboardTable({ data }: { data: LeaderboardEntry[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b-2 border-(--color-steel-gray) text-(--color-chrome-silver) font-sans text-sm uppercase tracking-widest">
            <th className="py-4 px-6">Rank</th>
            <th className="py-4 px-6 w-full">Player</th>
            <th className="py-4 px-6 text-center">W</th>
            <th className="py-4 px-6 text-center">L</th>
            <th className="py-4 px-6 text-right">Win %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <motion.tr 
              key={player.id} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              className="group border-b border-(--color-steel-gray) hover:bg-(--color-graphite) transition-colors cursor-pointer"
            >
              <td className="py-6 px-6">
                <div className="flex items-center gap-3">
                  <span className={`font-heading text-3xl ${player.rank <= 3 ? 'text-(--color-sharp-red)' : 'text-white'} group-hover:scale-110 transition-transform origin-left`}>
                    #{player.rank}
                  </span>
                  {player.trend === "up" && <span className="text-green-500 text-xs">▲</span>}
                  {player.trend === "down" && <span className="text-red-500 text-xs">▼</span>}
                  {player.trend === "same" && <span className="text-gray-500 text-xs">-</span>}
                </div>
              </td>
              <td className="py-6 px-6 font-heading text-2xl tracking-widest uppercase text-white group-hover:text-(--color-sharp-red) transition-colors">
                {player.name}
              </td>
              <td className="py-6 px-6 text-center font-heading text-xl text-white">
                {player.wins}
              </td>
              <td className="py-6 px-6 text-center font-heading text-xl text-white">
                {player.losses}
              </td>
              <td className="py-6 px-6 text-right font-heading text-2xl text-(--color-sharp-red)">
                {player.winPercentage}%
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
