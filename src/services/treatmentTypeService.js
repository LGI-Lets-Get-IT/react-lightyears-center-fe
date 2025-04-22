import api from "../lib/axios";

export const treatmentTypesApi = {
    createTreatmentType: (requestBody) => api.post('/treatment-types', requestBody),
    getAllTreatmentTypes: () => api.get('/treatment-types'),
    getTreatmentTypeById: (id) => api.get(`/treatment-types/${id}`),
    updateTreatmentTypeById: (id) => api.get(`/treatment-types/${id}`),
    deleteTreatmentType: (requestBody) => api.delete(`/treatment-types`, requestBody),
}