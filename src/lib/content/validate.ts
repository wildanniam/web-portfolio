import {
  liveStatuses,
  projectStatuses,
  type ProjectRecord,
} from "../../content/schema";

export type ValidationResult = {
  errors: string[];
  warnings: string[];
};

const blockedClaimPatterns: Record<string, RegExp[]> = {
  fradium: [
    /guaranteed fraud prevention/i,
    /every(?:thing)? (?:runs|is) fully on-chain/i,
    /independently audited/i,
  ],
  paygate: [
    /mainnet (?:deployment|operation|product)/i,
    /stellar partnership/i,
    /venture investment/i,
    /grant (?:was )?disbursed/i,
  ],
  "nova-ai-wallet": [
    /production wallet/i,
    /custodial wallet/i,
    /guaranteed execution price/i,
    /(?:overall|grand) winner.*(?:lisk|competition|challenge)/i,
  ],
  specheal: [
    /(?:winner|first place|champion).*(?:refactory|hackathon|competition)/i,
    /healing accuracy (?:of|is)/i,
    /time savings? (?:of|is)/i,
    /production adoption/i,
  ],
  quorum: [
    /(?:winner|finalist) of/i,
    /mainnet (?:deployment|operation|product)/i,
    /independently audited/i,
    /moneygram partnership/i,
  ],
};

const approvedEvidenceIds: Record<string, readonly string[]> = {
  fradium: ["fra-role-01", "fra-award-01", "fra-live-01", "fra-flow-01"],
  paygate: ["pay-role-01", "pay-grant-01", "pay-live-01", "pay-flow-01"],
  "nova-ai-wallet": ["nov-role-01", "nov-flow-01", "nov-life-01", "nov-award-01"],
  specheal: ["spc-role-01", "spc-flow-01", "spc-live-01", "spc-award-01"],
  quorum: ["quo-role-01", "quo-live-01", "quo-flow-01", "quo-comp-01"],
};

const approvedLifecycle: Record<
  string,
  Pick<ProjectRecord, "status" | "liveStatus">
