import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface RevealSectionProps {
  id: string
  ariaLabelledBy: string
  className?: string
  children: ReactNode
}

/** Fades/slides each landing section in on scroll; renders statically when the user prefers reduced motion. */
export function RevealSection({ id, ariaLabelledBy, className, children }: RevealSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return (
      <section id={id} aria-labelledby={ariaLabelledBy} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  )
}
