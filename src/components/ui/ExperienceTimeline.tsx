import { experience } from '@/content/experience'
import { useTranslation } from '@/i18n/useTranslation'

export function ExperienceTimeline() {
  const { t, language } = useTranslation()

  const populatedEntries = experience.filter(
    (entry) => entry.organization || entry.role[language] || entry.description.length > 0,
  )

  if (populatedEntries.length === 0) {
    return (
      <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
        {t('fields.comingSoon')}
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {populatedEntries.map((entry) => (
        <article
          key={entry.id}
          style={{
            border: '1px solid var(--color-surface-border)',
            borderRadius: 12,
            padding: 'var(--space-4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-1)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-accent)',
                background: 'var(--color-accent-soft)',
                borderRadius: 999,
                padding: '2px 10px',
              }}
            >
              {t(`fields.experienceType.${entry.type}`)}
            </span>
            {entry.period && (
              <span
                style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}
              >
                {entry.period}
              </span>
            )}
          </div>

          {entry.organization && (
            <h3 style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              {entry.organization}
            </h3>
          )}
          {(entry.role[language] || entry.location) && (
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-secondary)',
                margin: 'var(--space-1) 0 var(--space-2)',
              }}
            >
              {[entry.role[language], entry.location].filter(Boolean).join(' · ')}
            </p>
          )}

          {entry.description.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
              {entry.description.map((line, index) => (
                <li
                  key={index}
                  style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}
                >
                  {line[language]}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}
