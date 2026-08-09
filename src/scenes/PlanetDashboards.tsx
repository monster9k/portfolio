import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { pointOnSphere } from './proceduralTextures'
import { PLANET_RADIUS } from './planetConstants'
import { useTranslation } from '@/i18n/useTranslation'
import { sections } from '@/content/sections'
import { projects } from '@/content/projects'

/**
 * Small glass "dashboard peek" cards embedded on the planet surface, showing
 * a sliver of real (placeholder) portfolio data — skills/project/experience —
 * reusing the same glass-panel chrome as Tooltip.tsx/ProjectList.tsx. Rendered
 * as children of Planet.tsx's rotating group so they stay anchored to the hull.
 */

const CARD_COUNT_NORMAL = 3
const CARD_COUNT_LOW = 1
const CARD_SEED_OFFSET = 4001
const SURFACE_OFFSET = 0.03

interface DashboardCard {
  key: number
  position: [number, number, number]
  title: string
  body: string
  chips?: string[]
}

function useDashboardCards(): DashboardCard[] {
  const { t, language } = useTranslation()

  return useMemo(() => {
    const skillsSection = sections.find((s) => s.id === 'skills')
    const projectsSection = sections.find((s) => s.id === 'projects')
    const experienceSection = sections.find((s) => s.id === 'experience')
    const firstProject = projects[0]

    const cardContent: Array<Omit<DashboardCard, 'key' | 'position'>> = [
      {
        title: t('nav.skills'),
        body: skillsSection ? skillsSection.shortPreview[language] : '',
        chips: (firstProject?.stack ?? []).slice(0, 4),
      },
      {
        title: firstProject?.name ?? t('nav.projects'),
        body: firstProject
          ? firstProject.description[language]
          : (projectsSection?.shortPreview[language] ?? ''),
      },
      {
        title: t('nav.experience'),
        body: experienceSection ? experienceSection.shortPreview[language] : '',
      },
    ]

    return cardContent.map((card, i) => {
      const seed = CARD_SEED_OFFSET + i * 131
      const { normal } = pointOnSphere(seed)
      const offset = PLANET_RADIUS + SURFACE_OFFSET
      return {
        ...card,
        key: seed,
        position: [normal[0] * offset, normal[1] * offset, normal[2] * offset],
      }
    })
  }, [t, language])
}

function DashboardCardView({ card }: { card: DashboardCard }) {
  return (
    <Html position={card.position} center zIndexRange={[1, 0]}>
      <div
        style={{
          width: 150,
          padding: 'var(--space-2) var(--space-3)',
          borderRadius: 10,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-surface-border)',
          backdropFilter: 'blur(8px)',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
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
          {card.title}
        </strong>
        <span
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.4,
          }}
        >
          {card.body}
        </span>
        {card.chips && card.chips.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-1)',
              marginTop: 'var(--space-2)',
            }}
          >
            {card.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-accent)',
                  background: 'var(--color-accent-soft)',
                  borderRadius: 999,
                  padding: '2px 8px',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </Html>
  )
}

interface PlanetDashboardsProps {
  isLowPower: boolean
}

export function PlanetDashboards({ isLowPower }: PlanetDashboardsProps) {
  const cards = useDashboardCards()
  const visibleCount = isLowPower ? CARD_COUNT_LOW : CARD_COUNT_NORMAL
  const visibleCards = cards.slice(0, visibleCount)

  return (
    <>
      {visibleCards.map((card) => (
        <DashboardCardView key={card.key} card={card} />
      ))}
    </>
  )
}
