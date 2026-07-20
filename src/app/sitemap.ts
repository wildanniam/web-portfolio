import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticRoutes = ["", "/about", "/work"];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route || "/", baseUrl).toString(),
      lastModified: new Date("2026-07-15"),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, baseUrl).toString(),
      lastModified: new Date(project.lastVerifiedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
