import axios from "axios";
const apiUrl: string = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
