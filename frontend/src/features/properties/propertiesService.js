import axios from 'axios'

const API_URL = '/api/v1/properties'

// Get Properties
const getProperties = async (query = null) => {
  const params = (query && new URLSearchParams(query)) ?? ''

  const { data } = await axios.get(`${API_URL}?${params}`)
  return data
}

const propertiesService = {
  getProperties,
}

export default propertiesService
