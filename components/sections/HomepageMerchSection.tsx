import { MerchGrid } from "@/components/merch/MerchGrid";
import { MerchCard } from "@/components/merch/MerchCard";
import { RevealWrapper } from "@/components/animation/RevealWrapper";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

export function HomepageMerchSection() {
  return (
    <MerchGrid>
      {HOMEPAGE_CONSTANTS.MERCH.map((item, idx) => (
        <RevealWrapper key={item.id} delay={0.1 * (idx + 1)} className="h-full">
          <MerchCard 
            title={item.title} 
            price={item.price} 
            available={item.available} 
          />
        </RevealWrapper>
      ))}
    </MerchGrid>
  );
}
