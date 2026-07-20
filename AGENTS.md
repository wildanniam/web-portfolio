# Web Portfolio Agent Guide

This repository is public and portfolio-facing. Treat design quality, truthful
claims, accessibility, and user-visible behavior as release requirements.

## Source of truth

Read these files before meaningful implementation work:

1. `docs/DEVELOPMENT_BLUEPRINT.md`
2. `docs/DESIGN.md`
3. `docs/ARCHITECTURE.md`
4. `docs/CONTENT_POLICY.md`
5. `docs/MOTION.md`

The development blueprint is locked. A material change to routes, positioning,
visual direction, content policy, motion ownership, or quality gates requires an
explicit decision from Wildan and a matching documentation update.

## Working rules

- Use issue-driven development on `codex/<issue>-<topic>` branches.
- Never commit meaningful work directly to `main`.
- Do not merge or deploy production without Wildan's explicit approval.
- Preserve unrelated user changes and assets.
- Prefer Server Components. Add a Client Component only around real interaction.
- Do not import or read Atlas Vault from the app, build, CI, or browser bundle.
- Do not publish unsupported claims or private notes.
- Do not hide, crop, or edit media specifically to conceal provenance marks.

## Design and implementation

- This is a brand/editorial portfolio, not a SaaS dashboard.
- Use the Ember Lab tokens and component vocabulary in `docs/DESIGN.md`.
- Keep the hero headline to two lines at intended desktop sizes and keep its CTA
  inside the first viewport.
- Do not create generic skills grids, card walls, fake preloaders, custom cursors,
  fake terminals, or repeated fade-up choreography.
- Maintain honest media states: `placeholder`, `candidate`, or `published`.
- Mobile is a normal single-column narrative. Do not pin or hijack horizontal
  scrolling below the desktop motion breakpoint.

## Motion

- CSS owns ordinary hover, focus, pressed, and color transitions.
- Motion owns object interactions such as the credential and mobile menu.
- GSAP owns at most two signature scroll scenes.
- Never let Motion and GSAP animate the same property on the same node.
- Respect `prefers-reduced-motion`, Save-Data, autoplay failure, and video pause.

## Commands

Use Node from `.nvmrc` before running project commands.

```bash
nvm use
npm install
npm run dev
npm run lint
npm run typecheck
npm run validate
npm test
npm run build
npm run test:e2e
```

`npm run check` is the foundation pre-PR gate. Substantial UI changes also require
real-browser review at 1440×900 and 390×844, plus relevant reduced-motion states.

## Definition of done for a PR

- Scope matches the linked issue.
- Documentation changes accompany reusable architectural decisions.
- Lint, typecheck, validation, tests, and build pass.
- UI changes have desktop/mobile evidence or a stated reason they do not.
- No private claims, local absolute paths, console errors, or hydration errors.
- Risks and unverified states are stated in the PR body.
