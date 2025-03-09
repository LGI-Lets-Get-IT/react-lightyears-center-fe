import api from "../lib/axios";

export const appointmentsApi = {
    createAppointment: (requestBody) => api.post('/appointments', requestBody),
    getAllAppointments: () => api.get('/appointments'),
    getAppointmentById: (id) => api.get(`/appointments/${id}`),
    updateAppointmentById: (id) => api.get(`/appointments/${id}`),
    deleteAppointmentById: (id) => api.get(`/appointments/${id}`),
}