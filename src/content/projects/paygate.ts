import { defineProject } from "../schema";

export const paygate = defineProject({
  canonicalId: "project-paygate",
  slug: "paygate",
  title: "PayGate",
  oneLiner: "Turning ordinary APIs into machine-paid endpoints on Stellar testnet.",
  cardCopy:
    "I founded and built PayGate, a publicly deployed testnet beta that lets developers monetize API calls through HTTP 402 challenges, Stellar payments, and inspectable receipts. The project was awarded a $5,000 Stellar Community Fund Instaward.",
  caseStudyLead:
    "PayGate asks what API billing should look like when the customer is software. I designed and built a flow where a machine client receives an HTTP 402 challenge, pays for one request on Stellar testnet, retries with proof, and receives the protected upstream response.",
  role: "Founder · Builder",
  year: "2026",
  status: "testnet-beta",
  liveStatus: "online",
  statusLabel: "Stellar Testnet Beta",
  domains: ["Agentic Payments", "API Infrastructure", "Programmable Money"],
  technologies: ["React", "TypeScript", "Node.js", "Postgres", "Stellar MPP", "Soroban", "Rust"],
  featuredOrder: 2,
  showInSelectedSystems: true,
  problem:
    "Traditional API billing assumes a human account, subscription, and card. Machine clients need a narrower loop for discovering a price, paying for one request, and retrying with inspectable proof.",
  audience: [
    "Developers monetizing GET and JSON APIs",
    "Backend teams avoiding bespoke payment infrastructure",
    "AI agents and machine clients answering HTTP 402 challenges",
  ],
  mechanism: [
    "Register and verify a protected upstream API.",
    "Return an HTTP 402 challenge for an unpaid call.",
    "Verify testnet USDC payment identity, amount, recipient, and replay state.",
    "Record an idempotent Soroban escrow credit before forwarding the request.",
    "Expose calls, payment evidence, splits, and withdrawal state.",
  ],
  contributions: [
    "Founded the product and defined the provider and machine-client experience.",
    "Built the application, API routes, persistence model, proxy, and dashboard flows.",
    "Integrated Stellar MPP verification, Soroban escrow accounting, and Freighter boundaries.",
    "Designed upstream protection, replay controls, evidence packages, deployment, and documentation.",
  ],
  teamAttribution:
    "PayGate is founder-led. Wildan owns the product and principal implementation; ArgaAAL contributed focused hardening work for the V1 testnet beta.",
  decisions: [
    {
      title: "Activation must prove upstream protection",
      rationale: "A paid proxy is cosmetic if buyers can bypass it.",
      tradeoff: "Onboarding performs explicit invalid-secret and valid-secret checks before activation.",
    },
    {
      title: "Bind one payment identity across the system",
      rationale: "The challenge, replay store, transaction, and escrow credit need one traceable identity.",
      tradeoff: "Reconciliation becomes a first-class product and engineering concern.",
    },
  ],
  evidence: [
    {
      id: "pay-grant-01",
      claim: "PayGate was awarded a $5,000 SCF Instaward.",
      scope: "product",
      state: "owner-confirmed",
      asOf: "2026",
      source: {
        label: "Stellar Indonesia announcement",
        href: "https://x.com/Indo_Stellar/status/2075550378553421994",
      },
    },
    {
      id: "pay-live-01",
      claim: "PayGate is publicly deployed as a Stellar testnet beta.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Live testnet beta", href: "https://trypaygate.com" },
    },
    {
      id: "pay-role-01",
      claim: "Wildan is PayGate's Founder and Builder.",
      scope: "personal",
      state: "owner-confirmed",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/wildanniam/paygate-stellar" },
    },
    {
      id: "pay-flow-01",
      claim: "PayGate verifies a testnet payment before forwarding to a protected upstream and recording an escrow credit.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/wildanniam/paygate-stellar" },
    },
  ],
  limitations: [
    "PayGate is testnet scoped; no mainnet operation is claimed.",
    "Shipped means a publicly deployed working beta, not production-scale usage or independent certification.",
    "The award is not described as disbursed funding, investment, revenue, or partnership.",
    "Production replay handling, automatic refund policy, and incident response remain incomplete.",
  ],
  links: [
    { label: "Open testnet beta", href: "https://trypaygate.com", kind: "live" },
    { label: "View repository", href: "https://github.com/wildanniam/paygate-stellar", kind: "repository" },
    { label: "Read developer docs", href: "https://github.com/wildanniam/paygate-stellar/tree/main/docs", kind: "documentation" },
  ],
  media: [{ state: "placeholder", label: "PayGate HTTP 402 receipt flow", aspectRatio: "16/10" }],
  lastVerifiedAt: "2026-07-15",
});
