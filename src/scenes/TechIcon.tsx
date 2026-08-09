import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group } from 'three'
import type { IconType } from 'react-icons'
import type { OrbitParams } from '@/content/sections'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_CYAN } from '@/styles/colors'

/**
 * A single orbiting tech-stack glyph — hover-only (no click/select), purely
 * decorative flourish around the asteroid belt. Mirrors Asteroid.tsx's
 * nested-group orbit but renders a flat drei `Html` icon instead of a mesh,
 * and keeps its hover tooltip local (no global useSceneStore/Tooltip).
 */

interface TechIconProps {
  orbit: OrbitParams
  label: string
  Icon: IconType
}

export function TechIcon({ orbit, label, Icon }: TechIconProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (groupRef.current) groupRef.current.rotation.y += delta * orbit.speed
  })

  return (
    <group ref={groupRef} rotation={[0, orbit.phaseOffset, orbit.inclination]}>
      <group position={[orbit.radius, 0, 0]}>
        <Html center zIndexRange={[1, 0]}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
            <Icon
              aria-hidden="true"
              size={20}
              color={hovered ? ACCENT_CYAN : 'var(--color-text-secondary)'}
              style={{
                filter: hovered ? 'drop-shadow(0 0 6px var(--color-accent-glow))' : 'none',
              }}
            />
            {hovered && (
              <span
                style={{
                  marginTop: 'var(--space-1)',
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-surface-border)',
                  borderRadius: 6,
                  padding: '2px 6px',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            )}
          </div>
        </Html>
      </group>
    </group>
  )
}
