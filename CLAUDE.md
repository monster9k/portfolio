# CLAUDE.md

Guidance for Claude Code (and any contributor) working in this repository.

## Project

**Orbit** — a personal portfolio built as an explorable 3D planet. The user drags to orbit a rotatable planet; five small asteroids float around it, each representing a portfolio section (About, Skills, Projects, Experience/Education, Contact). Hovering an asteroid shows a short preview; clicking opens a full detail panel. Purpose: a standout, interactive demo piece for internship interviews and interviews with Japanese companies — it needs to look and feel polished enough to show live on a call.

Full concept, tech stack rationale, and phased roadmap: see [README.md](./README.md) and the plan at implementation time. Current build status is tracked by the checkboxes in README's Roadmap section — check that before assuming a piece of the stack already exists.

## Stack

Vite + React + TypeScript + React Three Fiber + drei for the 3D scene; plain React/CSS + Framer Motion for the 2D overlay UI (tooltip, modal, navbar); Zustand for shared state between the 3D scene and overlay; a custom lightweight i18n context for the EN/日本語 toggle (not react-i18next — see README Tech Stack table for why). Deploy target: Vercel, git-connected auto-deploy.

## Commands

```bash
npm run dev       # dev server
npm run build      # type-check + production build
npm run preview    # serve the production build locally
npm run lint        # eslint
```

Run `npm run build` and `npm run lint` clean before considering any phase of work done.

## Folder conventions

```
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

- **Palette**: dark space background gradient `--color-bg-top` (`#0b0e17`) → `--color-bg-bottom` (`#05060a`); overlay surfaces (tooltip/modal/navbar) use `--color-surface` (translucent dark, `rgba(18,20,31,0.82)`) with `--color-surface-border`; text is `--color-text` (primary) / `--color-text-secondary`. Dual accent system for the cyberpunk galaxy look: `--color-accent` (`#5fe3ff`, cyan) — the **primary interactive** accent, used for asteroid/tech-icon hover glow, tooltip/panel border, active nav link, focus rings — plus `--color-accent-secondary` (`#c65fff`, magenta) — a **decorative/highlight** accent used for the planet's emissive tech-panel windows, nebula clouds, and asteroid trim, never for interactive/focus states so hover affordance stays unambiguous. Each has `-soft`/`-glow` variants following the same alpha pattern. Don't add a third accent color without updating `tokens.css` and this file together. Three.js materials can't read CSS custom properties, so `src/styles/colors.ts` mirrors both accents as literal hex constants (`ACCENT_CYAN`/`ACCENT_MAGENTA`) for scene code — keep it in sync with these tokens by hand; don't hardcode a hex value inline in a scene component instead of importing from it.
- **Spacing**: 4px-based scale — `--space-1` (4px) through `--space-12` (48px). No arbitrary pixel values in `components/ui/`.
- **Typography**: `--font-family` (system sans stack). 3-level type scale: `--font-size-title` (1.75rem), `--font-size-body` (1rem), `--font-size-caption` (0.8125rem) — reused across tooltip, modal, and navbar. Don't invent a new font size per component.
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
