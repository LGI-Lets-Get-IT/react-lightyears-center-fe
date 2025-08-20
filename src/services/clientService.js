import api from "../lib/axios";

export const clientsApi = {
  createClient: (requestBody) => api.post("/clients", requestBody),
  getAllClients: () => api.get("/clients"),
  getClientByUuid: (uuid) => api.get(`/clients/${uuid}`),
  updateClientByUuid: (uuid, requestBody) =>
    api.put(`/clients/${uuid}`, requestBody),
  updateClientIntakeFormLink: (uuid, requestBody) =>
    api.put(`/clients/${uuid}/intake-form`, requestBody),
  updateClientPasswordByUuid: (uuid, requestBody) =>
    api.put(`/clients/${uuid}/change-password`, requestBody),
  deleteClientByUuids: (requestBody) =>
    api.delete(`/clients`, { data: requestBody }),
};
