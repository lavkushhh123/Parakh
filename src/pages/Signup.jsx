import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

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

  // Validate signup data
  const validateForm = () => {

    if (!formData.name.trim()) {
      return 'Name is required.'
    }

    if (!formData.email.includes('@')) {
      return 'Please enter a valid email.'
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/

    if (!passwordRegex.test(formData.password)) {
      return 'Password must be 8-20 characters and contain letters and numbers.'
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
  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    // API ke liye ready request data
    const requestData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      education: formData.education.trim(),
      degree: formData.degree.trim(),
    }

    console.log('Signup Request:', requestData)

    // OTP page ke liye email temporarily save karo
    localStorage.setItem(
      'signupEmail',
      requestData.email
    )

    setSuccess('Account details are valid.')

    // Signup ke baad OTP verification page
    navigate('/verify-otp')
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
              onChange={handleChange}
              placeholder="Example: Computer Science"
            />

          </div>

          {/* Signup button */}
          <Button type="submit">
            Create Account
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