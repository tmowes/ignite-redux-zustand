import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { App } from './_app'
import './styles/global.css'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
