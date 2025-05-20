import api from "../lib/axios";

export const filesApi = {
  uploadFile: (params) => api.post("/files", params),
  getAllFiles: (query) => api.get("/files", query),
  generatePlanReport: (id) =>
    api.post(
      `/files/reports/treatment-plan/generate/${id}`,
      {},
      { responseType: "blob" }
    ),
  deleteFile: (requestBody) => api.delete(`/files`, { data: requestBody }),
};
