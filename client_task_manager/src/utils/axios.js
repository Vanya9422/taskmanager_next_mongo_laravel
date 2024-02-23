import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export const API_ADMIN = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ADMIN_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});
