import { pseudoRandom } from '@/utils/random'

/**
 * Shared seeded-point-on-sphere helper reused by PlanetDashboards.tsx for
 * surface-anchored content. The sun itself no longer uses a generated
 * canvas texture — it's a flat, evenly emissive color (see Planet.tsx) —
 * so this file now only exports that helper.
 */

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
