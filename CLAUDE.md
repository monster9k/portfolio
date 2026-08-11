# CLAUDE.md

Guidance for Claude Code (and any contributor) working in this repository.

## Project

**Orbit** — a personal portfolio built as an explorable 3D planet. Visitors land on a traditional resume-style hero page first (`/` — name, title, photo, bio, contact, CTA buttons), then opt into the 3D experience via an explicit "Explore the 3D universe" button, which routes to `/explore`: the user drags to orbit a rotatable planet (a sun); five small asteroids (planets) float around it, each representing a portfolio section (About, Skills, Projects, Experience/Education, Contact). Hovering an asteroid shows a short preview; clicking opens a full detail panel. Purpose: a standout, interactive demo piece for internship interviews and interviews with Japanese companies — it needs to look and feel polished enough to show live on a call, while still making a strong first impression for someone who just wants the resume info quickly.

Full concept, tech stack rationale, and phased roadmap: see [README.md](./README.md) and the plan at implementation time. Current build status is tracked by the checkboxes in README's Roadmap section — check that before assuming a piece of the stack already exists.

## Stack

Vite + React + TypeScript + React Three Fiber + drei for the 3D scene; plain React/CSS + Framer Motion for the 2D overlay UI (tooltip, modal, navbar); React Router (`react-router-dom`) for the two-route split (`/` landing, `/explore` 3D scene); Zustand for shared state between the 3D scene and overlay; a custom lightweight i18n context for the EN/日本語 toggle (not react-i18next — see README Tech Stack table for why). Deploy target: Vercel, git-connected auto-deploy.

## Commands

```bash
npm run dev       # dev server
npm run build      # type-check + production build
npm run preview    # serve the production build locally
npm run lint        # eslint
```

Run `npm run build` and `npm run lint` clean before considering any phase of work done.

## Workflow: plan into roadmap.md, then tick + commit

