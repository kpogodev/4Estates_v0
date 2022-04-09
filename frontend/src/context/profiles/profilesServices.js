import axios from 'axios'

const API_URL = '/api/v1/profiles'

const config = {
  headers: {
    ContentType: 'application/json',
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

const profilesServices = {
  getMyProfile,
  updateProfile,
}

export default profilesServices
