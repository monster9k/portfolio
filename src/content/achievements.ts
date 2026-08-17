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
    /** TODO(user): link to view the certificate/proof itself — opened in the in-page CertificateModal. */
    certificate?: string
    /** TODO(user): link to the issuer's page about it. */
    external?: string
  }
  /** Visual grouping cluster shown in the Achievements section (language certs vs technical certs). */
  group: 'language' | 'tech'
  /** Gives the card a glow border + star badge to draw the eye to the most important entries first. Use sparingly. */
  featured?: boolean
}

// Real certificates. `links.certificate` opens in CertificateModal (see
// AchievementsSection.tsx) — a local PDF is shown via <iframe>, a HackerRank
// certificate URL is HackerRank's own iframe-embed endpoint.
export const achievements: AchievementEntry[] = [
  {
    id: 'ms-nlp-intro',
    category: 'certificate',
    title: 'Introduction to Natural Language Processing Concepts',
    issuer: 'Microsoft',
    date: '2026.08',
    description: {
      en: 'Microsoft Learn module covering core NLP concepts and techniques.',
      ja: 'Microsoft Learnモジュール。自然言語処理の基礎概念と手法を学習。',
    },
    tags: ['NLP', 'AI'],
    links: { certificate: '/certificates/ms-nlp-intro.pdf' },
    group: 'tech',
  },
  {
    id: 'ms-mcp-server',
    category: 'certificate',
    title: 'Introduction to MCP Servers',
    issuer: 'Microsoft',
    date: '2026.08',
    description: {
      en: 'Microsoft Learn module on building and using Model Context Protocol (MCP) servers.',
      ja: 'Microsoft Learnモジュール。MCP（Model Context Protocol）サーバーの構築と活用を学習。',
    },
    tags: ['MCP', 'AI Agent'],
    links: { certificate: '/certificates/ms-mcp-server.pdf' },
    group: 'tech',
  },
  {
    id: 'ms-ai-foundry-chat',
    category: 'certificate',
    title: 'Develop Generative AI Chat Apps with Microsoft Foundry',
    issuer: 'Microsoft',
    date: '2026.08',
    description: {
      en: 'Microsoft Learn module on building a generative AI chat application with Microsoft Foundry.',
      ja: 'Microsoft Learnモジュール。Microsoft Foundryを用いた生成AIチャットアプリの開発を学習。',
    },
    tags: ['Generative AI', 'Microsoft Foundry'],
    links: { certificate: '/certificates/ms-ai-foundry-chat.pdf' },
    group: 'tech',
    featured: true,
  },
  {
    // TODO(user): confirm this is actually "Problem Solving (Intermediate)" —
    // guessed from the earlier sample data's category, matched to the first
    // HackerRank link in the order you sent them.
    id: 'hackerrank-1',
    category: 'certificate',
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
    date: '',
    description: {
      en: 'Assesses data structures, algorithmic thinking, and optimized problem-solving under time constraints.',
      ja: 'データ構造、アルゴリズム思考、制限時間内での最適化された問題解決力を評価。',
    },
    tags: ['Algorithms', 'Data Structures'],
    links: { certificate: 'https://www.hackerrank.com/certificates/iframe/a6de5b698f31' },
    group: 'tech',
  },
  {
    // TODO(user): confirm this is actually "JavaScript (Intermediate)".
    id: 'hackerrank-2',
    category: 'certificate',
    title: 'JavaScript (Intermediate)',
    issuer: 'HackerRank',
    date: '',
    description: {
      en: 'Covers closures, async/await, prototypal inheritance, and DOM manipulation.',
      ja: 'クロージャ、async/await、プロトタイプ継承、DOM操作を網羅。',
    },
    tags: ['JavaScript', 'Async', 'DOM'],
    links: { certificate: 'https://www.hackerrank.com/certificates/iframe/ffa8775ae942' },
    group: 'tech',
  },
  {
    // TODO(user): confirm this is actually "SQL (Basic)".
    id: 'hackerrank-3',
    category: 'certificate',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: '2026.08',
    description: {
      en: 'Tests SQL fundamentals: SELECTs, filtering, sorting, and simple joins.',
      ja: 'SELECT、フィルタリング、ソート、単純な結合などSQLの基礎を評価。',
    },
    tags: ['SQL', 'Joins'],
    links: { certificate: 'https://www.hackerrank.com/certificates/iframe/d4333fa1f8a5' },
    group: 'tech',
  },
  {
    id: 'ielts',
    category: 'certificate',
    title: 'IELTS — 6.0',
    issuer: 'IELTS',
    date: '',
    description: {
      en: 'International English Language Testing System, overall band score 6.0.',
      ja: 'IELTS（国際英語能力テスト）総合スコア6.0。',
    },
    tags: ['English'],
    links: {},
    group: 'language',
    featured: true,
  },
  {
    id: 'jlpt-n4',
    category: 'certificate',
    title: 'JLPT N4',
    issuer: 'Japan Foundation',
    date: '',
    description: {
      en: 'Japanese Language Proficiency Test, N4 level.',
      ja: '日本語能力試験（JLPT）N4レベル合格。',
    },
    tags: ['Japanese'],
    links: {},
    group: 'language',
    featured: true,
  },
]
