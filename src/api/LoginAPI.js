import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/login'

export const loginAdmin = async (username, password) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/LoginAdmin/username=${username}&password=${password}`);
        return response.data;   
    } catch (error) {
        throw new Error(error.message);
    }
};  