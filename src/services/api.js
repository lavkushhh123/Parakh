const API_BASE_URL = import.meta.env.VITE_API_URL

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

// ==================== AUTH APIs ====================

export const signupUser = async (userData) => {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export const verifySignupOtp = async (data) => {
  return apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const resendSignupOtp = async (data) => {
  return apiRequest('/api/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const loginUser = async (data) => {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const forgotPassword = async (data) => {
  return apiRequest('/api/auth/forget-password', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const resetPassword = async (data) => {
  return apiRequest('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ==================== EXISTING ML FUNCTIONS ====================
// Temporary: existing pages still import these functions.

export const predictCareer = async (data) => {
  return apiRequest('/predict', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const analyzeCluster = async (data) => {
  return apiRequest('/cluster', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const analyzeSkillGap = async (data) => {
  return apiRequest('/skill-gap', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const getCareerDetails = async (career) => {
  return apiRequest(`/career/${encodeURIComponent(career)}`)
}

export const getRecommendations = async (data) => {
  return apiRequest('/recommendations', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}