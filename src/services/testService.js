import api from "../lib/axios";

export const testsApi = {
    createTest: (requestBody) => api.post('/tests', requestBody),
    getAllTests: () => api.get('/tests'),
    getTestById: (id) => api.get(`/tests/${id}`),
    updateTestById: (id) => api.get(`/tests/${id}`),
    deleteTestById: (id) => api.get(`/tests/${id}`),
}