import { defineProject } from "../schema";

export const novaAiWallet = defineProject({
  canonicalId: "project-nova-ai-wallet",
  slug: "nova-ai-wallet",
  title: "Nova AI Wallet",
  oneLiner: "Turning wallet intent into inspectable actions without taking over the signature.",
  cardCopy:
    "I led the AI engineering behind Nova, a conversational wallet prototype that turns natural-language intent into inspectable on-chain reads and prepared actions while keeping final authorization with the user's wallet.",
  caseStudyLead:
    "Nova explored a boundary that matters for financial agents: an AI can help a user understand and prepare an action without silently becoming the signer. I led the team and built the agent layer that translated intent into tools, evidence cards, and transaction review states.",
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
    "Researchers exploring human-controlled financial agents",
  ],
  mechanism: [
    "Route natural-language intent to registered read or prepared-action tools.",
    "Aggregate chain, explorer, market, or prediction evidence.",
    "Render purpose-built evidence cards and transaction review states.",
    "Require a separate user action in the connected wallet for final signing.",
  ],
  contributions: [
    "Led the project and coordinated product direction for the collaborative build.",
    "Designed and implemented agent behavior, tool orchestration, and generative interface actions.",
    "Shaped the boundary between intent, prepared transactions, and explicit signing.",
    "Contributed across the Next.js product, supporting APIs, deployment, and documentation.",
  ],
  teamAttribution:
    "Nova was a collaborative build with separate AI, full-stack, design, and multi-chain contributions. No competition recognition is included in public copy.",
  decisions: [
    {
      title: "Orchestrate a wallet instead of creating custody",
      rationale: "The agent can interpret and prepare an action while the wallet remains the signer.",
      tradeoff: "The user must complete an explicit wallet step for every consequential action.",
    },
    {
      title: "Render evidence as purpose-built interfaces",
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
      claim: "Nova prepares inspectable actions while the connected wallet retains final signing.",
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
  ],
  media: [{ state: "placeholder", label: "Nova intent-to-transaction review", aspectRatio: "16/10" }],
  lastVerifiedAt: "2026-07-15",
});
