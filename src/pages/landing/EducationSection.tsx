import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi'
import { experience } from '@/content/experience'
import { useTranslation } from '@/i18n/useTranslation'
import { RevealSection } from './RevealSection'

export function EducationSection() {
  const { t, language } = useTranslation()
  const entries = experience.filter((entry) => entry.type === 'education')

  if (entries.length === 0) return null

  return (
    <RevealSection id="education" ariaLabelledBy="education-heading" className="landing-section">
      <div className="landing-section__inner">
        <div className="landing-section__header">
          <h2 id="education-heading" style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}>
            {t('landing.sectionTitles.education')}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            {t('landing.sectionTitles.educationSubtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="landing-card"
              style={{ borderLeft: '3px solid var(--color-accent-glow)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div>
                  {entry.organization && (
                    <h3 style={{ fontSize: 'var(--font-size-title)', color: 'var(--color-text)' }}>{entry.organization}</h3>
                  )}
                  {entry.role[language] && (
                    <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-accent)', marginTop: 'var(--space-1)' }}>
                      {entry.role[language]}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-1)' }}>
                  {entry.period && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
                      <FiCalendar aria-hidden="true" size={13} />
                      {entry.period}
                    </span>
                  )}
                  {entry.location && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
                      <FiMapPin aria-hidden="true" size={13} />
                      {entry.location}
                    </span>
                  )}
                </div>
              </div>

              {entry.gpa && (
                <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
                  {t('fields.gpa')}: <strong style={{ color: 'var(--color-text)' }}>{entry.gpa}</strong>
                </p>
              )}

              {entry.description.length > 0 && (
                <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                  {entry.description.map((line) => line[language]).join(' ')}
                </p>
              )}

              {entry.achievements && entry.achievements.length > 0 && (
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <h4 className="landing-subheading" style={{ marginBottom: 'var(--space-1)' }}>
                    {t('fields.keyAchievements')}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
                    {entry.achievements.map((line, index) => (
                      <li key={index} style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)' }}>
                        <span style={{ listStyle: 'none' }}>
                          <FiAward aria-hidden="true" size={12} style={{ marginRight: 4, color: 'var(--color-accent)' }} />
                          {line[language]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
