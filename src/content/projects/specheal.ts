import { defineProject } from "../schema";

export const specheal = defineProject({
  canonicalId: "project-specheal",
  slug: "specheal",
  title: "SpecHeal",
  oneLiner: "A recovery cockpit that separates safe test healing from real product bugs.",
  cardCopy:
    "I led SpecHeal from product concept through full-stack implementation, building a guarded recovery loop that distinguishes selector drift from real product failures before applying a repair.",
  caseStudyLead:
    "A test turning green does not always mean the product is correct. I led SpecHeal around that constraint, combining Playwright failure context, specification guardrails, structured AI verdicts, deterministic browser checks, controlled patches, and verified reruns.",
  role: "Team Lead · Full-Stack & Product Developer",
  year: "2026",
  status: "prototype",
  liveStatus: "offline",
  statusLabel: "Hackathon Prototype · Offline",
  domains: ["AI-assisted Development", "Software Reliability", "Test Automation"],
  technologies: ["Next.js", "TypeScript", "Playwright", "OpenAI", "OpenSpec", "PostgreSQL", "Docker"],
  featuredOrder: 4,
  showInSelectedSystems: false,
  problem:
    "Many self-healing tools optimize for turning a red test green, which can create a false green when the product is actually broken or intended behavior has changed.",
  audience: [
    "QA engineers reviewing UI test failures",
    "Product teams that need clear recovery decisions",
    "Engineers exploring guarded AI-assisted developer tooling",
  ],
  mechanism: [
    "Capture Playwright failure context and apply an OpenSpec guardrail.",
    "Produce a structured AI verdict instead of an unchecked locator replacement.",
    "Validate candidate changes in the browser before applying a controlled patch.",
    "Require a verification rerun and persist an audit/Jira-ready handoff.",
  ],
  contributions: [
    "Led the team and shaped the trustworthy-recovery product thesis.",
    "Built the full-stack recovery cockpit and product workflow.",
    "Integrated failure capture, structured verdicts, browser validation, patches, and reruns.",
    "Connected technical outcomes to a persistent audit trail and handoff.",
  ],
  teamAttribution:
    "SpecHeal was a collaborative hackathon MVP. The team placed second at Refactory Hackathon 2026; the result is attributed to the team, while Wildan's role remains scoped to leadership, product definition, and full-stack delivery.",
  decisions: [
    {
      title: "Optimize against false greens",
      rationale: "Not every selector failure is safe to heal.",
      tradeoff: "Guarded recovery is slower than blind replacement but protects test meaning.",
    },
    {
      title: "Require a verification rerun",
      rationale: "A replacement locator does not prove the intended user state works.",
      tradeoff: "Each accepted repair needs additional browser execution and result storage.",
    },
  ],
  evidence: [
    {
      id: "spc-role-01",
      claim: "Wildan served as Team Lead, Full-Stack Developer, and Product Developer.",
      scope: "personal",
      state: "owner-confirmed",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/antech2-async/SpecHeal" },
    },
    {
      id: "spc-flow-01",
      claim: "The repository implements an evidence-to-verdict-to-rerun loop for seeded Playwright scenarios.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/antech2-async/SpecHeal" },
    },
    {
      id: "spc-live-01",
      claim: "The historical hackathon demo is currently unavailable.",
      scope: "product",
      state: "verified",
      asOf: "2026-07-15",
      source: { label: "Canonical repository", href: "https://github.com/antech2-async/SpecHeal" },
    },
    {
      id: "spc-award-01",
      claim: "The SpecHeal team placed second at Refactory Hackathon 2026.",
      scope: "team",
      state: "owner-confirmed",
      asOf: "2026-07-16",
      source: {
        label: "Wildan's previous public portfolio",
        href: "https://portofolio-wildan-zeta.vercel.app/",
      },
    },
  ],
  limitations: [
    "The MVP uses a seeded ShopFlow application and three controlled scenarios.",
    "Its effectiveness is not generalized to arbitrary production applications.",
    "No healing accuracy, time-savings, or production-adoption metric is claimed.",
    "The historical demo is not linked as live while its status remains offline.",
  ],
  links: [
    { label: "View repository", href: "https://github.com/antech2-async/SpecHeal", kind: "repository" },
    {
      label: "View public result record",
      href: "https://portofolio-wildan-zeta.vercel.app/",
      kind: "evidence",
    },
  ],
  media: [{ state: "placeholder", label: "SpecHeal recovery cockpit capture required", aspectRatio: "16/10" }],
  lastVerifiedAt: "2026-07-16",
});
