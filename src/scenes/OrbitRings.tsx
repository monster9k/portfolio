import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import type { Group } from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_CYAN } from '@/styles/colors'

/** Faint tilted elliptical orbit-path lines around the planet, matching the reference art direction. */

const RING_ROTATION_SPEED = 0.015
const SEGMENTS = 128

function buildCirclePoints(radius: number): [number, number, number][] {
  return Array.from({ length: SEGMENTS + 1 }, (_, i) => {
    const angle = (i / SEGMENTS) * Math.PI * 2
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius]
  })
}

export function OrbitRings() {
  const groupRef = useRef<Group>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const ringA = useMemo(() => buildCirclePoints(2.7), [])
  const ringB = useMemo(() => buildCirclePoints(3.35), [])

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (groupRef.current) groupRef.current.rotation.y += delta * RING_ROTATION_SPEED
  })

  return (
    <group ref={groupRef}>
      <group rotation={[Math.PI / 2.6, 0, 0.4]}>
        <Line points={ringA} color={ACCENT_CYAN} lineWidth={1} transparent opacity={0.2} />
      </group>
      <group rotation={[Math.PI / 2.15, 0.6, -0.3]}>
        <Line points={ringB} color={ACCENT_CYAN} lineWidth={1} transparent opacity={0.12} />
      </group>
    </group>
  )
}
