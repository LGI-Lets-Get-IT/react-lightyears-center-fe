import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { userLogout, userRefreshToken } from "@/store/slice/authSlice";
const getStore = async () => {
  const module = await import('../store');
  return module.store
}
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


export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': "application/json",
  },
});

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const store = await getStore();
      const token = store.getState().auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.err('Token fetch error', err)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = []
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
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
    const originalRequest = error.config;
    const message = error?.response?.data?.message

    console.log('MASUK 1', message)

    if (error.response?.status === 401 &&
      message == "Token expired. Please refresh the page." &&
      !originalRequest._retry
    ) {
      try {
        const store = await getStore();
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              reject
            });
          })
        }

        originalRequest._retry = true;
        isRefreshing = true;

        await store.dispatch(userRefreshToken()).unwrap();
        const newAccessToken = store.getState().auth.accessToken;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        const store = await getStore();
        processQueue(error, null);
        store.dispatch(userLogout());
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    console.log('MASUK 2', message)

    // Refresh token expired
    if (error.response?.status === 401 && message === "Refresh token expired. Please relogin.") {
      const store = await getStore();
      store.dispatch(userLogout());
      window.location.href = "/login";
      return Promise.reject(error);
    }

    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: message || "Internal Server Error",
    });

    return Promise.reject(error);
    //     if (!isRefreshing) {
    //       isRefreshing = true;

    //       try {
    //         originalRequest._retry = true;
    //         store.dispatch(userRefreshToken()).unwrap();
    //         const newAccessToken = store.getState().auth.accessToken;
    //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    //         isRefreshing = false;

    //         return api(originalRequest)
    //       } catch (error) {
    //         isRefreshing = false;
    //         store.dispatch(userLogout())
    //         window.location.href = '/login';
    //         return Promise.reject(error);
    //       }
    //     }
    //   } else if (error.response?.status === 401 && message == "Refresh token expired. Please relogin.") {
    //     store.dispatch(userLogout());
    //     window.location.href = "/login";
    //     return Promise.reject(error);
    //   } else if (error.response?.status === 404) {
    //     window.history.replaceState(null, "", "/");
    //   }
    //   return Promise.reject(error);
  }
)

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
    const message = error?.response?.data?.message
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
