import { useTranslation } from '@/i18n/useTranslation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const NAV_ITEMS = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'education', labelKey: 'nav.education' },
  { id: 'achievements', labelKey: 'nav.achievements' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'contact', labelKey: 'nav.contact' },
]

export function LandingNavbar() {
  const { t } = useTranslation()

  return (
    <nav aria-label="Portfolio sections" className="landing-nav">
      <a
        href="#hero"
        style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-text)', textDecoration: 'none' }}
      >
        Orbit
      </a>

      <div className="landing-nav__links">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="landing-nav__link">
            {t(item.labelKey)}
          </a>
        ))}
        <LanguageSwitcher />
      </div>
    </nav>
  )
}
