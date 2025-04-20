import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { store } from "../store";
import { userLogout, userRefreshToken } from "@/store/slice/authSlice";
const MySwal = withReactContent(Swal);

const swalOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  backdrop: false,
  // didOpen: (toast) => {
  //   toast.addEventListener("mouseenter", Swal.stopTimer);
  //   toast.addEventListener("mouseleave", Swal.resumeTimer);
  // },
};

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
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
  (response) => {
    // console.log("REERASP", response);
    if (response.status === 201 || response.status === 204 ) {
      MySwal.mixin(swalOptions).fire({
        icon: "success",
        title: response?.data?.message || "Success",
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const message = error?.response?.data?.message
    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: message || "Internal Server Error",
    });
    if (error.response?.status === 401 &&
        message == "Token expired. Please refresh the page." &&
        !originalRequest._retry
      ) {
      try {
        originalRequest._retry = true;
        await store.dispatch(userRefreshToken()).unwrap();
        const newAccessToken = store.getState().auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
        return api(originalRequest)
      } catch (error) {
        store.dispatch(userLogout())
        window.location.href = '/login';
        return Promise.reject(error);
      }
    } else if (error.response?.status === 401 && message == "Refresh token expired. Please relogin.") {
      store.dispatch(userLogout());
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  (response) => {
    if (response.status === 201 || response.status === 204 ) {
      MySwal.mixin(swalOptions).fire({
        icon: "success",
        title: response?.data?.message || "Success",
      });
    }
    return response;
  },
  async (error) => {
    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: error?.response?.data?.message || "Internal Server Error",
    });
    if (error.response?.status === 401) {
      window.location.href = "/login";
      // Handle unauthorized access
      // getAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
