/**
 * SPEC-FR-1.2.2, SPEC-FR-12.1.2, SPEC-NFR-2
 */

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import './index.css'
import App from './App.tsx'
import {getApiMode} from '@/shared/config/apiMode'
import {startMockApi} from '@/mocks/browser'

/**
 * @spec SPEC-NFR-2 - Bootstrap с MSW в mock-режиме
 */
async function bootstrap() {
  if (getApiMode() === 'mock') {
    await startMockApi()
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()