> = {
  fradium: { status: "public-beta", liveStatus: "online" },
  paygate: { status: "testnet-beta", liveStatus: "online" },
  "nova-ai-wallet": { status: "prototype", liveStatus: "degraded" },
  specheal: { status: "prototype", liveStatus: "offline" },
  quorum: { status: "active-build", liveStatus: "online" },
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isSafePublicUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function publishableProjectText(project: ProjectRecord): string {
  return [
    project.oneLiner,
    project.cardCopy,
    project.caseStudyLead,
    project.statusLabel,
    project.problem,
    project.teamAttribution,
    ...project.mechanism,
    ...project.contributions,
    ...project.decisions.flatMap((decision) => [
      decision.title,
      decision.rationale,
      decision.tradeoff,
    ]),
    ...project.evidence.map((evidence) => evidence.claim),
  ].join("\n");
}

export function validatePortfolioContent(
  records: readonly ProjectRecord[],
  siteContent: unknown,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const slugs = new Set<string>();
  const canonicalIds = new Set<string>();
  const evidenceIds = new Set<string>();

  if (records.length < 5) {
    errors.push(`Expected at least 5 flagship projects, received ${records.length}.`);
  }

  for (const project of records) {
    const prefix = `Project ${project.title}`;

    const requiredText = {
      title: project.title,
      oneLiner: project.oneLiner,
      cardCopy: project.cardCopy,
      caseStudyLead: project.caseStudyLead,
      role: project.role,
      year: project.year,
      statusLabel: project.statusLabel,
      problem: project.problem,
      teamAttribution: project.teamAttribution,
      lastVerifiedAt: project.lastVerifiedAt,
    };

    for (const [field, value] of Object.entries(requiredText)) {
      if (!value.trim()) errors.push(`${prefix}: required field ${field} is empty.`);
    }

    if (!slugPattern.test(project.slug)) {
      errors.push(`${prefix}: invalid slug "${project.slug}".`);
    }

    if (slugs.has(project.slug)) {
      errors.push(`${prefix}: duplicate slug "${project.slug}".`);
    }
    slugs.add(project.slug);

    if (canonicalIds.has(project.canonicalId)) {
      errors.push(`${prefix}: duplicate canonical ID "${project.canonicalId}".`);
    }
    canonicalIds.add(project.canonicalId);

    if (!projectStatuses.includes(project.status)) {
      errors.push(`${prefix}: unknown project status "${project.status}".`);
    }

    if (!liveStatuses.includes(project.liveStatus)) {
      errors.push(`${prefix}: unknown live status "${project.liveStatus}".`);
    }

    if (
      project.audience.length === 0 ||
      project.mechanism.length === 0 ||
      project.contributions.length === 0 ||
      project.decisions.length === 0 ||
      project.evidence.length === 0 ||
      project.media.length === 0
    ) {
      errors.push(`${prefix}: audience, mechanism, contributions, decisions, evidence, and media are required.`);
    }

    if (project.limitations.length === 0) {
      errors.push(`${prefix}: at least one explicit limitation is required.`);
    }

    const expectedLifecycle = approvedLifecycle[project.slug];
    if (
      !expectedLifecycle ||
      project.status !== expectedLifecycle.status ||
      project.liveStatus !== expectedLifecycle.liveStatus
    ) {
      errors.push(
        `${prefix}: lifecycle ${project.status}/${project.liveStatus} is not the approved public state.`,
      );
    }

    if (project.links.length === 0) {
      errors.push(`${prefix}: at least one public link is required.`);
    }

    const linkTargets = new Set<string>();
    for (const link of project.links) {
      if (!link.label.trim() || !isSafePublicUrl(link.href)) {
        errors.push(`${prefix}: invalid public link "${link.label}" (${link.href}).`);
      }
      if (linkTargets.has(link.href)) {
        errors.push(`${prefix}: duplicate public link ${link.href}.`);
      }
      linkTargets.add(link.href);
    }

    for (const evidence of project.evidence) {
      if (evidenceIds.has(evidence.id)) {
        errors.push(`${prefix}: duplicate evidence ID "${evidence.id}".`);
      }
      evidenceIds.add(evidence.id);

      if (!evidence.claim.trim() || !evidence.source.label.trim()) {
        errors.push(`${prefix}: evidence ${evidence.id} is missing claim/source text.`);
      }

      if (!isSafePublicUrl(evidence.source.href)) {
        errors.push(`${prefix}: evidence ${evidence.id} has an unsafe source URL.`);
      }

      if (!approvedEvidenceIds[project.slug]?.includes(evidence.id)) {
        errors.push(`${prefix}: evidence ${evidence.id} is not on the curated public allowlist.`);
      }
    }

    const missingEvidence = (approvedEvidenceIds[project.slug] ?? []).filter(
      (id) => !project.evidence.some((evidence) => evidence.id === id),
    );
    if (missingEvidence.length > 0) {
      errors.push(`${prefix}: missing approved public evidence ${missingEvidence.join(", ")}.`);
    }

    const publishableText = publishableProjectText(project);
    for (const pattern of blockedClaimPatterns[project.slug] ?? []) {
      if (pattern.test(publishableText)) {
        errors.push(`${prefix}: publishable copy matches blocked claim ${pattern}.`);
      }
    }

    if (project.media.every((media) => media.state === "placeholder")) {
      warnings.push(`${prefix}: all media slots are still placeholders.`);
    }
  }

  const serializedPublicData = JSON.stringify({ records, siteContent });
  const forbiddenPathPatterns = [
    /\/Users\//,
    /Atlas Vault/i,
    /00 - Inbox/i,
    /20 - Projects/i,
    /30 - Resources/i,
  ];

  for (const pattern of forbiddenPathPatterns) {
    if (pattern.test(serializedPublicData)) {
      errors.push(`Public runtime data contains forbidden private/local reference ${pattern}.`);
    }
  }

  const blockedPublicVoicePatterns = [/\binspect(?:able|ed|ing|ion|ions|s)?\b/i];

  for (const pattern of blockedPublicVoicePatterns) {
    if (pattern.test(serializedPublicData)) {
      errors.push(`Public runtime data contains blocked visitor-facing language ${pattern}.`);
    }
  }

  return { errors, warnings };
}
