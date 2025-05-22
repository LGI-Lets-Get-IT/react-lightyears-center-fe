import api from "../lib/axios";

export const employeesApi = {
  createEmployee: (requestBody) => api.post("/employees", requestBody),
  getAllEmployees: () => api.get("/employees"),
  getAllPsychologists: () => api.get("/employees/psychologists"),
  getAllTherapists: () => api.get("/employees/therapists"),
  getEmployeeById: (id) => api.get(`/employees/${id}`),
  updateEmployeeById: (id, requestBody) => api.put(`/employees/${id}`, requestBody),
  updateEmployeePasswordById: (id, requestBody) => api.put(`/employees/${id}/change-password`, requestBody),
  deleteEmployee: (requestBody) => api.delete(`/employees`, { data: requestBody }),
};
