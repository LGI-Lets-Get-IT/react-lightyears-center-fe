import api from "../lib/axios";

export const treatmentSessionsApi = {
  createSession: (requestBody) => api.post("/treatment-sessions", requestBody),
  getAllSessions: () => api.get("/treatment-sessions"),
  getAllSessionsByPlanId: (queryParams) => api.get('/treatment-sessions', queryParams),
  getSessionById: (id) => api.get(`/treatment-sessions/${id}`),
  updateSessionById: (id) => api.get(`/treatment-sessions/${id}`),
  deleteSessionByIds: (ids) => api.delete(`/treatment-sessions`, { data: ids}),
};