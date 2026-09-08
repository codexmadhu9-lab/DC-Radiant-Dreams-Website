import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/dc/Navbar";
import { HeroVideo } from "@/components/dc/HeroVideo";
import { CustomCursor } from "@/components/dc/CustomCursor";
import { ShopProvider } from "@/components/dc/ShopProvider";
import {
  BestSellerSection,
  CategorySection,
  CollectionSection,
  DCExperience,
  EditorialSection,
  Footer,
  InstagramGallery,
  NewArrivalsSection,
  Newsletter,
  OccasionSection,
  StoreLocator,
  StorySection,
  TrustSection,
} from "@/components/dc/sections";
import { Marquee } from "@/components/dc/Marquee";
import { useDcScrollAnimations } from "@/lib/use-reveal";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useDcScrollAnimations();

  return (
    <ShopProvider><main>
      <CustomCursor />
      <Navbar />
      <HeroVideo />
      <Marquee
        items={["Certified Diamonds", "Hallmarked Gold", "Lifetime Care", "Complimentary Shipping"]}
        className="border-y border-gold/30 bg-white py-4"
        itemClassName="text-[0.6rem] uppercase tracking-[0.32em] text-navy"
      />
      <CategorySection />
      <CollectionSection />
      <EditorialSection />
      <NewArrivalsSection />
      <BestSellerSection />
      <OccasionSection />
      <StorySection />
      <DCExperience />
      <TrustSection />
      <StoreLocator />
      <InstagramGallery />
      <Newsletter />
      <Footer logoUrl="/logo.jpg" />
    </main></ShopProvider>
  );
}
