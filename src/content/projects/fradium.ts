import { defineProject } from "../schema";

export const fradium = defineProject({
  canonicalId: "project-fradium",
  slug: "fradium",
  title: "Fradium",
  oneLiner: "Making on-chain risk legible before money moves.",
  cardCopy:
    "I led Fradium, a public Web3 trust layer that combines AI and community evidence to surface address risk before users move funds. My role spanned product direction and full-stack delivery; the team won the WCHL 2025 Fully On-Chain Track.",
  caseStudyLead:
    "Fradium began with a simple question: what evidence should a user see before sending funds to an unfamiliar address? I led the team and worked across the full stack to turn that question into a public product spanning address analysis, canister-hosted AI, community signals, wallet touchpoints, and an explicit user decision.",
  role: "Team Lead · Full-Stack Developer",
  year: "2025-2026",
  status: "public-beta",
  liveStatus: "online",
  statusLabel: "Public Beta",
  domains: ["Web3 Trust", "On-chain Intelligence", "Applied AI"],
  technologies: ["Internet Computer", "Motoko", "Rust", "React", "TypeScript", "ONNX"],
  featuredOrder: 1,
  showInSelectedSystems: true,
  problem:
    "Crypto users often reach transaction confirmation with fragmented context about a destination address. The most consequential decision can happen before the available evidence has become legible.",
  audience: [
    "Crypto users evaluating an unfamiliar destination address",
    "Community reporters and validators contributing address evidence",
    "Wallet and dApp developers exploring analysis integrations",
  ],
  mechanism: [
    "Detect the chain and prepare chain-specific evidence.",
    "Run the embedded ONNX model through an Internet Computer canister.",
    "Keep model output and community evidence conceptually distinct.",
    "Render the verdict before the user cancels or explicitly confirms the action.",
  ],
  contributions: [
    "Led product direction, team coordination, and multidisciplinary delivery.",
    "Worked across the web application, wallet and extension touchpoints, and canister-backed flows.",
    "Connected risk analysis to the transaction decision instead of leaving it in a separate dashboard.",
    "Shaped the public-beta demonstration and technical narrative.",
  ],
  teamAttribution:
    "Fradium was built by a multidisciplinary team. The WCHL result belongs to the Fradium team; this case study foregrounds the product direction and full-stack responsibilities Wildan personally led.",
  decisions: [
    {
      title: "Put the risk signal inside the decision",
      rationale: "Evidence becomes actionable when it appears at the transaction boundary.",
      tradeoff: "The wallet flow needs more explanation without taking final control away from the user.",
    },
    {
      title: "Keep model and community signals distinct",
      rationale: "A single opaque score would hide disagreement between evidence sources.",
      tradeoff: "Separate signals require clearer moderation and interface language.",
    },
  ],
  evidence: [
    {
      id: "fra-role-01",
      claim: "Wildan served as Team Lead and Full-Stack Developer.",
      scope: "personal",
      state: "owner-confirmed",
      asOf: "2026-07-15",
      source: { label: "Owner-approved portfolio record", href: "https://github.com/fradiumofficial/fradium" },
    },
    {
      id: "fra-award-01",
      claim: "The Fradium team won the WCHL 2025 Global Finale Fully On-Chain Track.",
      scope: "team",
      state: "verified",
      asOf: "2025",
      source: {
        label: "Telkom University",
        href: "https://bse.telkomuniversity.ac.id/tim-fradium-berhasil-meraih-global-finale-winner-fully-on-chain-track-pada-world-computer-hacker-league-2025/",
      },
    },
    {
      id: "fra-live-01",
      claim: "Fradium is publicly accessible at fradium.io.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Live public beta", href: "https://fradium.io" },
    },
    {
      id: "fra-flow-01",
      claim: "The reviewed implementation combines chain preparation, canister inference, and community cross-checking.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/fradiumofficial/fradium" },
    },
  ],
  limitations: [
    "Not every multi-chain analysis step runs fully on-chain.",
    "Reviewed Bitcoin, Ethereum, and Solana transaction paths are testnet or devnet scoped.",
    "Repository model metrics are not an independent security guarantee.",
    "No production-scale adoption, independent security audit, or guaranteed fraud prevention is claimed.",
  ],
  links: [
    { label: "Visit public beta", href: "https://fradium.io", kind: "live" },
    { label: "View repository", href: "https://github.com/fradiumofficial/fradium", kind: "repository" },
    { label: "Read documentation", href: "https://fradium.gitbook.io/docs", kind: "documentation" },
  ],
  media: [
    {
      state: "published",
      src: "/media/projects/fradium-cover.webp",
      alt: "Fradium product cover showing its Web3 transaction trust layer, wallet analysis surfaces, and public website.",
      width: 2560,
      height: 1440,
      sourceNote: "Owner-supplied product showcase cover, reviewed 2026-07-20.",
    },
  ],
  lastVerifiedAt: "2026-07-15",
});
