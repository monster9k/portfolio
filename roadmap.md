# Cyberpunk Galaxy UI/UX Overhaul — Roadmap

Tracks the redesign requested by the user: cyberpunk planet + nebula/dust background, deeper zoom-out, click → left-docked info panel with scene shrink, orbiting tech icons, and a matching cyberpunk redesign of the asteroids themselves.

This is a separate checklist from `README.md`'s Phase 0–5 roadmap (uses letter-phases A–F to avoid clashing with that numbering). Full context/reasoning lives in the approved plan; this file is the tick-off tracker.

## Phase A — Tokens, planet, and background visual overhaul

- [x] Add `--color-accent-secondary` / `-soft` / `-glow` to `src/styles/tokens.css`
- [x] Update root `CLAUDE.md` palette section in the same change (dual-accent split: cyan = primary interactive, magenta = decorative/highlight) + note the `colors.ts` JS mirror
- [x] New `src/styles/colors.ts` (`ACCENT_CYAN` / `ACCENT_MAGENTA`)
- [ ] New `src/utils/random.ts` — extract `hashId`/`pseudoRandom` out of `Asteroid.tsx`; update `Asteroid.tsx` to import it
- [ ] New `src/scenes/proceduralTextures.ts` — hex-grid + emissive-window canvas texture generator(s), resolution gated by `isLowPower`
- [ ] Rewrite `src/scenes/Planet.tsx` — generated `map`/`emissiveMap`, keep shell structure + rotation + `usePrefersReducedMotion` gating, add gated `emissiveIntensity` pulse
- [ ] Remove `daymap.jpg`/`clouds.jpg` after repo-wide grep confirms no other references
- [ ] New `src/scenes/Nebula.tsx` (additive sprite-plane clouds), gated by `isLowPower` + reduced motion
- [ ] New `src/scenes/SpaceDust.tsx` (`Sparkles` wrapper), gated by `isLowPower` + reduced motion
- [ ] Mount `<Nebula/>` / `<SpaceDust/>` in `PortfolioScene.tsx`'s `<Suspense>` block
- [ ] Manual visual QA against the reference image

## Phase A2 — Asteroid tech-satellite redesign

Follow-up the user flagged after the initial plan: the current asteroids (noise-displaced grey rock, `src/scenes/Asteroid.tsx`) look out of place ("UI lạ") and clash with the new cyberpunk look — this phase re-skins their **3D shape/material only**; hover/click/orbit/label interaction logic stays exactly as-is (already meets `.claude/rules/ui-ux.md`). Depends on Phase A's `src/styles/colors.ts` and `src/utils/random.ts`, so do this right after Phase A.

- [ ] Replace the noisy `IcosahedronGeometry` rock displacement in `Asteroid.tsx` with a clean, low-poly "tech probe/satellite" shape (e.g. smooth icosahedron or faceted gem, no organic bumpiness) — keep per-`section.id` determinism via `src/utils/random.ts` (Phase A) for small facet/scale variation, not rock-like noise
- [ ] Replace the flat grey `meshStandardMaterial` (`color:#8b8f9c`) with a cyberpunk tech material: dark graphite/navy base (high `metalness`, low `roughness`) + emissive accent trim using `ACCENT_CYAN`/`ACCENT_MAGENTA` from `src/styles/colors.ts` (Phase A) — e.g. cyan idle glow, brighter cyan/magenta on hover, consistent with the planet's dual-accent look
- [ ] Optional: thin emissive ring/halo (`ringGeometry` + basic emissive material, no texture) around each asteroid for a stronger "satellite" silhouette at small scale — evaluate visual payoff vs. the extra 5 draw calls before committing
- [ ] Do **not** touch orbit/tumble/freeze-on-hover/`usePrefersReducedMotion` logic or the `Billboard`+`Text` label — geometry/material only
- [ ] Re-check hover contrast/readability against the new `Nebula`/`SpaceDust` background (Phase A) at both default and max zoom (Phase B)
- [ ] Manual QA: all 5 asteroids read as distinct "tech satellites" consistent with the planet and the Phase D tech icons, not as mismatched grey rocks

## Phase B — Zoom range

