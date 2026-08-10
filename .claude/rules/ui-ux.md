---
paths:
  - "src/scenes/**"
  - "src/components/ui/**"
  - "src/styles/**"
  - "src/pages/**"
---

# UI/UX rules for this file

This file lives in a path where the "Orbit" portfolio's core interaction (orbit the planet, hover/click asteroids) and visual consistency are load-bearing — an interviewer will see this live. Before finishing any change here:

- Reuse the design tokens (color/spacing/typography/motion) already defined in the root `CLAUDE.md` — don't invent a new color, spacing value, or animation duration inline. If a new token is genuinely needed, add it to `CLAUDE.md` first.
- No hardcoded English/Japanese strings. Everything user-facing goes through `t()`; `src/scenes/` must only receive already-resolved labels as props.
- Hover must always give visible feedback; click must always open the detail modal; the modal must close via close button, `Escape`, and backdrop click — all three, not just one.
- Keep `OrbitControls` `enablePan={false}` and `enableDamping` enabled. Never disable damping or add pan to work around an unrelated bug.
- Respect `prefers-reduced-motion` for any new or changed animation/auto-rotation.
- Run the full checklist in `.claude/skills/ui-ux-consistency/SKILL.md` before treating the change as done (bilingual layout check, responsive/touch check, accessibility fallback check).
