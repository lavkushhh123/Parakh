import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  Eye,
  EyeOff,
  X,
} from 'lucide-react'

import Button from './Button'
import studentData from '../data/studentData'

import {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from '../services/api'

function AuthModal({ mode = 'login', onClose, onModeChange }) {
  const navigate = useNavigate()
  const [authStep, setAuthStep] = useState(
    mode === 'login' ? 'login' : 'signup'
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    education: '',
    degree: '',
    otp: '',
    newPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  const switchAuthMode = (newMode) => {
    setAuthStep(newMode)
    setError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
    setShowNewPassword(false)

    onModeChange(newMode)
  }

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return 'Please enter a valid email.'
    }

    return ''
  }

  const validateLogin = () => {
    const emailError = validateEmail()

    if (emailError) {
      return emailError
    }

    if (!formData.password) {
      return 'Password is required.'
    }

    return ''
  }

  const validateSignup = () => {
    const emailError = validateEmail()

    if (emailError) {
      return emailError
    }

    if (!formData.name.trim()) {
      return 'Name is required.'
    }

    if (!formData.password) {
      return 'Password is required.'
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/

    if (!passwordRegex.test(formData.password)) {
      return 'Password must be 8-20 characters and contain letters and numbers.'
    }

    if (!formData.confirmPassword) {
      return 'Please confirm your password.'
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.'
    }

    if (!formData.education.trim()) {
      return 'Education is required.'
    }

    if (!formData.degree.trim()) {
      return 'Degree is required.'
    }

    return ''
  }

  const validateOtp = () => {
    const emailError = validateEmail()

    if (emailError) {
      return emailError
    }

    if (!/^\d{6}$/.test(formData.otp)) {
      return 'OTP must be a 6 digit number.'
    }

    return ''
  }

  const validateNewPassword = () => {
    if (!/^\d{6}$/.test(formData.otp)) {
      return 'OTP must be a 6 digit number.'
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/

    if (!passwordRegex.test(formData.newPassword)) {
      return 'Password must be 8-20 characters and contain letters and numbers.'
    }

    return ''
  }

  // LOGIN
  const handleLogin = async () => {
    const validationError = validateLogin()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })

      if (!response?.token) {
        toast.error('Something Went Wrong')
        return
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('isLoggedIn', 'true')
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

      toast.success(response.message || 'Login successful')
      onClose()
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // SIGNUP
  const handleSignup = async () => {
    const validationError = validateSignup()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await signupUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        education: formData.education.trim(),
        degree: formData.degree.trim(),
      })

      if (!response) {
        toast.error('Something Went Wrong')
        return
      }

      if (response.token) {
        const userInfo = response.user || {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          education: formData.education.trim(),
          degree: formData.degree.trim(),
        }

        const emptySkills = Object.keys(studentData.skills).reduce((acc, key) => {
          acc[key] = 0
          return acc
        }, {})

        const profileData = {
          ...studentData,
          name: userInfo.name || formData.name.trim(),
          email: userInfo.email || formData.email.trim().toLowerCase(),
          education: userInfo.education || formData.education.trim(),
          degree: userInfo.degree || formData.degree.trim(),
          experience_years: 0,
          projects: 0,
          certifications: [],
          skills: emptySkills,
          interests: [],
          soft_skills: [],
        }

        // Clear previous session data so every signup starts fresh
        localStorage.removeItem('careerPrediction')
        localStorage.removeItem('careerCluster')
        localStorage.removeItem('clusterResult')
        localStorage.removeItem('skillGapResult')
        localStorage.removeItem('careerRecommendations')

        localStorage.setItem('token', response.token)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('isVerified', 'true')
        localStorage.setItem('user', JSON.stringify(userInfo))
        localStorage.setItem('studentProfile', JSON.stringify(profileData))

        toast.success(response.message || 'Account created successfully')
        onClose()
        navigate('/')
      } else {
        toast.success(response.message || 'Account created successfully')
        switchAuthMode('login')
      }
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // FORGOT PASSWORD - SEND OTP
  const handleSendOtp = async () => {
    const validationError = validateEmail()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await forgotPassword({
        email: formData.email.trim().toLowerCase(),
      })

      setAuthStep('reset-password')

      toast.success(response.message || 'OTP sent successfully. Check your email.')
    } catch (error) {
      console.error('Sending password reset OTP failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // RESET PASSWORD
  const handleResetPassword = async () => {
    const validationError = validateNewPassword()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await resetPassword({
        email: formData.email.trim().toLowerCase(),
        otp: formData.otp,
        newPassword: formData.newPassword,
      })

      setAuthStep('login')

      toast.success(response.message || 'Password reset successfully. You can login now.')

      setFormData((prev) => ({
        ...prev,
        password: '',
        newPassword: '',
        otp: '',
      }))
    } catch (error) {
      console.error('Resetting password failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (authStep === 'login') {
      await handleLogin()
      return
    }

    if (authStep === 'signup') {
      await handleSignup()
      return
    }

    if (authStep === 'forgot-password') {
      await handleSendOtp()
      return
    }

    if (authStep === 'reset-password') {
      await handleResetPassword()
    }
  }

  const goToForgotPassword = () => {
    setAuthStep('forgot-password')
    setError('')
    setFormData((prev) => ({
      ...prev,
      otp: '',
      newPassword: '',
    }))
  }

  const goBackToLogin = () => {
    setAuthStep('login')
    setError('')

    setFormData((prev) => ({
      ...prev,
      otp: '',
      newPassword: '',
    }))
  }

  const getTitle = () => {
    switch (authStep) {
      case 'login':
        return 'Welcome Back'

      case 'signup':
        return 'Create Account'

      case 'forgot-password':
        return 'Forgot Password'

      case 'reset-password':
        return 'Reset Password'

      default:
        return 'Welcome Back'
    }
  }

  const getSubtitle = () => {
    switch (authStep) {
      case 'login':
        return 'Login to continue your career intelligence journey.'

      case 'signup':
        return 'Create your account to start your career intelligence journey.'

      case 'forgot-password':
        return 'Enter your registered email to receive an OTP.'

      case 'reset-password':
        return 'Enter the OTP and create a new password.'

      default:
        return ''
    }
  }

  const isEmailDisabled =
    authStep === 'reset-password'

  const isLoginOrSignup =
    authStep === 'login' ||
    authStep === 'signup'

  return (
    <div
      className="auth-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="auth-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-logo">P</div>

          <p className="page-label">PARAKH</p>

          <h2>{getTitle()}</h2>

          <p>{getSubtitle()}</p>
        </div>

        <div className="auth-modal-tabs">
          <button
            type="button"
            className={`auth-modal-tab ${authStep === 'login' ? 'active' : ''}`}
            onClick={() => switchAuthMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-modal-tab ${authStep === 'signup' ? 'active' : ''}`}
            onClick={() => switchAuthMode('signup')}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="auth-message auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {authStep === 'signup' && (
            <div className="auth-field">
              <label htmlFor="auth-name">
                Name
              </label>

              <div className="auth-input-wrapper">
                <User size={18} />

                <input
                  id="auth-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">
              Email
            </label>

            <div className="auth-input-wrapper">
              <Mail size={18} />

              <input
                id="auth-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={isEmailDisabled}
              />
            </div>
          </div>

          {isLoginOrSignup && (
            <div className="auth-field">
              <label htmlFor="auth-password">
                Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={18} />

                <input
                  id="auth-password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    authStep === 'signup'
                      ? '8-20 characters with letters and numbers'
                      : 'Enter your password'
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

          {authStep === 'signup' && (
            <div className="auth-field">
              <label htmlFor="auth-confirm-password">
                Confirm Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={18} />

                <input
                  id="auth-confirm-password"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

          {authStep === 'signup' && (
            <>
              <div className="auth-field">
                <label htmlFor="auth-education">
                  Education
                </label>

                <div className="auth-input-wrapper">
                  <GraduationCap size={18} />

                  <input
                    id="auth-education"
                    name="education"
                    type="text"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Example: B.Tech"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="auth-degree">
                  Degree
                </label>

                <div className="auth-input-wrapper">
                  <BookOpen size={18} />

                  <input
                    id="auth-degree"
                    name="degree"
                    type="text"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="Example: Computer Science"
                  />
                </div>
              </div>
            </>
          )}

          {authStep === 'forgot-password' && (
            <></>
          )}

          {authStep === 'reset-password' && (
            <>
              <div className="auth-field">
                <label htmlFor="auth-otp">
                  OTP
                </label>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="auth-otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6 digit OTP"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="auth-new-password">
                  New Password
                </label>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="auth-new-password"
                    name="newPassword"
                    type={
                      showNewPassword
                        ? 'text'
                        : 'password'
                    }
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="8-20 characters with letters and numbers"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowNewPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showNewPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {authStep === 'signup' ? (
            <div className="auth-buttons-row">
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Please wait...' : 'Create Account'}
              </Button>

              <button
                type="button"
                className="auth-secondary-btn"
                onClick={() => switchAuthMode('login')}
              >
                Login
              </button>
            </div>
          ) : (
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Login'}
            </Button>
          )}
        </form>

        <div className="auth-switch">
          <span>
            {authStep === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>

          <button
            type="button"
            className="auth-link-button"
            onClick={() =>
              switchAuthMode(
                authStep === 'login'
                  ? 'signup'
                  : 'login'
              )
            }
          >
            {authStep === 'login'
              ? 'Sign Up'
              : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal