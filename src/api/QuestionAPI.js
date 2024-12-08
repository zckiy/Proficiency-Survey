
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/question'

export const insertPertanyaan = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/insert`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const insertPertanyaanDet = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/insert-detail`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};