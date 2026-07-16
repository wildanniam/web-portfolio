# Ember Lab Design System

## Register and audience

This is a **Brand UI**: an editorial-cinematic personal portfolio for technical
peers, collaborators, program evaluators, founders, and technical recruiters.

Visitors should understand three things quickly:

1. Wildan builds serious technical systems, not visual concepts alone.
2. Claims are accompanied by mechanisms, evidence, or stated limitations.
3. The experience has a distinct point of view while remaining calm and usable.

## Visual thesis

Ember Lab combines warm editorial restraint with an analog-futurist laboratory.
The visual materials are paper, smoked glass, frosted acrylic, bronze, woven
fabric, and small signal lights.

The direction may feel warm and considered like Claude, but it must not reproduce
Claude's product layout, components, exact palette, or chat language.

Design dials:

| Dial | Target |
|---|---:|
| Design variance | 8/10 |
| Motion intensity | 8/10 |
| Information density | 4/10 |
| Editorial tone | 8/10 |
| Tactility | 8/10 |

## Color tokens

| Token | Value | Use |
|---|---|---|
| `paper-0` | `#F5F0E8` | primary canvas |
| `paper-1` | `#ECE4D8` | raised paper surface |
| `paper-2` | `#E1D6C7` | stronger separation |
| `ink-900` | `#1A1714` | primary text |
| `ink-700` | `#3D3832` | secondary heading |
| `ink-600` | `#686057` | supporting text |
| `ember-500` | `#C65E2E` | signal and large decorative accent |
| `ember-700` | `#943E1B` | accessible accent text/link |
| `evidence-600` | `#3F648F` | evidence state |
| `verified-600` | `#46715A` | verified state only |
| `bronze-500` | `#8A6848` | hardware/material detail |
| `line-200` | `#D8CEC0` | hairline border |
| `smoke-900` | `#171411` | cinematic dark surface |

`ember-500` is not body-copy color. `ember-700`, evidence blue, and verified
green must pass AA contrast in their rendered context. Status is never conveyed
by color alone.

## Typography

- Iowan/Palatino/Georgia system-serif stack: editorial display and hero headline
  without a render-delaying font transfer.
- Native UI sans: navigation, body, controls, and case-study prose.
- Native UI mono: metadata, timestamps, statuses, coordinates, and evidence labels.

Typography rules:

- Keep all three typography roles on carefully ordered system stacks. This
  preserves the editorial character while avoiding render-delaying font transfers.
- Keep the hero headline at two lines on intended desktop sizes.
- Body copy is 16–18 px and case-study reading width is about 68–72 characters.
- Mono uppercase is reserved for short evidence metadata.
- Do not place a tiny uppercase eyebrow above every heading.

## Layout

- Desktop content max width: approximately 1440 px with generous fluid gutters.
- Editorial copy uses a narrower readable measure inside the wide composition.
- Hero uses a split layout; mobile stacks copy before media.
- Project pages alternate full evidence surfaces and narrow explanatory prose.
- Sections are not automatically cards. Use whitespace, rules, and material
  changes before adding a container.

## Material and shape

- Media radius: 20–28 px.
- Controls use rounded shapes only when the control warrants it.
- Shadows are soft and material-aware, never generic heavy black shadows.
- Grain is subtle, static, and cannot reduce text legibility.
- Bronze aperture and evidence slab motifs are used sparingly.
- Dark surfaces are concentrated in hero media and the closing/Quorum moments.

## Component vocabulary

- Editorial text links with an ember underline/trace.
- Solid ink primary action; paper/line secondary action.
- Mono status label with icon or explicit text.
- Media frame with caption, provenance, and state.
- Evidence ledger row rather than generic metric card.
- Physical Research Credential object.
- Project panel with problem, mechanism, contribution, evidence, and limitations.

## State requirements

| Surface | Required states |
|---|---|
| Navigation | top, scrolled, current route, mobile open/closed, focus |
| Hero media | poster, loading, playing, paused, failed, reduced, Save-Data |
| Credential | front, back, focus, pointer, touch, reduced motion |
| Project media | placeholder, candidate, published, error |
| Project | live, degraded, offline, active build, prototype, testnet beta |
| Links/controls | default, hover, focus-visible, active, disabled where relevant |

## Responsive rules

### Large desktop — 1280 px and above

- Full split hero and short hero handoff.
- Research Credential may bridge section boundaries.
- Selected Systems may use a sticky editorial stage.

### Tablet — 768 to 1279 px

- Preserve editorial hierarchy with shorter motion distances.
- Avoid deep overlap and aggressive panel scaling.

### Mobile — below 768 px

- Strict single-column narrative.
- No pinned or horizontally hijacked scenes.
- Preserve hero media at 16:9.
- Credential is tap-to-flip without pointer tilt.
- Minimum primary touch target is 44×44 px.

## Accessibility

- Visible focus must fit the visual language rather than being removed.
- The site uses semantic landmarks and logical heading order.
- Motion has pause/reduced alternatives and never carries exclusive meaning.
- Media has useful alt text/captions; decorative surfaces are hidden from the
  accessibility tree.
- Text must remain usable at 200% zoom.

## Anti-patterns

- Purple/cyan AI gradients, floating orbs, and random glass cards.
- Generic three-card sections and card-wall layouts.
- Fake preloader, custom cursor, fake terminal, or nonfunctional form.
- Repeated fade-up sections or elastic/bouncy entrances.
- Copying the reference's red palette, layout, torn paper, badge geometry, or
  giant CONTACT form treatment.
- Placeholder text presented as evidence.
- Decorative verified/evidence states without factual meaning.

## Visual references

- Reference implementation: locally audited inspiration repository, not copied or committed here.
- Hero source: `The_three_uploaded_images_show.mp4`
- Full approved product direction: `docs/DEVELOPMENT_BLUEPRINT.md`

Local absolute reference paths are documentation-only and must never enter the
runtime bundle or public content modules.
