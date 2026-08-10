import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'
import { PlanetDashboards } from './PlanetDashboards'
import { PLANET_RADIUS } from './planetConstants'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_GOLD } from '@/styles/colors'

export { PLANET_RADIUS }
const HULL_ROTATION_SPEED = 0.03
const PULSE_SPEED = 0.6
const PULSE_MIN = 0.85
const PULSE_MAX = 1.35
/** A slight, permanent axial tilt (not animated) so the hull reads as a spinning globe rather than a perfectly upright ball. */
const AXIAL_TILT_X = 0.18
const AXIAL_TILT_Z = 0.09
/** Flat, evenly-lit base color for the sun's hull — deliberately not textured (see Phase I in roadmap.md: a generated blotch texture read as a rendering glitch). */
const HULL_COLOR = '#e0994a'

export function Planet() {
  const surfaceRef = useRef<Group>(null)
  const hullMaterialRef = useRef<MeshStandardMaterial>(null)
  const { planetSegments, isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (surfaceRef.current) surfaceRef.current.rotation.y += delta * HULL_ROTATION_SPEED
    elapsed.current += delta
    if (hullMaterialRef.current) {
      const wave = (Math.sin(elapsed.current * PULSE_SPEED) + 1) / 2
      hullMaterialRef.current.emissiveIntensity = PULSE_MIN + wave * (PULSE_MAX - PULSE_MIN)
    }
  })

  return (
    <group ref={surfaceRef} rotation={[AXIAL_TILT_X, 0, AXIAL_TILT_Z]}>
      <mesh>
        <sphereGeometry args={[PLANET_RADIUS, planetSegments, planetSegments]} />
        <meshStandardMaterial
          ref={hullMaterialRef}
          color={HULL_COLOR}
          emissive={ACCENT_GOLD}
          emissiveIntensity={1}
          roughness={1}
          metalness={0}
        />
      </mesh>
      <PlanetDashboards isLowPower={isLowPower} />
    </group>
  )
}
