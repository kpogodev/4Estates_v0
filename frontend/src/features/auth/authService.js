import axios from 'axios';

const API_URL = '/api/v1/auth';

// Get Properties
const loginUser = async ({ email, password }) => {
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  };

  const body = {
    email,
    password,
  };

  const { data } = await axios.post(`${API_URL}/login`, body, config);
  return data;
};

const authService = {
  loginUser,
};

export default authService;
