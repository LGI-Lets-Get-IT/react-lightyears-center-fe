import api from "../lib/axios";

export const treatmentSessionsApi = {
  createSession: (requestBody) => api.post("/treatment-sessions", requestBody),
  getAllSessions: () => api.get("/treatment-sessions"),
  getSessionById: (id) => api.get(`/treatment-sessions/${id}`),
  updateSessionById: (id) => api.get(`/treatment-sessions/${id}`),
  deleteSessionById: (id) => api.get(`/treatment-sessions/${id}`),
};