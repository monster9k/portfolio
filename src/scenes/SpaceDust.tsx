import { Sparkles } from '@react-three/drei'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_GOLD, TEXT_PRIMARY } from '@/styles/colors'

/**
 * Two dust layers: a wide, dense pale debris field (the "disintegrating"
 * atmosphere from the reference) plus a tighter, subtler cyan accent layer
 * close to the planet for a hint of tech-energy near the hull.
 */

const DEBRIS_SCALE: [number, number, number] = [60, 40, 60]
const ACCENT_SCALE: [number, number, number] = [14, 10, 14]

export function SpaceDust() {
  const { isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()
  const speed = prefersReducedMotion ? 0 : 0.15

  return (
    <>
      <Sparkles
        count={isLowPower ? 400 : 1400}
        scale={DEBRIS_SCALE}
        size={2.2}
        speed={speed}
        opacity={0.35}
        color={TEXT_PRIMARY}
      />
      <Sparkles
        count={isLowPower ? 120 : 350}
        scale={ACCENT_SCALE}
        size={1.4}
        speed={speed}
        opacity={0.6}
        color={ACCENT_GOLD}
      />
    </>
  )
}
