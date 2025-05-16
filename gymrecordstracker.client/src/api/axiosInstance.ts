import axios from 'axios';
import { handleApiError } from '../utils/errorHandling';

/**
 * Axios instance configuration with base URL and credentials.
 * 
 * - Uses `withCredentials` for cookie-based auth (e.g. HttpOnly session cookies).
 * - Sets default content type to JSON.
 * - Adds a global response interceptor to handle and transform API errors.
 *
 * @module axiosInstance
 */

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

