import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function Login() {

  const navigate = useNavigate()

  // Login form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

    if (!formData.email.includes('@')) {
      return 'Please enter a valid email.'
    }

    if (!formData.password) {
      return 'Password is required.'
    }

    return ''
  }

  // Handle login form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    // Backend login API ke liye request data
    const requestData = {
      email: formData.email.trim(),
      password: formData.password,
    }

    console.log('Login Request:', requestData)

    // Temporary login state
    localStorage.setItem('isLoggedIn', 'true')

    setSuccess('Login successful!')

    // Login ke baad Home page par jao
    navigate('/')
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

        {/* Error message */}
        {error && (
          <div className="auth-message auth-error">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="auth-message auth-success">
            {success}
          </div>
        )}

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
              onChange={handleChange}
              placeholder="Enter your password"
            />

          </div>

          {/* Login button */}
          <Button type="submit">
            Login
          </Button>

        </form>

        {/* Forgot password */}
        <button
          type="button"
          className="auth-link-button"
          onClick={() => {
            navigate('/forgot-password')
          }}
        >
          Forgot Password?
        </button>

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