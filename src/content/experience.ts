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

// No formal work experience yet — user asked to drop the landing page's
// Experience section entirely (ExperienceSection.tsx self-hides once there
// are zero 'work' entries). Only education remains, and only the university
// entry — the user asked to drop the High School line (not useful for a
// university-student IT portfolio) and use that space for GPA instead.
export const experience: ExperienceEntry[] = [
  {
    id: 'education-1',
    type: 'education',
    organization: 'Danang University of Science and Technology',
    role: {
      en: 'B.S. in Information Technology (Japan-Oriented Program)',
      ja: '情報技術学士（日本語プログラム）',
    },
    period: '2022.09 - Early 2028 (expected)',
    location: 'Da Nang, Vietnam',
    gpa: '3.3/4.0',
    description: [
      {
        en: 'Coursework: Data Structures, Algorithms, Web Development, Software Engineering',
        ja: '履修科目: データ構造、アルゴリズム、Web開発、ソフトウェア工学',
      },
    ],
  },
]
