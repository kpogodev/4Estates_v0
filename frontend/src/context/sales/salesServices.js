import axios from 'axios'

const API_URL = '/api/v1/sales'

const config = {
  headers: {
    ContentType: 'application/json',
  },
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
  addSale,
  getSale,
  removeSale,
}

export default rentsServices
