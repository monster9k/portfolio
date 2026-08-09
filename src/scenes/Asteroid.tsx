import { useMemo, useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { IcosahedronGeometry } from 'three'
import type { Group, Mesh } from 'three'
import { useSceneStore } from '@/store/useSceneStore'
import type { SectionContent } from '@/content/sections'
import { useTranslation } from '@/i18n/useTranslation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { hashId, pseudoRandom } from '@/utils/random'
import { ACCENT_CYAN, ACCENT_MAGENTA } from '@/styles/colors'

const ASTEROID_RADIUS = 0.22
const TUMBLE_SPEED_X = 0.4
const TUMBLE_SPEED_Z = 0.25
const BASE_HULL_COLOR = '#161c2c'
const SCALE_VARIANCE = 0.14

// Shared low-poly "tech probe" gem — identical faceted geometry for every
// asteroid; per-id character comes from scale/accent variation below, not
// organic noise (that's what made the old rocks look out of place).
const asteroidGeometry = new IcosahedronGeometry(ASTEROID_RADIUS, 0)

interface AsteroidProps {
  section: SectionContent
}

export function Asteroid({ section }: AsteroidProps) {
  const { t } = useTranslation()
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const isHovered = useSceneStore((s) => s.hoveredId === section.id)
  const setHovered = useSceneStore((s) => s.setHovered)
  const setSelected = useSceneStore((s) => s.setSelected)
  const prefersReducedMotion = usePrefersReducedMotion()

  const seed = useMemo(() => hashId(section.id), [section.id])
  // Idle trim alternates cyan/magenta per section (decorative, matches the
  // planet's dual-accent windows); hover always converges on cyan so the
  // interactive affordance stays unambiguous regardless of idle tint.
  const idleAccent = seed % 2 === 0 ? ACCENT_CYAN : ACCENT_MAGENTA
  const meshScale = useMemo<[number, number, number]>(
    () => [
      1 + (pseudoRandom(seed) - 0.5) * SCALE_VARIANCE,
      1 + (pseudoRandom(seed + 1) - 0.5) * SCALE_VARIANCE,
      1 + (pseudoRandom(seed + 2) - 0.5) * SCALE_VARIANCE,
    ],
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
          geometry={asteroidGeometry}
          scale={meshScale}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <meshStandardMaterial
            color={BASE_HULL_COLOR}
            emissive={isHovered ? ACCENT_CYAN : idleAccent}
            emissiveIntensity={isHovered ? 1.15 : 0.35}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        <Billboard position={[0, 0.42, 0]}>
          <Text
            fontSize={0.16}
            color={isHovered ? ACCENT_CYAN : '#eef1f8'}
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
