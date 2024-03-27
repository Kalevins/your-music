import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from '@/routes'

import {
  LoadingProvider,
  AuthProvider
} from '@/contexts'

import '@/styles/globals.scss'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
)
