import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import LazySection from "@/components/ui/LazySection";

const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"));
const SolutionSection = dynamic(() => import("@/components/sections/SolutionSection"));
const PlatformTechnologySection = dynamic(
  () => import("@/components/sections/PlatformTechnologySection"),
);
const PlatformPillarsSection = dynamic(
  () => import("@/components/sections/PlatformPillarsSection"),
);
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const DeliverySection = dynamic(() => import("@/components/sections/DeliverySection"));
const SocialProofSection = dynamic(() => import("@/components/sections/SocialProofSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <LazySection minHeight="80vh">
        <ProblemSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <SolutionSection />
      </LazySection>
      <LazySection minHeight="100vh">
        <PlatformTechnologySection />
      </LazySection>
      <LazySection minHeight="80vh">
        <PlatformPillarsSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <ServicesSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <DeliverySection />
      </LazySection>
      <LazySection minHeight="60vh">
        <SocialProofSection />
      </LazySection>
      <LazySection minHeight="40vh">
        <CTASection />
      </LazySection>
    </>
  );
}
