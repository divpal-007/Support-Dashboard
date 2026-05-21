// services/api.js
// Single Axios instance — swap BASE_URL for your Spring Boot server
// All service calls go through here for consistent auth headers + error handling

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT from localStorage ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('operix_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 globally ──
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('operix_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// ─────────────────────────────────────────────────────────────
// DASHBOARD  →  GET /dashboard/summary
// ─────────────────────────────────────────────────────────────
export const dashboardService = {
  getSummary: () => api.get('/dashboard/summary'),
  getStats:   () => api.get('/dashboard/stats'),
};

// ─────────────────────────────────────────────────────────────
// ESCALATIONS  →  GET /escalations, POST /escalations/:id/assign
// ─────────────────────────────────────────────────────────────
export const escalationService = {
  getAll:      (params) => api.get('/escalations', { params }),
  getById:     (id)     => api.get(`/escalations/${id}`),
  assign:      (id, payload) => api.post(`/escalations/${id}/assign`, payload),
  updateStatus:(id, status)  => api.patch(`/escalations/${id}/status`, { status }),
  getSimilar:  (id)     => api.get(`/escalations/${id}/similar`),
};

// ─────────────────────────────────────────────────────────────
// TICKETS  →  GET /tickets, POST /tickets, PATCH /tickets/:id
// ─────────────────────────────────────────────────────────────
export const ticketService = {
  getAll:   (params) => api.get('/tickets', { params }),
  getById:  (id)     => api.get(`/tickets/${id}`),
  create:   (payload)=> api.post('/tickets', payload),
  update:   (id, payload) => api.patch(`/tickets/${id}`, payload),
  delete:   (id)     => api.delete(`/tickets/${id}`),
};

// ─────────────────────────────────────────────────────────────
// AUTH  →  POST /auth/login, POST /auth/logout, GET /auth/me
// ─────────────────────────────────────────────────────────────
export const authService = {
  login:   (credentials) => api.post('/auth/login', credentials),
  logout:  ()            => api.post('/auth/logout'),
  getMe:   ()            => api.get('/auth/me'),
  refresh: ()            => api.post('/auth/refresh'),
};

export default api;
