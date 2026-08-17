import { FiFileText, FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { about } from '@/content/about'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'
import { RevealSection } from './RevealSection'

const PILL_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  fontSize: 'var(--font-size-body)',
  borderRadius: 999,
  padding: 'var(--space-2) var(--space-5)',
} as const

export function ContactSection() {
  const { t } = useTranslation()
  const hasLinks = contact.links.github || contact.links.linkedin || contact.links.website
  const resumeUrl = contact.resumeUrl || about.resumeUrl
  const hasAnyContent = contact.email || contact.phone || contact.location || hasLinks || resumeUrl

  if (!hasAnyContent) return null

  return (
    <RevealSection id="contact" ariaLabelledBy="contact-heading" className="landing-section">
      <div className="landing-section__inner" style={{ textAlign: 'center' }}>
        <h2 id="contact-heading" style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}>
          {t('landing.sectionTitles.contact')}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          {t('landing.sectionTitles.contactSubtitle')}
        </p>

        <div className="landing-contact-card">
          {(contact.email || contact.phone) && (
            <div className="landing-contact-card__pills">
              {contact.email && (
                <a href={`mailto:${contact.email}`} style={{ ...PILL_STYLE, color: 'var(--color-accent)', background: 'var(--color-accent-soft)' }}>
                  <FiMail aria-hidden="true" />
                  <span className="sr-only">{t('fields.email')}: </span>
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} style={{ ...PILL_STYLE, color: 'var(--color-text-secondary)', border: '1px solid var(--color-surface-border)' }}>
                  <FiPhone aria-hidden="true" />
                  <span className="sr-only">{t('fields.phone')}: </span>
                  {contact.phone}
                </a>
              )}
            </div>
          )}

          {contact.location && (
            <p className="landing-contact-card__location">
              <FiMapPin aria-hidden="true" />
              <span className="sr-only">{t('fields.location')}: </span>
              {contact.location}
            </p>
          )}

          {hasLinks && (
            <div className="landing-contact-card__socials">
              {contact.links.github && (
                <a href={contact.links.github} target="_blank" rel="noreferrer" aria-label={t('fields.github')} className="landing-icon-btn">
                  <FiGithub aria-hidden="true" />
                </a>
              )}
              {contact.links.linkedin && (
                <a href={contact.links.linkedin} target="_blank" rel="noreferrer" aria-label={t('fields.linkedin')} className="landing-icon-btn">
                  <FiLinkedin aria-hidden="true" />
                </a>
              )}
              {contact.links.website && (
                <a href={contact.links.website} target="_blank" rel="noreferrer" aria-label={t('fields.website')} className="landing-icon-btn">
                  <FiGlobe aria-hidden="true" />
                </a>
              )}
            </div>
          )}

          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="landing-contact-card__cta">
              <FiFileText aria-hidden="true" />
              {t('landing.downloadCta')}
            </a>
          )}
        </div>
      </div>
    </RevealSection>
  )
}
