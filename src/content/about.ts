import type { LocalizedText } from './sections'

export interface StatEntry {
  /** TODO(user): the number/figure itself, e.g. "2+", "6+". */
  value: string
  /** i18n key resolving to the stat's label (see en.json/ja.json "landing.stats"). */
  labelKey: string
}

export interface AboutContent {
  /** Full name, localized: EN uses the no-diacritics romanization, JA uses katakana. */
  name: LocalizedText
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
  /** TODO(user): 3 small headline figures shown as stat cards on the landing page About section. */
  stats: StatEntry[]
}

export const about: AboutContent = {
  name: { en: 'Nguyen Viet Minh Khoa', ja: 'グエン・ビエット・ミン・コア' },
  title: {
    en: 'Full-stack / Backend Developer Intern Candidate',
    ja: 'フルスタック／バックエンド開発 インターン候補',
  },
  tagline: {
    en: 'Building playful, polished 3D web experiences.',
    ja: '遊び心があり洗練された3D Web体験を作っています。',
  },
  location: 'Da Nang, Vietnam',
  availability: {
    en: 'Open to internships starting around September 2026',
    ja: '2026年9月頃からのインターンシップに応募可能',
  },
  photoUrl: '/photo.jpg',
  resumeUrl: '/resume.pdf',
  stats: [
    { value: '2+', labelKey: 'landing.stats.yearsCoding' },
    { value: '3+', labelKey: 'landing.stats.projectsBuilt' },
    { value: '8+', labelKey: 'landing.stats.certificates' },
  ],
}
