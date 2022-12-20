import axios from 'axios';

export const rest = axios.create({
    baseURL: import.meta.env.VITE_REST_BASE_URL || '/',
    timeout: import.meta.env.VITE_API_TIMEOUT || 30000
});