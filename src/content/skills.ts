import type { LocalizedText } from './sections'

export interface SkillCategory {
  id: string
  /** i18n key resolving to the category label (see en.json/ja.json "skillCategories"). */
  labelKey: string
  /** TODO(user): fill in your skills for this category. */
  items: string[]
}

export interface SpokenLanguage {
  /** TODO(user): e.g. "Japanese", "English". */
  language: string
  /** TODO(user): e.g. "JLPT N2", "Native", "Business level". */
  level: string
}

export interface LeadershipHighlight {
  /** e.g. "Project Leader". */
  role: LocalizedText
  /** e.g. "TaskNexus (PBL3 capstone project)". Proper noun, kept as-is across locales. */
  org: string
}

export interface SkillsContent {
  categories: SkillCategory[]
  /** Human languages you speak — standard on a Japanese resume (履歴書) and worth surfacing for this audience. */
  languages: SpokenLanguage[]
  /** Concrete evidence for soft skills (leadership roles held), shown alongside the plain "soft" category pills. */
  leadership: LeadershipHighlight[]
}

// NOTE(user): categories mirror common resume conventions (programming
// languages / frameworks & libraries / tools & platforms / soft skills).
// Add/remove/rename categories as needed — just keep a matching label in
// en.json/ja.json under "skillCategories.<id>". Items/languages below are
// realistic sample copy so you can preview the layout — swap them for your
// own (same convention as projects.ts).
export const skills: SkillsContent = {
  categories: [
    {
      id: 'languages',
      labelKey: 'skillCategories.languages',
      items: ['JavaScript', 'TypeScript', 'Java', 'C#'],
    },
    {
      id: 'frameworks',
      labelKey: 'skillCategories.frameworks',
      items: ['React', 'Node.js', 'NestJS', 'Prisma', 'MongoDB', 'SQL', 'Google Gemini API'],
    },
    {
      id: 'tools',
      labelKey: 'skillCategories.tools',
      items: ['Git', 'Docker', 'VS Code'],
    },
    {
      id: 'soft',
      labelKey: 'skillCategories.soft',
      items: ['Communication', 'Teamwork', 'Problem Solving'],
    },
  ],
  languages: [
    { language: 'Vietnamese', level: 'Native' },
    { language: 'English', level: 'IELTS 6.0' },
    { language: 'Japanese', level: 'JLPT N4' },
  ],
  leadership: [
    {
      role: { en: 'Project Leader', ja: 'プロジェクトリーダー' },
      org: 'TaskNexus (PBL3 capstone project)',
    },
    {
      role: { en: 'Team Leader', ja: 'チームリーダー' },
      org: 'Japanese Speech Contest',
    },
  ],
}
