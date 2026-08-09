import { useEffect, useState } from 'react'

export interface QualityTier {
  isLowPower: boolean
  planetSegments: number
  dpr: [number, number]
}

function detectLowPower(): boolean {
  if (typeof window === 'undefined') return false
  const isNarrowViewport = window.matchMedia('(max-width: 768px)').matches
  const hasFewCores = (navigator.hardwareConcurrency ?? 8) <= 4
  return isNarrowViewport || hasFewCores
}

export function useResponsiveQuality(): QualityTier {
  const [isLowPower, setIsLowPower] = useState(detectLowPower)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleChange = () => setIsLowPower(detectLowPower())
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return {
    isLowPower,
    planetSegments: isLowPower ? 32 : 64,
    dpr: isLowPower ? [1, 1.5] : [1, 2],
  }
}
