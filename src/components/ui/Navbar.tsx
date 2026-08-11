import { Link } from 'react-router-dom'
import { sections } from '@/content/sections'
import { useSceneStore } from '@/store/useSceneStore'
import { useTranslation } from '@/i18n/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const setSelected = useSceneStore((s) => s.setSelected)

  return (
    <nav
      aria-label="Portfolio sections"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        padding: 'var(--space-4) var(--space-6)',
      }}
    >
      <Link
        to="/"
        aria-label={t('landing.backToHome')}
        style={{
          fontSize: 'var(--font-size-body)',
          fontWeight: 600,
          color: 'var(--color-text)',
          textDecoration: 'none',
        }}
      >
        Orbit
      </Link>

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setSelected(section.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-caption)',
              cursor: 'pointer',
              padding: 'var(--space-1) var(--space-2)',
            }}
          >
            {t(section.titleKey)}
          </button>
        ))}
        <LanguageSwitcher />
      </div>
    </nav>
  )
}
