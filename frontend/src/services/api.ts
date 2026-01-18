import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-e-commerce-dxoh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // IMPORTANT
});

export default api;
