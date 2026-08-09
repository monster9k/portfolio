import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, MeshStandardMaterial } from 'three'
import { generatePlanetTextures } from './proceduralTextures'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export const PLANET_RADIUS = 2
const HULL_ROTATION_SPEED = 0.03
const PULSE_SPEED = 0.6
const PULSE_MIN = 0.85
const PULSE_MAX = 1.35

export function Planet() {
  const surfaceRef = useRef<Mesh>(null)
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
    <mesh ref={surfaceRef}>
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
  )
}
