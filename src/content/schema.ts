export const projectStatuses = [
  "public-beta",
  "testnet-beta",
  "prototype",
  "active-build",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export const liveStatuses = ["online", "degraded", "offline"] as const;

export type LiveStatus = (typeof liveStatuses)[number];

export type PublicLink = {
  label: string;
  href: string;
  kind: "live" | "repository" | "documentation" | "evidence";
};

export type EvidenceRecord = {
  id: string;
  claim: string;
  scope: "personal" | "team" | "product";
  state: "verified" | "owner-confirmed" | "partial";
  asOf: string;
  source: {
    label: string;
    href: string;
  };
};

export type MediaSlot =
  | {
      state: "placeholder";
      label: string;
      aspectRatio: `${number}/${number}`;
    }
  | {
      state: "candidate";
      src: `/${string}`;
      alt: string;
      reviewNote: string;
    }
  | {
      state: "published";
      src: `/${string}`;
      alt: string;
      width: number;
      height: number;
      sourceNote: string;
    };

export type ProjectDecision = {
  title: string;
  rationale: string;
  tradeoff: string;
};

export type ProjectRecord = {
  canonicalId: `project-${string}`;
  slug: string;
  title: string;
  oneLiner: string;
  cardCopy: string;
  caseStudyLead: string;
  role: string;
  year: string;
  status: ProjectStatus;
  liveStatus: LiveStatus;
  statusLabel: string;
  domains: readonly string[];
  technologies: readonly string[];
  featuredOrder: number;
  showInSelectedSystems: boolean;
  problem: string;
  audience: readonly string[];
  mechanism: readonly string[];
  contributions: readonly string[];
  teamAttribution: string;
  decisions: readonly ProjectDecision[];
  evidence: readonly EvidenceRecord[];
  limitations: readonly string[];
  links: readonly PublicLink[];
  media: readonly MediaSlot[];
  lastVerifiedAt: string;
};

export function defineProject<const T extends ProjectRecord>(project: T): T {
  return project;
}
