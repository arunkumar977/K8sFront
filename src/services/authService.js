import axios from "axios";

/**
 * Automatically detects if the frontend is running locally
 * (e.g., via npm run dev or Postman)
 * or inside Kubernetes (Tomcat pod).
 *
 * - Local:    uses localhost:30083 (NodePort)
 * - Kubernetes: uses backend:8080 (internal Service name)
 */
const hostname = window.location.hostname;

// Detect environment
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

// Define the API base URL
const API_URL = isLocal
  ? "http://localhost:30083/back1/auth"   // Local testing or Postman
  : "http://backend:8080/back1/auth";     // Inside Kubernetes cluster

// 🔹 Login function
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data);
  return response.data;
};

// 🔹 Signup function
export const signup = async (username, email, password) => {
  return axios.post(`${API_URL}/signup`, { username, email, password });
};

// 🔹 Logout function
export const logout = () => {
  localStorage.removeItem("token");
};

