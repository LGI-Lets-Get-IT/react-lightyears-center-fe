import api from "../lib/axios";

export const assessmentsApi = {
    createAssessment: (requestBody) => api.post('/assessments', requestBody),
    getAllAssessments: () => api.get('/assessments'),
    getAssessmentById: (id) => api.get(`/assessments/${id}`),
    getAssessmentByAppointmentId: (query) => api.get('/assessments', query),
    updateAssessmentById: (id, requestBody) => api.put(`/assessments/${id}`, requestBody),
    deleteAssessmentById: (id) => api.delete(`/assessments/${id}`),
}