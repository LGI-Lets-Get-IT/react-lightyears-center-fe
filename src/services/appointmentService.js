import api from "../lib/axios";

export const appointmentsApi = {
  createAppointment: (requestBody) => api.post("/appointments", requestBody),
  getAllAppointments: () => api.get("/appointments"),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  getAppointmentForTreatmentProgress: (queryParams) =>
    api.get(`/appointments/programs`, queryParams),
  updateAppointmentById: (id) => api.get(`/appointments/${id}`),
  deleteAppointmentByIds: (requestBody) =>
    api.delete(`/appointments`, { data: requestBody }),
};
