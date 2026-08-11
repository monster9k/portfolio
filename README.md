# 🪐 Orbit — Interactive 3D Planet Portfolio

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000000?style=flat)](https://docs.pmnd.rs/react-three-fiber)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

A personal portfolio built as an explorable 3D planet instead of a scrolling page. Drag to orbit around the planet, hover the small asteroids floating around it to preview a section, and click one to open the full details. Built to demo live in internship and Japanese-company interviews.

**🔗 Live demo:** _coming soon — will be linked here after the first Vercel deploy (see [Roadmap](#roadmap))_

---

## Concept

| Interaction | What happens |
|---|---|
| 🖱️ Drag on the planet | Orbit the camera around it and explore its surface, like spinning a globe |
| 🎯 Hover an asteroid | A short preview tooltip appears (section name + one-line summary) |
| 🖱️ Click an asteroid | A detail panel opens with the full content for that section |
| 🌐 Language switch | Toggle the entire UI between **English** and **日本語** |

Each of the 5 asteroids orbiting the planet maps to one portfolio section:

- **About** — who I am, short bio
- **Skills** — languages, frameworks, tools
- **Projects** — scrollable list of project cards (repo/demo links, stack, role)
- **Experience / Education** — timeline of internships, coursework, certifications
- **Contact** — how to reach me

The UI is not a pixel copy of any single reference design — it's built around this interaction model, with the visual details free to evolve as long as the "explore a planet, discover its moons" experience stays intact.

---

## Features

- 🌍 Realistically lit, textured, freely-rotatable 3D planet (React Three Fiber + drei `OrbitControls`)
- ☄️ Five orbiting asteroids with independent orbits, tumbling rotation, and camera-facing billboard labels
- 💬 Hover preview tooltip + click-to-open detail modal, both driven by a single shared state store
- 🌐 English / 日本語 language toggle across every string in the UI
- 📱 Touch-friendly on mobile (one-finger orbit, pinch zoom) with a reduced-quality tier for low-power devices
- ♿ Accessible fallback: full content readable via keyboard navigation and screen readers even without WebGL, `prefers-reduced-motion` respected
- ⚡ Static build, deployed on Vercel with git-based auto-deploy

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Build tool | [Vite](https://vitejs.dev/) | Fast dev server, simple static output for a client-only app |
| UI | React + TypeScript | Type-safe, component-driven, huge ecosystem |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) | Declarative Three.js in React; drei provides `OrbitControls`, `Html`, `Text`, `useProgress`, etc. |
| State | [Zustand](https://github.com/pmndrs/zustand) | Selector-based state shared between the 3D scene and the 2D overlay UI, without the broad re-renders `useContext` would cause alongside `useFrame` |
| Motion (2D UI) | [Framer Motion](https://www.framer.com/motion/) | Tooltip/modal/navbar transitions |
| i18n | Custom lightweight `I18nProvider` (JSON dictionaries) | Only two languages, no pluralization/ICU needed — avoids the overhead of a full i18n library |
| Routing | [react-router-dom](https://reactrouter.com/) | Light deep-linking to sections (`/projects`, `/about`) for shareable interview links |
| Hosting | [Vercel](https://vercel.com/) | Zero-config Vite deploys, git-based preview + production deploys |

---

## Getting Started

> Project scaffolding is tracked in [Roadmap](#roadmap) — once Phase 0 lands, the app is a standard Vite project:

```bash
# clone
git clone https://github.com/monster9k/portfolio.git
cd portfolio

# install
npm install

# run the dev server
npm run dev

# type-check + production build
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

Requires Node.js 20+ (developed against Node 22).

---

## Project Structure

```
src/
  scenes/          3D scene: PortfolioScene, Planet, Asteroid, AsteroidField, Starfield, CameraRig
  components/ui/   2D DOM overlay: Navbar, LanguageSwitcher, LoadingScreen, Tooltip, DetailModal, ProjectList, NoWebGLFallback
  content/         Typed content data — sections.ts, projects.ts (kept fully separate from 3D/i18n code)
  i18n/            I18nProvider, useTranslation, en.json, ja.json
  store/           useSceneStore.ts — zustand store (hovered/selected asteroid, language, loading %, device tier)
  hooks/           useResponsiveQuality, useWebGLSupport
  assets/          Textures (planet, asteroids) and fonts
  styles/          Global CSS / design tokens
public/            Favicon, robots.txt, social preview image
```

`scenes/` never hardcodes user-facing strings — it only renders labels resolved upstream from `content/` + `i18n/`. See [`CLAUDE.md`](./CLAUDE.md) for the full set of conventions and UI/UX rules this project follows.

---

## Content & Translations

All portfolio content lives as typed data, not hardcoded JSX:

- Long-form prose (bio, experience descriptions) → `i18n/en.json` / `i18n/ja.json`
- Structured/repeating data (skills, project list, timeline) → `content/sections.ts` / `content/projects.ts`, with `{ en, ja }` fields inline

`en.json` and `ja.json` are expected to have identical key sets — a missing Japanese translation should never silently ship.

---

## Roadmap

- [x] **Phase 0** — Scaffold (Vite + React + TS + R3F, folder structure, lint/format)
- [x] **Phase 1** — Static rotatable planet + camera controls
- [x] **Phase 2** — Asteroids + hover/click interactions
- [x] **Phase 3** — i18n + content architecture wired end-to-end (EN/JA toggle, Navbar, typed content). Real bio/skills/projects/experience/contact copy is still TODO — see `src/content/sections.ts`, `src/content/projects.ts`, and the `sections.*.body` keys in `src/i18n/en.json`/`ja.json`
- [x] **Phase 4** — Polish: loading screen, no-WebGL + screen-reader fallback, `prefers-reduced-motion`, responsive/perf tiering
- [x] **Phase 5** — Deploy to Vercel + final QA

---

## Deployment

Deployed on [Vercel](https://vercel.com/), connected directly to this GitHub repository:

- Every push to `main` triggers a production deploy
- Every branch/PR gets its own preview URL
- Build command: `npm run build` · Output directory: `dist`

---

## Assets & Credits

The planet's hull/panel textures are generated procedurally at runtime (no image asset). The asteroid/moon texture (`src/assets/textures/moon/moon_2k.jpg`) is from [Solar System Scope](https://www.solarsystemscope.com/textures/) — CC BY 4.0.

## License

MIT — feel free to fork this as a starting point for your own 3D portfolio. Planet textures are CC BY 4.0 (see Assets & Credits) and not covered by the MIT license; swap them out if you need a fully MIT-licensed asset set.

---

## Contact

Feel free to reach out if you're reviewing this for an interview or want to collaborate.

- GitHub: [@monster9k](https://github.com/monster9k)
