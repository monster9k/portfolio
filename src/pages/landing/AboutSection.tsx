import { skills } from '@/content/skills'
import { about } from '@/content/about'
import { useTranslation } from '@/i18n/useTranslation'
import { TechPill } from '@/components/ui/TechPill'
import { RevealSection } from './RevealSection'

export function AboutSection() {
  const { t } = useTranslation()
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
              marginBottom: 'var(--space-8)',
            }}
          >
            {populatedCategories.map((category) => (
              <div key={category.id}>
                <h3
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
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

        {about.stats.length > 0 && (
          <div className="landing-grid">
            {about.stats.map((stat) => (
              <div key={stat.labelKey} className="landing-card" style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 'var(--font-size-section-title)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RevealSection>
  )
}
