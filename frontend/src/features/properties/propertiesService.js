import axios from 'axios'

const API_URL = '/api/v1/properties'

// Get Properties
const getProperties = async (query = null) => {
  const params = (query && new URLSearchParams(query)) ?? ''

  const { data } = await axios.get(`${API_URL}?${params}`)
  return data
}

// Add Properties
const addProperty = async (formData) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }

  const { data } = await axios.post(`${API_URL}`, formData, config)
  return data
}

const propertiesService = {
  getProperties,
  addProperty,
}

export default propertiesService
