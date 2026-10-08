
import {
  Moon,
  Sun,
  Bell,
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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
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

        <button
          className="notification"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        {!isLoggedIn ? (
          <>
            <button
              className="navbar-auth-button"
              onClick={() => openAuthModal('login')}
            >
              <LogIn size={17} />
              Login
            </button>

            <button
              className="navbar-auth-button navbar-signup-button"
              onClick={() => openAuthModal('signup')}
            >
              <UserPlus size={17} />
              Sign Up
            </button>
          </>
        ) : (
          <>
            <div className="navbar-avatar">
              L
            </div>

            <div className="navbar-user-info">
              <strong>Lavkush Nishad</strong>
              <span>Student</span>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar
