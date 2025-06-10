import api from "../lib/axios";

export const appointmentsApi = {
  createAppointment: (requestBody) => api.post("/appointments", requestBody),
  getAllAppointments: () => api.get("/appointments"),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  getAppointmentForTreatmentProgress: (queryParams) =>
    api.get(`/appointments/programs`, queryParams),
  getAppointmentForAssessments: (queryParams) =>
    api.get(`/appointments/assessments`, queryParams),
  updateAppointmentById: (id, requestBody) => api.put(`/appointments/${id}`, requestBody),
  confirmPicAttendanceById: (id) => api.put(`/appointments/${id}/confirm`),
  deleteAppointmentByIds: (requestBody) =>
    api.delete(`/appointments`, { data: requestBody }),
};
