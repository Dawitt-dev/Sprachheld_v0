import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // API server URL
});

// Interceptor to include token in headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token; // Assuming token is stored in local storage
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;