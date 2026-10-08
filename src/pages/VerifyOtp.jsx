
import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

function VerifyOtp() {
  const navigate = useNavigate()

  // OTP verification data
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
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

  // Validate OTP according to backend schema
  const validateOtp = () => {
    if (!formData.email.includes('@')) {
      return 'Please enter a valid email.'
    }

    // OTP must contain exactly 6 digits
    const otpRegex = /^\d{6}$/

    if (!otpRegex.test(formData.otp)) {
      return 'OTP must be exactly 6 digits.'
    }

    return ''
  }

  // Verify OTP
  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const validationError = validateOtp()

    if (validationError) {
      setError(validationError)
      return
    }

    // Exact JSON structure for verifyOtpSchema
    const requestData = {
      email: formData.email.trim(),
      otp: formData.otp,
    }

    console.log('Verify OTP Request:', requestData)

    // Temporary frontend verification
    // Real backend OTP verification will be connected later
    localStorage.setItem('isVerified', 'true')
    localStorage.setItem('isLoggedIn', 'true')

    setSuccess('Email verified successfully!')

    // Verification ke baad Home page par jao
    navigate('/')
  }

  // Resend OTP
  const handleResendOtp = () => {
    setError('')
    setSuccess('')

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email first.')
      return
    }

    // Exact JSON structure for resendOtpSchema
    const requestData = {
      email: formData.email.trim(),
    }

    console.log('Resend OTP Request:', requestData)

    // Temporary message
    // Real API will be connected later
    setSuccess(
      'Resend OTP request is ready for API integration.'
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
            Verify Email
          </h1>

          <p>
            Enter the 6-digit OTP sent to your email
            address.
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

          {/* Verify button */}
          <Button type="submit">
            Verify OTP
          </Button>

        </form>

        {/* Resend OTP */}
        <button
          type="button"
          className="auth-link-button"
          onClick={handleResendOtp}
        >
          Resend OTP
        </button>

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

export default VerifyOtp