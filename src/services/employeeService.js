import api from "../lib/axios";

export const employeesApi = {
  createEmployee: (requestBody) => api.post("/employees", requestBody),
  getAllEmployees: () => api.get("/employees"),
  getAllPsychologists: (queryParams) =>
    api.get("/employees/psychologists", { params: queryParams }),
  getAllTherapists: (queryParams) =>
    api.get("/employees/therapists", { params: queryParams }),
  getAllPsychologistsWithAvailability: (queryParams) =>
    api.get("/employees/psychologists/availability", { params: queryParams }),
  getAllTherapistsWithAvailability: (queryParams) =>
    api.get("/employees/therapists/availability", { params: queryParams }),
  getEmployeeById: (id) => api.get(`/employees/${id}`),
  updateEmployeeById: (id, requestBody) =>
    api.put(`/employees/${id}`, requestBody),
  updateEmployeePasswordById: (id, requestBody) =>
    api.put(`/employees/${id}/change-password`, requestBody),
  deleteEmployeeByIds: (requestBody) =>
    api.delete(`/employees`, { data: requestBody }),
};
