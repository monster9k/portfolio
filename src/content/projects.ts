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

// TODO(user): add your real projects here, e.g.:
// {
//   id: 'my-project',
//   name: 'My Project',
//   description: { en: '...', ja: '...' },
//   stack: ['React', 'TypeScript'],
//   role: { en: 'Solo developer', ja: '個人開発' },
//   period: '2025.04 - 2025.09',
//   links: { repo: 'https://github.com/...', demo: 'https://...' },
//   highlights: [{ en: '...', ja: '...' }],
// }
export const projects: ProjectEntry[] = []
