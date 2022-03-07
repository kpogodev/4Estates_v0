import axios from 'axios';

const API_URL = '/api/v1/profiles';

// Get My Profile
const getMyProfile = async () => {
  const { data } = await axios.get(`${API_URL}/me`);
  return data;
};

const profilesServices = {
  getMyProfile,
};

export default profilesServices;
