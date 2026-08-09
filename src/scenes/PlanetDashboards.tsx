import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { pointOnSphere } from './proceduralTextures'
import { PLANET_RADIUS } from './planetConstants'
import { useDashboardCardContent, type DashboardCardContent } from '@/hooks/useDashboardCardContent'

/**
 * Small glass "dashboard peek" cards embedded on the planet surface, showing
 * a sliver of real (placeholder) portfolio data — skills/project/experience —
 * reusing the same glass-panel chrome as Tooltip.tsx/ProjectList.tsx. Rendered
 * as children of Planet.tsx's rotating group so they stay anchored to the hull.
 * Content itself is resolved by useDashboardCardContent (outside scenes/) —
 * this file only decides where each resolved card sits in 3D space.
 */

const CARD_COUNT_NORMAL = 3
const CARD_COUNT_LOW = 1
const CARD_SEED_OFFSET = 4001
const SURFACE_OFFSET = 0.03

interface PositionedCard extends DashboardCardContent {
  key: number
  position: [number, number, number]
}

function usePositionedCards(): PositionedCard[] {
  const content = useDashboardCardContent()

  return useMemo(
    () =>
      content.map((card, i) => {
        const seed = CARD_SEED_OFFSET + i * 131
        const { normal } = pointOnSphere(seed)
        const offset = PLANET_RADIUS + SURFACE_OFFSET
        return {
          ...card,
          key: seed,
          position: [normal[0] * offset, normal[1] * offset, normal[2] * offset] as [
            number,
            number,
            number,
          ],
        }
      }),
    [content],
  )
}

function DashboardCardView({ card }: { card: PositionedCard }) {
  return (
    <Html position={card.position} center zIndexRange={[1, 0]} distanceFactor={6}>
      <div
        aria-hidden="true"
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
  const cards = usePositionedCards()
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
