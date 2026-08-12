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

// Real certificates. The 3 Microsoft Learn ones link to a local screenshot
// under public/certificates/ as proof (drop the matching PNGs there — see
// roadmap.md Phase N). IELTS/JLPT have no certificate image yet.
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
    links: { certificate: '/certificates/ms-nlp-intro.png' },
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
    links: { certificate: '/certificates/ms-mcp-server.png' },
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
    links: { certificate: '/certificates/ms-ai-foundry-chat.png' },
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
  },
]
