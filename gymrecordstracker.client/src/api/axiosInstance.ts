import axios from 'axios';
import { handleApiError } from '../utils/errorHandling';

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: "https://localhost:7180",
    headers: { "Content-Type": "application/json;" },
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = handleApiError(error);
        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosInstance;

