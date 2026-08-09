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
- [x] `Planet.tsx`: dropped the busy full-sphere wireframe shell. First tried a soft `BackSide` "atmosphere glow" shell for a rim-light halo, but at any opacity that read as more than a whisper it produced a bright ring hugging the whole silhouette (grazing-angle "limb brightening" through the thin shell, amplified by Bloom) that didn't match the reference at all — removed it entirely; `Planet.tsx` is back to a single surface mesh, letting the directional-lit texture and Bloom-on-emissive-windows carry the mood instead
- [x] New `src/scenes/OrbitRings.tsx`: 2 thin tilted elliptical wireframe rings around the planet (faint cyan `Line` via drei, low opacity), slow gated rotation; mounted in `PortfolioScene.tsx`. First attempt used steep ~69–84° tilts, which — viewed nearly edge-on from the default camera — foreshortened into what looked like a thick band hugging the planet; retuned to shallower 23–37° tilts and bigger radii (4.6/5.8) so both rings read as clearly separate, wide ellipses like the reference
- [x] Rewrite `Asteroid.tsx` material/geometry again: reintroduced mild organic noise (amplitude 0.1, subtler than the original rock's 0.32 — not the flat gem either), monochrome navy-grey base (`#232b3d`), cyan-only emissive accent (dropped magenta from asteroids to keep them quieter/darker than the planet); hover/click/orbit/label logic untouched — to be confirmed in the final Phase A3 QA pass below
- [x] `npm install postprocessing @react-three/postprocessing`; mounted `EffectComposer` with `Bloom` + `Vignette` in `PortfolioScene.tsx`, gated off when `isLowPower` (pulled forward from Phase E). Final tuning: `luminanceThreshold=0.25`, `luminanceSmoothing=0.25`, `intensity=0.4`, `radius=0.35`, no `mipmapBlur` (its wide multi-mip blur made small bright details balloon into large soft halos, which is what made the early ring/glow-shell debugging misleading — worth remembering if bloom looks "too spready" again)
- [x] Tuned `SpaceDust.tsx` (split into a dense pale debris layer + a subtler cyan near-planet accent layer) and `Nebula.tsx` (opacity down to 0.05–0.12, most clouds now near-white with cyan/rare-magenta tint, reads as haze not colored blobs)
- [x] Added a CSS radial-gradient vignette overlay (reuses `--color-bg-bottom`, no new token) on the scene container in `App.tsx`/`index.css` for extra edge-darkening moodiness
- [x] Updated root `CLAUDE.md`'s palette note: magenta is now documented as a rare accent (~1 in 10) on the planet/nebula, dropped entirely from asteroids; also documents the new `TEXT_PRIMARY` mirror in `colors.ts`
- [x] Manual visual QA against the second reference image — self-review with live Chrome screenshots before calling this done. Caught and fixed two real bugs this pass instead of shipping blind: (1) the atmosphere-glow shell bloomed into an unwanted bright ring around the whole planet — removed; (2) the orbit rings were tilted too close to edge-on and visually collapsed against the planet's silhouette — retilted/enlarged. Verified after fixes: dark navy hull with clustered pale "screenshot" panels + rare cyan/magenta accents, visible thin separate orbit-ring lines, darker cyan-accented rocky moons, denser pale dust + hazy nebula, CSS vignette darkening the edges. Hover (tooltip + glow), click (panel opens), Escape (panel closes) all still work; no console errors; `tsc`/`lint`/`build` all clean

## Phase B — Zoom range

- [x] `PortfolioScene.tsx`: `maxDistance` `9 → 22`
- [x] Confirm `enablePan={false}` / `enableDamping` untouched — unchanged, verified by inspection
- [x] Tune `Nebula.tsx` placement constants for coherence at the new max distance — no change needed: `MIN_RADIUS=28`/`RADIUS_SPREAD=16` was already pre-tuned for this in Phase A3 (see the file's own comment), confirmed coherent live at full zoom-out
- [x] Manual QA at full zoom-out (no skybox wall/pop-in) — verified live via synthetic wheel-zoom in Chrome: no walls/pop-in at maxDistance, nebula halo and starfield stay coherent. Found and fixed a real regression while testing: the Phase-A3-follow-up `PlanetDashboards.tsx` cards (fixed-CSS-pixel-size `Html`, no `distanceFactor`) dominated the frame at full zoom-out — added `distanceFactor={6}` so they scale with camera distance like a real in-scene object; re-verified readable up close and proportionate at max zoom

## Phase C — Split-screen interaction redesign

- [x] `App.tsx`: flex-row layout — `InfoPanel` + `canvas-container` (`flex:1`) wrapping `PortfolioScene`. `.scene-vignette` switched from `position:fixed` (viewport) to `position:absolute` inside the new `canvas-container` so it stays centered on the 3D scene, not the whole page, once the panel is docked
- [x] Kept `Navbar` / `Tooltip` / `LoadingScreen` / `AccessibleContent` / `NoWebGLFallback` behaviorally identical — none were touched except `Tooltip.tsx` importing the shared transition constant (see below)
- [x] Renamed `DetailModal.tsx` → `InfoPanel.tsx`; kept section-lookup/`t()`/`ProjectList` logic 1:1, wrapper becomes a left-docked `<aside className="info-panel">`
- [x] Extracted the duplicated `{duration:0.22, ease:[0.16,1,0.3,1]}` transition into `src/styles/motion.ts` (`OVERLAY_TRANSITION`), used by `Tooltip.tsx`. **Deviation from plan**: `InfoPanel.tsx`'s width animation was first built as a Framer Motion `motion.aside` (per the original plan) but that combination — animating `width` via Framer Motion on a flex item sitting next to the R3F `<Canvas>` — reliably got stuck mid-animation (e.g. settled at `394px` instead of `400px`, or `7px` instead of `0px`, confirmed via live DOM inspection, no JS errors) instead of reaching its target. Rather than fight an unreliable interaction between Framer Motion's rAF-driven style updates and the Canvas's own `ResizeObserver`-driven resize, `InfoPanel.tsx` now animates `width` with a plain CSS `transition: width var(--motion-duration) var(--motion-ease)` — same duration/easing token values, fully reliable in testing (confirmed reaching exactly `0px`/`400px` every time), and it still counts as "the one shared motion timing" since it reads the same CSS custom properties `OVERLAY_TRANSITION` mirrors
- [x] Decided `role="dialog"` **without** `aria-modal` — background canvas stays interactive/visible beside the panel (that's the point of split-screen), so nothing should be marked inert the way a true modal would; added focus-on-open (`tabIndex={-1}` heading + `.focus()`) for baseline non-modal-dialog keyboard support
- [x] `PortfolioScene.tsx`: added `onPointerMissed={() => setSelected(null)}` on the `<Canvas>` as the backdrop-click replacement
- [x] Implemented mobile breakpoint via a plain CSS media query (`@media (max-width: 640px) { .info-panel { position:fixed; inset:0; z-index:30; width:100% !important } }`) rather than a JS hook — below 640px the panel becomes a fixed full-screen overlay (falls out of the flex flow entirely, so the canvas reclaims full width underneath). Closable via button + Escape on mobile; backdrop-click doesn't apply there since the canvas isn't visible behind a full-screen sheet, same tradeoff most mobile sheet dialogs make
- [x] Manual QA in Chrome: canvas DOM size actually changes (confirmed via `getBoundingClientRect()` before/after, not just a visual transform); drag-released orbit-rotate near empty space does **not** spuriously close the panel (tested a real drag gesture from empty space, panel stayed open, camera angle changed as expected); all 3 close methods confirmed working (× button, `Escape`, clicking empty canvas space); i18n toggle re-checked with panel open. **Not empirically verified**: the mobile ≤640px breakpoint — the available browser-automation tool's `resize_window` did not actually shrink `window.innerWidth` in this sandboxed environment (stayed at 1920 after resize), so the media query itself could only be code-reviewed, not visually confirmed live; recommend a real-device/DevTools-device-emulation spot check before relying on it in an interview demo

## Phase D — Orbiting tech icons

- [x] `npm install react-icons`
- [x] New `src/content/techIcons.ts` — 6 entries (react, typescript, vite, node, docker, tailwind), reusing `OrbitParams`, radii 4.6–5.4
- [x] Added `tech.*` block to `en.json` and `ja.json` in the same change (key parity) — tech names kept identical latin text in both locales (same convention as `ProjectEntry.name`/tech stack proper nouns elsewhere)
- [x] New `src/scenes/TechIcon.tsx` — nested-group orbit (mirrors `Asteroid.tsx`'s rotation trick), drei `Html` (screen-space, not `transform` mode — i.e. always faces camera like a billboard) rendering a `react-icons/si` glyph, local `useState` hover shows the name in a small tag, no click handler, `cursor: 'default'`, `label`/`Icon` passed as resolved props, `aria-hidden="true"` on the icon itself
- [x] New `src/scenes/TechIconField.tsx` (mirrors `AsteroidField.tsx`) — resolves `t(tech.labelKey)` + a `TechIconSlug -> IconType` map (`SiReact`/`SiTypescript`/`SiVite`/`SiNodedotjs`/`SiDocker`/`SiTailwindcss`)
- [x] Hover label implemented as a small inline-styled `<span>` next to the icon using the existing surface/border/font tokens — local component state only, no `useSceneStore`/global `Tooltip` involved
- [x] Mounted `<TechIconField/>` in `PortfolioScene.tsx`
- [x] Confirmed `AccessibleContent.tsx` untouched (not read or modified this phase)
- [x] Manual QA in Chrome: dispatched real hover events on each icon — confirmed the name tag appears (`"React"` etc.), `cursor: default` (not `pointer`, no click affordance), and re-verified the label still resolves correctly after switching to 日本語. Visual check: icons sit in the same radius band as `OrbitRings`/outside the asteroid belt as planned, read as small glowing glyphs, no overlap collisions with asteroids observed while orbiting. Known simplification: icons use fixed-size `Html` (no `distanceFactor`), so unlike asteroids they don't perspective-shrink at Phase B's extended max zoom — acceptable for a small decorative hover flourish, flagged here rather than adding more `distanceFactor` risk after Phase B/C's tuning experience with it

## Phase E — Bloom + final QA

- [x] `npm install @react-three/postprocessing postprocessing` — done early in Phase A3
- [x] `PortfolioScene.tsx`: `{!isLowPower && <EffectComposer><Bloom .../></EffectComposer>}`, tuned against new emissive planet/nebula/accents — done early in Phase A3; re-checked live after Phase D's tech icons landed, no bloom retune needed (icons are flat DOM `Html`, not emissive WebGL materials, so they don't feed the bloom pass)
- [x] Ran the full `.claude/skills/ui-ux-consistency/SKILL.md` checklist across Phases A3(follow-up)–D by delegating to the `ui-ux-reviewer` subagent (see below) plus a manual `en.json`/`ja.json` key-parity check (programmatic diff — exact match)
- [x] `npm run build` clean
- [x] `npm run lint` clean
- [x] Delegated a pass to the `ui-ux-reviewer` subagent. It found 4 real issues, all fixed in this same phase before calling the overhaul complete:
  1. **Real bug** (not just "unverified" as Phase C's own notes said): the mobile `.info-panel` media-query override used `!important` unscoped to the open/closed state, so on any viewport ≤640px the panel was *always* a fixed full-screen translucent block — even closed — silently eating all touch/orbit input. Fixed by adding a state-driven `info-panel--open` class and scoping the media query to `.info-panel.info-panel--open`; also made `background`/`pointerEvents` conditional on `section` (they weren't before, `background` in particular was unconditionally opaque). Re-verified live: closed panel is `width:0`, `background:transparent`, `pointerEvents:none`, and the media-query rule (inspected via `document.styleSheets`) only matches the `--open` class.
  2. `PlanetPanels`/`PlanetDashboards`-adjacent `src/scenes/PlanetDashboards.tsx` was doing real content-selection/shaping logic (picking sections/first project, slicing `stack`) inline in `scenes/`, beyond the established "resolve a single i18n key" precedent in `Asteroid.tsx`/`AsteroidField.tsx`. Extracted the selection logic to a new `src/hooks/useDashboardCardContent.ts` (outside `scenes/`); `PlanetDashboards.tsx` now only maps the already-resolved content onto 3D surface positions.
  3. Missing `aria-hidden="true"` on the decorative `Html` wrapper `<div>`s in `PlanetDashboards.tsx`/`TechIcon.tsx` (their text duplicates `AccessibleContent.tsx`'s sr-only block but wasn't marked hidden from screen readers) — added.
  4. `TechIconField`/`TechIcon` weren't gated by `isLowPower`, inconsistent with `PlanetPanels`/`PlanetDashboards` in the same diff — added an `isLowPower` prop that drops from 6 icons to 3 on low-power devices, threaded from `PortfolioScene.tsx`.

  Everything else the reviewer checked came back clean: `OrbitControls` `enablePan`/`enableDamping` intact after the `maxDistance` bump, all 3 `InfoPanel` close paths present, the `role="dialog"` (no `aria-modal`) + focus-on-open pattern is sound given the canvas stays interactive beside it, the CSS-transition width-animation workaround (documented in Phase C) is reasonable, i18n key parity holds, `prefers-reduced-motion` gating covers every new animated piece, and `AccessibleContent.tsx`/`NoWebGLFallback.tsx` are untouched. Re-ran `npm run build`/`npm run lint` clean after applying all 4 fixes.

## Special-care reminders

- Dual-accent tokens: `tokens.css` + root `CLAUDE.md` edited together (Phase A)
- `onPointerMissed` must reliably close the panel and never fire on an orbit-drag release (Phase C)
- Re-verify `enablePan={false}`/`enableDamping` after every `PortfolioScene.tsx` edit (Phases B, C, E)
- Each new animated piece (planet pulse, nebula drift, tech-icon orbit) needs its own `usePrefersReducedMotion()` gate
- `Nebula.tsx`, `SpaceDust.tsx`, and the `EffectComposer` mount each need their own `isLowPower` gate
- `TechIcon.tsx` must never hardcode a label string — only resolved props from `TechIconField.tsx`
- New `tech.*` i18n keys must land in `en.json` and `ja.json` together
