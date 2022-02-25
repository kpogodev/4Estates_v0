import axios from 'axios';

const API_URL = '/api/v1/properties';

// Get Properties
const getProperties = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const propertiesService = {
  getProperties,
};

export default propertiesService;
