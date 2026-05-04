import { Hero } from "@/components/storefront/Hero";
import { Marquee } from "@/components/storefront/Marquee";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { TrustBadges } from "@/components/storefront/TrustBadges";
import { NewsletterSignup } from "@/components/storefront/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <TrustBadges />
      <NewsletterSignup />
    </>
  );
}