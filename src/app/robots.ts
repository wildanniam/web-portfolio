import type { MetadataRoute } from "next";

import { getSiteUrl, isIndexableDeployment } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  const indexable = isIndexableDeployment();

  return {
    rules: [
      indexable
        ? { userAgent: "*", allow: "/" }
        : { userAgent: "*", disallow: "/" },
    ],
    sitemap: indexable ? new URL("/sitemap.xml", baseUrl).toString() : undefined,
  };
}
