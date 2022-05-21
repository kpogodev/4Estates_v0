import axios from 'axios'

const API_URL = '/api/v1/sales'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Get rents
const getSales = async (queryString = null) => {
  const { data } = await axios.get(`${API_URL}?${queryString}`)
  return data
}

// Get rental
const getSale = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`)
  return data
}

// Add rental
const addSale = async (newFormData) => {
  const { data } = await axios.post(`${API_URL}`, newFormData, config)
  return data
}

// Delete rental
const removeSale = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}

const rentsServices = {
  getSales,
  getSale,
  addSale,
  removeSale,
}

export default rentsServices
