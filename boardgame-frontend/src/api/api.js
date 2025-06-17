// api.js
// Axios instance for making API requests to the backend server.
// Automatically attaches the JWT token from localStorage to each request if available.

import axios from "axios";

/**
 * Axios API instance configured for the board game rental backend.
 * - Sets the base URL for all API requests.
 * - Attaches Authorization header with JWT token if present in localStorage.
 */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to add Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;