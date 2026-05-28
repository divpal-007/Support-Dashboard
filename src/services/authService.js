import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://retiring-huntress-brownnose.ngrok-free.dev/api',
    withCredentials: true,
    headers: {
        'Content-Type':'application/json'
    }
});

//response interceptor - handle 401 globally
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message
        || error.response?.data?.error || error.message || 'Something went wrong';
        return Promise.reject(message);
    }
);

export const authService ={
    login:(credentials) =>
        api.post('/auth/login',credentials),

    register: (data) =>
        api.post('/auth/register',data),

    logout: () =>
        api.post('/auth/logout'),

    me: () =>
        api.get('/auth/me')
};

//api.js has mock fallbacks and dashboard logic — keep auth separate and clean. Later we'll merge them when the whole app is connected.