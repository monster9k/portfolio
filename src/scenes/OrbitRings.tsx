import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import type { Group } from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_GOLD } from '@/styles/colors'

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
  const ringA = useMemo(() => buildCirclePoints(4.6), [])
  const ringB = useMemo(() => buildCirclePoints(5.8), [])

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (groupRef.current) groupRef.current.rotation.y += delta * RING_ROTATION_SPEED
  })

  return (
    <group ref={groupRef}>
      <group rotation={[0.4, 0, 0.5]}>
        <Line points={ringA} color={ACCENT_GOLD} lineWidth={1} transparent opacity={0.14} />
      </group>
      <group rotation={[0.65, 0.4, -0.3]}>
        <Line points={ringB} color={ACCENT_GOLD} lineWidth={1} transparent opacity={0.09} />
      </group>
    </group>
  )
}
