import type { LocalizedText } from './sections'

export interface ProjectEntry {
  id: string
  /** Proper noun — usually kept as-is across locales. */
  name: string
  description: LocalizedText
  stack: string[]
  role: LocalizedText
  /** e.g. "2025.04 - 2025.09" */
  period: string
  links: {
    repo?: string
    demo?: string
  }
  highlights: LocalizedText[]
}

// NOTE(user): the entries below are realistic sample projects, not final —
// swap them for your own real projects (same shape as ProjectEntry above).
export const projects: ProjectEntry[] = [
  {
    id: 'orbit-portfolio',
    name: 'Orbit',
    description: {
      en: 'This portfolio itself — an explorable 3D planet built with React Three Fiber.',
      ja: 'このポートフォリオ自体 — React Three Fiberで作った探索可能な3D惑星です。',
    },
    stack: ['React', 'TypeScript', 'Three.js', 'Zustand'],
    role: { en: 'Solo developer', ja: '個人開発' },
    period: '2026.06 - 2026.08',
    links: { repo: 'https://github.com/monster9k/portfolio' },
    highlights: [
      {
        en: 'Custom procedural planet/asteroid visuals rendered in real time',
        ja: 'リアルタイムで描画するプロシージャルな惑星・小惑星ビジュアル',
      },
      {
        en: 'Bilingual EN/JA UI with a lightweight custom i18n layer',
        ja: '軽量な独自i18nによる英語・日本語バイリンガルUI',
      },
    ],
  },
  {
    id: 'taskflow',
    name: 'TaskFlow',
    description: {
      en: 'A small full-stack task manager with real-time updates.',
      ja: 'リアルタイム更新に対応した小規模なフルスタックタスク管理アプリ。',
    },
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    role: { en: 'Solo developer', ja: '個人開発' },
    period: '2026.02 - 2026.04',
    links: {},
    highlights: [
      {
        en: 'REST API with JWT auth and role-based access',
        ja: 'JWT認証とロールベースアクセス制御を備えたREST API',
      },
    ],
  },
]
