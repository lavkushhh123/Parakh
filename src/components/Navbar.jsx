
import {
  Moon,
  Sun,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Navbar({
  theme,
  toggleTheme,
  openAuthModal,
}) {
  const navigate = useNavigate()

  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'

  const getUserName = () => {
    try {
      const u = localStorage.getItem('user')
      if (u) {
        const parsed = JSON.parse(u)
        if (parsed?.name) return parsed.name
      }
      const p = localStorage.getItem('studentProfile')
      if (p) {
        const parsed = JSON.parse(p)
        if (parsed?.name) return parsed.name
      }
    } catch {}
    return 'Student'
  }

  const userName = getUserName()
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'S'

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isVerified')
    localStorage.removeItem('studentProfile')
    localStorage.removeItem('careerPrediction')
    localStorage.removeItem('skillGapResult')
    localStorage.removeItem('clusterResult')
    localStorage.removeItem('careerRecommendations')
    window.dispatchEvent(new Event('auth-change'))
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar">

      <div className="navbar-title">
        <span>
          AI Career & Skill Intelligence Platform
        </span>
      </div>

      <div className="navbar-user">

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={
            theme === 'light'
              ? 'Switch to dark mode'
              : 'Switch to light mode'
          }
        >
          {theme === 'light' ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>

        {!isLoggedIn ? (
          <>
            <button
              className="navbar-auth-button navbar-login-button"
              onClick={() => openAuthModal('login')}
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>

            <button
              className="navbar-auth-button navbar-signup-button"
              onClick={() => openAuthModal('signup')}
            >
              <UserPlus size={16} />
              <span>Sign Up</span>
            </button>
          </>
        ) : (
          <>
            <div className="navbar-avatar">
              {userInitial}
            </div>

            <div className="navbar-user-info">
              <strong>{userName}</strong>
              <span>Student</span>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar
