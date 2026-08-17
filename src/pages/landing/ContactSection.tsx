import { FiArrowRight, FiFileText, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { about } from '@/content/about'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'
import { RevealSection } from './RevealSection'

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
          <p className="landing-contact-card__intro">{t('sections.contact.body')}</p>

          {(contact.email || contact.phone || contact.location) && (
            <>
              <div className="landing-contact-card__divider" />

              <div className="landing-contact-card__grid">
                {contact.email && (
                  <div className="landing-contact-card__item">
                    <span className="landing-contact-card__item-label">
                      <FiMail aria-hidden="true" size={13} />
                      {t('fields.email')}
                    </span>
                    <a href={`mailto:${contact.email}`} className="landing-contact-card__item-value">
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact.phone && (
                  <div className="landing-contact-card__item">
                    <span className="landing-contact-card__item-label">
                      <FiPhone aria-hidden="true" size={13} />
                      {t('fields.phone')}
                    </span>
                    <a href={`tel:${contact.phone}`} className="landing-contact-card__item-value">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.location && (
                  <div className="landing-contact-card__item landing-contact-card__item--full">
                    <span className="landing-contact-card__item-label">
                      <FiMapPin aria-hidden="true" size={13} />
                      {t('fields.location')}
                    </span>
                    <span className="landing-contact-card__item-value">{contact.location}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {(hasLinks || resumeUrl) && <div className="landing-contact-card__divider" />}

          {hasLinks && (
            <div className="landing-contact-card__socials">
              {contact.links.github && (
                <a
                  href={contact.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="landing-contact-card__social-link"
                >
                  <FiGithub aria-hidden="true" />
                  {t('fields.github')}
                </a>
              )}
              {contact.links.linkedin && (
                <a
                  href={contact.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="landing-contact-card__social-link"
                >
                  <FiLinkedin aria-hidden="true" />
                  {t('fields.linkedin')}
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

          {contact.email && (
            <a href={`mailto:${contact.email}`} className="landing-contact-card__connect">
              {t('landing.sectionTitles.contactConnectCta')}
              <FiArrowRight aria-hidden="true" size={14} />
            </a>
          )}
        </div>
      </div>
    </RevealSection>
  )
}
