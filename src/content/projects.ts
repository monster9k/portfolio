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
    // Sourced from the user's real resume PDF
    // (FullStackBe_NguyenVietMinhKhoa_intern.pdf) — replaces the earlier,
    // much thinner placeholder. TODO(user): add an exact period once you
    // have one; add a live demo link if/when the app is publicly hosted.
    id: 'tasknexus',
    name: 'TaskNexus',
    description: {
      en: 'A centralized platform that aggregates messages from Gmail, GitHub, and Slack into one unified inbox, letting users convert any incoming message into a trackable task with one click. Built as a team capstone project (PBL3).',
      ja: 'Gmail・GitHub・Slackからのメッセージを1つの受信箱に集約し、届いたメッセージをワンクリックで管理可能なタスクに変換できるプラットフォームです。チームのキャップストーンプロジェクト（PBL3）として開発しました。',
    },
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Zod', 'Docker'],
    role: { en: 'Project Leader', ja: 'プロジェクトリーダー' },
    period: '',
    links: { repo: 'https://github.com/dotrandannguyen/PBL3' },
    highlights: [
      {
        en: "Designed the backend architecture and database schema from scratch as Project Leader, coordinating the team's workflow and module ownership",
        ja: 'プロジェクトリーダーとしてバックエンドアーキテクチャとデータベーススキーマをゼロから設計し、チームのワークフローとモジュール分担を統括',
      },
      {
        en: 'Applied Clean Architecture (Router → Controller → Service → Repository → DTO) across the Auth and User modules',
        ja: 'AuthモジュールとUserモジュールにClean Architecture（Router → Controller → Service → Repository → DTO）を適用',
      },
      {
        en: 'Built centralized error handling with 5 custom exception classes (400/401/403/404/500)',
        ja: '5種類のカスタム例外クラス（400/401/403/404/500）による一元的なエラーハンドリングを構築',
      },
      {
        en: 'Implemented secure authentication with bcrypt password hashing, salt generation, and Zod-based request validation',
        ja: 'bcryptによるパスワードハッシュ化・ソルト生成とZodによるリクエストバリデーションで安全な認証を実装',
      },
      {
        en: 'Maintained the project across 149+ commits with full architecture documentation for team onboarding',
        ja: '149件以上のコミットでプロジェクトを維持し、チームのオンボーディング用にアーキテクチャドキュメントを整備',
      },
    ],
  },
  {
    // Sourced from the user's real resume PDF
    // (FullStackBe_NguyenVietMinhKhoa_intern.pdf) — replaces the earlier,
    // much thinner placeholder. TODO(user): add an exact period once you
    // have one; add a live demo link if/when the app is publicly hosted.
    id: 'algominds',
    name: 'Algominds',
    description: {
      en: 'A "Think-First" coding interview platform where users must justify their algorithmic strategy to an AI interviewer before the code editor unlocks, enforcing structured problem-solving over trial-and-error.',
      ja: '「Think-First」型のコーディング面接プラットフォームで、コードエディタが開放される前にAI面接官へアルゴリズム戦略を説明する必要があり、試行錯誤ではなく構造的な問題解決を促します。',
    },
    stack: ['NestJS', 'React', 'Vite', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.io', 'Google Gemini API'],
    role: { en: 'Full-stack Developer', ja: 'フルスタック開発' },
    period: '',
    links: { repo: 'https://github.com/monster9k/algominds-interview' },
    highlights: [
      {
        en: 'Architected a modular monolith with real-time session events via Socket.io and async AI-evaluation jobs via BullMQ',
        ja: 'Socket.ioによるリアルタイムのセッションイベントと、BullMQによる非同期AI評価ジョブを備えたモジュラーモノリスを設計',
      },
      {
        en: 'Integrated Monaco Editor for an in-browser coding experience',
        ja: 'ブラウザ内コーディング体験のためにMonaco Editorを統合',
      },
      {
        en: 'Integrated Piston, a containerized sandbox, to safely execute and grade submitted code across multiple languages',
        ja: 'コンテナ化されたサンドボックスPistonを統合し、複数言語の提出コードを安全に実行・採点',
      },
      {
        en: 'Maintained code quality across 350+ commits with automated linting (Husky + lint-staged) and CI via GitHub Actions',
        ja: '350件以上のコミットでコード品質を維持し、Husky + lint-stagedによる自動リンティングとGitHub ActionsによるCIを整備',
      },
    ],
  },
]
