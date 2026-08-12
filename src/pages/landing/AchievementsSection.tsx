import { useState } from 'react'
import { FiCalendar, FiExternalLink, FiEye } from 'react-icons/fi'
import { achievements, type AchievementCategory, type AchievementEntry } from '@/content/achievements'
import { useTranslation } from '@/i18n/useTranslation'
import { getBrandIcon } from '@/utils/brandIcon'
import { RevealSection } from './RevealSection'
import { CertificateModal } from './CertificateModal'

type FilterValue = AchievementCategory | 'all'

const FILTERS: FilterValue[] = ['all', 'award', 'certificate', 'recognition', 'competition']

export function AchievementsSection() {
  const { t, language } = useTranslation()
  const [filter, setFilter] = useState<FilterValue>('all')
  const [activeCertificate, setActiveCertificate] = useState<AchievementEntry | null>(null)

  if (achievements.length === 0) return null

  const visible =
    filter === 'all' ? achievements : achievements.filter((entry) => entry.category === filter)

  return (
    <RevealSection
      id="achievements"
      ariaLabelledBy="achievements-heading"
      className="landing-section"
    >
      <div className="landing-section__inner">
        <div className="landing-section__header">
          <h2
            id="achievements-heading"
            style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}
          >
            {t('landing.sectionTitles.achievements')}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            {t('landing.sectionTitles.achievementsSubtitle')}
          </p>
        </div>

        <div
          role="group"
          aria-label={t('landing.sectionTitles.achievements')}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              className="landing-filter-tab"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {t(`landing.achievements.categories.${value}`)}
            </button>
          ))}
        </div>

        <div className="landing-grid">
          {visible.map((entry) => {
            const IssuerIcon = getBrandIcon(entry.issuer)
            return (
              <article key={entry.id} className="landing-card">
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-accent)',
                    background: 'var(--color-accent-soft)',
                    borderRadius: 999,
                    padding: '2px 10px',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {t(`landing.achievements.categories.${entry.category}`)}
                </span>

                <h3 style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
                  {entry.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-accent)',
                    margin: 'var(--space-1) 0',
                  }}
                >
                  <span
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)' }}
                  >
                    {IssuerIcon && <IssuerIcon aria-hidden="true" size={13} />}
                    {entry.issuer}
                  </span>
                </p>
                {entry.date && (
                  <p
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <FiCalendar aria-hidden="true" size={12} />
                    {entry.date}
                  </p>
                )}

                <p
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-secondary)',
                    margin: 'var(--space-2) 0',
                  }}
                >
                  {entry.description[language]}
                </p>

                {entry.tags.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-1)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 'var(--font-size-caption)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-surface-border)',
                          borderRadius: 999,
                          padding: '2px 8px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {(entry.links?.certificate || entry.links?.external) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {entry.links.certificate && (
                      <button
                        type="button"
                        onClick={() => setActiveCertificate(entry)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-1)',
                          fontSize: 'var(--font-size-caption)',
                          color: 'var(--color-accent)',
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <FiEye aria-hidden="true" size={13} />
                        {t('landing.achievements.viewCertificate')}
                      </button>
                    )}
                    {entry.links.external && (
                      <a
                        href={entry.links.external}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--space-1)',
                          fontSize: 'var(--font-size-caption)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        <FiExternalLink aria-hidden="true" size={13} />
                        {t('landing.achievements.openExternal')}
                      </a>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>

      {activeCertificate?.links?.certificate && (
        <CertificateModal
          title={activeCertificate.title}
          url={activeCertificate.links.certificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </RevealSection>
  )
}
