import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'
import { pseudoRandom } from '@/utils/random'
import { ACCENT_CYAN, ACCENT_MAGENTA, BG_DEEP } from '@/styles/colors'

/**
 * Procedurally builds the cyberpunk "tech hull" textures for Planet.tsx —
 * a directional-lit diffuse hull with pale "screenshot" panels clustered in
 * a few patches (not an even neon grid), a matching dim emissive map, and a
 * near-invisible structural seam mask. Runtime canvas generation avoids
 * sourcing/licensing a new texture asset. Also exports the shared
 * seeded-point-on-sphere + fake-UI-panel drawing helpers reused by
 * PlanetPanels.tsx/PlanetDashboards.tsx for the panels that pop off the hull.
 */

const HULL_LIT = '#141a29'
const HULL_SHADOW = BG_DEEP
const SEAM_LINE = 'rgba(110, 135, 170, 0.1)'
const PANEL_BG = 'rgba(200, 212, 230, 0.85)'
const PANEL_LINE = 'rgba(70, 82, 100, 0.6)'
const PANEL_EMISSIVE_BASE = '#3a4a63'
const CLUSTER_COUNT = 3
const CLUSTER_RADIUS = 0.22
const MAGENTA_ACCENT_CHANCE = 0.9

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

/** Shared fake-UI-screenshot content painter: a couple of thin "text" lines plus one accent block/"button". */
function paintFakeUIContent(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pw: number,
  ph: number,
  useMagenta: boolean,
) {
  ctx.fillStyle = PANEL_BG
  ctx.fillRect(px, py, pw, ph)

  ctx.strokeStyle = PANEL_LINE
  ctx.lineWidth = Math.max(1, ph * 0.06)
  const lineCount = 2
  for (let i = 0; i < lineCount; i++) {
    const ly = py + ph * (0.3 + i * 0.28)
    ctx.beginPath()
    ctx.moveTo(px + pw * 0.12, ly)
    ctx.lineTo(px + pw * (0.55 + pseudoRandom(px + i) * 0.25), ly)
    ctx.stroke()
  }

  const accentColor = useMagenta ? ACCENT_MAGENTA : ACCENT_CYAN
  ctx.fillStyle = accentColor
  ctx.fillRect(px + pw * 0.68, py + ph * 0.14, pw * 0.22, ph * 0.22)
}

function drawScreenshotPanel(ctx: CanvasRenderingContext2D, cell: PanelCell, useMagenta: boolean) {
  const pad = { x: cell.w * 0.12, y: cell.h * 0.18 }
  const px = cell.x + pad.x
  const py = cell.y + pad.y
  const pw = cell.w - pad.x * 2
  const ph = cell.h - pad.y * 2
  if (pw <= 2 || ph <= 2) return
  paintFakeUIContent(ctx, px, py, pw, ph, useMagenta)
}

function drawScreenshotEmissive(ctx: CanvasRenderingContext2D, cell: PanelCell, useMagenta: boolean) {
  const pad = { x: cell.w * 0.12, y: cell.h * 0.18 }
  const px = cell.x + pad.x
  const py = cell.y + pad.y
  const pw = cell.w - pad.x * 2
  const ph = cell.h - pad.y * 2
  if (pw <= 2 || ph <= 2) return

  ctx.fillStyle = PANEL_EMISSIVE_BASE
  ctx.globalAlpha = 0.35
  ctx.fillRect(px, py, pw, ph)
  ctx.globalAlpha = 1

  const accentColor = useMagenta ? ACCENT_MAGENTA : ACCENT_CYAN
  ctx.fillStyle = accentColor
  ctx.fillRect(px + pw * 0.68, py + ph * 0.14, pw * 0.22, ph * 0.22)
}

export function generatePlanetTextures(isLowPower: boolean): PlanetTextureSet {
  const width = isLowPower ? 512 : 1024
  const height = isLowPower ? 256 : 512
  const rows = isLowPower ? 10 : 16
  const cells = buildPanelGrid(width, height, rows)
  const clusters = buildClusters(CLUSTER_COUNT)

  const hullCtx = createContext(width, height)
  const lightBias = hullCtx.createRadialGradient(
    width * 0.32,
    height * 0.28,
    0,
    width * 0.32,
    height * 0.28,
    width * 0.85,
  )
  lightBias.addColorStop(0, HULL_LIT)
  lightBias.addColorStop(1, HULL_SHADOW)
  hullCtx.fillStyle = lightBias
  hullCtx.fillRect(0, 0, width, height)
  hullCtx.strokeStyle = SEAM_LINE
  hullCtx.lineWidth = Math.max(1, width / 1024)
  for (const cell of cells) {
    hullCtx.strokeRect(cell.x + 0.5, cell.y + 0.5, cell.w - 1, cell.h - 1)
  }

  const emissiveCtx = createContext(width, height)
  emissiveCtx.fillStyle = '#000000'
  emissiveCtx.fillRect(0, 0, width, height)

  cells.forEach((cell, i) => {
    const distance = nearestClusterDistance(cell, clusters)
    const withinCluster = distance < CLUSTER_RADIUS
    const chance = withinCluster ? 0.38 : 0.02
    if (pseudoRandom(i * 13.37 + 4) > chance) return
    const useMagenta = pseudoRandom(i * 3.14) > MAGENTA_ACCENT_CHANCE
    drawScreenshotPanel(hullCtx, cell, useMagenta)
    drawScreenshotEmissive(emissiveCtx, cell, useMagenta)
  })

  const map = new CanvasTexture(hullCtx.canvas)
  map.colorSpace = SRGBColorSpace
  map.wrapS = map.wrapT = RepeatWrapping

  const emissiveMap = new CanvasTexture(emissiveCtx.canvas)
  emissiveMap.colorSpace = SRGBColorSpace

  return { map, emissiveMap }
}

const PANEL_TEXTURE_WIDTH = 256
const PANEL_TEXTURE_HEIGHT = 160
const PANEL_TEXTURE_PAD = 10

/** A single standalone fake-UI-screenshot texture, for panels that pop off the hull as their own mesh. */
export function generatePanelTexture(useMagenta: boolean): CanvasTexture {
  const ctx = createContext(PANEL_TEXTURE_WIDTH, PANEL_TEXTURE_HEIGHT)
  ctx.fillStyle = HULL_SHADOW
  ctx.fillRect(0, 0, PANEL_TEXTURE_WIDTH, PANEL_TEXTURE_HEIGHT)
  paintFakeUIContent(
    ctx,
    PANEL_TEXTURE_PAD,
    PANEL_TEXTURE_PAD,
    PANEL_TEXTURE_WIDTH - PANEL_TEXTURE_PAD * 2,
    PANEL_TEXTURE_HEIGHT - PANEL_TEXTURE_PAD * 2,
    useMagenta,
  )
  const texture = new CanvasTexture(ctx.canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
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
