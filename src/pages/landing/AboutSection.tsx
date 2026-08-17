import { FiAward } from 'react-icons/fi'
import { skills } from '@/content/skills'
import { about } from '@/content/about'
import { useTranslation } from '@/i18n/useTranslation'
import { TechPill } from '@/components/ui/TechPill'
import { RevealSection } from './RevealSection'

export function AboutSection() {
  const { t, language } = useTranslation()
  const populatedCategories = skills.categories.filter((category) => category.items.length > 0)

  return (
    <RevealSection id="about" ariaLabelledBy="about-heading" className="landing-section">
      <div className="landing-section__inner">
        <div className="landing-section__header">
          <h2
            id="about-heading"
            style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}
          >
            {t('landing.sectionTitles.about')}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            {t('landing.sectionTitles.aboutSubtitle')}
          </p>
        </div>

        <p
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-text-secondary)',
            maxWidth: 720,
            margin: '0 auto var(--space-6)',
          }}
        >
          {t('sections.about.body')}
        </p>

        {populatedCategories.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {populatedCategories.map((category) => (
              <div key={category.id}>
                <h3 className="landing-subheading" style={{ marginBottom: 'var(--space-2)' }}>
                  {t(category.labelKey)}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {category.items.map((item) => (
                    <TechPill key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.languages.length > 0 && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 className="landing-subheading" style={{ marginBottom: 'var(--space-2)' }}>
              {t('fields.languagesSpoken')}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {skills.languages.map((entry) => (
                <span
                  key={entry.language}
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-accent-glow)',
                    background: 'var(--color-accent-soft)',
                    borderRadius: 999,
                    padding: '4px 12px',
                  }}
                >
                  {entry.language} — <strong>{entry.level}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {skills.leadership.length > 0 && (
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h3 className="landing-subheading" style={{ marginBottom: 'var(--space-2)' }}>
              {t('fields.leadershipHighlights')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {skills.leadership.map((entry) => (
                <div
                  key={entry.org}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <FiAward aria-hidden="true" size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <span>
                    <strong style={{ color: 'var(--color-text)' }}>{entry.role[language]}</strong> — {entry.org}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {about.stats.length > 0 && (
          <div className="landing-stats-strip">
            {about.stats.map((stat) => (
              <div key={stat.labelKey} className="landing-stats-strip__item">
                <span className="landing-stats-strip__value">{stat.value}</span>
                <span className="landing-stats-strip__label">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </RevealSection>
  )
}
