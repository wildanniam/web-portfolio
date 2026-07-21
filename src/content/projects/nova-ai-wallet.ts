import { defineProject } from "../schema";

export const novaAiWallet = defineProject({
  canonicalId: "project-nova-ai-wallet",
  slug: "nova-ai-wallet",
  title: "Nova AI",
  oneLiner: "Turning wallet intent into clear actions without taking over the signature.",
  cardCopy:
    "I led the AI engineering behind Nova, a conversational Agentic wallet prototype that turns natural-language intent into on-chain reads and prepared actions while keeping final authorization with the user's wallet.",
  caseStudyLead:
    "Nova explored an important question for financial agents: can AI help a user understand and prepare an action without becoming the signer? I led the team and built the agent layer that translated intent into tools, context cards, and transaction review states.",
  role: "Team Lead · AI Engineer",
  year: "2026",
  status: "prototype",
  liveStatus: "degraded",
  statusLabel: "Public Prototype · Degraded",
  domains: ["AI Agents", "Wallet Intelligence", "Human-in-the-loop"],
  technologies: ["Next.js", "TypeScript", "CopilotKit", "OpenAI", "Wagmi", "Viem", "ONNX Runtime"],
  featuredOrder: 3,
  showInSelectedSystems: true,
  problem:
    "A wallet intention is often spread across addresses, explorers, network switches, market tools, and transaction forms. Nova explored whether an AI layer could translate intent without becoming a custodian.",
  audience: [
    "EVM wallet users seeking natural-language access to wallet state",
    "Users combining portfolio, counterparty, and cost context",
    "Product teams exploring human-controlled financial agents",
  ],
  mechanism: [
    "Route natural-language intent to registered read or prepared-action tools.",
    "Aggregate chain, explorer, market, or prediction context.",
    "Render purpose-built context cards and transaction review states.",
    "Require a separate user action in the connected wallet for final signing.",
  ],
  contributions: [
    "Led the project and coordinated product direction for the collaborative build.",
    "Designed and implemented agent behavior, tool orchestration, and generative interface actions.",
    "Defined the handoff between intent, prepared transactions, and explicit signing.",
    "Contributed across the Next.js product, supporting APIs, deployment, and documentation.",
  ],
  teamAttribution:
    "Nova was a collaborative build with separate AI, full-stack, design, and multi-chain contributions. The team received 1st Notable Mention and 1st Social Media Challenge recognition at the South East Asia Lisk Builder Challenge 3.",
  decisions: [
    {
      title: "Orchestrate a wallet instead of creating custody",
      rationale: "The agent can interpret and prepare an action while the wallet remains the signer.",
      tradeoff: "The user must complete an explicit wallet step for every consequential action.",
    },
    {
      title: "Render context as purpose-built interfaces",
      rationale: "Balances, counterparties, predictions, and transactions require different hierarchy.",
      tradeoff: "More generative UI states need careful provenance and fallback labels.",
    },
  ],
  evidence: [
    {
      id: "nov-role-01",
      claim: "Wildan served as Team Lead and AI Engineer.",
      scope: "personal",
      state: "owner-confirmed",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/OfficialNovaAI/nova-wallet" },
    },
    {
      id: "nov-flow-01",
      claim: "Nova prepares wallet actions while the connected wallet retains final signing.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/OfficialNovaAI/nova-wallet" },
    },
    {
      id: "nov-life-01",
      claim: "Nova is a completed public hackathon prototype, with no production-readiness claim.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Public prototype", href: "https://nova-wallet-puce.vercel.app" },
    },
    {
      id: "nov-award-01",
      claim:
        "The Nova AI team received 1st Notable Mention and 1st Social Media Challenge recognition at the South East Asia Lisk Builder Challenge 3.",
      scope: "team",
      state: "verified",
      asOf: "2026-07-16",
      source: {
        label: "Telkom University achievement record",
        href: "https://bse.telkomuniversity.ac.id/prestasi-tim-nova-ai-di-south-east-asia-lisk-builder-challenge-3/",
      },
    },
  ],
  limitations: [
    "Nova is not a production or custodial wallet.",
    "The historical public chat runtime was degraded during the latest audit.",
    "Simulated payment completions and fallback results are not product validation.",
    "Model estimates are not guaranteed execution prices.",
  ],
  links: [
    { label: "Open public prototype", href: "https://nova-wallet-puce.vercel.app", kind: "live" },
    { label: "View repository", href: "https://github.com/OfficialNovaAI/nova-wallet", kind: "repository" },
    {
      label: "View team recognition",
      href: "https://bse.telkomuniversity.ac.id/prestasi-tim-nova-ai-di-south-east-asia-lisk-builder-challenge-3/",
      kind: "evidence",
    },
  ],
  media: [
    {
      state: "published",
      src: "/media/projects/nova-ai-wallet-cover.webp",
      alt: "Nova AI Wallet product cover showing its conversational wallet interface and intent-to-on-chain execution concept.",
      width: 2560,
      height: 1440,
      sourceNote: "Owner-supplied product showcase cover, reviewed 2026-07-20.",
    },
  ],
  lastVerifiedAt: "2026-07-16",
});
