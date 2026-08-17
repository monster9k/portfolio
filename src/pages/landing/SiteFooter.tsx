import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { about } from '@/content/about'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'

const NAV_ITEMS = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'contact', labelKey: 'nav.contact' },
]

export function SiteFooter() {
  const { t, language } = useTranslation()

  return (
    <footer className="landing-footer">
      <div className="landing-section__inner landing-footer__grid">
        <div>
          <h2
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-3)',
            }}
          >
            {t('landing.footer.aboutHeading')} {about.name[language]}
          </h2>
          {about.tagline[language] && (
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {about.tagline[language]}
            </p>
          )}
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
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
          </div>
        </div>

        <div>
          <h2
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-3)',
            }}
          >
            {t('landing.footer.quickLinks')}
          </h2>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                  }}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-3)',
            }}
          >
            {t('landing.footer.contactInfo')}
          </h2>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {contact.email && (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <FiMail aria-hidden="true" size={13} />
                <a
                  href={`mailto:${contact.email}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <FiPhone aria-hidden="true" size={13} />
                <a
                  href={`tel:${contact.phone}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.location && (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <FiMapPin aria-hidden="true" size={13} />
                {contact.location}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div
        className="landing-section__inner"
        style={{
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-surface-border)',
          textAlign: 'center',
          fontSize: 'var(--font-size-caption)',
          color: 'var(--color-text-secondary)',
        }}
      >
        © {new Date().getFullYear()} {about.name[language]}. {t('landing.footer.rights')}{' '}
        {t('landing.footer.madeWith')} React &amp; TypeScript.
      </div>
    </footer>
  )
}
