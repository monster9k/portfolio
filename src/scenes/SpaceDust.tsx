import { Sparkles } from '@react-three/drei'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ACCENT_CYAN } from '@/styles/colors'

/** Fine drifting space dust, filling the volume between the planet and the nebula clouds. */

const DUST_SCALE: [number, number, number] = [50, 30, 50]

export function SpaceDust() {
  const { isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Sparkles
      count={isLowPower ? 250 : 700}
      scale={DUST_SCALE}
      size={1.6}
      speed={prefersReducedMotion ? 0 : 0.2}
      opacity={0.5}
      color={ACCENT_CYAN}
    />
  )
}
