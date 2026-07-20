import { defineProject } from "../schema";

export const nara = defineProject({
  canonicalId: "project-nara",
  slug: "nara",
  title: "Nara Wallet",
  oneLiner: "Making multi-chain wallet actions feel as direct as a conversation.",
  cardCopy:
    "I worked on Nara's AI agent layer, translating natural-language requests into wallet tools for addresses, balances, transfers, fiat checkout, and market-price comparison. The team won 1st Place at the Nextgen Agent Hackathon.",
  caseStudyLead:
    "Nara explored a practical question: can someone manage crypto without first learning the commands and interfaces behind every network? As the team's AI Agent Developer, I worked on the conversational layer that routes everyday requests into explicit wallet and market tools while the Internet Computer canisters handle chain-facing operations.",
  role: "AI Agent Developer",
  year: "2025",
  status: "prototype",
  liveStatus: "online",
  statusLabel: "Award-Winning Hackathon Prototype",
  domains: ["AI Agents", "Multi-chain Wallets", "On-chain Inference"],
  technologies: [
    "Fetch.ai uAgents",
    "ASI:One",
    "Python",
    "Internet Computer",
    "Rust",
    "React",
    "Stripe",
    "Tract ONNX",
  ],
  featuredOrder: 4,
  showInSelectedSystems: true,
  problem:
    "Common wallet tasks are scattered across network-specific interfaces, technical address formats, market tools, and payment flows. That complexity makes even a simple request—check a balance, prepare a transfer, or compare a price—harder than it needs to be.",
  audience: [
    "People who want to use crypto through familiar language instead of network-specific commands",
    "Multi-chain users managing BTC, ETH, SOL, and ICP wallet actions",
    "Teams exploring conversational interfaces for on-chain products",
  ],
  mechanism: [
    "Receive an everyday request through the Fetch.ai chat protocol.",
    "Use ASI:One tool selection to map the request to a bounded wallet, payment, or market action.",
    "Call Internet Computer wallet and AI canisters for chain-facing operations or ONNX inference.",
    "Return a structured result or an explicit confirmation step before a consequential action continues.",
  ],
  contributions: [
    "Developed the conversational agent layer and its Fetch.ai/uAgents protocols for the collaborative build.",
    "Defined tool schemas and routing for wallet addresses, balances, transfers, fiat checkout, and market comparison.",
    "Connected agent requests to Internet Computer canister calls and the Stripe payment flow.",
    "Contributed to the hackathon integration, demo flow, and public technical documentation.",
  ],
  teamAttribution:
    "Nara was built by a five-person hackathon team spanning blockchain, AI agents, frontend, design, and business. Wildan's public role is scoped to AI Agent Developer. The 1st Place result belongs to the Nara team.",
  decisions: [
    {
      title: "Turn intent into bounded tools",
      rationale:
        "A conversational interface is more useful when each request resolves to a named wallet or market operation instead of an open-ended model response.",
      tradeoff:
        "Every supported intent needs a maintained schema, validation path, and clear fallback when the request is ambiguous.",
    },
    {
      title: "Keep chain operations behind canisters",
      rationale:
        "Internet Computer canisters provide a shared boundary for wallet operations and the ONNX-based market model while the agent focuses on conversation and orchestration.",
      tradeoff:
        "The experience depends on several services—agent, canisters, RPC providers, model data, and payment APIs—remaining compatible and available.",
    },
  ],
  evidence: [
    {
      id: "nar-role-01",
      claim: "Wildan's team role was AI Agent Developer.",
      scope: "personal",
      state: "owner-confirmed",
      asOf: "2026-07-20",
      source: { label: "Canonical repository", href: "https://github.com/wildanniam/nara" },
    },
    {
      id: "nar-award-01",
      claim: "The Nara Wallet team won 1st Place at the Nextgen Agent Hackathon.",
      scope: "team",
      state: "verified",
      asOf: "2026-07-20",
      source: { label: "DoraHacks winner milestone", href: "https://dorahacks.io/buidl/31746/" },
    },
    {
      id: "nar-flow-01",
      claim:
        "The public repository contains a Fetch.ai/uAgents chat layer, tool-routed wallet actions, Rust canisters, Stripe integration, and an ONNX inference canister.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-20",
      source: { label: "Canonical repository", href: "https://github.com/wildanniam/nara" },
    },
    {
      id: "nar-live-01",
      claim: "Nara's public Internet Computer deployment responded during the latest availability check.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-20",
      source: {
        label: "Public ICP deployment",
        href: "https://vhtak-4yaaa-aaaam-aejya-cai.icp0.io",
      },
    },
  ],
  limitations: [
    "Nara is a hackathon prototype, not a production financial wallet.",
    "The public deployment responded during the latest check, but its wallet and agent transaction flows were not rerun end to end.",
    "No independent security audit or production custody claim is made.",
    "Multi-chain and payment flows depend on external networks, RPC services, market data, and configured API credentials.",
  ],
  links: [
    {
      label: "Open public prototype",
      href: "https://vhtak-4yaaa-aaaam-aejya-cai.icp0.io",
      kind: "live",
    },
    { label: "View repository", href: "https://github.com/wildanniam/nara", kind: "repository" },
    {
      label: "View winning project",
      href: "https://dorahacks.io/buidl/31746/",
      kind: "evidence",
    },
    { label: "Watch demo", href: "https://youtu.be/6vcqCsSTM34", kind: "evidence" },
  ],
  media: [
    {
      state: "published",
      src: "/media/projects/nara-wallet-cover.webp",
      alt: "Nara Wallet product page showing its conversational wallet interface and agent-based workflow.",
      width: 1878,
      height: 1056,
      sourceNote:
        "Cropped from the canonical repository's authentic product landing-page capture and optimized for the web, reviewed 2026-07-20.",
    },
  ],
  lastVerifiedAt: "2026-07-20",
});
