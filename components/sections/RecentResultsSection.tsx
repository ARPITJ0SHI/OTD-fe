import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResultBanner } from "@/components/matches/ResultBanner";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RevealWrapper } from "@/components/animation/RevealWrapper";

export function RecentResultsSection() {
  return (
    <section className="py-24 bg-(--color-jet-black)">
      <Container>
        <SectionHeading title="Recent Results" subtitle="Archive" />
        
        <div className="flex flex-col border-t border-white/10">
          {HOMEPAGE_CONSTANTS.RECENT_RESULTS.map((match, idx) => (
            <ResultBanner 
              key={match.id}
              playerA={match.playerA}
              playerB={match.playerB}
              scoreA={match.scoreA || 0}
              scoreB={match.scoreB || 0}
              date={match.date}
              location={match.location}
            />
          ))}
        </div>

        <RevealWrapper delay={0.4} className="mt-12 flex justify-center">
          <Link 
            href="/matches" 
            className="group flex items-center gap-4 px-8 py-4 border border-white/10 hover:border-(--color-sharp-red) bg-white/5 hover:bg-(--color-sharp-red) transition-all duration-300"
          >
            <span className="font-heading uppercase tracking-widest text-sm text-white">
              View All History
            </span>
            <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealWrapper>
      </Container>
    </section>
  );
}
