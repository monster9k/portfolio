import { useEffect, useMemo } from 'react'
import { DoubleSide, Quaternion, Vector3 } from 'three'
import { generatePanelTexture, pointOnSphere } from './proceduralTextures'
import { PLANET_RADIUS } from './planetConstants'
import { pseudoRandom } from '@/utils/random'

/**
 * Small angled "tech screen" planes that visibly pop off the planet hull,
 * like torn paper stuck to its surface — the protruding panels from the
 * reference art direction, as opposed to the flat baked-in hull texture.
 * Rendered as children of Planet.tsx's rotating group, so they co-rotate
 * with the hull for free and inherit its prefers-reduced-motion gating.
 */

const PANEL_COUNT_NORMAL = 7
const PANEL_COUNT_LOW = 3
const PANEL_WIDTH = 0.5
const PANEL_HEIGHT = 0.32
const PANEL_OFFSET_MIN = 0.04
const PANEL_OFFSET_MAX = 0.16
const MAGENTA_ACCENT_CHANCE = 0.9
const UP = new Vector3(0, 0, 1)

interface PanelPlacement {
  key: number
  position: [number, number, number]
  quaternion: Quaternion
  tilt: [number, number, number]
  scale: number
  useMagenta: boolean
}

function buildPlacements(count: number): PanelPlacement[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = i * 71 + 11
    const { normal, jitter } = pointOnSphere(seed)
    const offset = PLANET_RADIUS + PANEL_OFFSET_MIN + jitter * (PANEL_OFFSET_MAX - PANEL_OFFSET_MIN)
    const normalVec = new Vector3(normal[0], normal[1], normal[2])
    const quaternion = new Quaternion().setFromUnitVectors(UP, normalVec)
    const tiltX = (pseudoRandom(seed * 3.3 + 5) - 0.5) * 0.6
    const tiltY = (pseudoRandom(seed * 6.6 + 6) - 0.5) * 0.6
    const tiltZ = pseudoRandom(seed * 9.9 + 7) * Math.PI * 2
    const scale = 0.75 + pseudoRandom(seed * 1.7 + 8) * 0.6
    const useMagenta = pseudoRandom(seed * 4.4 + 9) > MAGENTA_ACCENT_CHANCE
    return {
      key: seed,
      position: [normalVec.x * offset, normalVec.y * offset, normalVec.z * offset],
      quaternion,
      tilt: [tiltX, tiltY, tiltZ],
      scale,
      useMagenta,
    }
  })
}

function PanelMesh({ placement }: { placement: PanelPlacement }) {
  const texture = useMemo(() => generatePanelTexture(placement.useMagenta), [placement.useMagenta])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group position={placement.position} quaternion={placement.quaternion}>
      <mesh rotation={placement.tilt} scale={placement.scale}>
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT]} />
        <meshBasicMaterial map={texture} side={DoubleSide} />
      </mesh>
    </group>
  )
}

interface PlanetPanelsProps {
  isLowPower: boolean
}

export function PlanetPanels({ isLowPower }: PlanetPanelsProps) {
  const placements = useMemo(
    () => buildPlacements(isLowPower ? PANEL_COUNT_LOW : PANEL_COUNT_NORMAL),
    [isLowPower],
  )

  return (
    <>
      {placements.map((placement) => (
        <PanelMesh key={placement.key} placement={placement} />
      ))}
    </>
  )
}
