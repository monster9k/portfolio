import { PortfolioScene } from '@/scenes/PortfolioScene'
import { Navbar } from '@/components/ui/Navbar'
import { Tooltip } from '@/components/ui/Tooltip'
import { DetailModal } from '@/components/ui/DetailModal'
import { I18nProvider } from '@/i18n/I18nProvider'

function App() {
  return (
    <I18nProvider>
      <main style={{ width: '100vw', height: '100vh' }}>
        <PortfolioScene />
        <Navbar />
        <Tooltip />
        <DetailModal />
      </main>
    </I18nProvider>
  )
}

export default App
