import { useMemo, useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import type { Group, Mesh, Texture } from 'three'
import { useSceneStore } from '@/store/useSceneStore'
import type { SectionContent } from '@/content/sections'
import { useTranslation } from '@/i18n/useTranslation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { hashId, pseudoRandom } from '@/utils/random'
import { ACCENT_GOLD } from '@/styles/colors'

const ASTEROID_RADIUS = 0.22
const ASTEROID_SEGMENTS = 24
const TUMBLE_SPEED_X = 0.4
const TUMBLE_SPEED_Z = 0.25

/**
 * Distinct, muted, planet-inspired base color per section — loosely modeled
 * on real solar-system planets, desaturated so each still reads as quieter
 * than the sun's own bright gold/ember glow. Hover always brightens to the
 * shared ACCENT_GOLD regardless of base color, so hover affordance stays one
 * consistent signal across all 5.
 */
const PLANET_COLOR_BY_SECTION: Record<SectionContent['id'], string> = {
  about: '#2f8fc4', // Earth-like sky-blue — kept vivid so it reads through the sun's bloom halo
  skills: '#9c9186', // Mercury-like grey-taupe
  projects: '#d1481f', // Mars-like rust red
  experience: '#c7a06a', // Saturn-like sandy tan
  contact: '#d9b877', // Venus-like pale gold
}

interface AsteroidProps {
  section: SectionContent
  /** Shared moon texture, loaded once by AsteroidField and reused across all asteroids. */
  moonMap: Texture
}

export function Asteroid({ section, moonMap }: AsteroidProps) {
  const { t } = useTranslation()
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const isHovered = useSceneStore((s) => s.hoveredId === section.id)
  const setHovered = useSceneStore((s) => s.setHovered)
  const setSelected = useSceneStore((s) => s.setSelected)
  const prefersReducedMotion = usePrefersReducedMotion()

  const seed = useMemo(() => hashId(section.id), [section.id])
  // Give each of the 5 moons a different starting face so they don't look identical.
  const initialRotation = useMemo<[number, number, number]>(
    () => [pseudoRandom(seed) * Math.PI * 2, pseudoRandom(seed + 1) * Math.PI * 2, 0],
    [seed],
  )

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    // Freeze the asteroid in place while hovered/selected so its tooltip/label
    // stays put long enough to read and the target doesn't drift out from under the cursor.
    const { hoveredId, selectedId } = useSceneStore.getState()
    const isActive = hoveredId === section.id || selectedId === section.id
    if (isActive) return

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * section.orbit.speed
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * TUMBLE_SPEED_X
      meshRef.current.rotation.z += delta * TUMBLE_SPEED_Z
    }
  })

  function handlePointerOver(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation()
    setHovered(section.id)
    document.body.style.cursor = 'pointer'
  }

  function handlePointerOut(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation()
    document.body.style.cursor = 'auto'
    if (useSceneStore.getState().hoveredId === section.id) {
      setHovered(null)
    }
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    setSelected(section.id)
  }

  return (
    <group ref={groupRef} rotation={[0, section.orbit.phaseOffset, section.orbit.inclination]}>
      <group position={[section.orbit.radius, 0, 0]}>
        <mesh
          ref={meshRef}
          rotation={initialRotation}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <sphereGeometry args={[ASTEROID_RADIUS, ASTEROID_SEGMENTS, ASTEROID_SEGMENTS]} />
          <meshStandardMaterial
            map={moonMap}
            color={PLANET_COLOR_BY_SECTION[section.id]}
            emissive={ACCENT_GOLD}
            emissiveIntensity={isHovered ? 1.1 : 0.1}
            roughness={0.92}
            metalness={0.05}
          />
        </mesh>
        <Billboard position={[0, 0.42, 0]}>
          <Text
            fontSize={0.16}
            color={isHovered ? ACCENT_GOLD : '#eef1f8'}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.008}
            outlineColor="#05060a"
          >
            {t(section.titleKey)}
          </Text>
        </Billboard>
      </group>
    </group>
  )
}
