import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import { resendSignupOtp, verifySignupOtp } from '../services/api'

function VerifyOtp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: localStorage.getItem('signupEmail') || '',
    otp: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'otp' ? value.replace(/\D/g, '').slice(0, 6) : value,
    }))
  }

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return 'Please enter a valid email.'
    }

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const emailError = validateEmail()
    if (emailError) {
      toast.error(emailError)
      return
    }

    if (!/^\d{6}$/.test(formData.otp)) {
      toast.error('OTP must be exactly 6 digits.')
      return
    }

    setLoading(true)
    try {
      const response = await verifySignupOtp({
        email: formData.email.trim().toLowerCase(),
        otp: formData.otp,
      })

      if (!response?.token) {
        toast.error('Something Went Wrong')
        return
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('isVerified', 'true')
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify({
        name: localStorage.getItem('signupName') || '',
        email: formData.email.trim().toLowerCase(),
      }))
      localStorage.removeItem('signupEmail')
      localStorage.removeItem('signupName')
      toast.success(response.message || 'Email verified successfully')
      navigate('/')
    } catch (error) {
      console.error('OTP verification failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    const emailError = validateEmail()
    if (emailError) {
      toast.error(emailError)
      return
    }

    setLoading(true)
    try {
      const response = await resendSignupOtp({
        email: formData.email.trim().toLowerCase(),
      })
      toast.success(response.message || 'New OTP sent successfully')
    } catch (error) {
      console.error('Resending signup OTP failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">P</div>
          <p className="page-label">PARAKH</p>
          <h1>Verify Email</h1>
          <p>Enter the 6-digit OTP sent to your email address.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
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

          <div className="auth-field">
            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              required
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : 'Verify OTP'}
          </Button>
        </form>

        <button
          type="button"
          className="auth-link-button"
          onClick={handleResendOtp}
          disabled={loading}
        >
          Resend OTP
        </button>

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
