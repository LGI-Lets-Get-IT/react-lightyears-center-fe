import api from "../lib/axios";

export const clientsApi = {
  createClient: (requestBody) => api.post("/clients", requestBody),
  getAllClients: () => api.get("/clients"),
  getClientById: (id) => api.get(`/clients/${id}`),
  updateClientById: (id, requestBody) => api.put(`/clients/${id}`, requestBody),
  deleteClient: (requestBody) => api.delete(`/clients`, requestBody),
};
