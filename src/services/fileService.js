import api from "../lib/axios";

export const filesApi = {
  uploadFile: (requestBody) => api.post("/files", requestBody),
  downloadFile: (requestBody) => api.post("/files/download", requestBody),
  getAllFiles: (query) => api.get("/files", query),
  generatePlanReport: (id) =>
    api.post(
      `/files/reports/treatment-plan/generate/${id}`,
      {},
      { responseType: "blob" }
    ),
  sendMailPlanReport: (id) =>
    api.post(`/files/reports/treatment-plan/send-mail/${id}`),
  generateDailyProgressReport: (id) =>
    api.post(
      `/files/reports/daily-progress/generate/${id}`,
      {},
      { responseType: "blob" }
    ),
  sendMailDailyProgressReport: (id) =>
    api.post(`/files/reports/daily-progress/send-mail/${id}`),
  deleteFile: (requestBody) => api.delete(`/files`, { data: requestBody }),
};
