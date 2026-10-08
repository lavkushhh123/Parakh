
import { useState } from 'react'
import Button from '../components/Button'

function ResetPassword() {

  // Reset password form state
  // These fields exactly match resetPasswordSchema
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
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

  // Validate reset password data
  const validateForm = () => {

    if (!formData.email.includes('@')) {
      return 'Please enter a valid email.'
    }

    // OTP must contain exactly 6 digits
    const otpRegex = /^\d{6}$/

    if (!otpRegex.test(formData.otp)) {
      return 'OTP must be exactly 6 digits.'
    }

    // Password must be 8-20 characters
    // and contain both letters and numbers
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/

    if (!passwordRegex.test(formData.newPassword)) {
      return 'New password must be 8-20 characters and contain letters and numbers.'
    }

    return ''
  }

  // Handle reset password submission
  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    // Exact JSON structure for resetPasswordSchema
    const requestData = {
      email: formData.email.trim(),
      otp: formData.otp,
      newPassword: formData.newPassword,
    }

    console.log(
      'Reset Password Request:',
      requestData
    )

    // Temporary message
    // API will be connected after backend endpoint is available
    setSuccess(
      'Password reset data is valid and ready for API integration.'
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
            Reset Password
          </h1>

          <p>
            Enter your email, reset OTP and create a
            new password.
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

          {/* OTP */}
          <div className="auth-field">

            <label htmlFor="otp">
              OTP
            </label>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
            />

          </div>

          {/* New password */}
          <div className="auth-field">

            <label htmlFor="newPassword">
              New Password
            </label>

            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="8-20 characters with letters and numbers"
            />

          </div>

          {/* Reset button */}
          <Button type="submit">
            Reset Password
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

export default ResetPassword