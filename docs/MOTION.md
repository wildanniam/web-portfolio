# Motion System

## Purpose

Motion explains causality in the portfolio's narrative:

**signal enters → system works → human checkpoint intervenes → evidence emerges**.

It should create one or two memorable moments, not make every section perform.

## Ownership

| Layer | Owner | Examples |
|---|---|---|
| Ordinary state | CSS | hover, focus, pressed, color, border |
| Object interaction | Motion | credential, mobile menu, small disclosure |
| Signature scroll | GSAP + ScrollTrigger | hero handoff, selected systems stage |
| Media loop | HTML video | ten-second Verifiable Machine loop |

Motion and GSAP never control the same property on the same element.

## Tokens

| Token | Range | Use |
|---|---:|---|
| Micro | 140–220 ms | control state |
| Interface | 280–420 ms | menu/panel presence |
| Object | 450–700 ms | credential settle/flip |
| Scene | 700–1200 ms equivalent | coordinated narrative motion |
| Stagger | 40–90 ms | at most four or five related items |

Prefer restrained ease-out and weighted motion. Avoid elastic or playful bounce.

## Signature scene 1: Hero to Credential

Desktop motion-enabled only, approximately 60–80vh after the first viewport:

1. Poster, provenance caption, and all hero copy are server-rendered and
   immediately usable.
2. The video module is requested only on eligible desktop viewports, then
   crossfades only after it can play.
3. The media frame scales/translates slightly as scrolling begins.
4. An ember signal trace visually continues toward the next section.
5. The signal meets the lanyard anchor and the credential settles with weight.
6. Pinning releases early enough that the user never feels trapped.

Pin a wrapper and animate a child. The server-rendered scene owns all content;
a zero-layout client controller imports GSAP after scroll intent or a short
post-paint delay and scopes cleanup to the scene root.

## Research Credential

- A brief gentle pendulum settles and stops.
- Pointer tilt uses MotionValue, not React state per pointer frame.
- Click, Enter, or Space flips front/back.
- Touch uses tap-to-flip and does not depend on hover.
- Reduced motion removes tilt/pendulum and uses instant or subtle opacity state.
- The complete front-facing credential is server-rendered as the no-JS state.
  Motion and the interactive face controller load only when the credential stage
  approaches the viewport, then replace an identically sized static shell.

Implementation ownership is separated by nested nodes:

- GSAP: hero media wrapper, hero copy wrapper, signal traces, and outer
  credential stage arrival.
- Motion: credential swing, pointer-tilt wrapper, and inner face-flip wrapper.

The first scene uses one short pinned hero timeline plus the continuation and
arrival triggers inside the same narrative component. These collectively count
as one signature scene.

## Signature scene 2: Selected Systems

Desktop uses a sticky editorial stage for Fradium, PayGate, and Nova AI Wallet:

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
- Large desktop pins the first two article wrappers at an 88 px navigation
  offset with `pinSpacing: false`; the final article releases the scene.
- The opaque inner project surface scales as the following article arrives,
  while a nested content layer changes opacity. The pinned wrapper and animated
  transform never share one node, and paper surfaces never become translucent.
- Tablet, mobile, no-JS, and reduced-motion rendering use the same articles in
  ordinary document flow with no replacement content.

## Supporting motion

- Research method uses a one-time line/marker reveal.
- Principles respond to hover/focus without hiding information.
- Quorum's six evidence marks may illuminate once.
- Contact uses a restrained tonal transition.
- No infinite dominant pulse, ticker, marquee, or repeated section fade-up.

## Reduced-motion contract

When `prefers-reduced-motion: reduce` is active:

- hero video does not autoplay;
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

- Normal desktop timeline.
- Tablet breakpoint.
- Mobile normal flow.
- Reduced-motion flow.
- Keyboard and touch credential behavior.
- Route navigation cleanup.
- Offscreen/hidden video pause.
- No layout shift or console warnings during scene initialization.
