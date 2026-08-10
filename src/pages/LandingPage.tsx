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
import { useNavigate } from 'react-router-dom'
import { about } from '@/content/about'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const AVATAR_SIZE = 128

const PILL_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-1)',
  fontSize: 'var(--font-size-caption)',
  borderRadius: 999,
  padding: '4px 12px',
} as const

export function LandingPage() {
  const { t, language } = useTranslation()
  const navigate = useNavigate()

  const resumeUrl = about.resumeUrl || contact.resumeUrl
  const hasSocialLinks = contact.links.github || contact.links.linkedin || contact.links.website

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)',
        }}
      >
        <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-text)' }}>
          Orbit
        </span>
        <LanguageSwitcher />
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-6)',
          gap: 'var(--space-5)',
        }}
      >
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
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-2)',
            }}
          >
            {t('landing.eyebrow')}
          </p>
          {about.name && (
            <h1 style={{ fontSize: 'var(--font-size-title)', color: 'var(--color-text)' }}>{about.name}</h1>
          )}
          {about.title[language] && (
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-accent)',
                marginTop: 'var(--space-2)',
              }}
            >
              {about.title[language]}
            </p>
          )}
        </div>

        {about.tagline[language] && (
          <p
            style={{
              maxWidth: 520,
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {about.tagline[language]}
          </p>
        )}

        {(about.location || about.availability[language]) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-2)' }}>
            {about.location && (
              <span
                style={{
                  ...PILL_STYLE,
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-surface-border)',
                }}
              >
                <FiMapPin aria-hidden="true" size={13} />
                {about.location}
              </span>
            )}
            {about.availability[language] && (
              <span
                style={{
                  ...PILL_STYLE,
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-surface-border)',
                }}
              >
                <FiCalendar aria-hidden="true" size={13} />
                {about.availability[language]}
              </span>
            )}
          </div>
        )}

        {(contact.email || contact.phone || hasSocialLinks) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-2)' }}>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                style={{ ...PILL_STYLE, color: 'var(--color-accent)', background: 'var(--color-accent-soft)' }}
              >
                <FiMail aria-hidden="true" size={13} />
                <span className="sr-only">{t('fields.email')}: </span>
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                style={{ ...PILL_STYLE, color: 'var(--color-accent)', background: 'var(--color-accent-soft)' }}
              >
                <FiPhone aria-hidden="true" size={13} />
                <span className="sr-only">{t('fields.phone')}: </span>
                {contact.phone}
              </a>
            )}
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
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-2)',
          }}
        >
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-surface-border)',
                borderRadius: 999,
                padding: 'var(--space-2) var(--space-5)',
                textDecoration: 'none',
              }}
            >
              <FiFileText aria-hidden="true" />
              {t('landing.downloadCta')}
            </a>
          )}
          <button
            type="button"
            onClick={() => navigate('/explore')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-body)',
              fontWeight: 600,
              color: 'var(--color-bg-bottom)',
              background: 'var(--color-accent)',
              border: 'none',
              borderRadius: 999,
              padding: 'var(--space-2) var(--space-5)',
              cursor: 'pointer',
            }}
          >
            <span aria-hidden="true">🌌</span>
            {t('landing.exploreCta')}
          </button>
        </div>
      </main>
    </div>
  )
}
