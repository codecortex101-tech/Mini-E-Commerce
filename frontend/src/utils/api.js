import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-e-commerce-dxoh.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
