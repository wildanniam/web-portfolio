# Motion System

## Purpose

Motion supports the portfolio's build narrative:

**idea appears → product takes shape → build connects → result becomes usable**.

It should create one or two memorable moments, not make every section perform.

## Ownership

| Layer | Owner | Examples |
|---|---|---|
| Ordinary state | CSS | hover, focus, pressed, color, border |
| Shell/object interaction | CSS + React / Motion | Ember Entry, mobile menu, Builder Pass |
| Signature scroll | GSAP + ScrollTrigger | Selected Work stage |
| Media playback | HTML video | 7.54-second Talking Portrait |

Motion and GSAP never control the same property on the same element.

## Tokens

| Token | Range | Use |
|---|---:|---|
| Micro | 140–220 ms | control state |
| Interface | 280–420 ms | menu/panel presence |
| Object | 450–700 ms | Builder Pass settle/flip |
| Scene | 700–1200 ms equivalent | coordinated narrative motion |
| Stagger | 40–90 ms | at most four or five related items |

Prefer restrained ease-out and weighted motion. Avoid elastic or playful bounce.

## Entry and hero

- Ember Entry uses opacity, clip, and transform only. It waits for the poster or
  a bounded timeout, runs once per session, and is skipped for reduced motion.
- Hero copy, poster, disclosure, and controls remain immediately available in
  server-rendered HTML.
- The hero is never pinned, scrubbed, scaled, or translated by scroll.
- Video crossfades only after it can play. Audio begins only after `Hear intro`,
  which restarts playback at zero.
- Header state changes are short CSS transitions and do not alter document flow.

## Builder Pass

- The complete object makes one weighted drop, small overshoot, and gentle
  pendulum settle, then stops.
- The continuous strap, clip, and badge share the pendulum wrapper so their
  physical connection never separates during motion.
- Pointer tilt uses MotionValue, not React state per pointer frame.
- Hover and touch feedback move the complete strap, clip, and badge together with
  a restrained spring response; the physical connection never separates.
- Click, Enter, or Space flips front/back.
- Touch uses tap-to-flip and does not depend on hover.
- Reduced motion removes tilt/pendulum and uses instant or subtle opacity state.
- The complete front-facing credential is server-rendered from the same visual
  tree that Motion hydrates. A visible static fallback is never replaced with a
  newly hidden interactive tree.
- The entrance triggers once as the Builder Pass stage begins entering the
  viewport. After the weighted settle completes, the object never returns to its
  hidden entrance pose when scrolling away or back.

Motion owns the credential swing, pointer-tilt wrapper, and inner face-flip
wrapper. No GSAP selector or timeline writes to the Builder Pass.

## Signature scene 1: Selected Work

Desktop uses a sticky editorial stage for Fradium, PayGate, Nova AI Wallet, Nara
Wallet, and Quorum:

1. The current system becomes visually dominant.
2. Evidence/status context updates.
3. The previous system recedes with small scale/opacity changes.
4. The next system enters focus without horizontal-scroll hijacking.

All project content remains in semantic DOM order. Tablet uses shorter distances.
Mobile and reduced motion use normal vertical blocks.

Implementation details:

- `SelectedSystemsSceneController` is the only client owner of this scene.
- Its IntersectionObserver imports GSAP only as the section approaches the
  viewport; the semantic articles remain server-rendered.
- Each project article remains complete in server-rendered HTML.
- Large desktop pins every article wrapper except the final one at an 88 px
  navigation offset with `pinSpacing: false`; the final article releases the
  scene.
- The opaque inner project surface scales as the following article arrives,
  while a nested content layer changes opacity. The pinned wrapper and animated
  transform never share one node, and paper surfaces never become translucent.
- Tablet, mobile, no-JS, and reduced-motion rendering use the same articles in
  ordinary document flow with no replacement content.

## Supporting motion

- How I Work uses a one-time line/marker reveal.
- Principles respond to hover/focus without hiding information.
- Selected Highlights use an editorial index response, never metric-card motion.
- The oversized Contact backdrop word descends as the section crosses the
  viewport. `ContactScrollController` owns that transform across browsers while
  the conversation slab remains stable. Route changes clean up its listener,
  and reduced motion removes the transform.
- No infinite dominant pulse, ticker, marquee, or repeated section fade-up.

## Reduced-motion contract

When `prefers-reduced-motion: reduce` is active:

- hero video does not autoplay;
- Ember Entry is skipped;
- scroll pinning and scrub timelines do not initialize;
- credential pendulum and pointer tilt are disabled;
- large transforms become a subtle opacity change or instant state;
- content order, actions, and evidence remain identical.

Save-Data and autoplay failure use the same progressive-enhancement principle.

## Performance constraints

- Animate transform and opacity in hot paths.
- Avoid layout reads/writes inside repeated scroll callbacks.
- Do not use blur/filter animation as a primary scene effect.
- Pause video offscreen and when the document is hidden.
- Destroy timelines, observers, and listeners on route change/unmount.
- Profile signature scenes on Safari and a representative mobile device.

## Verification

- Normal desktop Selected Work timeline.
- First-session entry, returning-session bypass, and bounded timeout.
- Hero audio opt-in, replay, pause, failure, and poster recovery.
- Tablet breakpoint.
- Mobile normal flow.
- Reduced-motion flow.
- Keyboard and touch credential behavior.
- Route navigation cleanup.
- Offscreen/hidden video pause.
- No layout shift or console warnings during scene initialization.