[`roadmap.md`](./roadmap.md) (repo root, separate from README.md's high-level Phase 0–5 roadmap) is the single source of truth for both what's planned and what's actually shipped for ongoing feature work — it must never drift from reality. Every request follows this two-step flow:

1. **Plan first, into `roadmap.md`.** Before writing any code for a new request, break it down into concrete checklist items and add them to `roadmap.md` as unchecked `- [ ]` items (as new items under the relevant phase, or a new phase section if none fits — follow the existing lettered-phase convention in that file). Do this even for small requests. Don't start implementing until the plan is committed to `roadmap.md` — it's the durable record, not a throwaway plan file.
2. **Execute, then tick + commit.** When told to carry out a task from `roadmap.md`, implement it, then flip its `- [ ]` to `- [x]` (with a brief note of what actually happened, matching that file's existing style) and commit the code change together with that checkbox update (one commit, unless the user asks otherwise). Never leave a finished task unchecked, and never check a box without a matching commit landing at the same time.

## Folder conventions

```
src/pages/            Route-level page components (LandingPage, ExplorePage) — mounted by App.tsx's <Routes>
src/pages/landing/    LandingPage-only section components (Hero/About/Education/Experience/Achievements/Projects/Contact/Footer) + landing.css — not reused outside LandingPage, distinct from the shared overlay pieces in components/ui/
src/scenes/          3D scene code (R3F components, useFrame animation, raycasting)
src/components/ui/   2D DOM overlay (tooltip, modal, navbar, language switcher)
src/content/         Typed content data (sections.ts, projects.ts)
src/i18n/            I18nProvider, useTranslation, en.json, ja.json
src/store/           Zustand store(s)
src/hooks/           Device/capability detection hooks
```

**Hard rule: `scenes/` never contains user-facing strings.** Every label/title an asteroid or scene component displays must be passed in as a prop already resolved from `content/` + `i18n/`. This keeps the 3D layer swappable/testable independent of content and language.

## UI/UX design tokens

These are the baseline visual tokens for the project. Treat them as the source of truth — don't introduce a new one-off color, spacing value, or animation duration inline in a component; add it here first if a genuinely new value is needed, then use it everywhere.

All tokens below are defined as CSS custom properties in `src/styles/tokens.css` — reference them by name (`var(--color-accent)` etc.), never re-declare the raw value in a component.

- **Palette**: dark space background gradient `--color-bg-top` (`#0b0e17`) → `--color-bg-bottom` (`#05060a`); overlay surfaces (tooltip/modal/navbar) use `--color-surface` (translucent dark, `rgba(18,20,31,0.82)`) with `--color-surface-border`; text is `--color-text` (primary) / `--color-text-secondary`. Dual accent system for a **sun / solar-system** look — the central planet reads as a glowing sun, with the orbiting bodies as its planets: `--color-accent` (`#ffb347`, warm gold) — the **primary interactive** accent, used for the sun's own glow/pulse, orbiting-planet hover glow, tech-icon hover, tooltip/panel border, active nav link, and focus rings — plus `--color-accent-secondary` (`#ff5f3d`, ember orange-red) — a **rare accent**, sprinkled sparingly into the sun's flare/hotspot texture and nebula clouds (roughly 1 in 10) for visual interest, never used for interactive/focus states so hover affordance stays unambiguous. Each has `-soft`/`-glow` variants following the same alpha pattern. Don't add a third accent color without updating `tokens.css` and this file together. Three.js materials can't read CSS custom properties, so `src/styles/colors.ts` mirrors the accents (as `ACCENT_GOLD`/`ACCENT_EMBER`) plus `--color-text` (as `TEXT_PRIMARY`, used for neutral dust/debris particles) as literal hex constants for scene code — keep it in sync with these tokens by hand; don't hardcode a hex value inline in a scene component instead of importing from it. The 5 orbiting planets (`Asteroid.tsx`) each get their own distinct, muted, planet-inspired base color (defined locally in that file, loosely modeled on real solar-system planets) so they read as visually distinct bodies — but hover always brightens to the shared `ACCENT_GOLD` regardless of a planet's base color, so hover affordance stays one consistent signal across all 5.
- **Spacing**: 4px-based scale — `--space-1` (4px) through `--space-12` (48px). No arbitrary pixel values in `components/ui/`.
- **Typography**: `--font-family` (system sans stack). 5-level type scale: `--font-size-hero` (2.5rem, the landing page's `<h1>` name only), `--font-size-section-title` (2rem, landing page section `<h2>`s only), `--font-size-title` (1.75rem, reused across tooltip, modal, navbar, and card-level headings), `--font-size-body` (1rem), `--font-size-caption` (0.8125rem). The two larger sizes were added for `src/pages/landing/`'s resume-style heading hierarchy (Phase M) — don't reach for them outside a page-level hero/section title, and don't invent a new font size per component beyond this scale.
- **Motion**: `--motion-duration` (220ms) + `--motion-ease` (`cubic-bezier(0.16, 1, 0.3, 1)`) — the one duration/easing pair for overlay transitions (tooltip fade-in, modal open/close) via Framer Motion. Camera/orbit damping (`enableDamping`, `dampingFactor` — see `--orbit-damping-factor: 0.08`) and orbit speeds live in `scenes/` constants, not scattered magic numbers inside JSX.

These are finalized as of Phase 1 scaffolding. If the palette changes later (e.g. after real planet textures are chosen), **update `tokens.css` and this section together** — they must never drift apart.

## Mandatory interaction rules

- Every asteroid must respond to hover (visual feedback + tooltip) while the pointer is stationary over it — never a silent no-op.
- Clicking an asteroid always opens the detail modal/panel, and it must be closable three ways: close button, Escape key, and backdrop click. Don't remove any of the three when touching modal code.
- `OrbitControls` must keep `enablePan={false}` and `enableDamping` on — panning breaks the "orbit a planet" metaphor, and disabling damping makes the camera feel broken. Don't add pan or remove damping as a "quick fix" for a control issue; find the actual cause.
- All user-facing text goes through the i18n `t()` function. No hardcoded English or Japanese strings in components.

## Accessibility (non-negotiable)

- Respect `prefers-reduced-motion`: disable/slow planet auto-rotation, asteroid orbit motion, and camera auto-rotate/intro fly-ins when set.
- Keep a visually-hidden (sr-only) semantic HTML block with the full bilingual content, and a keyboard-reachable nav that can open every section's detail panel without needing to click a moving 3D object.
- Provide a non-WebGL fallback (`NoWebGLFallback`) — never let the site render blank on a browser/device without WebGL support.

Don't remove any of the above during refactors, even if it looks like unused code — it's the accessibility/SEO safety net for a canvas-only site.

## How UI/UX consistency is enforced in `.claude/`

Guidance alone is easy to forget mid-task, so this is backed by several mechanisms instead of just this file:

- `.claude/rules/ui-ux.md` — path-scoped, auto-loads into context whenever a file under `src/scenes/**`, `src/components/ui/**`, or `src/styles/**` is opened, so the rules above are re-surfaced automatically without relying on memory of this file.
- `.claude/skills/ui-ux-consistency/SKILL.md` — the full pre-completion checklist (tokens, bilingual layout, interaction pattern, responsiveness, accessibility). Invoke it explicitly (`/ui-ux-consistency`) or let Claude auto-invoke it when its description matches the task.
- `.claude/agents/ui-ux-reviewer.md` — a read-only subagent that audits a diff against this file + the skill checklist. Use it as a final pass before considering UI work done (`@ui-ux-reviewer` or ask Claude to delegate to it).
- `.claude/settings.json` — the only *enforced* (not just suggested) layer: a `PostToolUse` hook auto-formats edited `.ts/.tsx/.css` files with Prettier once it's installed (Phase 0+), and `permissions` allow the routine `npm`/`git` commands this project needs without prompting each time, while denying destructive ones.

Rules/skills/CLAUDE.md are guidance Claude follows by judgment; only `permissions` and `hooks` in `settings.json` are actually enforced by Claude Code regardless of what Claude decides. Keep that distinction in mind before assuming something is "guaranteed" — if a rule truly must never be violated (e.g. never running `git push --force`), it belongs in `settings.json`, not just prose here.
