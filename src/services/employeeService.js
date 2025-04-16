import api from "../lib/axios";

export const employeesApi = {
  createEmployee: (requestBody) => api.post("/employees", requestBody),
  getAllEmployees: () => api.get("/employees"),
  getEmployeeById: (id) => api.get(`/employees/${id}`),
  updateEmployeeById: (id, requestBody) => api.put(`/employees/${id}`, requestBody),
  deleteEmployee: (requestBody) => api.delete(`/employees`, { data: requestBody }),
};
