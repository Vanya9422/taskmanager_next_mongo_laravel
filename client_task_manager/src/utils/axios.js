import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export default API;
