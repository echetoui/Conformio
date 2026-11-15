# Phase B — accessibility and performance report

## Scope

This report covers the spatial redesign applied to the public home page on branch `codex/phase-b-spatial-intelligence`.

## Validation completed

- Vitest: 11 tests passed, including the interactive globe prototype.
- ESLint: passed.
- TypeScript `tsc --noEmit`: passed.
- Vite production build: passed.
- `git diff --check`: passed after removing trailing whitespace.
- Local desktop capture: `docs/phase-b-capture-desktop.png`.
- Direct `/fr` route smoke test: passed after adding localized home routes.

## Production bundle snapshot

The Vite build produced these key compressed assets:

| Asset | Raw | Gzip |
| --- | ---: | ---: |
| Main entry | 56.81 kB | 20.21 kB |
| React vendor | 173.02 kB | 56.67 kB |
| Framer Motion | 118.77 kB | 38.10 kB |
| Trial form chunk | 93.27 kB | 25.45 kB |
| Global CSS | 27.81 kB | 6.43 kB |

The globe prototype adds no WebGL runtime or new dependency. The main remaining optimization opportunity is the existing Framer Motion/form stack, which can be evaluated in a later performance pass.

## Accessibility checks

- Keyboard: region buttons, FAQ controls, navigation, language switch and forms remain native controls.
- Semantics: skip link, labelled sections, labelled form fields, live success state and alert error state are present.
- Motion: reduced-motion CSS disables animation and smooth scrolling.
- Responsive behavior: the orbital stage reduces its minimum height below 640px and the hero/form layout stacks naturally at mobile widths.
- Contrast: primary text uses the spatial text token; muted copy uses the dedicated muted token; focus rings use the cyan accent.

## Residual risks

- A browser-level automated accessibility scan and real-device mobile capture remain follow-up validation items.
- The legal pages retain their existing document styling and were intentionally kept out of the Phase B hero/system scope.
- A future 3D implementation must be lazy-loaded, provide the existing CSS fallback, and be measured against this snapshot before adoption.
