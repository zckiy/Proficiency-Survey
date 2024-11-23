import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/diagram'

export const diagramData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data-diagram`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};  