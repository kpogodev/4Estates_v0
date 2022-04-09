import axios from 'axios'

const API_URL = '/api/v1/auth'

// Login
const loginUser = async ({ email, password }) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }

  const body = {
    email,
    password,
  }

  const { data } = await axios.post(`${API_URL}/login`, body, config)
  return data
}

// Logout
const logoutUser = async () => {
  const { data } = await axios.get(`${API_URL}/logout`)
  return data
}

// Get User
const getUser = async () => {
  const { data } = await axios.get(`${API_URL}/me`)
  return data
}

// Register
const registerUser = async ({ name, email, password, role }) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }

  const body = {
    name,
    email,
    password,
    role,
  }

  const { data } = await axios.post(`${API_URL}/register`, body, config)
  return data
}

// Recover Password
const recoverPassword = async (email) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }

  const { data } = await axios.post(`${API_URL}/recover`, { email }, config)
  return data
}

// Reset Password
const resetPassword = async ({ password, token }) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }

  const { data } = await axios.put(`${API_URL}/reset-password/${token}`, { password }, config)
  return data
}

// Upload Avatar
const uploadAvatar = async (imageData) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }

  const { data } = await axios.post(`${API_URL}/upload`, { data: imageData }, config)
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
}

export default authService
