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
}

// NOTE(user): entries render in the order listed here — put the most recent
// first. Same shape for both 'work' and 'education'; add/remove entries as
// needed. The two below are blank scaffolding, not sample data.
export const experience: ExperienceEntry[] = [
  {
    id: 'work-1',
    type: 'work',
    organization: '',
    role: { en: '', ja: '' },
    period: '',
    location: '',
    description: [],
  },
  {
    id: 'education-1',
    type: 'education',
    organization: '',
    role: { en: '', ja: '' },
    period: '',
    location: '',
    description: [],
  },
]
