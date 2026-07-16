import { defineProject } from "../schema";

export const quorum = defineProject({
  canonicalId: "project-quorum",
  slug: "quorum",
  title: "Quorum",
  oneLiner: "Making collaborative event settlement inspectable on Stellar testnet.",
  cardCopy:
    "I'm leading Quorum, a Stellar testnet build that connects collaborative event checkout, split settlement, non-transferable passes, gated resources, and transaction evidence in one product flow.",
  caseStudyLead:
    "A collaborative event is not only a ticket page. It is a chain of promises across payment, access, check-in, revenue splits, withdrawal, and proof. I lead Quorum across the product, full stack, and smart contracts to make those states explicit and inspectable.",
  role: "Team Lead · Full-Stack & Smart Contract Engineer",
  year: "2026",
  status: "active-build",
  liveStatus: "online",
  statusLabel: "Active Stellar Testnet Build",
  domains: ["Smart Contracts", "Event Settlement", "On-chain Evidence"],
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stellar SDK", "Soroban", "Rust", "Freighter"],
  featuredOrder: 5,
  showInSelectedSystems: false,
  problem:
    "Collaborative events often collect ticket revenue through one organizer and reconcile access, shares, and withdrawals through disconnected tools and trust boundaries.",
  audience: [
    "Web3 organizers creating paid or free events",
    "Attendees receiving wallet-bound passes and gated resources",
    "Collaborators who need visible shares, balances, and withdrawal evidence",
  ],
  mechanism: [
    "Create an event with access, capacity, collaborator splits, and resources.",
    "Prepare and sign QuorumCore actions through Freighter.",
    "Issue a non-transferable pass and index contract evidence into product views.",
    "Track collaborator balances and withdrawals as distinct inspectable movements.",
  ],
  contributions: [
    "Lead the project, product specification, and team delivery.",
    "Build the Next.js application, server routes, sessions, persistence, and flows.",
    "Design and implement Soroban behavior and wallet transaction boundaries.",
    "Work across indexing, settlement accounting, withdrawals, deployment tooling, and QA.",
  ],
  teamAttribution:
    "Quorum is an active collaborative hackathon build. Wildan leads the product, full-stack application, and smart-contract work; ArgaAAL contributed substantively to infrastructure and evidence phases.",
  decisions: [
    {
      title: "Split product data from on-chain invariants",
      rationale: "Mutable event content and settlement enforcement have different trust and iteration needs.",
      tradeoff: "Postgres and contract state require explicit reconciliation and indexing.",
    },
    {
      title: "Separate withdrawal from cash-out",
      rationale: "An on-chain withdrawal and an off-ramp transfer are two distinct money movements.",
      tradeoff: "The interface must preserve separate proof identifiers and status language.",
    },
  ],
  evidence: [
    {
      id: "quo-flow-01",
      claim: "Six recorded signed flows were confirmed successful on Stellar testnet.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-11",
      source: {
        label: "Live testnet evidence",
        href: "https://github.com/wildanniam/Quorum/blob/main/docs/LIVE_TESTNET_EVIDENCE.json",
      },
    },
    {
      id: "quo-comp-01",
      claim: "Quorum's hackathon competition is ongoing.",
      scope: "team",
      state: "owner-confirmed",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/wildanniam/Quorum" },
    },
  ],
  limitations: [
    "The current competition is ongoing; no winner or finalist claim is made.",
    "Quorum is a Stellar testnet build with no independent smart-contract audit.",
    "No mainnet use, production events, customer revenue, or audited custody is claimed.",
    "MoneyGram-compatible sandbox work is not a partnership or completed cash pickup.",
  ],
  links: [
    { label: "Open testnet build", href: "https://quorum-sandy-eight.vercel.app", kind: "live" },
    { label: "View repository", href: "https://github.com/wildanniam/Quorum", kind: "repository" },
    {
      label: "Inspect testnet evidence",
      href: "https://github.com/wildanniam/Quorum/blob/main/docs/LIVE_TESTNET_EVIDENCE.json",
      kind: "evidence",
    },
  ],
  media: [{ state: "placeholder", label: "Quorum settlement and pass flow", aspectRatio: "16/10" }],
  lastVerifiedAt: "2026-07-15",
});
