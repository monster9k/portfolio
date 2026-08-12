import { FiCalendar, FiFileText, FiMapPin, FiUser } from 'react-icons/fi'
import { about } from '@/content/about'
import { useTranslation } from '@/i18n/useTranslation'

const AVATAR_SIZE = 96

export function AboutCard() {
  const { t, language } = useTranslation()

  const hasAnyContent =
    about.name[language] ||
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <div
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: '50%',
            flexShrink: 0,
            overflow: 'hidden',
            background: 'var(--color-accent-soft)',
            border: '1px solid var(--color-accent-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {about.photoUrl ? (
            <img
              src={about.photoUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <FiUser aria-hidden="true" size={AVATAR_SIZE * 0.45} color="var(--color-text-secondary)" />
          )}
        </div>
        <div>
          {about.name[language] && (
            <div style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-title)' }}>
              {about.name[language]}
            </div>
          )}
          {about.title[language] && (
            <div
              style={{
                color: 'var(--color-accent)',
                fontSize: 'var(--font-size-caption)',
                marginTop: 'var(--space-1)',
              }}
            >
              {about.title[language]}
            </div>
          )}
        </div>
      </div>

      {about.tagline[language] && (
        <p
          style={{
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-body)',
            fontStyle: 'italic',
          }}
        >
          {about.tagline[language]}
        </p>
      )}

      {(about.location || about.availability[language] || about.resumeUrl) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {about.location && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
                borderRadius: 999,
                padding: '4px 12px',
              }}
            >
              <FiMapPin aria-hidden="true" size={13} />
              <span className="sr-only">{t('fields.location')}: </span>
              {about.location}
            </span>
          )}
          {about.availability[language] && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
                borderRadius: 999,
                padding: '4px 12px',
              }}
            >
              <FiCalendar aria-hidden="true" size={13} />
              <span className="sr-only">{t('fields.availability')}: </span>
              {about.availability[language]}
            </span>
          )}
          {about.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-accent)',
                background: 'var(--color-accent-soft)',
                borderRadius: 999,
                padding: '4px 12px',
              }}
            >
              <FiFileText aria-hidden="true" size={13} />
              {t('fields.resume')}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
