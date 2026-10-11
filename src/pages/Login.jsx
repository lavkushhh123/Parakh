import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import { loginUser } from '../services/api'
import studentData from '../data/studentData'

function Login() {

  const navigate = useNavigate()

  // Login form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Validate login data
  const validateForm = () => {

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return 'Please enter a valid email.'
    }

    if (!formData.password) {
      return 'Password is required.'
    }

    return ''
  }

  // Handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      toast.error(validationError)
      return
    }

    try {
      setLoading(true)
      const response = await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })

      if (!response?.token) {
        toast.error('Something Went Wrong')
        return
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('isVerified', 'true')

      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user))

        const existingProfile = localStorage.getItem('studentProfile')
        const base = existingProfile ? JSON.parse(existingProfile) : studentData

        localStorage.setItem(
          'studentProfile',
          JSON.stringify({
            ...base,
            name: response.user.name || base.name,
            email: response.user.email || base.email,
            education: response.user.education || base.education,
            degree: response.user.degree || base.degree,
          })
        )
      }

      localStorage.setItem('isLoggedIn', 'true')
      window.dispatchEvent(new Event('auth-change'))
      toast.success(response.message || 'Login successful')
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Page heading */}
        <div className="auth-header">

          <div className="auth-logo">
            P
          </div>

          <p className="page-label">
            PARAKH
          </p>

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to continue your career intelligence
            journey.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="auth-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              autoComplete="email"
              required
              onChange={handleChange}
              placeholder="Enter your email"
            />

          </div>

          {/* Password */}
          <div className="auth-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              autoComplete="current-password"
              required
              onChange={handleChange}
              placeholder="Enter your password"
            />

          </div>

          {/* Login button */}
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>

        </form>

        {/* Signup link */}
        <button
          type="button"
          className="auth-link-button"
          onClick={() => {
            navigate('/signup')
          }}
        >
          Don't have an account? Sign Up
        </button>

      </div>

    </div>
  )
}

export default Login