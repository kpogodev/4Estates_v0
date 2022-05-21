import axios from 'axios'

const API_URL_AUTH = '/api/v1/auth'
const API_URL_USERS = '/api/v1/users'

// Login
const loginUser = async ({ email, password }) => {
  const { data } = await axios.post(
    `${API_URL_AUTH}/login`,
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return data
}

// Logout
const logoutUser = async () => {
  const { data } = await axios.get(`${API_URL_AUTH}/logout`)
  return data
}

// Get User
const getUser = async () => {
  const { data } = await axios.get(`${API_URL_AUTH}/me`)
  return data
}

// Register
const registerUser = async ({ name, email, password }) => {
  const { data } = await axios.post(
    `${API_URL_AUTH}/register`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return data
}

// Recover Password
const recoverPassword = async (email) => {
  const { data } = await axios.post(
    `${API_URL_AUTH}/recover`,
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return data
}

// Reset Password
const resetPassword = async ({ password, token }) => {
  const { data } = await axios.put(
    `${API_URL_AUTH}/reset-password/${token}`,
    { password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return data
}

// Upload Avatar
const uploadAvatar = async (imageData) => {
  const { data } = await axios.post(
    `${API_URL_USERS}/avatar`,
    { data: imageData },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return data
}

// Add Premium Subscription
const addPremium = async (body) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const { data } = await axios.post(`${API_URL_USERS}/premium`, body, config)
  return data
}

// Update Premium Subscription
const updatePremium = async (action) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const { data } = await axios.put(`${API_URL_USERS}/premium`, { action }, config)
  return data
}

// Cancel Premium Subscription
const cancelPremium = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const { data } = await axios.delete(`${API_URL_USERS}/premium`, config)
  return data
}

const authService = {
  loginUser,
  logoutUser,
  getUser,
  registerUser,
  recoverPassword,
  resetPassword,
  uploadAvatar,
  addPremium,
  updatePremium,
  cancelPremium,
}

export default authService
