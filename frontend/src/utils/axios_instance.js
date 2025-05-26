/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log("BASE_URL", BASE_URL);
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const refreshAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("API is in interceptor");
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshAPI.post("/user/token-refresh");
        console.log(refreshResponse);
        return await api(originalRequest);
      } catch (tokenExpiredErr) {
        console.log("axios", tokenExpiredErr);
        if (tokenExpiredErr.status === 401) {
          toast.error("User Token Expired");
        }
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(err);
  }
);
/* // Axios response interceptor
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    // If token expired and it's not the refresh route itself
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        await api.get("/auth/refresh"); // This should set a new access token cookie

        // Retry the original request
        return api(originalRequest);
      } catch (refreshErr) {
        // If refresh also fails, redirect to login
        window.location.href = "/login"; // or use router if you're using React Router
      }
    }

    return Promise.reject(err);
  }
); */

export default api;
