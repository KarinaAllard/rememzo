import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GameProvider } from './game/GameContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <UserProvider>
          <LanguageProvider>
            <GameProvider>
                <App />
            </GameProvider>
          </LanguageProvider>
        </UserProvider>
  </StrictMode>,
)
