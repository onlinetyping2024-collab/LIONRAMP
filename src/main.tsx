
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import lionRampLogo from './assets/lionramp-logo.png'

// Set LIONRAMP favicon
const favicon = document.querySelector(
  "link[rel~='icon']",
) as HTMLLinkElement | null

if (favicon) {
  favicon.href = lionRampLogo
}

// Set Apple touch icon
const appleTouchIcon = document.querySelector(
  "link[rel='apple-touch-icon']",
) as HTMLLinkElement | null

if (appleTouchIcon) {
  appleTouchIcon.href = lionRampLogo
}

// Render application
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
