import axios from 'axios'

const API_URL = '/api/v1/rentals'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Get rental
const getRental = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`)
  return data
}

// Add rental
const addRental = async (newFormData) => {
  const { data } = await axios.post(`${API_URL}`, newFormData, config)
  return data
}

// Delete rental
const removeRental = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}

const rentsServices = {
  addRental,
  getRental,
  removeRental
}

export default rentsServices
