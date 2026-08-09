import { projects } from '@/content/projects'
import { useTranslation } from '@/i18n/useTranslation'

export function ProjectList() {
  const { language } = useTranslation()

  if (projects.length === 0) {
    return (
      <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
        TODO: add your projects in src/content/projects.ts
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {projects.map((project) => (
        <article
          key={project.id}
          style={{
            border: '1px solid var(--color-surface-border)',
            borderRadius: 12,
            padding: 'var(--space-4)',
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
            <h3 style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-text)' }}>
              {project.name}
            </h3>
            <span
              style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}
            >
              {project.period}
            </span>
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
              gap: 'var(--space-2)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-2)',
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-accent)',
                  background: 'var(--color-accent-soft)',
                  borderRadius: 999,
                  padding: '2px 10px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
              >
                Repo
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-accent)' }}
              >
                Demo
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
