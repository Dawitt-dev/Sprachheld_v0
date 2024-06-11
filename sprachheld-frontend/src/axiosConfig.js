import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: "https://shark-app-w1983.ondigitalocean.app/api",
    
});
// Log the base URL being used
console.log('Base URL:', axiosInstance.defaults.baseURL);

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