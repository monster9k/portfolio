import { about } from '@/content/about'
import { useTranslation } from '@/i18n/useTranslation'

export function SiteFooter() {
  const { t, language } = useTranslation()

  return (
    <footer className="landing-footer">
      <div className="landing-section__inner landing-footer__minimal">
        <p className="landing-footer__copyright">
          © {new Date().getFullYear()} {about.name[language]}. {t('landing.footer.rights')}{' '}
          {t('landing.footer.madeWith')} React &amp; TypeScript.
        </p>
      </div>
    </footer>
  )
}
