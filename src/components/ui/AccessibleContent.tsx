import { sections } from '@/content/sections'
import { projects } from '@/content/projects'
import { about } from '@/content/about'
import { skills } from '@/content/skills'
import { experience } from '@/content/experience'
import { contact } from '@/content/contact'
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

          {section.id === 'about' && (about.name[language] || about.title[language]) && (
            <p>
              {[about.name[language], about.title[language], about.location, about.availability[language]]
                .filter(Boolean)
                .join(' — ')}
            </p>
          )}

          {section.id === 'skills' && (
            <ul>
              {skills.categories
                .filter((category) => category.items.length > 0)
                .map((category) => (
                  <li key={category.id}>
                    <strong>{t(category.labelKey)}:</strong> {category.items.join(', ')}
                  </li>
                ))}
              {skills.languages.length > 0 && (
                <li>
                  <strong>{t('fields.languagesSpoken')}:</strong>{' '}
                  {skills.languages.map((entry) => `${entry.language} (${entry.level})`).join(', ')}
                </li>
              )}
              {skills.leadership.length > 0 && (
                <li>
                  <strong>{t('fields.leadershipHighlights')}:</strong>{' '}
                  {skills.leadership.map((entry) => `${entry.role[language]} — ${entry.org}`).join(', ')}
                </li>
              )}
            </ul>
          )}

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

          {section.id === 'experience' && (
            <ul>
              {experience
                .filter((entry) => entry.organization || entry.role[language])
                .map((entry) => (
                  <li key={entry.id}>
                    <strong>{entry.organization}</strong> — {entry.role[language]}
                    {entry.period ? ` (${entry.period})` : ''}
                    {entry.gpa ? ` — ${t('fields.gpa')}: ${entry.gpa}` : ''}
                  </li>
                ))}
            </ul>
          )}

          {section.id === 'contact' && (
            <p>
              {[
                contact.email && `${t('fields.email')}: ${contact.email}`,
                contact.phone && `${t('fields.phone')}: ${contact.phone}`,
                contact.location,
                contact.links.github,
                contact.links.linkedin,
                contact.links.website,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </section>
      ))}
    </div>
  )
}
