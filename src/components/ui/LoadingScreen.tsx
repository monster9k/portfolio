import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '@/i18n/useTranslation'

const MIN_DISPLAY_MS = 500

export function LoadingScreen() {
  const { progress, active } = useProgress()
  const { t } = useTranslation()
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_DISPLAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const show = active || !minTimeElapsed

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            background: 'var(--color-bg-bottom)',
          }}
        >
          <div
            style={{
              width: 160,
              height: 4,
              borderRadius: 999,
              background: 'var(--color-surface-border)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--color-accent)',
                transition: 'width 0.2s ease-out',
              }}
            />
          </div>
          <span
            style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}
          >
            {t('ui.loading')}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
