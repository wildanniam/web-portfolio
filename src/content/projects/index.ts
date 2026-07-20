import { fradium } from "./fradium";
import { novaAiWallet } from "./nova-ai-wallet";
import { paygate } from "./paygate";
import { quorum } from "./quorum";
import { specheal } from "./specheal";

export const projects = [fradium, paygate, novaAiWallet, specheal, quorum] as const;

export const selectedProjects = projects
  .filter((project) => project.showInSelectedSystems)
  .toSorted((a, b) => a.featuredOrder - b.featuredOrder);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export { fradium, novaAiWallet, paygate, quorum, specheal };
