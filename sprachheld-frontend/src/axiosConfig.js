import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: "https://shark-app-wl983.ondigitalocean.app:5000/api"
    
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