import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'

export function ContactCard() {
  const { t } = useTranslation()

  const hasLinks = contact.links.github || contact.links.linkedin || contact.links.website
  const hasAnyContent = contact.email || contact.phone || contact.location || hasLinks || contact.resumeUrl

  if (!hasAnyContent) {
    return (
      <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
        {t('fields.comingSoon')}
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {(contact.email || contact.phone || contact.location) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {contact.email && (
            <span>
              {t('fields.email')}:{' '}
              <a href={`mailto:${contact.email}`} style={{ color: 'var(--color-accent)' }}>
                {contact.email}
              </a>
            </span>
          )}
          {contact.phone && (
            <span>
              {t('fields.phone')}:{' '}
              <a href={`tel:${contact.phone}`} style={{ color: 'var(--color-accent)' }}>
                {contact.phone}
              </a>
            </span>
          )}
          {contact.location && (
            <span>
              {t('fields.location')}: {contact.location}
            </span>
          )}
        </div>
      )}

      {(hasLinks || contact.resumeUrl) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {contact.links.github && (
            <a
              href={contact.links.github}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
            >
              {t('fields.github')}
            </a>
          )}
          {contact.links.linkedin && (
            <a
              href={contact.links.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
            >
              {t('fields.linkedin')}
            </a>
          )}
          {contact.links.website && (
            <a
              href={contact.links.website}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
            >
              {t('fields.website')}
            </a>
          )}
          {contact.resumeUrl && (
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
            >
              {t('fields.resume')}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
