import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { createSunMaterial } from './sunMaterial'
import { PlanetDashboards } from './PlanetDashboards'
import { PLANET_RADIUS } from './planetConstants'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export { PLANET_RADIUS }
const HULL_ROTATION_SPEED = 0.03
const PULSE_SPEED = 0.6
const PULSE_MIN = 0.85
const PULSE_MAX = 1.1
/** A slight, permanent axial tilt (not animated) so the hull reads as a spinning globe rather than a perfectly upright ball. */
const AXIAL_TILT_X = 0.18
const AXIAL_TILT_Z = 0.09

export function Planet() {
  const surfaceRef = useRef<Group>(null)
  const { planetSegments, isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()
  const elapsed = useRef(0)

  const sunMaterial = useMemo(() => createSunMaterial(), [])
  useEffect(() => () => sunMaterial.dispose(), [sunMaterial])

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (surfaceRef.current) surfaceRef.current.rotation.y += delta * HULL_ROTATION_SPEED
    elapsed.current += delta
    const wave = (Math.sin(elapsed.current * PULSE_SPEED) + 1) / 2
    sunMaterial.uniforms.uIntensity.value = PULSE_MIN + wave * (PULSE_MAX - PULSE_MIN)
  })

  return (
    <group ref={surfaceRef} rotation={[AXIAL_TILT_X, 0, AXIAL_TILT_Z]}>
      <mesh>
        <sphereGeometry args={[PLANET_RADIUS, planetSegments, planetSegments]} />
        <primitive object={sunMaterial} attach="material" />
      </mesh>
      <PlanetDashboards isLowPower={isLowPower} />
    </group>
  )
}
