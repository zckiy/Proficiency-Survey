import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/responden'

export const insertResponden = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/insert`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};