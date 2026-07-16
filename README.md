# Wildan Syukri Niam - Web Portfolio

The source repository for Wildan's evidence-led researcher and builder portfolio.

The site is currently under active development. Product, design, content, motion,
and engineering decisions are documented in the repository before release.

## Local development

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
npm run lint
npm run typecheck
npm run validate
npm test
npm run build
npm run validate:bundle
npm run test:e2e
```

`npm run check` runs the non-browser foundation gate and enforces the homepage
JavaScript budget after the production build. Playwright covers Chromium and
WebKit across desktop, mobile, reduced-motion, reflow, route, security-header,
and automated accessibility smoke paths.

## Documentation

- [`docs/DEVELOPMENT_BLUEPRINT.md`](docs/DEVELOPMENT_BLUEPRINT.md)
- [`docs/DESIGN.md`](docs/DESIGN.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/CONTENT_POLICY.md`](docs/CONTENT_POLICY.md)
- [`docs/MOTION.md`](docs/MOTION.md)
- [`docs/RELEASE.md`](docs/RELEASE.md)
- [`docs/COMPLETION_AUDIT.md`](docs/COMPLETION_AUDIT.md)

The blueprint is locked for Portfolio v1. Material scope changes require Wildan's
explicit approval and a matching documentation update.
