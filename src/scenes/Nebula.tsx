import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import { AdditiveBlending, CanvasTexture } from 'three'
import type { Group } from 'three'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_CYAN, ACCENT_MAGENTA, TEXT_PRIMARY } from '@/styles/colors'
import { pseudoRandom } from '@/utils/random'

/**
 * Soft additive-blended cloud planes standing in for a galaxy/nebula band.
 * Billboarded so they always read as flat "clouds" regardless of orbit angle.
 * Placed well outside the future maxDistance=22 zoom limit (Phase B) so the
 * background stays coherent at full zoom-out.
 */

const DRIFT_SPEED = 0.004
const MIN_RADIUS = 28
const RADIUS_SPREAD = 16

interface CloudPlacement {
  position: [number, number, number]
  scale: number
  color: string
  opacity: number
}

function buildCloudTexture(): CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2D canvas context unavailable')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.35)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

function pickCloudColor(i: number): string {
  const roll = pseudoRandom(i * 6.6)
  if (roll > 0.88) return ACCENT_MAGENTA
  if (roll > 0.55) return ACCENT_CYAN
  return TEXT_PRIMARY
}

function buildPlacements(count: number): CloudPlacement[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = pseudoRandom(i * 11.1) * Math.PI * 2
    const radius = MIN_RADIUS + pseudoRandom(i * 5.5) * RADIUS_SPREAD
    const height = (pseudoRandom(i * 8.8) - 0.5) * 20
    return {
      position: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
      scale: 22 + pseudoRandom(i * 2.2) * 14,
      color: pickCloudColor(i),
      opacity: 0.05 + pseudoRandom(i * 9.9) * 0.07,
    }
  })
}

export function Nebula() {
  const groupRef = useRef<Group>(null)
  const { isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()
  const texture = useMemo(() => buildCloudTexture(), [])
  const placements = useMemo(() => buildPlacements(isLowPower ? 3 : 6), [isLowPower])

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (groupRef.current) groupRef.current.rotation.y += delta * DRIFT_SPEED
  })

  return (
    <group ref={groupRef}>
      {placements.map((cloud, i) => (
        <Billboard key={i} position={cloud.position}>
          <mesh scale={cloud.scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture}
              color={cloud.color}
              transparent
              opacity={cloud.opacity}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </Billboard>
      ))}
    </group>
  )
}
