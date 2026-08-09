import { sections } from '@/content/sections'
import { projects } from '@/content/projects'
import { useTranslation } from '@/i18n/useTranslation'

interface AccessibleContentProps {
  className?: string
}

/**
 * Semantic, readable mirror of the 3D scene's content — for screen readers,
 * search engine crawlers, and the no-WebGL fallback. Kept in sync with
 * content/sections.ts + i18n automatically since it reads the same source.
 */
export function AccessibleContent({ className }: AccessibleContentProps) {
  const { t, language } = useTranslation()

  return (
    <div className={className} lang={language}>
      <h1>Orbit — {t('nav.about')}</h1>
      {sections.map((section) => (
        <section key={section.id} id={`section-${section.id}`}>
          <h2>{t(section.titleKey)}</h2>
          <p>{t(section.bodyKey)}</p>
          {section.id === 'projects' && projects.length > 0 && (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <strong>{project.name}</strong> ({project.period}):{' '}
                  {project.description[language]}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
