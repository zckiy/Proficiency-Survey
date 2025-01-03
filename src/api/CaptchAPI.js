import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/captcha';

export const verifyCaptcha = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-captcha`, {
      token,
    });
    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
