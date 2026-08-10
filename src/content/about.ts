import type { LocalizedText } from './sections'

export interface AboutContent {
  /** TODO(user): your full name, as you want it displayed. */
  name: string
  /** TODO(user): your target role/title, e.g. "Software Engineering Intern". */
  title: LocalizedText
  /** TODO(user): one-line hook shown under your name/title. */
  tagline: LocalizedText
  /** TODO(user): "City, Country". */
  location: string
  /** TODO(user): what you're currently looking for, e.g. "Open to Summer 2027 internships". */
  availability: LocalizedText
  /** TODO(user): path under public/ (e.g. "/photo.jpg") or a hosted URL. Leave empty to hide the avatar. */
  photoUrl: string
  /** TODO(user): link to a hosted PDF resume/CV. Leave empty to hide the download link. */
  resumeUrl: string
}

// NOTE(user): every field below is intentionally blank — fill in your own
// details. Nothing here is sample/placeholder copy (unlike projects.ts).
export const about: AboutContent = {
  name: '',
  title: { en: '', ja: '' },
  tagline: { en: '', ja: '' },
  location: '',
  availability: { en: '', ja: '' },
  photoUrl: '',
  resumeUrl: '',
}
