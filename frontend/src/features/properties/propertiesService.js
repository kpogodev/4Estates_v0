import axios from 'axios'
import { setUploadProgress } from './propertiesSlice'

const API_URL = '/api/v1/properties'

// Get Properties
const getProperties = async (query = null) => {
  const params = (query && new URLSearchParams(query)) ?? ''
  const { data } = await axios.get(`${API_URL}?${params}`)
  return data
}

// Get Properties
const getProperty = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`)
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
// Update Properties
const updateProperty = async (payload) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  }
  const { data } = await axios.put(`${API_URL}/${payload.id}`, payload.data, config)
  return data
}

// Upload Images
const uploadPropertyImages = async (formData, thunkAPI) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(progressEvent)
      thunkAPI.dispatch(setUploadProgress(percentCompleted))
    },
  }

  const { data } = await axios.post(`${API_URL}/upload`, formData, config)
  return data
}

const propertiesService = {
  getProperties,
  getProperty,
  addProperty,
  updateProperty,
  uploadPropertyImages,
}

export default propertiesService
