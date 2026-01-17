import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api-leadcrm.faizarfi.dev/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.authdata) {
      config.headers.Authorization = `Basic ${user.authdata}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;