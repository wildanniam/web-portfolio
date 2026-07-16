# Ember Lab Development Blueprint

Status: **locked for Portfolio v1**
Owner: Wildan Syukri Niam
Baseline: 16 July 2026

## Product outcome

Build an evidence-led editorial-cinematic portfolio that positions Wildan as:

> A researcher and builder working across AI agents, Web3 trust, and on-chain
> intelligence.

Primary hero statement:

> I research and build autonomous systems people can verify.

The experience follows one narrative spine:

**Signal → System → Human checkpoint → Evidence → Trust**

The site should feel memorable and tactile without sacrificing speed,
accessibility, truthful attribution, or legibility.

## Locked route map

```text
/
/about
/work
/work/fradium
/work/paygate
/work/nova-ai-wallet
/work/specheal
/work/quorum
```

App Router conventions also provide `not-found`, sitemap, robots, metadata, and
Open Graph assets.

## Locked homepage order

1. Site Header
2. Hero — The Living Checkpoint
3. Proof Ledger
4. Research Credential
5. Selected Systems — Fradium, PayGate, Nova AI Wallet
6. SpecHeal archive bridge
7. Research Through Building
8. Principles
9. Currently Building — Quorum
10. Contact
11. Footer

Quorum receives an active-build section. SpecHeal appears honestly as an offline
research prototype. All five systems remain available in `/work`.

## Locked technical direction

- Next.js App Router, TypeScript strict, Tailwind CSS.
- Static-prerendered routes and Server Components by default.
- Repo-contained public-safe typed content; no CMS or database in v1.
- Motion for object interaction; GSAP/ScrollTrigger for at most two signature
  scroll scenes.
- Playwright and automated content/media validation.
- Normal Next.js deployment on Vercel, not static export.

## Signature experiences

### The Living Checkpoint

A full-bleed identity-led cinematic hero places Wildan in a warm analog-futurist
research environment. Wildan remains on the right while the positioning copy uses
the deliberately quiet left side. Motion is restrained to natural portrait and
ember-signal movement. The matching poster is immediately usable; video playback
is a progressive enhancement with a real pause control.

### Research Credential

One continuous orange woven strap enters from the section boundary and connects
through a compact metal clip to a physical ID badge with Wildan's real portrait,
role, domains, front/back state, and a QR link to `/about`. The strap, clip, and
badge share one restrained pendulum; pointer tilt and deliberate flip remain on
the badge—not the reference site's drop/bounce.

### Selected Systems Stage

Three editorial project panels use a desktop sticky narrative. Mobile and reduced
motion receive the same content in normal document flow.

## Delivery phases

1. Repository, design, architecture, content contract, CI.
2. Typed content and static responsive routes.
3. Hero media and Research Credential.
4. Selected Systems and five evidence-led case studies.
5. Motion polish and interaction QA.
6. Accessibility, performance, SEO, browser QA, and preview deployment.

## Performance contract

- LCP p75 target: at most 2.5 seconds.
- INP p75 target: at most 200 milliseconds.
- CLS p75 target: at most 0.10.
- Initial homepage JavaScript target: at most 180 KiB gzip.
- Hero poster target: at most 150–200 KB.
- Hero WebM target: preferably at most 2 MB.
- Hero MP4 fallback target: at most 3 MB.
- A dependency above 20 KiB gzip requires a documented reason.

## Release gates

- Decide whether the visible Gemini watermark remains with disclosure or the
  video is regenerated through an authorized workflow. Do not conceal it.
- Produce or deliberately mark unavailable an authentic SpecHeal cockpit image.
- Revalidate every public project status and claim against Atlas.
- Complete keyboard, reduced-motion, 200% zoom, axe, and cross-browser checks.
- Obtain Wildan's explicit preview approval before merge or production deploy.

## Change control

Small implementation refinements are expected. The following are material and
require explicit approval plus documentation updates:

- changing the positioning or hero statement;
- removing a required route or flagship project;
- replacing Ember Lab with another visual system;
- adding a CMS, database, authentication, or runtime Atlas integration;
- adding WebGL, a custom smooth-scroll engine, or more signature scenes;
- weakening claim, accessibility, performance, or verification requirements.

The full-bleed hero supersedes the original split composition with Wildan's
explicit approval on 16 July 2026. It does not change the hero statement,
narrative, media lifecycle, or performance contract.

The identity-led Living Checkpoint portrait supersedes the abstract machine
visual with Wildan's explicit approval on 16 July 2026. The approved hero statement,
full-bleed composition, Ember Lab system, and progressive media lifecycle remain.
