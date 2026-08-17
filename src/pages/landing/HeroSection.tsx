import {
  FiCalendar,
  FiFileText,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { about } from '@/content/about'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const AVATAR_SIZE = 220

export function HeroSection() {
  const { t, language } = useTranslation()
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()

  const resumeUrl = about.resumeUrl || contact.resumeUrl
  const hasSocialLinks = contact.links.github || contact.links.linkedin || contact.links.website

  const entranceProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section id="hero" aria-labelledby="hero-heading" className="landing-hero">
      <div className="landing-section__inner landing-hero__inner">
        <motion.div
          {...entranceProps}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            maxWidth: 560,
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {t('landing.eyebrow')}
          </p>

          <div>
            {about.name[language] && (
              <h1
                id="hero-heading"
                style={{ fontSize: 'var(--font-size-hero)', color: 'var(--color-text)' }}
              >
                {about.name[language]}
              </h1>
            )}
            {about.title[language] && (
              <p
                style={{
                  fontSize: 'var(--font-size-title)',
                  color: 'var(--color-accent)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {about.title[language]}
              </p>
            )}
          </div>

          {about.tagline[language] && (
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text-secondary)' }}>
              {about.tagline[language]}
            </p>
          )}

          {(about.location ||
            about.availability[language] ||
            contact.email ||
            contact.phone ||
            hasSocialLinks) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {(about.location || about.availability[language]) && (
                <div className="landing-hero__meta">
                  {about.location && (
                    <span className="landing-hero__meta-item">
                      <FiMapPin aria-hidden="true" size={13} />
                      {about.location}
                    </span>
                  )}
                  {about.availability[language] && (
                    <span className="landing-hero__meta-item">
                      <FiCalendar aria-hidden="true" size={13} />
                      {about.availability[language]}
                    </span>
                  )}
                </div>
              )}

              {(contact.email || contact.phone || hasSocialLinks) && (
                <div className="landing-hero__contact">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="landing-hero__contact-pill landing-hero__contact-pill--accent"
                    >
                      <FiMail aria-hidden="true" size={13} />
                      <span className="sr-only">{t('fields.email')}: </span>
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className="landing-hero__contact-pill">
                      <FiPhone aria-hidden="true" size={13} />
                      <span className="sr-only">{t('fields.phone')}: </span>
                      {contact.phone}
                    </a>
                  )}
                  {hasSocialLinks && (
                    <div className="landing-hero__social">
                      {contact.links.github && (
                        <a
                          href={contact.links.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t('fields.github')}
                          className="landing-icon-btn"
                        >
                          <FiGithub aria-hidden="true" />
                        </a>
                      )}
                      {contact.links.linkedin && (
                        <a
                          href={contact.links.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t('fields.linkedin')}
                          className="landing-icon-btn"
                        >
                          <FiLinkedin aria-hidden="true" />
                        </a>
                      )}
                      {contact.links.website && (
                        <a
                          href={contact.links.website}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t('fields.website')}
                          className="landing-icon-btn"
                        >
                          <FiGlobe aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-3)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              {t('landing.exploreCtaHint')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="landing-hero__cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-title)',
                  fontWeight: 700,
                  color: 'var(--color-bg-bottom)',
                  background:
                    'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-secondary) 100%)',
                  border: 'none',
                  borderRadius: 999,
                  padding: 'var(--space-3) var(--space-8)',
                  cursor: 'pointer',
                  transition: 'transform var(--motion-duration) var(--motion-ease)',
                }}
              >
                <span aria-hidden="true">🌌</span>
                {t('landing.exploreCta')}
              </button>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-surface-border)',
                    borderRadius: 999,
                    padding: 'var(--space-2) var(--space-4)',
                    textDecoration: 'none',
                  }}
                >
                  <FiFileText aria-hidden="true" />
                  {t('landing.downloadCta')}
                </a>
              )}
            </div>
          </div>
        </motion.div>

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
            <FiUser
              aria-hidden="true"
              size={AVATAR_SIZE * 0.45}
              color="var(--color-text-secondary)"
            />
          )}
        </div>
      </div>
    </section>
  )
}
