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
    // TODO(user): add a repo/demo link and exact period once you have them;
    // add the frontend/backend framework to `stack` if you want a fuller list
    // (only the deploy platforms you gave were confirmed, so that's all
    // that's listed here).
    id: 'tasknexus',
    name: 'TaskNexus',
    description: {
      en: 'A cross-platform task and messaging management platform, built as a team capstone project (PBL3).',
      ja: 'チームのキャップストーンプロジェクト（PBL3）として開発した、タスクとメッセージ管理のクロスプラットフォームです。',
    },
    stack: ['Render', 'Vercel', 'Supabase', 'Upstash Redis'],
    role: { en: 'Project Leader', ja: 'プロジェクトリーダー' },
    period: '',
    links: {},
    highlights: [
      {
        en: 'Cross-platform task and messaging management built for teams',
        ja: 'チーム向けのクロスプラットフォームなタスク・メッセージ管理',
      },
      {
        en: 'Led the team as Project Leader for this PBL3 capstone project',
        ja: 'PBL3キャップストーンプロジェクトでプロジェクトリーダーを担当',
      },
      {
        en: 'Deployed with a modern serverless stack: Render, Vercel, Supabase, and Upstash Redis',
        ja: 'Render、Vercel、Supabase、Upstash Redisを用いたモダンなサーバーレス構成でデプロイ',
      },
    ],
  },
  {
    // TODO(user): add a repo/demo link and exact period once you have them;
    // add the frontend/backend framework to `stack` if you want a fuller list
    // (only the Gemini API you mentioned was confirmed, so that's all
    // that's listed here).
    id: 'algominds',
    name: 'Algominds',
    description: {
      en: 'An AI-powered coding interview simulator inspired by LeetCode, giving real-time feedback on your solutions.',
      ja: 'LeetCodeスタイルのAIコーディング面接シミュレーターで、解答にリアルタイムのフィードバックを提供します。',
    },
    stack: ['Google Gemini API'],
    role: { en: 'Solo developer', ja: '個人開発' },
    period: '',
    links: {},
    highlights: [
      {
        en: 'Simulates LeetCode-style coding interviews with AI-generated feedback',
        ja: 'LeetCode形式のコーディング面接をAIによるフィードバック付きでシミュレート',
      },
      {
        en: 'Powered by the Google Gemini API for real-time solution evaluation',
        ja: 'Google Gemini APIによる解答のリアルタイム評価',
      },
    ],
  },
]
