import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSceneStore } from '@/store/useSceneStore'
import { sections } from '@/content/sections'
import { useTranslation } from '@/i18n/useTranslation'
import { ProjectList } from './ProjectList'

const OVERLAY_TRANSITION = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }

export function DetailModal() {
  const selectedId = useSceneStore((s) => s.selectedId)
  const setSelected = useSceneStore((s) => s.setSelected)
  const { t } = useTranslation()

  const section = selectedId ? sections.find((s) => s.id === selectedId) : undefined

  useEffect(() => {
    if (!section) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [section, setSelected])

  return (
    <AnimatePresence>
      {section && (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={OVERLAY_TRANSITION}
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 6, 10, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            padding: 'var(--space-4)',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={OVERLAY_TRANSITION}
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(560px, 100%)',
              maxHeight: '80vh',
              overflowY: 'auto',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-surface-border)',
              borderRadius: 16,
              padding: 'var(--space-8)',
              backdropFilter: 'blur(12px)',
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
                id="detail-modal-title"
                style={{ fontSize: 'var(--font-size-title)', color: 'var(--color-text)' }}
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
                marginBottom: section.id === 'projects' ? 'var(--space-6)' : 0,
                whiteSpace: 'pre-line',
              }}
            >
              {t(section.bodyKey)}
            </p>

            {section.id === 'projects' && <ProjectList />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
