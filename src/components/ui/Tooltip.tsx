import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSceneStore } from '@/store/useSceneStore'
import { sections } from '@/content/sections'
import { useTranslation } from '@/i18n/useTranslation'

const MOTION_TRANSITION = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }
const CURSOR_OFFSET = 18

export function Tooltip() {
  const hoveredId = useSceneStore((s) => s.hoveredId)
  const selectedId = useSceneStore((s) => s.selectedId)
  const { t, language } = useTranslation()
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      setPos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  const section = hoveredId ? sections.find((s) => s.id === hoveredId) : undefined
  const visible = Boolean(section) && !selectedId

  return (
    <AnimatePresence>
      {visible && section && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={MOTION_TRANSITION}
          style={{
            position: 'fixed',
            left: pos.x + CURSOR_OFFSET,
            top: pos.y + CURSOR_OFFSET,
            pointerEvents: 'none',
            zIndex: 20,
            maxWidth: 240,
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 10,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-surface-border)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <strong
            style={{
              display: 'block',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-1)',
            }}
          >
            {t(section.titleKey)}
          </strong>
          <span
            style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}
          >
            {section.shortPreview[language]}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
