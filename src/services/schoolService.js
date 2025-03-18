import api from "../lib/axios";

export const schoolsApi = {
  createSchool: (requestBody) => api.post("/schools", requestBody),
  getAllSchools: () => api.get("/schools"),
  getSchoolById: (id) => api.get(`/schools/${id}`),
  updateSchoolById: (id) => api.get(`/schools/${id}`),
  deleteSchoolById: (id) => api.get(`/schools/${id}`),
};