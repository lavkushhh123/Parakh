import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import { signupUser } from '../services/api'

function Signup() {

  const navigate = useNavigate()

  // Signup form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    education: '',
    degree: '',
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

  // Validate signup data
  const validateForm = () => {

    if (!formData.name.trim()) {
      return 'Name is required.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return 'Please enter a valid email.'
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/

    if (!passwordRegex.test(formData.password)) {
      return 'Password must be 8-20 characters and contain at least one letter and one number.'
    }

    if (!formData.education.trim()) {
      return 'Education is required.'
    }

    if (!formData.degree.trim()) {
      return 'Degree is required.'
    }

    return ''
  }

  // Handle signup
  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      toast.error(validationError)
      return
    }

    const requestData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      education: formData.education.trim(),
      degree: formData.degree.trim(),
    }

    try {
      setLoading(true)
      const response = await signupUser(requestData)

      if (!response) {
        toast.error('Something Went Wrong')
        return
      }

      localStorage.setItem(
        'signupEmail',
        response.email || requestData.email
      )
      localStorage.setItem('signupName', requestData.name)
      toast.success(
        response.message || 'Account created. OTP sent to your email.'
      )
      navigate('/verify-otp')
    } catch (error) {
      console.error('Signup failed:', error)
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
            Create Account
          </h1>

          <p>
            Create your account to start your career
            intelligence journey.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="auth-field">

            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              autoComplete="name"
              required
              onChange={handleChange}
              placeholder="Enter your name"
            />

          </div>

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
              autoComplete="new-password"
              required
              onChange={handleChange}
              placeholder="8-20 characters with letters and numbers"
            />

          </div>

          {/* Education */}
          <div className="auth-field">

            <label htmlFor="education">
              Education
            </label>

            <input
              id="education"
              name="education"
              type="text"
              value={formData.education}
              required
              onChange={handleChange}
              placeholder="Example: B.Tech"
            />

          </div>

          {/* Degree */}
          <div className="auth-field">

            <label htmlFor="degree">
              Degree
            </label>

            <input
              id="degree"
              name="degree"
              type="text"
              value={formData.degree}
              required
              onChange={handleChange}
              placeholder="Example: Computer Science"
            />

          </div>

          {/* Signup button */}
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

        </form>

        {/* Login link */}
        <button
          type="button"
          className="auth-link-button"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  )
}

export default Signup