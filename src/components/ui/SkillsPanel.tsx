import { skills } from '@/content/skills'
import { useTranslation } from '@/i18n/useTranslation'

export function SkillsPanel() {
  const { t } = useTranslation()

  const populatedCategories = skills.categories.filter((category) => category.items.length > 0)
  const hasAnyContent = populatedCategories.length > 0 || skills.languages.length > 0

  if (!hasAnyContent) {
    return (
      <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
        {t('fields.comingSoon')}
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {populatedCategories.map((category) => (
        <div key={category.id}>
          <h3
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {t(category.labelKey)}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {category.items.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-accent)',
                  background: 'var(--color-accent-soft)',
                  borderRadius: 999,
                  padding: '2px 10px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

      {skills.languages.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {t('fields.languagesSpoken')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {skills.languages.map((entry) => (
              <span
                key={entry.language}
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-surface-border)',
                  borderRadius: 999,
                  padding: '2px 10px',
                }}
              >
                {entry.language} — {entry.level}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
