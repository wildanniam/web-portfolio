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
import { ResearchCredentialSection } from "@/components/sections/research-credential-section";
import { HeroCredentialScene } from "@/motion/hero-credential-scene";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroCredentialScene>
        <HeroSection />
        <ProofLedger />
        <ResearchCredentialSection />
      </HeroCredentialScene>
      <SelectedSystemsSection />
      <ResearchSection />
      <PrinciplesSection />
      <AboutSection />
      <CurrentBuildSection />
      <ContactSection />
    </main>
  );
}
