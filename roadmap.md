# Cyberpunk Galaxy UI/UX Overhaul — Roadmap

Tracks the redesign requested by the user: cyberpunk planet + nebula/dust background, deeper zoom-out, click → left-docked info panel with scene shrink, orbiting tech icons, and a matching cyberpunk redesign of the asteroids themselves.

This is a separate checklist from `README.md`'s Phase 0–5 roadmap (uses letter-phases A–F to avoid clashing with that numbering). Full context/reasoning lives in the approved plan; this file is the tick-off tracker.

## Phase A — Tokens, planet, and background visual overhaul

- [x] Add `--color-accent-secondary` / `-soft` / `-glow` to `src/styles/tokens.css`
- [x] Update root `CLAUDE.md` palette section in the same change (dual-accent split: cyan = primary interactive, magenta = decorative/highlight) + note the `colors.ts` JS mirror
- [x] New `src/styles/colors.ts` (`ACCENT_CYAN` / `ACCENT_MAGENTA`)
- [x] New `src/utils/random.ts` — extract `hashId`/`pseudoRandom` out of `Asteroid.tsx`; update `Asteroid.tsx` to import it
- [x] New `src/scenes/proceduralTextures.ts` — hex-grid + emissive-window canvas texture generator(s), resolution gated by `isLowPower`
- [x] Rewrite `src/scenes/Planet.tsx` — generated `map`/`emissiveMap`, keep shell structure + rotation + `usePrefersReducedMotion` gating, add gated `emissiveIntensity` pulse
- [x] Remove `daymap.jpg`/`clouds.jpg` after repo-wide grep confirms no other references
- [x] New `src/scenes/Nebula.tsx` (additive sprite-plane clouds), gated by `isLowPower` + reduced motion
- [x] New `src/scenes/SpaceDust.tsx` (`Sparkles` wrapper), gated by `isLowPower` + reduced motion
- [x] Mount `<Nebula/>` / `<SpaceDust/>` in `PortfolioScene.tsx`'s `<Suspense>` block
- [x] Manual visual QA against the reference image — verified live in Chrome: cyberpunk hull windows (cyan/magenta) + wireframe shell render correctly, no console errors, `npm run build`/`lint`/`tsc` all clean. Nebula/dust are correctly out of view at today's `maxDistance=9` (by design — Phase B's zoom-tuning pass makes them visible)

## Phase A2 — Asteroid tech-satellite redesign

Follow-up the user flagged after the initial plan: the current asteroids (noise-displaced grey rock, `src/scenes/Asteroid.tsx`) look out of place ("UI lạ") and clash with the new cyberpunk look — this phase re-skins their **3D shape/material only**; hover/click/orbit/label interaction logic stays exactly as-is (already meets `.claude/rules/ui-ux.md`). Depends on Phase A's `src/styles/colors.ts` and `src/utils/random.ts`, so do this right after Phase A.

- [x] Replace the noisy `IcosahedronGeometry` rock displacement in `Asteroid.tsx` with a clean, low-poly "tech probe/satellite" shape — a shared, module-level `IcosahedronGeometry(radius, 0)` faceted gem (no noise); per-`section.id` character now comes from `src/utils/random.ts`-driven scale variance (±7% per axis) instead of rock-like vertex noise
- [x] Replace the flat grey `meshStandardMaterial` (`color:#8b8f9c`) with a cyberpunk tech material: dark navy hull (`metalness=0.8`, `roughness=0.25`) + emissive accent trim using `ACCENT_CYAN`/`ACCENT_MAGENTA` from `src/styles/colors.ts` — idle trim alternates cyan/magenta per section (decorative), hover always converges on cyan and brightens, per CLAUDE.md's rule that magenta stays non-interactive
- [x] Ring/halo — **skipped**: the new faceted-gem shape + dual-accent emissive trim already reads clearly as a distinct "tech object" next to the cyberpunk planet; a decorative ring would add draw calls without addressing what the user actually flagged (shape/material), so it was left out per the "don't add unrequested features" guidance
- [x] Verified in browser: orbit/tumble/freeze-on-hover/`usePrefersReducedMotion` logic and the `Billboard`+`Text` label are untouched — hover still freezes the asteroid, shows the tooltip, and click still opens the panel; only geometry/material changed
- [x] Hover contrast QA: idle cyan/magenta gems and the brighter cyan hover state are both clearly legible against the dark background at default zoom (verified live); nebula/dust aren't in view until Phase B's zoom increase, so that specific pairing will be re-checked then
- [x] Manual QA: all 5 asteroids now render as distinct faceted cyan/magenta gems consistent with the planet's dual-accent look — confirmed hover (freeze + cyan glow + tooltip), click (panel opens), and Escape (panel closes) all still work; no console errors, `tsc`/`lint` clean

## Phase A3 — Visual direction correction (match reference mood, redo of A/A2)

The user rejected the Phase A/A2 result against a second reference image: a moody, deep-monochrome navy sphere with pale "screenshot-like" panels (not solid neon blocks), faint elliptical orbit rings, dense atmospheric dust, soft bloom/vignette, and darker, simpler rock-like moons — not the bright flat-shaded cyan/magenta candy look that shipped. This phase redoes the Phase A/A2 visuals to close that gap; it does not touch Phase B–E scope (zoom, split-screen panel, tech icons, which are unaffected). Honesty check: an exact match to a painted/photobashed concept-art image isn't achievable in real-time WebGL — this targets the same mood/material language, not a pixel copy.

- [x] Rewrite `src/scenes/proceduralTextures.ts`: pale/off-white "screenshot" panels (background + fake text lines + one accent block) instead of solid neon fill; dim near-invisible structural seams; directional radial-gradient light bias instead of flat top-bottom; panels clustered around 3 patches instead of scattered evenly; accent color mostly cyan, magenta now rare (~1 in 10 lit panels)
- [x] `Planet.tsx`: dropped the busy full-sphere wireframe shell; replaced with a soft `BackSide`/additive cyan "atmosphere glow" shell (no grid) for a rim-light halo instead
- [ ] New `src/scenes/OrbitRings.tsx`: 2 thin tilted elliptical wireframe rings around the planet (faint white/cyan `line`, low opacity), slow gated rotation; mount in `PortfolioScene.tsx`
- [ ] Rewrite `Asteroid.tsx` material/geometry again: reintroduce mild organic noise (subtler than the original rock — not the flat gem), monochrome navy-grey base, cyan-only emissive accent (drop magenta from asteroids to keep them quieter/darker than the planet, matching the reference's simpler moons); hover/click/orbit/label logic untouched
- [ ] `npm install postprocessing @react-three/postprocessing`; mount `EffectComposer` with `Bloom` + `Vignette` in `PortfolioScene.tsx`, gated off when `isLowPower` (pulled forward from Phase E)
- [ ] Tune `SpaceDust.tsx` (denser, more size variance) and `Nebula.tsx` (lower opacity, reads as haze not colored blobs)
- [ ] Add a CSS radial-gradient vignette overlay (reuses `--color-bg-bottom`, no new token) on the scene container in `App.tsx`/`index.css` for extra edge-darkening moodiness
- [ ] Update root `CLAUDE.md`'s palette note if magenta usage actually changes (asteroids drop it, planet uses it rarely) — keep the doc honest per its own "never let this drift" rule
- [ ] Manual visual QA against the second reference image — self-review with a live screenshot comparison before calling this done (the failure mode last time was not catching the mismatch before reporting complete)

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
