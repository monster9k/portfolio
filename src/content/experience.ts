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
  /** TODO(user, education only): e.g. "3.7/4.0". Leave empty to hide. */
  gpa?: string
  /** TODO(user, education only): scholarships, honors, etc. Leave empty/omit to hide. */
  achievements?: LocalizedText[]
}

// NOTE(user): entries render in the order listed here — put the most recent
// first. Same shape for both 'work' and 'education'; add/remove entries as
// needed. The entries below are realistic sample copy so you can preview the
// layout — swap them for your own (same convention as projects.ts).
export const experience: ExperienceEntry[] = [
  {
    id: 'work-2',
    type: 'work',
    organization: 'PixelForge Studio',
    role: { en: 'Web Development Intern', ja: 'Web開発インターン' },
    period: '2026.01 - 2026.05',
    location: 'Ho Chi Minh City, Vietnam',
    description: [
      {
        en: 'Rebuilt the marketing site with React and Three.js, improving Lighthouse performance score by 30%',
        ja: 'React・Three.jsでマーケティングサイトを刷新し、Lighthouseパフォーマンススコアを30%改善',
      },
      {
        en: 'Paired with senior engineers on code review and CI pipeline setup',
        ja: 'シニアエンジニアとペアを組み、コードレビューとCIパイプライン構築に従事',
      },
    ],
  },
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
    gpa: '3.7/4.0',
    description: [
      {
        en: 'Coursework: Data Structures, Algorithms, Web Development, Computer Graphics',
        ja: '履修科目: データ構造、アルゴリズム、Web開発、コンピュータグラフィックス',
      },
    ],
    achievements: [
      { en: 'Merit-based tuition scholarship, 4 consecutive semesters', ja: '成績優秀による学費奨学金を4学期連続で受給' },
    ],
  },
  {
    id: 'education-2',
    type: 'education',
    organization: 'Le Quy Don High School for the Gifted',
    role: { en: 'High School Diploma, Computer Science track', ja: '高等学校卒業（情報科学専攻）' },
    period: '2020.09 - 2023.06',
    location: 'Ho Chi Minh City, Vietnam',
    description: [
      {
        en: 'Specialized computer science program with a focus on algorithms and competitive programming',
        ja: 'アルゴリズムと競技プログラミングに重点を置いた情報科学専攻プログラム',
      },
    ],
    achievements: [
      { en: 'City-level Informatics Olympiad, 3rd place', ja: '市レベル情報オリンピック 第3位' },
    ],
  },
]
