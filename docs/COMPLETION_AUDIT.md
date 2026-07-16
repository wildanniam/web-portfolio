# Portfolio v1 Completion Audit

Status: **approval candidate in progress**  
Audit date: 16 July 2026  
Scope: locked Ember Lab Development Blueprint

This record maps the goal to inspectable implementation evidence. It is not a
release approval and must not be used to bypass the remaining human gates.

## Product and route coverage

| Requirement | Evidence | State |
|---|---|---|
| Homepage narrative | Hero, Proof Ledger, Research Credential, Selected Systems, Research Through Building, Principles, Quorum, Contact | Implemented |
| Supporting routes | `/about`, `/work`, custom not-found | Implemented |
| Five public case studies | Fradium, PayGate, Nova AI Wallet, SpecHeal, Quorum | Implemented |
| Deployment metadata | icon, Open Graph image, robots, sitemap, canonical metadata, JSON-LD | Implemented |
| Credential destination | static `/about-qr` SVG encoding the deployment-aware `/about` URL | Implemented |

## Content and claim audit

The repository snapshot was compared with Atlas Vault's Public Claim Register,
Blocked Claim Register, Profile & Positioning, Contact & Links, Portfolio Content
Contract, and all five public-ready project records on 16 July 2026.

- Public evidence IDs and lifecycle states are explicitly allowlisted by the
  build validator.
- All approved public live, repository, demo, and evidence links returned HTTP
  200 during the audit.
- Award, team, testnet, prototype, degraded, offline, and active-build wording is
  scoped in the typed project records.
- Atlas remains an authoring source only; it is not read by the application or CI.
- Public output contains no raw Vault path or private source record.

## Interaction and accessibility coverage

- Hero: server-rendered still, eligibility-aware desktop video enhancement,
  pause/play, offscreen pause, hidden-document pause, Save-Data and reduced-motion
  fallbacks.
- Research Credential: server-rendered front state, deferred Motion enhancement,
  pointer/touch/keyboard flip, reduced-motion behavior, and direct `/about` link.
- Signature motion: hero-to-credential handoff and Selected Systems stage only;
  both defer GSAP and preserve semantic no-JavaScript/mobile flow.
- Playwright covers Chromium and WebKit, 200% reflow, mobile navigation, reduced
  motion, Save-Data, video lifecycle, credential states, routes, headers, and
  serious/critical axe findings.

## Media evidence

| Asset | Audited property |
|---|---|
| Hero WebM | VP9, 1280x720, 24 fps, 10 seconds, zero audio, 293,852 bytes |
| Hero MP4 | H.264, 1280x720, 24 fps, 10 seconds, zero audio, 2,459,891 bytes |
| Credential portrait | approved deterministic crop; source metadata not committed |

The accepted video derivatives are pinned by SHA-256 in the media validator.
Any replacement intentionally fails validation until it is reprobed and approved.

## Verification snapshot

Latest local production checks on 16 July 2026:

- `npm run check`: passed;
- unit tests: 10 passed;
- Playwright: 26 passed across Chromium and WebKit;
- static build: 15 generated routes/endpoints;
- initial homepage JavaScript: 24.5 KiB gzip against a 180 KiB budget;
- Lighthouse local production: accessibility 100, best practices 100, CLS 0,
  TBT below 60 ms; trace-observed LCP below 0.3 seconds;
- Lighthouse's throttled Lantern estimate varied around 2.6 seconds locally and
  must be measured again on the final Preview. Field p75 LCP and INP do not exist
  before representative real-user traffic is available.

## Remaining release gates

1. Replace or explicitly approve the visible Gemini watermark with its existing
   AI-generated-media disclosure. It must not be concealed.
2. Supply and approve authentic visuals for all five project media slots, or
   explicitly approve the honest `ASSET IN REVIEW` placeholders for this release.
3. Review the final Vercel Preview at desktop and mobile, then provide explicit
   approval before merge or production deployment.

Until all three gates are resolved, Portfolio v1 remains an approval candidate,
not a completed release.
