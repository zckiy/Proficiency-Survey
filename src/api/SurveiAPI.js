import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/survei'

// Fungsi untuk mendapatkan data

export const prodi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prodiList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  

export const survei = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surveiList`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  

export const pertanyaan = async (surveiId, prodiId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pertanyaanList/surveiId=${surveiId}&prodiId=${prodiId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  

export const pertanyaanDetail = async (pertanyaanId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pertanyaanDetList/pertanyaanId=${pertanyaanId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  