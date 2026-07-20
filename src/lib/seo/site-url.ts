const localSiteUrl = "http://localhost:3000";

function toAbsoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_URL;
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const candidate = configuredUrl || vercelUrl || productionUrl || localSiteUrl;

  return new URL(toAbsoluteUrl(candidate));
}

export function isIndexableDeployment() {
  const vercelEnvironment = process.env.VERCEL_ENV;

  return !vercelEnvironment || vercelEnvironment === "production";
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
