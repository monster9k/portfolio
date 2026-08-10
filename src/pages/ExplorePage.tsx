import { PortfolioScene } from '@/scenes/PortfolioScene'
import { Navbar } from '@/components/ui/Navbar'
import { Tooltip } from '@/components/ui/Tooltip'
import { InfoPanel } from '@/components/ui/InfoPanel'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { AccessibleContent } from '@/components/ui/AccessibleContent'
import { NoWebGLFallback } from '@/components/ui/NoWebGLFallback'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'

export function ExplorePage() {
  const webGLSupported = useWebGLSupport()

  if (!webGLSupported) {
    return <NoWebGLFallback />
  }

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <InfoPanel />
      <div style={{ position: 'relative', flex: 1, height: '100%', minWidth: 0 }}>
        <PortfolioScene />
        <div className="scene-vignette" aria-hidden="true" />
      </div>
      <Navbar />
      <Tooltip />
      <LoadingScreen />
      <AccessibleContent className="sr-only" />
    </main>
  )
}
