# Ember Lab Development Blueprint

Status: **locked for the video-portfolio prototype direction**
Owner: Wildan Syukri Niam
Baseline: 20 July 2026

## Product outcome

Build an editorial-cinematic portfolio that positions Wildan as:

> A full-stack builder working across AI agents, Web3, and product engineering.

Primary hero statement:

> I turn complex ideas into working products.

The experience follows one narrative spine:

**Idea → Product → Build → Test → Improve**

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

1. First-session Ember Entry
2. Fixed Site Header
3. Hero — The Talking Portrait
4. Builder Pass + About
5. Selected Work — Fradium, PayGate, Nova AI Wallet, Quorum
6. SpecHeal archive bridge
7. Selected Highlights
8. How I Build
9. Contact closing act
10. Oversized Footer

Quorum no longer receives a standalone homepage interruption. It joins Selected
Work after Nova AI Wallet and remains available in `/work` and `/work/quorum`.
SpecHeal remains an archived, offline hackathon prototype. All five projects
remain available in `/work`.

## Locked technical direction

- Next.js App Router, TypeScript strict, Tailwind CSS.
- Static-prerendered routes and Server Components by default.
- Repo-contained public-safe typed content; no CMS or database in v1.
- Motion for object interaction; GSAP/ScrollTrigger for at most two signature
  scroll scenes.
- Playwright and automated content/media validation.
- Normal Next.js deployment on Vercel, not static export.

## Signature experiences

### Ember Entry

A short first-session brand entrance waits for the hero poster to become usable,
then reveals the page within a bounded 650–1400 ms window. It contains no fake
percentage, never waits for the complete video download, does not replay during
the same session, and is skipped for reduced motion.

### The Talking Portrait

A full-bleed identity-led cinematic hero places Wildan in a warm graphic studio
environment. Wildan remains on the right while compact positioning copy uses the
protected left side. The hero itself is not pinned, scaled, or scrubbed by GSAP.
The matching poster is immediately usable; video playback is a progressive
enhancement with real play, pause, replay, and audio opt-in controls. Choosing
`Hear intro` restarts the clip from the beginning so the greeting is never joined
mid-sentence. Visible provenance marks remain visible and are disclosed.

### Builder Pass

One continuous orange woven strap enters from the section boundary and connects
through a compact metal clip to a physical ID badge with Wildan's real portrait,
role, focus, location, front/back state, and a QR link to `/about`. This scene now
also carries the concise homepage About narrative and follows the hero directly.
The strap, clip, and badge share one weighted drop-and-settle pendulum; pointer
tilt and deliberate flip remain on the badge. Motion owns the complete object.

### Selected Work Stage

Four editorial project panels use a desktop sticky narrative. Mobile and reduced
motion receive the same content in normal document flow.

This is the only GSAP signature scene in the prototype. How I Build may use a
semantic static route with restrained CSS reveal, but it does not add another
pinned scene.

## Delivery phases

1. Repository, design, architecture, content contract, CI.
2. Typed content and static responsive routes.
3. Hero media and Builder Pass.
4. Selected Work and five factual case studies.
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
- Published project cover target: at most 500 KB per asset, with dimensions
  large enough for a reviewed high-density desktop rendering.
- The talking derivatives may contain the approved greeting audio. Playback
  begins muted and audio is enabled only by explicit user action.
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

The identity-led Living Portrait supersedes the abstract machine visual with
Wildan's explicit approval on 16 July 2026. The full-bleed composition, Ember Lab
system, and progressive media lifecycle remain.

The builder-first positioning, hero statement, Builder Pass language, Selected
Work vocabulary, How I Work section, and warmer public voice supersede the
research-first copy with Wildan's explicit approval on 20 July 2026. Research
remains a secondary way of learning; the route map, Ember Lab visual direction,
motion ownership, media lifecycle, factual claim rules, and performance contract
remain unchanged.

The video-portfolio prototype direction supersedes the pinned hero handoff,
achievement-first ordering, duplicate About/Principles sections, standalone
homepage Quorum section, utility-style header, and compact footer with Wildan's
explicit approval on 20 July 2026. It keeps the route map, factual project
records, Ember Lab palette, progressive media safeguards, and Selected Work
signature scene. The implementation intentionally experiments on
`codex/prototype-video-portfolio-redesign` without requiring an issue or pull
request for this iteration.

Quorum joins the Selected Work stage after Nova AI Wallet with Wildan's explicit
approval on 20 July 2026. It remains one panel in the existing signature scene,
not a separate homepage interruption, and keeps its active-build/testnet limits.
