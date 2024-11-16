import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/survei'

// Fungsi untuk mendapatkan data

export const prodi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list-prodi`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  

export const survei = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list-survei`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  

export const pertanyaan = async (surveiId, prodiId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list-pertanyaan/surveiId=${surveiId}&prodiId=${prodiId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};  

export const pertanyaanDetail = async (pertanyaanId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list-pertanyaandet/pertanyaanId=${pertanyaanId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const insertJawaban = async (data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/insert-jawaban`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
  } catch (error) {
      throw new Error(error.message);
  }
};

export const insertJawabanDet = async (data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/insert-jawabandet`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
  } catch (error) {
      throw new Error(error.message);
  }
};