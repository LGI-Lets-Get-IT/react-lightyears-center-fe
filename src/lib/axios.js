import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  // resetCurrentUser, // OLD CODE - commented out (not used with HTTP-only cookies)
  userLogout,
  userRefreshToken,
} from "@/store/slice/authSlice";
// import Cookies from "js-cookie"; // OLD CODE - commented out (not used with HTTP-only cookies)
const getStore = async () => {
  const module = await import("../store");
  return module.store;
};
const MySwal = withReactContent(Swal);

const swalOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  // backdrop: false,
  // didOpen: (toast) => {
  //   toast.addEventListener("mouseenter", Swal.stopTimer);
  //   toast.addEventListener("mouseleave", Swal.resumeTimer);
  // },
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      // FIXED: Remove token handling since we're using HTTP-only cookies
      // The browser will automatically include cookies with requests
      // No need to manually set Authorization header

      // OLD CODE - commented out
      // const store = await getStore();
      // const token = store.getState().auth.accessToken;
      // const accessToken = Cookies.get("accessToken");
      // const refreshToken = Cookies.get("refreshToken");
      // console.log("COOKIES:", accessToken, refreshToken);
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      console.log(
        "Request interceptor: Using HTTP-only cookies for authentication"
      );
    } catch (err) {
      console.error("Request interceptor error", err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // FIXED: No need to pass token since we're using HTTP-only cookies
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // if (response.status === 201 || response.status === 204) {
    const contentModifyActions = ["put", "delete"];
    if (contentModifyActions.includes(response.config.method)) {
      MySwal.mixin(swalOptions).fire({
        icon: "success",
        title: response?.data?.message || "Success",
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const message = error?.response?.data?.message;

    if (
      error.response?.status === 401 &&
      (message === "Token expired. Please refresh the page." ||
        message === "No access token provided") &&
      !originalRequest._retry
    ) {
      console.log("Access token expired, attempting refresh...");
      try {
        const store = await getStore();
        if (isRefreshing) {
          console.log("Already refreshing, queuing request...");
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: () => {
                // FIXED: No need to set Authorization header, cookies are automatic
                resolve(api(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        console.log("Calling refresh token endpoint...");
        // FIXED: Call refresh token endpoint to get new cookies
        await store.dispatch(userRefreshToken()).unwrap();
        console.log("Refresh token successful, retrying original request...");

        processQueue(null);

        // FIXED: No need to set Authorization header, cookies are automatic
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);
        const store = await getStore();
        processQueue(refreshError);
        console.log("Logging out user...");
        await store.dispatch(userLogout());
        console.log("Redirecting to login...");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // console.log("LINE 134");
    // Refresh token expired
    if (
      error.response?.status === 401 &&
      message === "Refresh token expired. Please relogin."
    ) {
      const store = await getStore();
      // console.log("BEFORE! IF 401 AND PLEASE RELOGIN LINE 141");
      await store.dispatch(userLogout());
      // console.log("AFTER! IF 401 AND PLEASE RELOGIN LINE 141");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // console.log("KELAURIN ERROR");
    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: message || "Internal Server Error",
    });

    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  (response) => {
    // if (response.status === 201 || response.status === 204) {
    if ([201, 204].includes(response.status)) {
      MySwal.mixin(swalOptions).fire({
        icon: "success",
        title: response?.data?.message || "Success",
      });
    }
    return response;
  },
  async (error) => {
    const message = error?.response?.data?.message;
    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: message || "Internal Server Error",
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
