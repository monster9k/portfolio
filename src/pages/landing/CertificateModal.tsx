import { useEffect, useRef } from 'react'
import { FiExternalLink, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTranslation } from '@/i18n/useTranslation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface CertificateModalProps {
  title: string
  url: string
  onClose: () => void
}

export function CertificateModal({ title, url, onClose }: CertificateModalProps) {
  const { t } = useTranslation()
  const prefersReducedMotion = usePrefersReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const entranceProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 6, 10, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 'var(--space-4)',
      }}
    >
      <motion.div
        {...entranceProps}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 860,
          height: '85vh',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-surface-border)',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
            padding: 'var(--space-4)',
            borderBottom: '1px solid var(--color-surface-border)',
          }}
        >
          <h3
            ref={headingRef}
            id="certificate-modal-title"
            tabIndex={-1}
            style={{ fontSize: 'var(--font-size-title)', color: 'var(--color-text)', outline: 'none' }}
          >
            {title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-surface-border)',
                borderRadius: 999,
                padding: '4px 12px',
                textDecoration: 'none',
              }}
            >
              <FiExternalLink aria-hidden="true" size={13} />
              {t('landing.achievements.openExternal')}
            </a>
            <button
              type="button"
              onClick={onClose}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiX aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        <iframe
          src={url}
          title={title}
          style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }}
        />
      </motion.div>
    </div>
  )
}
