import api from "../lib/axios";

export const assessmentsApi = {
    createAssessment: (requestBody) => api.post('/assessments', requestBody),
    getAllAssessments: () => api.get('/assessments'),
    getAssessmentById: (id) => api.get(`/assessments/${id}`),
    updateAssessmentById: (id) => api.get(`/assessments/${id}`),
    deleteAssessmentById: (id) => api.get(`/assessments/${id}`),
}