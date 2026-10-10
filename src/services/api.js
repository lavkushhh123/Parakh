// const API_BASE_URL = import.meta.env.VITE_API_URL

// const apiRequest = async (endpoint, options = {}) => {
//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options.headers || {}),
//     },
//     ...options,
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     throw new Error(data.message || 'Something went wrong')
//   }

//   return data
// }

// // ==================== AUTH APIs ====================

// export const signupUser = async (userData) => {
//   return apiRequest('/api/auth/signup', {
//     method: 'POST',
//     body: JSON.stringify(userData),
//   })
// }

// export const verifySignupOtp = async (data) => {
//   return apiRequest('/api/auth/verify-otp', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const resendSignupOtp = async (data) => {
//   return apiRequest('/api/auth/resend-otp', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const loginUser = async (data) => {
//   return apiRequest('/api/auth/login', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const forgotPassword = async (data) => {
//   return apiRequest('/api/auth/forget-password', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const resetPassword = async (data) => {
//   return apiRequest('/api/auth/reset-password', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// // ==================== EXISTING ML FUNCTIONS ====================
// // Temporary: existing pages still import these functions.

// export const predictCareer = async (data) => {
//   return apiRequest('/predict', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const analyzeCluster = async (data) => {
//   return apiRequest('/cluster', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const analyzeSkillGap = async (data) => {
//   return apiRequest('/skill-gap', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

// export const getCareerDetails = async (career) => {
//   return apiRequest(`/career/${encodeURIComponent(career)}`)
// }

// export const getRecommendations = async (data) => {
//   return apiRequest('/recommendations', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }



import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const ML_API_URL =
  import.meta.env.VITE_ML_API_URL ||
  'https://parakh-deployed-model.onrender.com'

// ==================== COMMON API REQUEST ====================

const apiRequest = async (
  endpoint,
  options = {},
  baseURL = API_BASE_URL
) => {
  let response
  const requestUrl = `${baseURL.replace(/\/+$/, '')}${endpoint}`

  try {
    response = await fetch(requestUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })
  } catch (error) {
    toast.error('Something Went Wrong')
    throw new Error('Something Went Wrong', { cause: error })
  }

  let text

  try {
    text = await response.text()
  } catch (error) {
    toast.error('Something Went Wrong')
    throw new Error('Something Went Wrong', { cause: error })
  }

  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      toast.error('Something Went Wrong')
      throw new Error('Something Went Wrong')
    }
  }

  if (!response.ok) {
    const message =
      (typeof data?.message === 'string' && data.message.trim()) ||
      (typeof data?.error === 'string' && data.error.trim()) ||
      'Something Went Wrong'

    toast.error(message)
    throw new Error(message)
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
  return apiRequest('/api/auth/forgot-password', {
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

// ==================== STUDENTS API ====================

export const getStudents = async () => {
  return apiRequest('/students', {}, ML_API_URL)
}

// ==================== CAREER PREDICTION API ====================

export const predictCareer = async (data) => {
  return apiRequest(
    '/predict',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    ML_API_URL
  )
}

// ==================== CLUSTER API ====================

export const analyzeCluster = async (data) => {
  return apiRequest(
    '/cluster',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    ML_API_URL
  )
}

// ==================== SKILL GAP API ====================

export const analyzeSkillGap = async (data) => {
  return apiRequest(
    '/skill-gap',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    ML_API_URL
  )
}

// ==================== OTHER EXISTING APIs ====================

// These remain on the existing backend.
// Verify their availability before using them.

export const getCareerDetails = async (career) => {
  return apiRequest(`/career/${encodeURIComponent(career)}`)
}

export const getRecommendations = async (data) => {
  return apiRequest('/recommendations', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}