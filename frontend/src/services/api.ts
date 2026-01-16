import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://mini-e-commerce-dxoh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
