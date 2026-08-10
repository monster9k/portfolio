import { about } from '@/content/about'
import { useTranslation } from '@/i18n/useTranslation'

export function AboutCard() {
  const { t, language } = useTranslation()

  const hasAnyContent =
    about.name ||
    about.title[language] ||
    about.tagline[language] ||
    about.location ||
    about.availability[language] ||
    about.resumeUrl

  if (!hasAnyContent) {
    return (
      <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
        {t('fields.comingSoon')}
      </p>
    )
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      {(about.name || about.title[language]) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {about.photoUrl && (
            <img
              src={about.photoUrl}
              alt=""
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid var(--color-surface-border)',
              }}
            />
          )}
          <div>
            {about.name && (
              <div style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-body)' }}>
                {about.name}
              </div>
            )}
            {about.title[language] && (
              <div
                style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}
              >
                {about.title[language]}
              </div>
            )}
          </div>
        </div>
      )}

      {about.tagline[language] && (
        <p
          style={{
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-caption)',
            fontStyle: 'italic',
          }}
        >
          {about.tagline[language]}
        </p>
      )}

      {(about.location || about.availability[language]) && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {about.location && (
            <span>
              {t('fields.location')}: {about.location}
            </span>
          )}
          {about.availability[language] && (
            <span>
              {t('fields.availability')}: {about.availability[language]}
            </span>
          )}
        </div>
      )}

      {about.resumeUrl && (
        <a
          href={about.resumeUrl}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
        >
          {t('fields.resume')}
        </a>
      )}
    </div>
  )
}
