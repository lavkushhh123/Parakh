import { useEffect, useState } from 'react'
import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'

import { Menu, X } from 'lucide-react'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AuthModal from './components/AuthModal'

import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CareerPrediction from './pages/CareerPrediction'
import SkillAnalysis from './pages/SkillAnalysis'
import SkillGap from './pages/SkillGap'
import Cluster from './pages/Cluster'
import Dashboard from './pages/Dashboard'

import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

// Main Application Layout
function AppLayout({
  theme,
  toggleTheme,
  authMode,
  setAuthMode,
  isLoggedIn,
}) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Old standalone auth routes
  const authPages = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ]

  const isAuthPage = authPages.includes(location.pathname)

  // Route change hone par mobile sidebar close
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setSidebarOpen(false)
  }

  // Login/Signup modal open karo
  const openAuthModal = (mode) => {
    setAuthMode(mode)
  }

  // Modal close karo
  const closeAuthModal = () => {
    setAuthMode(null)
  }

  // =========================================================
  // 1. UN趋AUTHENTICATED USER: SHOW PARAKH LANDING PAGE
  // =========================================================
  if (!isLoggedIn) {
    return (
      <div className="app">
        <Routes>
          {/* Standalone auth pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Root Parakh Landing Page */}
          <Route
            path="/"
            element={
              <LandingPage
                openAuthModal={openAuthModal}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />

          {/* Unauthenticated access to any other route redirects to Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Login/Signup modal overlay */}
        {authMode && (
          <AuthModal
            mode={authMode}
            onClose={closeAuthModal}
            onModeChange={setAuthMode}
          />
        )}
      </div>
    )
  }

  // =========================================================
  // 2. AUTHENTICATED USER: SHOW ACTUAL UI OF THE PROJECT
  // =========================================================
  return (
    <div className="app">
      {!isAuthPage && (
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          openAuthModal={openAuthModal}
        />
      )}

      {!isAuthPage && (
        <>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      <div className={isAuthPage ? '' : 'layout'}>
        {!isAuthPage && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main className={isAuthPage ? '' : 'main-content'}>
          <Routes>
            {/* If logged in and navigates to auth pages, redirect to dashboard */}
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<Navigate to="/" replace />} />

            {/* Actual Project Dashboard Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/career" element={<CareerPrediction />} />
            <Route path="/skills" element={<SkillAnalysis />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/cluster" element={<Cluster />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<Navigate to="/" replace />} />
            <Route path="/career-details" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Login/Signup modal overlay */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={closeAuthModal}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // Login ya Signup modal ka current mode
  const [authMode, setAuthMode] = useState(null)

  // Reactive auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  // Listen to auth changes across windows, tabs, and component events
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    }

    window.addEventListener('storage', handleAuthChange)
    window.addEventListener('auth-change', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleAuthChange)
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [])

  // Light/Dark theme toggle
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  // Theme ko HTML root par apply karo
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <AppLayout
        theme={theme}
        toggleTheme={toggleTheme}
        authMode={authMode}
        setAuthMode={setAuthMode}
        isLoggedIn={isLoggedIn}
      />
    </BrowserRouter>
  )
}

export default App