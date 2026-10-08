
import { useState } from 'react'
import Button from '../components/Button'

function ForgotPassword() {

  // Forgot password form state
  // This field exactly matches forgotPasswordSchema
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Handle email input
  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  // Validate email
  const validateEmail = () => {

    if (!email.includes('@')) {
      return 'Please enter a valid email.'
    }

    return ''
  }

  // Handle forgot password request
  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const validationError = validateEmail()

    if (validationError) {
      setError(validationError)
      return
    }

    // Exact JSON structure for forgotPasswordSchema
    const requestData = {
      email: email.trim(),
    }

    console.log(
      'Forgot Password Request:',
      requestData
    )

    // Temporary message
    // API will be connected after backend endpoint is available
    setSuccess(
      'Password reset OTP request is ready for API integration.'
    )
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
            Forgot Password?
          </h1>

          <p>
            Enter your registered email address to
            receive a password reset OTP.
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
              value={email}
              onChange={handleChange}
              placeholder="Enter your registered email"
            />

          </div>

          {/* Submit button */}
          <Button type="submit">
            Send Reset OTP
          </Button>

        </form>

        {/* Back to login */}
        <button
          type="button"
          className="auth-link-button"
          onClick={() => {
            window.location.href = '/login'
          }}
        >
          Back to Login
        </button>

      </div>

    </div>
  )
}

export default ForgotPassword
