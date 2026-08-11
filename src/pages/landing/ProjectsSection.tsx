import { FiCheck, FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '@/content/projects'
import { useTranslation } from '@/i18n/useTranslation'
import { TechPill } from '@/components/ui/TechPill'
import { RevealSection } from './RevealSection'

export function ProjectsSection() {
  const { t, language } = useTranslation()

  if (projects.length === 0) return null

  return (
    <RevealSection id="projects" ariaLabelledBy="projects-heading" className="landing-section">
      <div className="landing-section__inner">
        <div className="landing-section__header">
          <h2
            id="projects-heading"
            style={{ fontSize: 'var(--font-size-section-title)', color: 'var(--color-text)' }}
          >
            {t('landing.sectionTitles.projects')}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            {t('landing.sectionTitles.projectsSubtitle')}
          </p>
        </div>

        <div className="landing-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="landing-card"
              style={{
                borderTop: `3px solid ${index % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-secondary)'}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 'var(--space-2)',
                }}
              >
                <h3 style={{ fontSize: 'var(--font-size-title)', color: 'var(--color-text)' }}>
                  {project.name}
                </h3>
                {project.period && (
                  <span
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {project.period}
                  </span>
                )}
              </div>

              <p
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text-secondary)',
                  margin: 'var(--space-2) 0',
                }}
              >
                {project.description[language]}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-1)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {project.stack.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>

              {project.highlights.length > 0 && (
                <div style={{ marginBottom: 'var(--space-3)', flex: 1 }}>
                  <h4
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {t('landing.projects.featuresLabel')}
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-1)',
                    }}
                  >
                    {project.highlights.map((line, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--space-1)',
                          fontSize: 'var(--font-size-caption)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        <FiCheck
                          aria-hidden="true"
                          size={13}
                          style={{ marginTop: 2, flexShrink: 0, color: 'var(--color-accent)' }}
                        />
                        {line[language]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(project.links.repo || project.links.demo) && (
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        fontSize: 'var(--font-size-caption)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <FiGithub aria-hidden="true" size={13} />
                      {t('landing.projects.viewRepo')}
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        fontSize: 'var(--font-size-caption)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <FiExternalLink aria-hidden="true" size={13} />
                      {t('landing.projects.viewDemo')}
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
