# Architecture

## Runtime and framework

- Node.js 24 LTS, pinned by `.nvmrc` and `.node-version`.
- npm with a committed lockfile and explicit install-script allowlist.
- Next.js 16 App Router and React 19.
- TypeScript strict with no JavaScript source fallback.
- Tailwind CSS 4 using CSS-first semantic tokens.

## Rendering model

- Pages are statically prerendered wherever possible.
- Server Components are the default.
- Client Components are limited to mobile navigation, hero video lifecycle,
  Research Credential interaction, and signature motion wrappers.
- `generateStaticParams` creates known project routes.
- Unknown project slugs return not found through `dynamicParams = false`.
- `generateMetadata` provides project-specific metadata.
- Deploy as a normal Next.js application on Vercel; do not use static export.

## Route map

```text
src/app/
├── about/page.tsx
├── work/
│   ├── [slug]/page.tsx
│   └── page.tsx
├── layout.tsx
├── not-found.tsx
├── opengraph-image.tsx
├── page.tsx
├── robots.ts
└── sitemap.ts
```

## Module boundaries

```text
src/components/layout       shared navigation and shell
src/components/sections     semantic page sections
src/components/projects     work and case-study presentation
src/components/credential   physical credential object
src/components/interactive  narrowly scoped client islands
src/components/ui           project-agnostic primitives
src/content                 public-safe typed records only
src/lib/content             selectors and validation helpers
src/lib/media               media policy and lifecycle helpers
src/lib/seo                 metadata and structured-data helpers
src/motion                  policy, tokens, and isolated GSAP scenes
src/styles                  semantic design tokens
```

Content components remain server-rendered. An animation wrapper may reference
server-rendered children, but it must not duplicate or hide the semantic source.

## Content flow

Atlas Vault is canonical but never a runtime/build dependency:

```text
Atlas public-ready record
→ manual curated public snapshot
→ typed ProjectRecord in repository
→ build-time validator
→ Server Component
→ static HTML
```

No absolute Vault path, private note, or unpublished field may enter source
modules, generated output, tests, or browser data.

## State ownership

- Server records are immutable inputs.
- React local state owns menu open/closed and credential front/back.
- MotionValue owns pointer tilt without rerendering every pointer frame.
- GSAP timelines live in scoped `useGSAP` contexts with cleanup.
- Hero video uses an explicit lifecycle state machine.
- No global state library is required in v1.

## Hero media lifecycle

```text
poster
├── reduced motion / Save-Data / narrow policy → poster-only
├── unsupported or failed source → poster + fallback control
└── eligible → loading → canplay → playing
                              ├── user pause → paused
                              ├── offscreen/hidden → suspended
                              └── blocked autoplay → poster + play action
```

Production media uses WebM first, audio-free MP4 fallback, and an initial poster.
Video is paused offscreen and when the tab is hidden.

## Dependency policy

- CSS handles ordinary visual state.
- Motion handles object interaction.
- GSAP handles only two signature scroll scenes.
- `qrcode` runs in a Server Component at build time to encode the current
  deployment's absolute `/about` URL. It does not enter the browser bundle.
- New runtime dependencies above 20 KiB gzip need documented justification.
- Do not add a smooth-scroll library, WebGL stack, CMS, or UI kit without an
  approved architecture change.

## Security

- No secrets or private content in the repository.
- No contact form/API/database in v1.
- Apply pragmatic static-compatible security headers.
- Preview deployments emit `noindex, nofollow`; Vercel production remains
  indexable and exposes the canonical sitemap.
- Do not introduce per-request nonce architecture that turns static routes dynamic
  without a demonstrated need.
- Validate URLs and prohibit unsafe protocols in public records.

## Verification

CI and local checks cover:

- lint;
- strict typecheck;
- content/media validation;
- unit tests;
- production build;
- Playwright smoke/reduced-motion/accessibility checks;
- initial homepage JavaScript and public asset budgets;
- Chromium and WebKit browser, reflow, security-header, and SEO smoke checks.

## Credential media

The approved credential portrait is a deterministic 4:5 crop with metadata
removed. The original private download is not committed. Motion owns the nested
badge tilt, pendulum, and face flip. GSAP owns only the outer scene wrappers,
signal traces, and scroll arrival so the two engines never write the same
transform.
