export type SectionId = 'about' | 'skills' | 'projects' | 'experience' | 'contact'

export interface LocalizedText {
  en: string
  ja: string
}

export interface OrbitParams {
  /** Distance from the planet center. */
  radius: number
  /** Tilt of the orbital plane, in radians. */
  inclination: number
  /** Orbital angular speed, radians/sec. */
  speed: number
  /** Starting angle so asteroids don't spawn overlapping, in radians. */
  phaseOffset: number
}

export interface SectionContent {
  id: SectionId
  /** i18n key resolving to the section's short display name (see en.json/ja.json "nav"). */
  titleKey: string
  /** Short preview shown in the hover tooltip. TODO(user): replace with your real one-liners. */
  shortPreview: LocalizedText
  /** i18n key resolving to the full body text shown in the detail modal. */
  bodyKey: string
  orbit: OrbitParams
}

const PHASE_STEP = (Math.PI * 2) / 5

// NOTE(user): shortPreview text below is realistic sample copy, not final —
// swap it for your own one-line summaries. Full body content lives in
// src/i18n/en.json and ja.json under "sections.<id>.body".
export const sections: SectionContent[] = [
  {
    id: 'about',
    titleKey: 'nav.about',
    shortPreview: {
      en: 'Building interactive web experiences with React & WebGL.',
      ja: 'React・WebGLでインタラクティブなWeb体験を制作。',
    },
    bodyKey: 'sections.about.body',
    orbit: { radius: 3.6, inclination: 0.12, speed: 0.16, phaseOffset: 0 },
  },
  {
    id: 'skills',
    titleKey: 'nav.skills',
    shortPreview: {
      en: 'React, TypeScript, Three.js, Node.js — and always learning.',
      ja: 'React, TypeScript, Three.js, Node.js — 学び続けています。',
    },
    bodyKey: 'sections.skills.body',
    orbit: { radius: 4.0, inclination: -0.22, speed: 0.13, phaseOffset: PHASE_STEP * 1 },
  },
  {
    id: 'projects',
    titleKey: 'nav.projects',
    shortPreview: {
      en: 'A few things I’ve built recently.',
      ja: '最近作ったプロジェクトたち。',
    },
    bodyKey: 'sections.projects.body',
    orbit: { radius: 3.8, inclination: 0.3, speed: 0.2, phaseOffset: PHASE_STEP * 2 },
  },
  {
    id: 'experience',
    titleKey: 'nav.experience',
    shortPreview: {
      en: 'CS student, self-taught in 3D web graphics.',
      ja: '情報工学専攻、3D Webグラフィックスは独学。',
    },
    bodyKey: 'sections.experience.body',
    orbit: { radius: 4.2, inclination: -0.1, speed: 0.15, phaseOffset: PHASE_STEP * 3 },
  },
  {
    id: 'contact',
    titleKey: 'nav.contact',
    shortPreview: { en: 'Let’s talk — email or GitHub.', ja: 'メールかGitHubでお気軽に。' },
    bodyKey: 'sections.contact.body',
    orbit: { radius: 3.4, inclination: 0.2, speed: 0.22, phaseOffset: PHASE_STEP * 4 },
  },
]
