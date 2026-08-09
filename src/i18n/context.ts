import { createContext } from 'react'

export type Language = 'en' | 'ja'

export interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)
