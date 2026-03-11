import { HeroSection } from "@/components/hero/HeroSection";
import { HorizontalScrollBanner } from "@/components/animation/HorizontalScrollBanner";
import { FlyThroughGallery } from "@/components/animation/FlyThroughGallery";
import { HomepagePreloader } from "@/components/sections/HomepagePreloader";
import { UpcomingMatchesSection } from "@/components/sections/UpcomingMatchesSection";
import { RecentResultsSection } from "@/components/sections/RecentResultsSection";
import { FeaturedPlayersSection } from "@/components/sections/FeaturedPlayersSection";
import { HomepageNewsSection } from "@/components/sections/HomepageNewsSection";
import { HomepageMerchSection } from "@/components/sections/HomepageMerchSection";
import { HOMEPAGE_CONSTANTS } from "@/constants/landingData";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-(--color-jet-black)">
      {/* Client Component that handles the preloader state and renders HeroSection conditionally */}
      <HomepagePreloader>
        <HeroSection />
      </HomepagePreloader>

      <HorizontalScrollBanner text={HOMEPAGE_CONSTANTS.BANNERS.TOP} direction="left" />

      <UpcomingMatchesSection />
      <RecentResultsSection />

      <FlyThroughGallery />

      <FeaturedPlayersSection />
      <HomepageNewsSection />
      <HomepageMerchSection />
    </main>
  );
}
