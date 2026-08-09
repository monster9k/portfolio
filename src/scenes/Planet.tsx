import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { Mesh } from 'three'
import daymapUrl from '@/assets/textures/planet/daymap.jpg'
import cloudsUrl from '@/assets/textures/planet/clouds.jpg'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export const PLANET_RADIUS = 2
const PLANET_ROTATION_SPEED = 0.03
const CLOUDS_ROTATION_SPEED = 0.045

export function Planet() {
  const surfaceRef = useRef<Mesh>(null)
  const cloudsRef = useRef<Mesh>(null)
  const [daymap, clouds] = useTexture([daymapUrl, cloudsUrl])
  const { planetSegments } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (surfaceRef.current) surfaceRef.current.rotation.y += delta * PLANET_ROTATION_SPEED
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * CLOUDS_ROTATION_SPEED
  })

  return (
    <group>
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[PLANET_RADIUS, planetSegments, planetSegments]} />
        <meshStandardMaterial map={daymap} roughness={0.85} metalness={0} />
      </mesh>
      <mesh ref={cloudsRef} scale={1.01}>
        <sphereGeometry args={[PLANET_RADIUS, planetSegments, planetSegments]} />
        <meshStandardMaterial
          alphaMap={clouds}
          color="#ffffff"
          transparent
          depthWrite={false}
          roughness={1}
        />
      </mesh>
    </group>
  )
}
