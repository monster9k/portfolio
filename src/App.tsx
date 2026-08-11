import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { ExplorePage } from '@/pages/ExplorePage'
import { I18nProvider } from '@/i18n/I18nProvider'

function App() {
  return (
    <I18nProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </I18nProvider>
  )
}

export default App
