import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
    ? 'https://shark-app-w1983.ondigitalocean.app' // replace with your actual backend URL
    : 'http://localhost:5000'
    
});
// Interceptor to include token in headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Interceptor adding token:", token);
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;