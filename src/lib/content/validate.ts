import type { ProjectRecord } from "@/content/schema";

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
    /(?:won|awarded).*(?:lisk|competition|challenge)/i,
  ],
  specheal: [
    /(?:won|placed second|runner-up).*(?:hackathon|competition)/i,
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
    project.problem,
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

    if (project.mechanism.length === 0 || project.contributions.length === 0) {
      errors.push(`${prefix}: mechanism and contributions are required.`);
    }

    if (project.limitations.length === 0) {
      errors.push(`${prefix}: at least one explicit limitation is required.`);
    }

    if (project.links.length === 0) {
      errors.push(`${prefix}: at least one public link is required.`);
    }

    for (const link of project.links) {
      if (!link.label.trim() || !isSafePublicUrl(link.href)) {
        errors.push(`${prefix}: invalid public link "${link.label}" (${link.href}).`);
      }
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

  return { errors, warnings };
}
