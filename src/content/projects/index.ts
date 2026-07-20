import { fradium } from "./fradium";
import { nara } from "./nara";
import { novaAiWallet } from "./nova-ai-wallet";
import { paygate } from "./paygate";
import { quorum } from "./quorum";
import { specheal } from "./specheal";

export const projects = [fradium, paygate, novaAiWallet, nara, quorum, specheal] as const;

export const selectedProjects = projects
  .filter((project) => project.showInSelectedSystems)
  .toSorted((a, b) => a.featuredOrder - b.featuredOrder);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export { fradium, nara, novaAiWallet, paygate, quorum, specheal };
