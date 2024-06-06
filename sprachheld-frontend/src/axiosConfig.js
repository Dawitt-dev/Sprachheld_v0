import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'https://fuzzy-pancake-r9j76g9vp6x2xg7v-5000.app.github.dev/api',
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