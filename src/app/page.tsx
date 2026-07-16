import {
  AboutSection,
  ContactSection,
  CurrentBuildSection,
  PrinciplesSection,
  ResearchSection,
  SelectedSystemsSection,
} from "@/components/sections/home-sections";
import { HeroSection } from "@/components/sections/hero-section";
import { ProofLedger } from "@/components/sections/proof-ledger";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProofLedger />
      <SelectedSystemsSection />
      <ResearchSection />
      <PrinciplesSection />
      <AboutSection />
      <CurrentBuildSection />
      <ContactSection />
    </main>
  );
}
