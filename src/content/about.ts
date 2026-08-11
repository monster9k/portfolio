import type { LocalizedText } from './sections'

export interface StatEntry {
  /** TODO(user): the number/figure itself, e.g. "2+", "6+". */
  value: string
  /** i18n key resolving to the stat's label (see en.json/ja.json "landing.stats"). */
  labelKey: string
}

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
  /** TODO(user): 3 small headline figures shown as stat cards on the landing page About section. */
  stats: StatEntry[]
}

// NOTE(user): the values below are realistic sample copy so you can preview
// the layout — swap them for your own details (same convention as
// projects.ts). photoUrl/resumeUrl are left blank since there's no real
// asset to point to yet. `stats` are intentionally modest/plausible for a
// student/intern profile rather than copied from any reference site.
export const about: AboutContent = {
  name: 'Alex Tran',
  title: { en: 'Software Engineering Intern Candidate', ja: 'ソフトウェアエンジニアリング インターン候補' },
  tagline: {
    en: 'Building playful, polished 3D web experiences.',
    ja: '遊び心があり洗練された3D Web体験を作っています。',
  },
  location: 'Ho Chi Minh City, Vietnam',
  availability: { en: 'Open to Summer 2027 internships', ja: '2027年夏季インターンシップ募集中' },
  photoUrl: '',
  resumeUrl: '',
  stats: [
    { value: '2+', labelKey: 'landing.stats.yearsCoding' },
    { value: '6+', labelKey: 'landing.stats.projectsBuilt' },
    { value: '5+', labelKey: 'landing.stats.certificates' },
  ],
}
