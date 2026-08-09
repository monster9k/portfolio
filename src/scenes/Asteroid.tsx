import { useMemo, useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { IcosahedronGeometry, Vector3 } from 'three'
import type { Group, Mesh } from 'three'
import { useSceneStore } from '@/store/useSceneStore'
import type { SectionContent } from '@/content/sections'
import { useTranslation } from '@/i18n/useTranslation'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { hashId, pseudoRandom } from '@/utils/random'
import { ACCENT_CYAN } from '@/styles/colors'

const ASTEROID_RADIUS = 0.22
const TUMBLE_SPEED_X = 0.4
const TUMBLE_SPEED_Z = 0.25
const NOISE_AMPLITUDE = 0.1
const BASE_HULL_COLOR = '#232b3d'

// Mild organic noise — enough to read as a rocky/mechanical moon, far short
// of the old lumpy-rock look this replaces. Per-id seed keeps each section's
// asteroid a stable, distinct silhouette across renders/reloads.
function useAsteroidGeometry(seed: number) {
  return useMemo(() => {
    const geometry = new IcosahedronGeometry(ASTEROID_RADIUS, 1)
    const position = geometry.attributes.position
    const vertex = new Vector3()
    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i)
      const noise = 1 - NOISE_AMPLITUDE / 2 + pseudoRandom(seed + i) * NOISE_AMPLITUDE
      vertex.multiplyScalar(noise)
      position.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    geometry.computeVertexNormals()
    return geometry
  }, [seed])
}

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
  const geometry = useAsteroidGeometry(seed)

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
          geometry={geometry}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <meshStandardMaterial
            color={BASE_HULL_COLOR}
            emissive={ACCENT_CYAN}
            emissiveIntensity={isHovered ? 1.1 : 0.22}
            roughness={0.55}
            metalness={0.4}
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
