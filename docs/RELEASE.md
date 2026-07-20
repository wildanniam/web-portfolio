# Release and Preview Runbook

## Deployment model

Portfolio v1 deploys as a normal Next.js application on Vercel. Pull requests
receive review previews; production remains approval-gated.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin when a custom
domain is known. Without that override, builds resolve the current Vercel URL
and then the Vercel project production URL. Local development falls back to
`http://localhost:3000`.

Preview deployments are `noindex, nofollow` through both metadata and
`robots.txt`. Only `VERCEL_ENV=production` is indexable on Vercel.

## Enforced budgets

| Asset | Limit |
|---|---:|
| Initial homepage JavaScript | 180 KiB gzip |
| Hero poster | 200 KiB |
| Hero WebM | 2 MiB |
| Hero MP4 fallback | 3 MiB |
| Credential portrait | 500 KiB |

`npm run validate:media` checks media budgets. `npm run validate:bundle` runs
after a production build and measures the unique JavaScript chunks referenced by
the homepage client manifest. `npm run check` enforces both.

The approved WebM and MP4 hashes also pin derivatives that were manually probed
as 1280x720, 24 fps, 9.375 seconds, and zero audio streams. Replacing either video
requires repeating that probe and deliberately updating the accepted hash.

## Required review gate

```bash
nvm use
npm ci
npm run check
npx playwright install chromium webkit
npm run test:e2e
```

Before requesting approval, review the Vercel Preview at desktop, tablet,
mobile, and reduced motion. Confirm canonical metadata, preview `noindex`,
security headers, media fallback behavior, and all public links.

Lighthouse lab runs are supporting diagnostics, not field p75 data. Record at
least three Preview runs and report their median alongside the trace-observed LCP.
The p75 LCP/INP contract becomes measurable only after sufficient real-user field
traffic exists; do not present a lab score as p75.

The Playwright gate builds and starts the production server before exercising
Chromium and WebKit. This deliberately excludes development HMR from release
signals and mirrors the deployed runtime more closely.

## Approval boundaries

- Preview deployment is allowed for review.
- Do not merge portfolio PRs without Wildan's approval in the active thread.
- Do not promote a deployment to production without separate explicit approval.
- The visible Gemini watermark and every project asset remain release gates.
