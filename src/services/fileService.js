import api from "../lib/axios";

export const filesApi = {
  uploadFile: (requestBody) => api.post("/files", requestBody),
  getAllFiles: (query) => api.get("/files", query),
  generatePlanReport: () => api.post('/files/reports/treatment-plan/generate', {}, { responseType: 'blob' }),
  deleteFile: (requestBody) => api.delete(`/files`, { data: requestBody }),
};
