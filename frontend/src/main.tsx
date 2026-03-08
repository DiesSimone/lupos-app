import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider, RenderProvider } from './Contexts'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RenderProvider>
        <App />
      </RenderProvider>
    </AuthProvider>
  </StrictMode>,
)
