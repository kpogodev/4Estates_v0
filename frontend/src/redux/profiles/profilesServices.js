import axios from 'axios'

const API_URL = '/api/v1/profiles'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Get My Profile
const getMyProfile = async () => {
  const { data } = await axios.get(`${API_URL}/me`)
  return data
}

// Update Profile
const updateProfile = async ({ newFormData, profileId }) => {
  const { data } = await axios.put(`${API_URL}/${profileId}`, newFormData, config)
  return data
}

// Add Observed Rent
const addObservedRent = async (id) => {
  const { data } = await axios.patch(`${API_URL}/observedrentals/add`, { id }, config)
  return data
}

// Remove Observed Rent
const removeObservedRent = async (id) => {
  const { data } = await axios.patch(`${API_URL}/observedrentals/remove`, { id }, config)
  return data
}

const profilesServices = {
  getMyProfile,
  updateProfile,
  addObservedRent,
  removeObservedRent,
}

export default profilesServices
