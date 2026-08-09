import { PortfolioScene } from '@/scenes/PortfolioScene'
import { Navbar } from '@/components/ui/Navbar'
import { Tooltip } from '@/components/ui/Tooltip'
import { DetailModal } from '@/components/ui/DetailModal'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { AccessibleContent } from '@/components/ui/AccessibleContent'
import { NoWebGLFallback } from '@/components/ui/NoWebGLFallback'
import { I18nProvider } from '@/i18n/I18nProvider'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'

function App() {
  const webGLSupported = useWebGLSupport()

  return (
    <I18nProvider>
      {webGLSupported ? (
        <main style={{ width: '100vw', height: '100vh' }}>
          <PortfolioScene />
          <Navbar />
          <Tooltip />
          <DetailModal />
          <LoadingScreen />
          <AccessibleContent className="sr-only" />
        </main>
      ) : (
        <NoWebGLFallback />
      )}
    </I18nProvider>
  )
}

export default App
