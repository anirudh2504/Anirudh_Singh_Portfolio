import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppearanceProvider } from './context/AppearanceContext'
import App from './App'
import './styles/tokens.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  </StrictMode>,
)
