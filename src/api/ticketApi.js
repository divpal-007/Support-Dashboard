import axios from "axios";
// Connecting backend CRUD operations with React using Spring
// Centralized API calls
const API = "https://retiring-huntress-brownnose.ngrok-free.dev/api/tickets";
const api = axios.create({
  baseURL: 'https://retiring-huntress-brownnose.ngrok-free.dev',
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

export const createTicket = (data) => axios.post(API, data);

export const getTickets = () => api.get("/api/tickets");

export const updateTicket = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteTicket = (id) =>
  axios.delete(`${API}/${id}`);