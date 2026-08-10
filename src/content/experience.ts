import type { LocalizedText } from './sections'

export type ExperienceType = 'work' | 'education'

export interface ExperienceEntry {
  id: string
  type: ExperienceType
  /** TODO(user): company or school name. */
  organization: string
  /** TODO(user): job title or degree name. */
  role: LocalizedText
  /** TODO(user): e.g. "2025.04 - 2025.09" or "2023.04 - present". */
  period: string
  /** TODO(user): "City, Country" — optional, leave empty to hide. */
  location: string
  /** TODO(user): bullet points describing what you did/learned. */
  description: LocalizedText[]
}

// NOTE(user): entries render in the order listed here — put the most recent
// first. Same shape for both 'work' and 'education'; add/remove entries as
// needed. The two below are realistic sample copy so you can preview the
// layout — swap them for your own (same convention as projects.ts).
export const experience: ExperienceEntry[] = [
  {
    id: 'work-1',
    type: 'work',
    organization: 'TechStart Inc.',
    role: { en: 'Frontend Developer Intern', ja: 'フロントエンド開発インターン' },
    period: '2025.06 - 2025.09',
    location: 'Remote',
    description: [
      {
        en: 'Built and shipped 3 internal dashboard features using React and TypeScript',
        ja: 'React・TypeScriptを用いて社内ダッシュボード機能を3件開発・リリース',
      },
      {
        en: 'Collaborated with a team of 5 engineers in an agile workflow',
        ja: '5名のエンジニアチームでアジャイル開発に従事',
      },
    ],
  },
  {
    id: 'education-1',
    type: 'education',
    organization: 'University of Technology',
    role: { en: 'B.S. in Computer Science', ja: '情報工学学士' },
    period: '2023.09 - 2027.06 (expected)',
    location: 'Ho Chi Minh City, Vietnam',
    description: [
      {
        en: 'Coursework: Data Structures, Algorithms, Web Development, Computer Graphics',
        ja: '履修科目: データ構造、アルゴリズム、Web開発、コンピュータグラフィックス',
      },
    ],
  },
]
