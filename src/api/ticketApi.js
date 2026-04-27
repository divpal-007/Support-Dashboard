import axios from "axios";
// Connecting backend CRUD operations with React using Spring
// Centralized API calls
const API = "http://52.66.192.23:8080/api/tickets";

export const createTicket = (data) => axios.post(API, data);

export const getTickets = () => axios.get(API);

export const updateTicket = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteTicket = (id) =>
  axios.delete(`${API}/${id}`);