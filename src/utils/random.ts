/**
 * Deterministic pseudo-random helpers, seeded by a stable string id.
 * Used wherever a scene object needs per-id shape/placement variation
 * that stays identical across re-renders and reloads.
 */
export function hashId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}
