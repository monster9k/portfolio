import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'
import { generatePlanetTextures } from './proceduralTextures'
import { PlanetPanels } from './PlanetPanels'
import { PlanetDashboards } from './PlanetDashboards'
import { PLANET_RADIUS } from './planetConstants'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_CYAN } from '@/styles/colors'

export { PLANET_RADIUS }
const HULL_ROTATION_SPEED = 0.03
const PULSE_SPEED = 0.6
const PULSE_MIN = 0.85
const PULSE_MAX = 1.35
const WIREFRAME_OPACITY = 0.16
/** A slight, permanent axial tilt (not animated) so the hull reads as a spinning globe rather than a perfectly upright ball. */
const AXIAL_TILT_X = 0.18
const AXIAL_TILT_Z = 0.09

export function Planet() {
  const surfaceRef = useRef<Group>(null)
  const hullMaterialRef = useRef<MeshStandardMaterial>(null)
  const { planetSegments, isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()
  const elapsed = useRef(0)

  const textures = useMemo(() => generatePlanetTextures(isLowPower), [isLowPower])

  useEffect(() => {
    return () => {
      textures.map.dispose()
      textures.emissiveMap.dispose()
    }
  }, [textures])

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
          map={textures.map}
          emissiveMap={textures.emissiveMap}
          emissive="#ffffff"
          emissiveIntensity={1}
          roughness={0.45}
          metalness={0.7}
        />
      </mesh>
      {/* Blueprint-style wireframe shell, slightly proud of the hull so it doesn't z-fight. */}
      <mesh>
        <sphereGeometry args={[PLANET_RADIUS * 1.01, planetSegments, planetSegments]} />
        <meshBasicMaterial
          color={ACCENT_CYAN}
          wireframe
          transparent
          opacity={WIREFRAME_OPACITY}
        />
      </mesh>
      <PlanetPanels isLowPower={isLowPower} />
      <PlanetDashboards isLowPower={isLowPower} />
    </group>
  )
}
