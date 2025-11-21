// Application entry point
// Configures React Router with routes and authentication
/* eslint-disable react-refresh/only-export-components */

import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import '@/index.css'
import '@/locales/i18n'
import App from '@/App'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'

// Lazy load pages for better initial load performance
const Home = lazy(() => import('@/pages/Home'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Info = lazy(() => import('@/pages/Info'))

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-lg">Cargando...</div>
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route
                path="user"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="info" element={<Info />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
