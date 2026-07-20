import { afterEach, describe, expect, it, vi } from "vitest";

import { getSiteUrl, isIndexableDeployment, serializeJsonLd } from "./site-url";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("deployment-aware SEO helpers", () => {
  it("prefers the configured canonical site URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://wildan.example");
    vi.stubEnv("VERCEL_URL", "portfolio-git-preview.vercel.app");

    expect(getSiteUrl().origin).toBe("https://wildan.example");
  });

  it("normalizes a Vercel deployment hostname", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_URL", "portfolio-git-preview.vercel.app");

    expect(getSiteUrl().origin).toBe("https://portfolio-git-preview.vercel.app");
  });

  it("keeps preview deployments out of search indexes", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(isIndexableDeployment()).toBe(false);

    vi.stubEnv("VERCEL_ENV", "production");
    expect(isIndexableDeployment()).toBe(true);
  });

  it("escapes opening tags in structured data", () => {
    expect(serializeJsonLd({ value: "</script>" })).toContain("\\u003c/script>");
  });
});
