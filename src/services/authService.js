import axiosPublic from "../lib/axios";
import axios from "../lib/axios";

export const authApi = {
    login: (requestBody) =>  axiosPublic.post('/auth/login', requestBody),
    logout: () => axios.post('/auth/logout'),
    refreshToken: () => axios.get('/auth/refresh-token'),
    forgotPassword: () => axiosPublic.post('/auth/forgot'),
}