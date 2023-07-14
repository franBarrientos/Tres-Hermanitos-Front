import axios from "axios";
const apiUrl: string = "https://ecommerce-backv3-production.up.railway.app/api";
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
