---
name: ui-ux-consistency
description: Checklist to keep the 3D planet portfolio's UI/UX consistent — design tokens (color/spacing/typography/motion), bilingual (EN/JA) layout safety, interaction patterns (hover/click/close), responsiveness, and accessibility. Use whenever creating or editing files under src/scenes/, src/components/ui/, or src/styles/, or whenever changing colors, spacing, typography, animation timing, or interaction behavior anywhere in this project.
---

# UI/UX Consistency — Orbit Portfolio

This project's whole value proposition is a polished, professional interaction (drag to orbit a planet, hover an asteroid, click for detail) demoed live in interviews. Inconsistent spacing, a one-off color, a broken hover state, or a modal that only closes one way undermines that. Run this checklist before treating any UI-facing change as done.

## 1. Design tokens

Read the **UI/UX design tokens** section of the root `CLAUDE.md` first — it is the source of truth for color, spacing, typography, and motion values.

- [ ] No new color introduced without checking it against the existing palette/accent in `CLAUDE.md`. If a genuinely new color is needed, add it to `CLAUDE.md` first, then use it — don't leave a hex code only inline in a component.
- [ ] Spacing in `components/ui/` uses the documented 4px-based scale — no arbitrary pixel values.
- [ ] Typography uses the existing 3-level type scale (title/body/caption) and the single primary font — no new font size/family invented per component.
- [ ] Animation duration/easing for overlay UI reuses the shared Framer Motion timing — no per-component hand-tuned values. 3D orbit/damping constants live in `scenes/` constants, not inline magic numbers.

If `CLAUDE.md`'s token section is still placeholder values and this change is the one finalizing real colors/textures (typically end of Phase 1–2), update `CLAUDE.md` to match the real values as part of the same change.

## 2. Bilingual layout (EN / 日本語)

- [ ] New/changed UI text goes through `t()` — never hardcoded in a component.
- [ ] Both `en.json` and `ja.json` get the new key(s) — key sets must stay in parity.
- [ ] Actually toggle the language switcher and check the changed component in **both** languages — Japanese text often runs shorter or wraps differently than English; check for overflow, truncation, or broken alignment in tooltips/modals/nav.

## 3. Interaction pattern

- [ ] Hover state: visible feedback (glow/highlight/cursor change) while the pointer is stationary over an asteroid, plus the preview tooltip — never a silent no-op.
- [ ] Click state: opens the detail modal/panel.
- [ ] Modal is closable all three ways: close button, `Escape` key, and backdrop click. If you touched modal code, verify all three still work, not just the one you were changing.
- [ ] `OrbitControls` still has `enablePan={false}` and `enableDamping` on. Never add pan or drop damping to work around an unrelated control bug — find the actual cause instead.

## 4. Responsive & motion-safety

- [ ] Touch input still works (one-finger orbit, pinch zoom) — verify in a mobile viewport/DevTools device emulation, not just desktop.
- [ ] `prefers-reduced-motion` is respected: if set, planet/asteroid auto-rotation and any camera fly-in should be disabled or drastically reduced, not just "still spinning but a bit slower."
- [ ] Low-power/mobile tier (`useResponsiveQuality`) still applies (texture size, dpr cap, segment count) — don't bypass it while iterating on visuals and forget to re-check it applies.

## 5. Accessibility & structural boundaries

- [ ] The sr-only semantic content block and keyboard-reachable section nav still exist and still cover any new/changed content — don't let a UI change silently drop content from the accessible fallback.
- [ ] `src/scenes/` still contains no hardcoded user-facing strings — labels come in as props resolved from `content/` + `i18n/` by the caller.
- [ ] No-WebGL fallback (`NoWebGLFallback`) still renders full content if this change touches anything the fallback depends on.

## When this doesn't apply

Pure internal refactors with zero visual/behavioral/content change (e.g. extracting a helper function, renaming an internal variable) don't need the full checklist — but if you're unsure whether a change is "pure internal," run it anyway; it's cheap.
