
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

export const deletePertanyaanDet = async (pertanyaanDetID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete-detail/${pertanyaanDetID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deletePertanyaan = async (pertanyaanID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${pertanyaanID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};