- [ ] `PortfolioScene.tsx`: `maxDistance` `9 → 22`
- [ ] Confirm `enablePan={false}` / `enableDamping` untouched
- [ ] Tune `Nebula.tsx` placement constants for coherence at the new max distance
- [ ] Manual QA at full zoom-out (no skybox wall/pop-in)

## Phase C — Split-screen interaction redesign

- [ ] `App.tsx`: flex-row layout — `InfoPanel` + `canvas-container` (`flex:1`) wrapping `PortfolioScene`
- [ ] Keep `Navbar` / `Tooltip` / `LoadingScreen` / `AccessibleContent` / `NoWebGLFallback` behaviorally identical
- [ ] Rename `DetailModal.tsx` → `InfoPanel.tsx`; keep section-lookup/`t()`/`ProjectList` logic 1:1, only the wrapper becomes a left-docked width-animated `motion.aside`
- [ ] Extract duplicated `{duration:0.22, ease:[0.16,1,0.3,1]}` transition into `src/styles/motion.ts`; use from `InfoPanel.tsx` and `Tooltip.tsx`
- [ ] Decide `role="dialog"` (no `aria-modal`) vs `role="complementary"` for the panel; apply consistently
- [ ] `PortfolioScene.tsx`: add `onPointerMissed={() => selectedId && setSelected(null)}` as backdrop-click replacement
- [ ] Decide + implement mobile breakpoint behavior (full-overlay panel below ~640px)
- [ ] Manual QA: canvas DOM size actually changes (not transform); drag-release near empty space doesn't spuriously close; all 3 close methods work (button, Escape, empty-space click); mobile check

## Phase D — Orbiting tech icons

- [ ] `npm install react-icons`
- [ ] New `src/content/techIcons.ts` — 6 entries (react, typescript, vite, node, docker, tailwind), reusing `OrbitParams`, radii ~4.6–5.4
- [ ] Add `tech.*` block to `en.json` and `ja.json` in the same change (key parity)
- [ ] New `src/scenes/TechIcon.tsx` — nested-group orbit (mirrors `Asteroid.tsx`), drei `Html` billboard with `react-icons/si` glyph, DOM hover shows name, no click handler, cursor `default`, `label` passed as resolved prop, `aria-hidden="true"`
- [ ] New `src/scenes/TechIconField.tsx` (mirrors `AsteroidField.tsx`) — resolves `t(tech.labelKey)` + icon-slug→component mapping
- [ ] Hover label: small local `Html` tooltip styled with existing tokens (kept separate from global `Tooltip`/`useSceneStore`)
- [ ] Mount `<TechIconField/>` in `PortfolioScene.tsx`
- [ ] Confirm `AccessibleContent.tsx` untouched
- [ ] Manual QA: hover-only (no click) in both languages; no visual collision with asteroids/nebula at default and max zoom

## Phase E — Bloom + final QA

- [ ] `npm install @react-three/postprocessing postprocessing`
- [ ] `PortfolioScene.tsx`: `{!isLowPower && <EffectComposer><Bloom .../></EffectComposer>}`, tuned against new emissive planet/nebula/accents
- [ ] Run full `.claude/skills/ui-ux-consistency/SKILL.md` checklist across Phases A–D
- [ ] `npm run build` clean
- [ ] `npm run lint` clean
- [ ] Delegate a pass to the `ui-ux-reviewer` subagent before calling the overhaul complete

## Special-care reminders

- Dual-accent tokens: `tokens.css` + root `CLAUDE.md` edited together (Phase A)
- `onPointerMissed` must reliably close the panel and never fire on an orbit-drag release (Phase C)
- Re-verify `enablePan={false}`/`enableDamping` after every `PortfolioScene.tsx` edit (Phases B, C, E)
- Each new animated piece (planet pulse, nebula drift, tech-icon orbit) needs its own `usePrefersReducedMotion()` gate
- `Nebula.tsx`, `SpaceDust.tsx`, and the `EffectComposer` mount each need their own `isLowPower` gate
- `TechIcon.tsx` must never hardcode a label string — only resolved props from `TechIconField.tsx`
- New `tech.*` i18n keys must land in `en.json` and `ja.json` together
