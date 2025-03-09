import api from "../lib/axios";

export const treatmentsApi = {
    getAllTreatments: () => api.get('/treatments'),
    getTreatmentById: (id) => api.get(`/treatments/${id}`),
    updateTreatmentById: (id) => api.get(`/treatments/${id}`),
    deleteTreatmentById: (id) => api.get(`/treatments/${id}`),
}