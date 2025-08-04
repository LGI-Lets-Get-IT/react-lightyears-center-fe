import api from "../lib/axios";

export const employeesApi = {
  createEmployee: (requestBody) => api.post("/employees", requestBody),
  getAllEmployees: () => api.get("/employees"),
  getAllPsychologists: (queryParams) =>
    api.get("/employees/psychologists", queryParams),
  getAllTherapists: (queryParams) =>
    api.get("/employees/therapists", queryParams),
  getEmployeeById: (id) => api.get(`/employees/${id}`),
  updateEmployeeById: (id, requestBody) =>
    api.put(`/employees/${id}`, requestBody),
  updateEmployeePasswordById: (id, requestBody) =>
    api.put(`/employees/${id}/change-password`, requestBody),
  deleteEmployeeByIds: (requestBody) =>
    api.delete(`/employees`, { data: requestBody }),
};
