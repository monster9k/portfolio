import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'
import { pseudoRandom } from '@/utils/random'
import { ACCENT_CYAN, ACCENT_MAGENTA } from '@/styles/colors'

/**
 * Procedurally builds the cyberpunk "tech hull" textures for Planet.tsx —
 * a panel-line diffuse map, a matching emissive map with a random subset of
 * lit windows, and a wireframe alpha mask for the outer hologram shell.
 * Runtime canvas generation avoids sourcing/licensing a new texture asset.
 */

const HULL_TOP = '#131a2b'
const HULL_BOTTOM = '#05070d'
const PANEL_LINE = 'rgba(140, 168, 210, 0.35)'
const LIT_WINDOW_CHANCE = 0.82
const MAGENTA_WINDOW_CHANCE = 0.72

export interface PlanetTextureSet {
  map: CanvasTexture
  emissiveMap: CanvasTexture
  shellAlphaMap: CanvasTexture
}

interface PanelCell {
  x: number
  y: number
  w: number
  h: number
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
    const cols = 10 + (row % 3)
    const colWidth = width / cols
    const offset = row % 2 === 1 ? colWidth / 2 : 0
    let x = -offset
    let i = 0
    while (x < width) {
      const w = colWidth * (0.85 + pseudoRandom(row * 97 + i) * 0.3)
      cells.push({ x, y, w: Math.min(w, width - x), h: rowHeight })
      x += colWidth
      i++
    }
  }
  return cells
}

export function generatePlanetTextures(isLowPower: boolean): PlanetTextureSet {
  const width = isLowPower ? 512 : 1024
  const height = isLowPower ? 256 : 512
  const rows = isLowPower ? 14 : 22
  const cells = buildPanelGrid(width, height, rows)

  const hullCtx = createContext(width, height)
  const gradient = hullCtx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, HULL_TOP)
  gradient.addColorStop(1, HULL_BOTTOM)
  hullCtx.fillStyle = gradient
  hullCtx.fillRect(0, 0, width, height)
  hullCtx.strokeStyle = PANEL_LINE
  hullCtx.lineWidth = Math.max(1, width / 512)
  for (const cell of cells) {
    hullCtx.strokeRect(cell.x + 0.5, cell.y + 0.5, cell.w - 1, cell.h - 1)
  }

  const emissiveCtx = createContext(width, height)
  emissiveCtx.fillStyle = '#000000'
  emissiveCtx.fillRect(0, 0, width, height)
  cells.forEach((cell, i) => {
    if (pseudoRandom(i * 13.37 + 4) <= LIT_WINDOW_CHANCE) return
    const isMagenta = pseudoRandom(i * 3.14) > MAGENTA_WINDOW_CHANCE
    emissiveCtx.globalAlpha = 0.5 + pseudoRandom(i * 7.77) * 0.5
    emissiveCtx.fillStyle = isMagenta ? ACCENT_MAGENTA : ACCENT_CYAN
    emissiveCtx.fillRect(cell.x + cell.w * 0.15, cell.y + cell.h * 0.2, cell.w * 0.7, cell.h * 0.6)
  })
  emissiveCtx.globalAlpha = 1

  const shellCtx = createContext(width, height)
  shellCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
  shellCtx.lineWidth = Math.max(1, width / 768)
  for (const cell of cells) {
    shellCtx.strokeRect(cell.x + 0.5, cell.y + 0.5, cell.w - 1, cell.h - 1)
  }

  const map = new CanvasTexture(hullCtx.canvas)
  map.colorSpace = SRGBColorSpace
  map.wrapS = map.wrapT = RepeatWrapping

  const emissiveMap = new CanvasTexture(emissiveCtx.canvas)
  emissiveMap.colorSpace = SRGBColorSpace

  const shellAlphaMap = new CanvasTexture(shellCtx.canvas)

  return { map, emissiveMap, shellAlphaMap }
}
