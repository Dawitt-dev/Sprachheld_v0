import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'https://fuzzy-pancake-r9j76g9vp6x2xg7v-5000.app.github.dev/api', // Replace with your actual public URL
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