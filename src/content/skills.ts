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

export interface SkillsContent {
  categories: SkillCategory[]
  /** Human languages you speak — standard on a Japanese resume (履歴書) and worth surfacing for this audience. */
  languages: SpokenLanguage[]
}

// NOTE(user): categories mirror common resume conventions (programming
// languages / frameworks & libraries / tools & platforms / soft skills).
// Add/remove/rename categories as needed — just keep a matching label in
// en.json/ja.json under "skillCategories.<id>". Every `items`/`languages`
// array below is intentionally empty for you to fill in.
export const skills: SkillsContent = {
  categories: [
    { id: 'languages', labelKey: 'skillCategories.languages', items: [] },
    { id: 'frameworks', labelKey: 'skillCategories.frameworks', items: [] },
    { id: 'tools', labelKey: 'skillCategories.tools', items: [] },
    { id: 'soft', labelKey: 'skillCategories.soft', items: [] },
  ],
  languages: [],
}
