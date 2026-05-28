// services/api.js
// Single Axios instance — swap BASE_URL for your Spring Boot server
// All service calls go through here for consistent auth headers + error handling

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://13.126.196.238:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials:true, //sends HTTPOnly cookie automatically
  timeout: 10000, // fail after 10s - don't hang forever
  headers: { 'Content-Type': 'application/json' },
});
//unwraps data - hooks get JSON directly not axios wrapper
// ── Response interceptor: handle 401 globally ──
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    const message = error.response?.data.message || error.response?.data.error || error.message || 'Something went wrong';
    return Promise.reject(message);
  }
);

// ─────────────────────────────────────────────────────────────
// DASHBOARD  →  GET /dashboard/summary
// ─────────────────────────────────────────────────────────────
export const dashboardService = {
  getSummary:() => api.get('/dashboard/summary'),
  getIeeStats:() => api.get('/dashboard/iee-status'),
};

// ─────────────────────────────────────────────────────────────
// ESCALATIONS  →  GET /escalations, POST /escalations/:id/assign
// ─────────────────────────────────────────────────────────────
export const escalationService = {
  getAll:() => api.get('/escalations'),
  getById:(id) => api.get(`/escalations/${id}`),
  create:(data) => api.post('/escalations', data),
  resolve:(id, resolution) => api.patch(`/escalations/${id}/resolve`, { resolution }),
};

// ─────────────────────────────────────────────────────────────
// AUTH  →  POST /auth/login, POST /auth/logout, GET /auth/me
// ─────────────────────────────────────────────────────────────
export const authService = {
  login:(credentials) => api.post('/auth/login',credentials),
  register:(data) => api.post('/auth/register',data),
  getMe:() => api.get('/auth/me'),
  logout:() => api.post('/auth/logout'),
};

export default api;
