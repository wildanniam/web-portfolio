import {
  ContactSection,
  HowIBuildSection,
  SelectedSystemsSection,
} from "@/components/sections/home-sections";
import { HeroSection } from "@/components/sections/hero-section";
import { ProofLedger } from "@/components/sections/proof-ledger";
import { ResearchCredentialSection } from "@/components/sections/research-credential-section";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ResearchCredentialSection />
      <SelectedSystemsSection />
      <ProofLedger />
      <HowIBuildSection />
      <ContactSection />
    </main>
  );
}
