import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import en from './en.json'
import ja from './ja.json'
import { I18nContext, type Language, type I18nContextValue } from './context'

const dictionaries = { en, ja } satisfies Record<Language, unknown>

function resolve(dict: unknown, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, dict)

  if (typeof value !== 'string') {
    if (import.meta.env.DEV) console.warn(`[i18n] Missing key: "${path}"`)
    return path
  }
  return value
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (path: string) => resolve(dictionaries[language], path),
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
