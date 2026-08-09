import type { OrbitParams } from './sections'

export type TechIconSlug = 'react' | 'typescript' | 'vite' | 'node' | 'docker' | 'tailwind'

export interface TechIconContent {
  id: TechIconSlug
  /** i18n key resolving to the tech's display name (see en.json/ja.json "tech"). */
  labelKey: string
  orbit: OrbitParams
}

const PHASE_STEP = (Math.PI * 2) / 6

export const techIcons: TechIconContent[] = [
  {
    id: 'react',
    labelKey: 'tech.react',
    orbit: { radius: 4.6, inclination: 0.18, speed: 0.1, phaseOffset: 0 },
  },
  {
    id: 'typescript',
    labelKey: 'tech.typescript',
    orbit: { radius: 4.8, inclination: -0.15, speed: 0.09, phaseOffset: PHASE_STEP * 1 },
  },
  {
    id: 'vite',
    labelKey: 'tech.vite',
    orbit: { radius: 5.0, inclination: 0.25, speed: 0.11, phaseOffset: PHASE_STEP * 2 },
  },
  {
    id: 'node',
    labelKey: 'tech.node',
    orbit: { radius: 5.2, inclination: -0.2, speed: 0.08, phaseOffset: PHASE_STEP * 3 },
  },
  {
    id: 'docker',
    labelKey: 'tech.docker',
    orbit: { radius: 5.4, inclination: 0.12, speed: 0.1, phaseOffset: PHASE_STEP * 4 },
  },
  {
    id: 'tailwind',
    labelKey: 'tech.tailwind',
    orbit: { radius: 5.1, inclination: -0.1, speed: 0.12, phaseOffset: PHASE_STEP * 5 },
  },
]
