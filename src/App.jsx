import AleoShowcase from './AleoShowcase'
import { LanguageProvider } from './contexts/LanguageContext'
// import LanguageSwitcher from './components/LanguageSwitcher'
// import GlobalChat from './components/GlobalChat'

export default function App() {
  return (
    <LanguageProvider>
      <AleoShowcase />
      {/* <GlobalChat /> */}
    </LanguageProvider>
  )
}