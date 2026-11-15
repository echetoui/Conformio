# Conformio Spatial Intelligence — design system

## Direction

Phase B introduces a dark spatial interface for Conformio: deep navy surfaces, cyan signal accents, iris secondary highlights, thin luminous borders and restrained glass panels. The visual language is designed to make compliance feel observable, structured and international without turning the product into a dashboard or SaaS shell.

## Tokens

- Surfaces: `--spatial-950`, `--spatial-900`, `--spatial-850`, `--spatial-800`
- Accent: `--spatial-cyan`, `--spatial-cyan-soft`, `--spatial-iris`
- Text: `--spatial-text`, `--spatial-muted`
- Glass: `--spatial-glass`, `--spatial-glass-strong`
- Shape: small, medium and large spatial radii
- Motion: `--spatial-duration` and `--spatial-ease`

The implementation lives in `src/styles/design-tokens.css`. Reusable primitives are `spatial-shell`, `spatial-grid`, `glass-panel`, `spatial-button`, `spatial-button-secondary`, `spatial-section`, `spatial-heading`, `spatial-copy` and `spatial-card`.

## Components

- `Hero`: primary narrative, contact capture and standards badges.
- `InternationalGlobePrototype`: lightweight CSS/DOM orbital prototype with keyboard-operable region buttons and an explicit reduced-motion fallback.
- `Header`: sticky glass navigation with mobile menu and language switch.
- `Features`, `Benefits`, `FAQ`, `TrialForm`, `Footer`: shared spatial surfaces and focus treatment while preserving the existing routes and forms.

## Interaction and accessibility

- Every interactive region button exposes `aria-pressed`.
- FAQ controls expose `aria-expanded` and `aria-controls`.
- The home page has a skip link and visible `:focus-visible` rings.
- Forms retain labels, field names, autocomplete metadata and live/error feedback.
- `prefers-reduced-motion: reduce` disables orbital animation, smooth scrolling and long transitions.
- The globe has no WebGL dependency; it remains usable on browsers without GPU/WebGL support.

## WebGL decision

The approved Phase B plan requested a WebGL-ready direction, but the current production bundle already includes React, Framer Motion and the form stack. The first implementation therefore uses a CSS/DOM prototype to validate the spatial interaction at a lower risk and lower weight. A Three.js/R3F layer should only be introduced after a separate bundle-budget decision and isolated lazy loading.
