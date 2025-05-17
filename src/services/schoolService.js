import api from "../lib/axios";

export const schoolsApi = {
  createSchool: (requestBody) => api.post("/schools", requestBody),
  getAllSchools: () => api.get("/schools"),
  getSchoolById: (id) => api.get(`/schools/${id}`),
  getSchoolClientsById: (id) => api.get(`/schools/${id}/clients`),
  updateSchoolById: (id, requestBody) => api.put(`/schools/${id}`, requestBody),
  deleteSchoolById: (id) => api.delete(`/schools/${id}`),
};