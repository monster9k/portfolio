import type { RefObject } from 'react'
import type { Mesh, Object3D } from 'three'

/**
 * Shared ref to the sun's mesh (set by Planet.tsx), read by any Html-based
 * element (TechIcon, PlanetDashboards) that needs to occlude behind it —
 * drei's <Html> is a plain DOM overlay with no depth-buffer awareness by
 * default, so without this it always renders on top of the sun.
 */
export interface SunMeshRef {
  current: Mesh | null
}

export const sunMeshRef: SunMeshRef = { current: null }

/**
 * Same object, typed for drei's `<Html occlude>` prop, which declares
 * `RefObject<Object3D>[]` with a non-nullable `current` — stricter than the
 * real lifecycle (unset before Planet's mesh mounts) actually allows.
 */
export const sunOcclusionRef = sunMeshRef as unknown as RefObject<Object3D>
