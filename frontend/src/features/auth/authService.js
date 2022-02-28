import axios from 'axios';

const API_URL = '/api/v1/auth';

// Login
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

// Logout
const logoutUser = async () => {
  const { data } = await axios.get(`${API_URL}/logout`);
  return data;
};

// Check User
const checkUser = async () => {
  const { data } = await axios.get(`${API_URL}/check`);
  return data;
};

const authService = {
  loginUser,
  logoutUser,
  checkUser,
};

export default authService;
