import {
  AboutSection,
  ContactSection,
  CurrentBuildSection,
  HowIWorkSection,
  PrinciplesSection,
  SelectedSystemsSection,
} from "@/components/sections/home-sections";
import { HeroSection } from "@/components/sections/hero-section";
import { ProofLedger } from "@/components/sections/proof-ledger";
import { ResearchCredentialSection } from "@/components/sections/research-credential-section";
import { HeroCredentialSceneController } from "@/motion/hero-credential-scene";

export default function HomePage() {
  return (
    <main id="main-content">
      <div data-signature-scene="hero-credential">
        <HeroSection />
        <ProofLedger />
        <ResearchCredentialSection />
        <HeroCredentialSceneController />
      </div>
      <SelectedSystemsSection />
      <HowIWorkSection />
      <PrinciplesSection />
      <AboutSection />
      <CurrentBuildSection />
      <ContactSection />
    </main>
  );
}
