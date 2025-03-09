import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// import { getAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("REQUEST INTERCEPTORS");
    const token = "asd";
    // const token = getAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("ERROR", error);
    MySwal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      backdrop: false,
      // didOpen: (toast) => {
      //   toast.addEventListener("mouseenter", Swal.stopTimer);
      //   toast.addEventListener("mouseleave", Swal.resumeTimer);
      // },
    }).fire({
      icon: "error",
      title: error?.response?.data?.message || "Internal Server Error",
    });
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      // Handle unauthorized access
      // getAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
