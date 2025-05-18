import api from "../lib/axios";

export const testTypesApi = {
    createTestType: (requestBody) => api.post('/test-types', requestBody),
    getAllTestTypes: () => api.get('/test-types'),
    getTestTypeById: (id) => api.get(`/test-types/${id}`),
    updateTestTypeById: (id, requestBody) => api.put(`/test-types/${id}`, requestBody),
    deleteTestType: (requestBody) => api.delete(`/test-types`, requestBody),
}