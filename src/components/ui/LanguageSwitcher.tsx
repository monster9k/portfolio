import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/i18n/context'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  return (
    <div role="group" aria-label="Language" style={{ display: 'flex', gap: 'var(--space-1)' }}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          style={{
            background: language === code ? 'var(--color-accent-soft)' : 'transparent',
            color: language === code ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            border: '1px solid var(--color-surface-border)',
            borderRadius: 999,
            padding: '4px 12px',
            fontSize: 'var(--font-size-caption)',
            cursor: 'pointer',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
