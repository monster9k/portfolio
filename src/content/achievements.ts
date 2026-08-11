import type { LocalizedText } from './sections'

export type AchievementCategory = 'award' | 'certificate' | 'recognition' | 'competition'

export interface AchievementEntry {
  id: string
  category: AchievementCategory
  /** TODO(user): award/certificate/competition name. */
  title: string
  /** TODO(user): issuing organization, e.g. "HackerRank", "University of Technology". */
  issuer: string
  /** TODO(user): e.g. "2026" or "2026.03". Leave empty to hide. */
  date: string
  description: LocalizedText
  /** TODO(user): short skill/topic tags shown as pills. */
  tags: string[]
  links?: {
    /** TODO(user): link to view the certificate/proof itself. */
    certificate?: string
    /** TODO(user): link to the issuer's page about it. */
    external?: string
  }
}

// NOTE(user): realistic sample copy so you can preview the layout — swap
// for your own (same convention as projects.ts). Spans all 4 categories so
// the landing page's filter tabs have something to filter.
export const achievements: AchievementEntry[] = [
  {
    id: 'hackathon-2026',
    category: 'award',
    title: 'HCMC Student Hackathon — 1st Place',
    issuer: 'HCMC University Alliance',
    date: '2026.03',
    description: {
      en: 'Led a 4-person team to build an accessibility-focused campus navigation app in 24 hours.',
      ja: '4人チームを率い、24時間でアクセシビリティ重視のキャンパスナビアプリを開発。',
    },
    tags: ['Team Lead', 'React Native', 'Accessibility'],
    links: {},
  },
  {
    id: 'hackerrank-problem-solving',
    category: 'certificate',
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
    date: '2026.02',
    description: {
      en: 'Assesses data structures, algorithmic thinking, and optimized problem-solving under time constraints.',
      ja: 'データ構造、アルゴリズム思考、制限時間内での最適化された問題解決力を評価。',
    },
    tags: ['Algorithms', 'Data Structures'],
    links: { certificate: '', external: 'https://www.hackerrank.com/' },
  },
  {
    id: 'hackerrank-js',
    category: 'certificate',
    title: 'JavaScript (Intermediate)',
    issuer: 'HackerRank',
    date: '2025.11',
    description: {
      en: 'Covers closures, async/await, prototypal inheritance, and DOM manipulation.',
      ja: 'クロージャ、async/await、プロトタイプ継承、DOM操作を網羅。',
    },
    tags: ['JavaScript', 'Async', 'DOM'],
    links: { certificate: '', external: 'https://www.hackerrank.com/' },
  },
  {
    id: 'deans-list',
    category: 'recognition',
    title: "Dean's List",
    issuer: 'University of Technology',
    date: '2025 - 2026',
    description: {
      en: 'Recognized for maintaining a top-decile GPA for two consecutive academic years.',
      ja: '2年連続で上位10%のGPAを維持し表彰。',
    },
    tags: ['Academic Excellence'],
    links: {},
  },
  {
    id: 'icpc-regional',
    category: 'competition',
    title: 'ICPC Asia Regional — Honorable Mention',
    issuer: 'ICPC Foundation',
    date: '2025.11',
    description: {
      en: 'Competed in a 3-person team solving algorithmic problems under a 5-hour contest window.',
      ja: '3人チームで参加し、5時間の競技時間内でアルゴリズム問題を解く大会に出場。',
    },
    tags: ['Competitive Programming', 'C++'],
    links: { external: 'https://icpc.global/' },
  },
  {
    id: 'hackerrank-sql',
    category: 'certificate',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: '2025.09',
    description: {
      en: 'Tests SQL fundamentals: SELECTs, filtering, sorting, and simple joins.',
      ja: 'SELECT、フィルタリング、ソート、単純な結合などSQLの基礎を評価。',
    },
    tags: ['SQL', 'Joins'],
    links: { certificate: '', external: 'https://www.hackerrank.com/' },
  },
]
