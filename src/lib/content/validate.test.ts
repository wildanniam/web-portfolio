import { describe, expect, it } from "vitest";

import { projects } from "../../content/projects";
import type { ProjectRecord } from "../../content/schema";
import { siteContent } from "../../content/site";

import { validatePortfolioContent } from "./validate";

describe("validatePortfolioContent", () => {
  it("accepts the curated public portfolio records", () => {
    const result = validatePortfolioContent(projects, siteContent);

    expect(result.errors).toEqual([]);
    expect(result.warnings).toHaveLength(5);
  });

  it("rejects duplicate slugs", () => {
    const duplicate = { ...projects[1], slug: projects[0].slug } as ProjectRecord;
    const result = validatePortfolioContent(
      [projects[0], duplicate, ...projects.slice(2)],
      siteContent,
    );

    expect(result.errors.some((error) => error.includes("duplicate slug"))).toBe(true);
  });

  it("rejects unsafe public links", () => {
    const unsafe = {
      ...projects[0],
      links: [
        ...projects[0].links,
        { label: "Unsafe", href: "javascript:alert(1)", kind: "live" as const },
      ],
    } as ProjectRecord;
    const result = validatePortfolioContent(
      [unsafe, ...projects.slice(1)],
      siteContent,
    );

    expect(result.errors.some((error) => error.includes("invalid public link"))).toBe(true);
  });

  it("rejects project-specific blocked claims", () => {
    const invalid = {
      ...projects[4],
      cardCopy: "Quorum is the winner of its current competition.",
    } as ProjectRecord;
    const result = validatePortfolioContent(
      [...projects.slice(0, 4), invalid],
      siteContent,
    );

    expect(result.errors.some((error) => error.includes("blocked claim"))).toBe(true);
  });
});
