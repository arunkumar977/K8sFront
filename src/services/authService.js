import axios from "axios";

const hostname = window.location.hostname;
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

const API_URL = isLocal
  ? "http://localhost:30083/back1/auth"   // for Postman or local dev
  : "http://backend:8080/back1/auth";     // inside Kubernetes

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data);
  return response.data;
};

export const signup = async (username, email, password) => {
  return axios.post(`${API_URL}/signup`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};
