import api from "../lib/axios";

export const authApi = {
    login: (requestBody) =>  api.post('/auth/login', requestBody),
    forgotPassword: () => api.post('/auth/forgot'),
}