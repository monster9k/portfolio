import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { about } from '@/content/about'
import { contact } from '@/content/contact'
import { useTranslation } from '@/i18n/useTranslation'

export function SiteFooter() {
  const { t, language } = useTranslation()

  return (
    <footer className="landing-footer">
      <div className="landing-section__inner landing-footer__minimal">
        <div className="landing-footer__socials">
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

        <p className="landing-footer__copyright">
          © {new Date().getFullYear()} {about.name[language]}. {t('landing.footer.rights')}{' '}
          {t('landing.footer.madeWith')} React &amp; TypeScript.
        </p>
      </div>
    </footer>
  )
}
