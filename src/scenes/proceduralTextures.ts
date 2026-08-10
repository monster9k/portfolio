import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'
import { pseudoRandom } from '@/utils/random'
import { ACCENT_GOLD, ACCENT_EMBER } from '@/styles/colors'

/**
 * Procedurally builds the sun's surface textures for Planet.tsx — a
 * directional-lit warm diffuse map (bright near the light source, fading to
 * a deep warm-black shadow side) scattered with soft radial "flare/granule"
 * blotches, plus a matching emissive map for the same hotspots. Runtime
 * canvas generation avoids sourcing/licensing a texture asset. Also exports
 * the shared seeded-point-on-sphere helper reused by PlanetDashboards.tsx
 * for surface-anchored content.
 */

const HULL_MUTED = '#e0994a'
const EMBER_ACCENT_CHANCE = 0.9
const CLUSTER_COUNT = 3
const CLUSTER_RADIUS = 0.22

export interface PlanetTextureSet {
  map: CanvasTexture
  emissiveMap: CanvasTexture
}

interface PanelCell {
  x: number
  y: number
  w: number
  h: number
  u: number
  v: number
}

interface ClusterCenter {
  u: number
  v: number
}

function createContext(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2D canvas context unavailable')
  return ctx
}

function withAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function buildPanelGrid(width: number, height: number, rows: number): PanelCell[] {
  const cells: PanelCell[] = []
  const rowHeight = height / rows
  for (let row = 0; row < rows; row++) {
    const y = row * rowHeight
    const cols = 7 + (row % 3)
    const colWidth = width / cols
    const offset = row % 2 === 1 ? colWidth / 2 : 0
    let x = -offset
    let i = 0
    while (x < width) {
      const w = colWidth * (0.82 + pseudoRandom(row * 97 + i) * 0.3)
      const clampedW = Math.min(w, width - x)
      cells.push({
        x,
        y,
        w: clampedW,
        h: rowHeight,
        u: (x + clampedW / 2) / width,
        v: (y + rowHeight / 2) / height,
      })
      x += colWidth
      i++
    }
  }
  return cells
}

function buildClusters(count: number): ClusterCenter[] {
  return Array.from({ length: count }, (_, i) => ({
    u: pseudoRandom(i * 4.4 + 1),
    v: 0.25 + pseudoRandom(i * 8.8 + 2) * 0.5,
  }))
}

function nearestClusterDistance(cell: PanelCell, clusters: ClusterCenter[]): number {
  let min = Infinity
  for (const cluster of clusters) {
    let du = Math.abs(cell.u - cluster.u)
    du = Math.min(du, 1 - du)
    const dv = cell.v - cluster.v
    min = Math.min(min, Math.hypot(du, dv))
  }
  return min
}

/** Soft radial-gradient "flare/granule" blotch — the sun's version of a lit surface detail. */
function paintFlareBlotch(
  ctx: CanvasRenderingContext2D,
  cell: PanelCell,
  useEmber: boolean,
  peakAlpha: number,
) {
  const cx = cell.x + cell.w / 2
  const cy = cell.y + cell.h / 2
  const radius = Math.max(cell.w, cell.h) * 0.6
  if (radius <= 1) return

  const color = useEmber ? ACCENT_EMBER : ACCENT_GOLD
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
  gradient.addColorStop(0, withAlpha(color, peakAlpha))
  gradient.addColorStop(1, withAlpha(color, 0))
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()
}

export function generatePlanetTextures(isLowPower: boolean): PlanetTextureSet {
  const width = isLowPower ? 512 : 1024
  const height = isLowPower ? 256 : 512
  const rows = isLowPower ? 10 : 16
  const cells = buildPanelGrid(width, height, rows)
  const clusters = buildClusters(CLUSTER_COUNT)

  const hullCtx = createContext(width, height)
  // Sun is self-luminous — a flat base avoids any hard "dark side" (the old
  // radial gradient fought the real scene lighting and, combined with the
  // old metallic material, produced a broken-looking chrome-ball terminator)
  // and avoids a seam where a radial gradient wraps around the sphere's UVs.
  hullCtx.fillStyle = HULL_MUTED
  hullCtx.fillRect(0, 0, width, height)

  const emissiveCtx = createContext(width, height)
  emissiveCtx.fillStyle = '#000000'
  emissiveCtx.fillRect(0, 0, width, height)

  cells.forEach((cell, i) => {
    const distance = nearestClusterDistance(cell, clusters)
    const withinCluster = distance < CLUSTER_RADIUS
    const chance = withinCluster ? 0.38 : 0.02
    if (pseudoRandom(i * 13.37 + 4) > chance) return
    const useEmber = pseudoRandom(i * 3.14) > EMBER_ACCENT_CHANCE
    paintFlareBlotch(hullCtx, cell, useEmber, 0.55)
    paintFlareBlotch(emissiveCtx, cell, useEmber, 1)
  })

  const map = new CanvasTexture(hullCtx.canvas)
  map.colorSpace = SRGBColorSpace
  map.wrapS = map.wrapT = RepeatWrapping

  const emissiveMap = new CanvasTexture(emissiveCtx.canvas)
  emissiveMap.colorSpace = SRGBColorSpace

  return { map, emissiveMap }
}

export interface SpherePoint {
  /** Unit-length outward normal / position on a unit sphere. */
  normal: [number, number, number]
  /** A stable extra random value derived from the same seed, for tilt/rotation/accent variation. */
  jitter: number
}

/** Deterministic, roughly-uniform point on a unit sphere from a seed (avoids pole clustering). */
export function pointOnSphere(seed: number): SpherePoint {
  const u = pseudoRandom(seed * 2.13 + 1)
  const v = pseudoRandom(seed * 5.77 + 2)
  const theta = u * Math.PI * 2
  const phi = Math.acos(2 * v - 1)
  const sinPhi = Math.sin(phi)
  return {
    normal: [sinPhi * Math.cos(theta), Math.cos(phi), sinPhi * Math.sin(theta)],
    jitter: pseudoRandom(seed * 9.31 + 3),
  }
}
