import { getBrandIcon } from '@/utils/brandIcon'

interface TechPillProps {
  label: string
}

/** Accent-colored tag pill for tech/skill names — prefixes a brand icon from react-icons/si when one is known for the label, otherwise renders as plain text. Shared by the landing page sections and the 3D scene's InfoPanel so both surfaces get the same treatment. */
export function TechPill({ label }: TechPillProps) {
  const Icon = getBrandIcon(label)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        fontSize: 'var(--font-size-caption)',
        color: 'var(--color-accent)',
        background: 'var(--color-accent-soft)',
        borderRadius: 999,
        padding: '2px 10px',
      }}
    >
      {Icon && <Icon aria-hidden="true" size={13} />}
      {label}
    </span>
  )
}
