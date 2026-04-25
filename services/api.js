import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => API.post("/login/", data);
export const register = (data) => API.post("/register/", data);
export const verifyOtp = (data) => API.post("/verify-otp/", data);
export const fetchBooks = () => API.get("/books/");
export const placeOrder = (data) => API.post("/orders/", data);