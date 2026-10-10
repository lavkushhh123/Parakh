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


// Protected pages sirf logged-in user ko dikhenge
function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'

  if (!isLoggedIn) {
    return null
  }

  return children
}


// Main dashboard layout
function AppLayout({
  theme,
  toggleTheme,
  authMode,
  setAuthMode,
}) {
  const location = useLocation()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Old auth routes ko temporarily alag rakha hai
  const authPages = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ]

  const isAuthPage =
    authPages.includes(location.pathname)


  // Route change hone par mobile sidebar close
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])


  // Login/Signup modal open karo
  const openAuthModal = (mode) => {
    setAuthMode(mode)
  }


  // Modal close karo
  const closeAuthModal = () => {
    setAuthMode(null)
  }


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
            onClick={() =>
              setSidebarOpen((prev) => !prev)
            }
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}


      <div
        className={
          isAuthPage
            ? ''
            : 'layout'
        }
      >

        {!isAuthPage && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}


        <main
          className={
            isAuthPage
              ? ''
              : 'main-content'
          }
        >

          <Routes>

            {/* Old auth routes temporarily kept */}

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/verify-otp"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />


            {/* Protected dashboard routes */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career"
              element={
                <ProtectedRoute>
                  <CareerPrediction />
                </ProtectedRoute>
              }
            />

            <Route
              path="/skills"
              element={
                <ProtectedRoute>
                  <SkillAnalysis />
                </ProtectedRoute>
              }
            />

            <Route
              path="/skill-gap"
              element={
                <ProtectedRoute>
                  <SkillGap />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cluster"
              element={
                <ProtectedRoute>
                  <Cluster />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recommendations"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/career-details"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </main>

      </div>


      {/* Login/Signup modal */}

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
    return (
      localStorage.getItem('theme') ||
      'light'
    )
  })


  // Login ya Signup modal ka current mode
  const [authMode, setAuthMode] =
    useState(null)


  // Light/Dark theme toggle
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'light'
        ? 'dark'
        : 'light'
    )
  }


  // Theme ko HTML root par apply karo
  useEffect(() => {

    document.documentElement.setAttribute(
      'data-theme',
      theme
    )

    localStorage.setItem(
      'theme',
      theme
    )

  }, [theme])


  return (
    <BrowserRouter>

      <AppLayout
        theme={theme}
        toggleTheme={toggleTheme}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />

    </BrowserRouter>
  )
}

export default App