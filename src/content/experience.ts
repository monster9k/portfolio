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
// are zero 'work' entries). Only education entries remain.
//
// TODO(user): confirm exact major/enrollment dates for Đại học Bách Khoa Đà
// Nẵng — dates below are a placeholder estimate (student currently pursuing
// the degree, no formal work experience yet), not yet confirmed by you.
export const experience: ExperienceEntry[] = [
  {
    id: 'education-1',
    type: 'education',
    organization: 'Danang University of Science and Technology',
    role: { en: 'B.S. in Computer Science', ja: '情報工学学士' },
    period: '2022.09 - 2026.06 (expected)',
    location: 'Da Nang, Vietnam',
    description: [
      {
        en: 'Coursework: Data Structures, Algorithms, Web Development, Software Engineering',
        ja: '履修科目: データ構造、アルゴリズム、Web開発、ソフトウェア工学',
      },
    ],
  },
  {
    id: 'education-2',
    type: 'education',
    organization: 'Phan Chau Trinh High School',
    role: { en: 'High School Diploma', ja: '高等学校卒業' },
    period: '2019.09 - 2022.06',
    location: 'Da Nang, Vietnam',
    description: [
      {
        en: 'General high school education in Da Nang.',
        ja: 'ダナン市内の高等学校を卒業。',
      },
    ],
  },
]
