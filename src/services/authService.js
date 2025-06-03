import axiosPublic, { api } from "../lib/axios";
import axios from "../lib/axios";

export const authApi = {
    login: (requestBody) =>  axiosPublic.post('/auth/login', requestBody),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.get('/auth/refresh-token'),
    forgotPassword: () => axiosPublic.post('/auth/forgot'),
    changePassword: (requestBody) => api.put('/auth/change-password', requestBody),
    editProfile: (requestBody) => api.put('/auth/profile', requestBody),
}