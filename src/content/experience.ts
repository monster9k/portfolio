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
//
// Organization name/period/GPA sourced from the user's real resume PDF
// (FullStackBe_NguyenVietMinhKhoa_intern.pdf) — corrects earlier
// unconfirmed placeholder values.
export const experience: ExperienceEntry[] = [
  {
    id: 'education-1',
    type: 'education',
    organization: 'Da Nang University of Technology (DUT)',
    role: {
      en: 'Information Technology (Japan-Oriented Program)',
      ja: '情報技術学（日本語プログラム）',
    },
    period: '2024 - Present',
    location: 'Da Nang, Vietnam',
    gpa: '3.37/4.0',
    description: [
      {
        en: 'Developed strong foundations in software engineering principles, full-stack web development, and database management.',
        ja: 'ソフトウェア工学の基礎、フルスタックWeb開発、データベース管理について確かな基盤を築いています。',
      },
    ],
  },
]
