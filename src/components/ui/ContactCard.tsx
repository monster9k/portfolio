import { FiFileText, FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'

const PILL_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  fontSize: 'var(--font-size-caption)',
  borderRadius: 999,
  padding: '4px 12px',
} as const

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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              style={{
                ...PILL_STYLE,
                color: 'var(--color-accent)',
                background: 'var(--color-accent-soft)',
              }}
            >
              <FiMail aria-hidden="true" size={13} />
              <span className="sr-only">{t('fields.email')}: </span>
              {contact.email}
            </a>
          )}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              style={{
                ...PILL_STYLE,
                color: 'var(--color-accent)',
                background: 'var(--color-accent-soft)',
              }}
            >
              <FiPhone aria-hidden="true" size={13} />
              <span className="sr-only">{t('fields.phone')}: </span>
              {contact.phone}
            </a>
          )}
          {contact.location && (
            <span
              style={{
                ...PILL_STYLE,
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
              }}
            >
              <FiMapPin aria-hidden="true" size={13} />
              <span className="sr-only">{t('fields.location')}: </span>
              {contact.location}
            </span>
          )}
        </div>
      )}

      {(hasLinks || contact.resumeUrl) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {contact.links.github && (
            <a
              href={contact.links.github}
              target="_blank"
              rel="noreferrer"
              style={{
                ...PILL_STYLE,
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
              }}
            >
              <FiGithub aria-hidden="true" size={13} />
              {t('fields.github')}
            </a>
          )}
          {contact.links.linkedin && (
            <a
              href={contact.links.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                ...PILL_STYLE,
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
              }}
            >
              <FiLinkedin aria-hidden="true" size={13} />
              {t('fields.linkedin')}
            </a>
          )}
          {contact.links.website && (
            <a
              href={contact.links.website}
              target="_blank"
              rel="noreferrer"
              style={{
                ...PILL_STYLE,
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
              }}
            >
              <FiGlobe aria-hidden="true" size={13} />
              {t('fields.website')}
            </a>
          )}
          {contact.resumeUrl && (
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                ...PILL_STYLE,
                color: 'var(--color-accent)',
                background: 'var(--color-accent-soft)',
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
