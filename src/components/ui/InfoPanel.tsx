import { useEffect, useRef } from 'react'
import { useSceneStore } from '@/store/useSceneStore'
import { sections } from '@/content/sections'
import { useTranslation } from '@/i18n/useTranslation'
import { ProjectList } from './ProjectList'
import { AboutCard } from './AboutCard'
import { SkillsPanel } from './SkillsPanel'
import { ExperienceTimeline } from './ExperienceTimeline'
import { ContactCard } from './ContactCard'

const PANEL_WIDTH = 400

export function InfoPanel() {
  const selectedId = useSceneStore((s) => s.selectedId)
  const setSelected = useSceneStore((s) => s.setSelected)
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)

  const section = selectedId ? sections.find((s) => s.id === selectedId) : undefined

  useEffect(() => {
    if (!selectedId) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedId, setSelected])

  useEffect(() => {
    if (selectedId) headingRef.current?.focus()
  }, [selectedId])

  return (
    <aside
      className={section ? 'info-panel info-panel--open' : 'info-panel'}
      role="dialog"
      aria-labelledby="info-panel-title"
      aria-hidden={!section}
      style={{
        width: section ? PANEL_WIDTH : 0,
        height: '100%',
        overflow: 'hidden',
        flexShrink: 0,
        pointerEvents: section ? 'auto' : 'none',
        background: section ? 'var(--color-surface)' : 'transparent',
        borderRight: section ? '1px solid var(--color-surface-border)' : 'none',
        backdropFilter: section ? 'blur(12px)' : 'none',
        transition: `width var(--motion-duration) var(--motion-ease)`,
        zIndex: 20,
      }}
    >
      {section && (
        <div
          style={{
            width: PANEL_WIDTH,
            height: '100%',
            overflowY: 'auto',
            padding: 'var(--space-8)',
            paddingTop: 'calc(var(--space-8) + 56px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
            }}
          >
            <h2
              ref={headingRef}
              id="info-panel-title"
              tabIndex={-1}
              style={{
                fontSize: 'var(--font-size-title)',
                color: 'var(--color-text)',
                outline: 'none',
              }}
            >
              {t(section.titleKey)}
            </h2>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={t('ui.close')}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-surface-border)',
                color: 'var(--color-text-secondary)',
                borderRadius: 8,
                width: 32,
                height: 32,
                flexShrink: 0,
                cursor: 'pointer',
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-body)',
              marginBottom: section.id === 'contact' ? 0 : 'var(--space-6)',
              whiteSpace: 'pre-line',
            }}
          >
            {t(section.bodyKey)}
          </p>

          {section.id === 'about' && <AboutCard />}
          {section.id === 'skills' && <SkillsPanel />}
          {section.id === 'projects' && <ProjectList />}
          {section.id === 'experience' && <ExperienceTimeline />}
          {section.id === 'contact' && <ContactCard />}
        </div>
      )}
    </aside>
  )
}
